# 📱 片交シミュレーター — GitHub Pages デプロイ手順

越前警備株式会社の社員さんがスマホで使えるよう、`guard-system2` リポジトリに追加します。

---

## 📦 同梱ファイル

| ファイル | 役割 |
|---|---|
| `katakou-simple.html` | 本体（PWA対応済） |
| `manifest.json` | アプリ名・アイコン定義 |
| `service-worker.js` | オフライン動作・キャッシュ管理 |
| `icon-192.png` | ホーム画面アイコン（標準）|
| `icon-512.png` | ホーム画面アイコン（高解像度）|
| `apple-touch-icon.png` | iPhone用アイコン |
| `favicon-32.png` | ブラウザタブのアイコン |

**全7ファイル**を `guard-system2` リポジトリのルートにアップロードしてください。

---

## 🚀 方法A：GitHubブラウザでアップロード（一番簡単・推奨）

### 1. リポジトリを開く
ブラウザで以下にアクセス：
```
https://github.com/sachio0716-coder/guard-system2
```

### 2. ファイルをアップロード
- 右上の **「Add file」** → **「Upload files」** をクリック
- 7ファイル全部を **ドラッグ&ドロップ**
- 一番下までスクロール
- コミットメッセージ欄に：
  ```
  Add 片交シミュレーター PWA
  ```
- **「Commit changes」** ボタンをクリック

### 3. 数分待つ（GitHub Pagesが自動デプロイ）
2〜5分後にアクセス可能：
```
https://sachio0716-coder.github.io/guard-system2/katakou-simple.html
```

---

## 💻 方法B：ターミナル（Git）でアップロード

すでにローカルにリポジトリがある場合：

```bash
# ファイルをローカルリポジトリにコピー
cp katakou-simple.html ~/guard-system2/
cp manifest.json ~/guard-system2/
cp service-worker.js ~/guard-system2/
cp icon-*.png ~/guard-system2/
cp apple-touch-icon.png ~/guard-system2/
cp favicon-32.png ~/guard-system2/

# コミット&プッシュ
cd ~/guard-system2
git add katakou-simple.html manifest.json service-worker.js *.png
git commit -m "Add 片交シミュレーター PWA"
git push origin main
```

---

## 📲 社員さんへのインストール手順（共有用）

### 共有URL
```
https://sachio0716-coder.github.io/guard-system2/katakou-simple.html
```

### iPhone（Safari）
1. URLをSafariで開く
2. 画面下中央の **共有ボタン**（□と↑のアイコン）をタップ
3. メニューから **「ホーム画面に追加」** を選択
4. 右上の **「追加」** をタップ
5. ホーム画面に **「片交シミュ」** アイコンが表示される

### Android（Chrome）
1. URLをChromeで開く
2. ページ下にバナーで **「ホーム画面に追加」** が出ることがある → タップ
3. もしくは右上 **︙メニュー** → **「ホーム画面に追加」**
4. **「追加」** をタップ
5. ホーム画面に **「片交シミュ」** アイコンが表示される

### LINE WORKSでの社員告知例文
```
【新ツール】片側交互通行 訓練シミュレーター公開

スマホで片交の無線プロトコルと誘導棒操作が訓練できます。

▼アクセスURL
https://sachio0716-coder.github.io/guard-system2/katakou-simple.html

▼ホーム画面に追加する方法
・iPhone: 共有→ホーム画面に追加
・Android: メニュー→ホーム画面に追加

音声入力にも対応しているので、PTTボタンを長押しで実際に
「車両接近、流します」「ラストナンバーXXです」と発声して
訓練できます。

新任教育・現任教育の補助教材としてご活用ください。
```

---

## 🔄 更新方法

シミュレーターを修正したい場合：

1. `katakou-simple.html` を編集
2. `service-worker.js` の `CACHE_VERSION` を変更（例: `v1.0.0` → `v1.0.1`）
   - これで全社員の端末で自動的に最新版に切り替わる
3. GitHubに再アップロード（同じファイル名で上書き）

> ⚠️ `CACHE_VERSION` を変えないと、社員さんの端末でキャッシュが残って古いままになります。

---

## 🐛 トラブルシューティング

### 「真っ白で何も表示されない」
→ GitHub Pagesの設定が無効。リポジトリの **Settings → Pages** で:
- Source: **Deploy from a branch**
- Branch: **main** / **/(root)**
- **Save** をクリック

### 「音声入力が動かない」
→ HTTPSでアクセスしているか確認（GitHub Pagesは自動的にHTTPSなのでOK）。
→ Safari/Chromeで初回のマイク許可を「許可」したか確認。

### 「アイコンが表示されない」
→ ファイル名が正確か確認（大文字小文字も区別される）。

### 「古いバージョンが表示される」
→ ブラウザのキャッシュをクリア、または `service-worker.js` の `CACHE_VERSION` を更新。

---

## 📋 QRコード作成（社員配布用）

URLからQRコードを作る場合、以下のサイトが便利：
- https://www.qrcode-monkey.com/ （無料、ロゴ入れ可能）
- https://qr.quel.jp/ （日本のサイト、シンプル）

QRコードを印刷して詰所・休憩室に貼っておくと、新任社員さんが即アクセスできます。

---

**作成日**: 2026年5月25日
**バージョン**: v1.0.0
