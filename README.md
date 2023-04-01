# LineChatBot

LINEを使ってChatGPTと会話することができます。このプログラムは、Google Apps Scriptを使用して実装されています。[OpenAI APIキー](https://openai.com/product)と[LINEのアクセストークン](https://developers.line.biz/ja/)を設定する必要があります。また，会話情報はGoogle Spread Sheetを利用します．

## 設定
`main.gs`には、以下の変数が使用されています．これらの変数はgoogle apps script上で設定する必要があります。

* `OPENAI_KEY` - OpenAI APIキー
* `LINE_TOKEN` - LINEアクセストークン
* `SHEET_URL` - スプレッドシートのURL

## 使い方
このプログラムを使用するには、LINEアカウントを持っている必要があります。また，チャンネルはLINE developerから作成し，QRコードを使用して追加してください．メッセージを送信することでChatGPTからの返信がLINEで表示されます。

Google Spread Sheetの初期状態は以下のようにして下さい．ただし，*は好きな人格設定となるので好きな文章を入力してください．

| role   | content |
| ------ | ------- |
| system | *       |

### 初期化
会話履歴をクリアするには、`clear()`とLINE上で入力してください。

## ライセンス
このプログラムはMITライセンスの下で提供されています。詳細については、LICENSEファイルを参照してください。