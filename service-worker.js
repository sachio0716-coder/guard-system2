// =====================================================
// 片交シミュレーター Service Worker
// オフライン動作・自動更新対応
// =====================================================

// バージョンは更新時に手動でインクリメント
// （新しい番号にすると、全ユーザーの端末で自動的に最新版に切り替わる）
const CACHE_VERSION = 'v1.0.9';
const CACHE_NAME = 'katakou-sim-' + CACHE_VERSION;

// キャッシュするファイル一覧
const ASSETS = [
  './katakou-simple.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

// インストール時：必要ファイルをキャッシュ
self.addEventListener('install', (event) => {
  console.log('[SW] Install:', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()) // 新版即時有効化
  );
});

// アクティブ化時：古いキャッシュを削除
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate:', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key.startsWith('katakou-sim-') && key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Delete old cache:', key);
            return caches.delete(key);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// fetch時：Cache-first戦略
// ただしHTMLとmanifestは Network-first（更新を取りに行く）
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // GET以外は素通し
  if (event.request.method !== 'GET') return;

  // HTMLとmanifestはNetwork-first（更新優先）
  const isCritical = url.pathname.endsWith('.html') ||
                     url.pathname.endsWith('manifest.json');

  if (isCritical) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // 成功したらキャッシュ更新
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request)) // オフラインならキャッシュから
    );
  } else {
    // 画像などはCache-first（高速）
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
  }
});

// メッセージ受信（強制更新時など）
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
