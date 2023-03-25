# LineChatBot

LINEを使ってChatGPTと会話することができます。このプログラムは、Google Apps Scriptを使用して実装されています。OpenAI APIキーとLINEのアクセストークンを設定する必要があります。

## 設定
`main.gs`には、以下の変数が使用されています．これらの変数はgoogle apps script上で設定する必要があります。

`OPENAI_KEY` - OpenAI APIキー
`LINE_TOKEN` - LINEアクセストークン
`SHEET_URL` - スプレッドシートのURL

## 使い方
このプログラムを使用するには、LINEアカウントを持っている必要があります。また，アプリはLINE developerからQRコードを使用して追加してください．メッセージを送信することでChatGPTからの返信がLINEで表示されます。

### 初期化
会話履歴をクリアするには、`clear()`と入力してください。

## ライセンス
このプログラムはMITライセンスの下で提供されています。詳細については、LICENSEファイルを参照してください。