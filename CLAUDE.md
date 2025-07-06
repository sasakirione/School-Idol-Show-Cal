# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際にClaude Code (claude.ai/code) へのガイダンスを提供します。

## プロジェクト概要

「Link Like LoveLive! スクールアイドルショウ」のスコアシミュレーターのNext.jsアプリケーションです。ユーザーは6枚のカードでチームを組み、楽曲を選択し、属性マッチングとセンター特技に基づく実質ステータスを計算できます。

## 開発コマンド

```bash
# 開発サーバー（Turbopack使用）
npm run dev

# プロダクションビルド
npm run build

# リンティング
npm run lint

# コードフォーマット（Biome使用）
npm run formatter
```

## アーキテクチャ

### データフロー
- **楽曲データ**: 実行時にリモートCSV（`https://sasakirione.github.io/School-Idol-Show-Data/data/song.csv` ）から取得
- **カードデータ**: 実行時にリモートCSV（`https://sasakirione.github.io/School-Idol-Show-Data/data/card.csv` ）から取得
- **状態管理**: メインの`ScoreSimulator`コンポーネントでReact useStateを使用、propsで子コンポーネントに渡す
- **リアルタイム計算**: 状態変更時にフッターで実質ステータスを計算・表示

### コアコンポーネント構造
- `ScoreSimulator`: 全ての状態を管理するメインのオーケストレーターコンポーネント
- `CardSelection`: ドラッグ＆ドロップでの並び替え機能付きチーム編成（@dnd-kit使用）
- `CardModal`: アイドル名/カード名でのフィルタリング機能付きカード選択ポップアップ
- `SongSelection`: フィルタリング機能付き楽曲・難易度選択
- `EffectiveStatsFooter`: リアルタイム計算結果を表示する固定フッター

### データ変換パイプライン
1. 生CSVデータ（`CSVCard`型） → `convertCSVCardToCard()` → アプリケーション用`Card`型
2. `utils/scoreCalculation.ts`で属性マッチングとセンター特技を使用したスコア計算
3. `src/types/index.ts`で定義された型安全な変換

## 主要なビジネスロジック

### スコア計算ルール
- **属性マッチング**: 楽曲属性と一致するステータス = 1.0倍、その他 = 0.1倍
- **センター特技**: センターアイドルとカードアイドルの組み合わせによる倍率（1.0倍〜3.0倍）
- **計算場所**: `utils/scoreCalculation.ts` - 将来の拡張のために分離

### カードチーム制約
- 6枚のカードが必須
- ドラッグ＆ドロップでの並び替え（戦略上、位置が重要）
- 同じカードの重複は不可
- リアルタイム検証とステータス計算

## データソース
- リモート楽曲CSV: 外部GitHub Pages URL（`https://sasakirione.github.io/School-Idol-Show-Data/data/song.csv`）
- リモートカードCSV: 外部GitHub Pages URL（`https://sasakirione.github.io/School-Idol-Show-Data/data/card.csv`）
- フォールバック: リモート取得失敗時は空配列

## スタイリング・UI
- ピンク色テーマのTailwind CSS
- 日本語インターフェース
- レスポンシブデザイン（モバイル・タブレット対応）
- カスタムドラッグ＆ドロップ視覚フィードバック
- 常時ステータス表示用固定フッター

## コードスタイル
- Biomeでフォーマット（2スペースインデント、ダブルクォート）
- TypeScript strict モード
- フックを使用した関数コンポーネント
- 計算には純粋関数を優先
- 全コンポーネントでPropsインターフェース使用

## VCS
作業単位毎に日本語でコミットを作成してください
コミットは必ずプレフィックスをつけてください。プレフィックスは以下から選択してください。
 - add
 - update
 - fix
 - refactor
 - test
 - doc
 - etc