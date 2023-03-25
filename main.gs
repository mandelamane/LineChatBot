// chatgptから返答を受け取る
function requestChatGPT(prompts) {
  // OpenAI API
  const apiKey = PropertiesService.getScriptProperties().getProperty("OPENAI_KEY");
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const headers = {
    'Authorization': 'Bearer ' + apiKey,
    'Content-Type': 'application/json',
    'X-Slack-No-Retry': 1
  };

  const options = {
    'muteHttpExceptions': true,
    'headers': headers,
    'method': 'POST',
    'payload': JSON.stringify({
      'model': 'gpt-3.5-turbo',
      // 'max_tokens': 2048,
      // 'temperature': 0.9,
      'messages': prompts
    })
  };

  try {
    const response = JSON.parse(UrlFetchApp.fetch(apiUrl, options).getContentText());
    return response.choices[0].message.content;
  } catch (e) {
    return e;
  }
}


// スプレッドシートにプロンプトを書き込む
function writeValues(sheet, values) {
  const rowNum = sheet.getLastRow() + 1;
  sheet.getRange(rowNum, 1, 1, 2).setValues(values);
}


// スプレッドシートからプロンプトを読み込む
function readPrompts(sheet) {
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const data = rows.slice(1);
  let result = [];

  data.forEach(function (row) {
    let rowObject = {};
    row.forEach(function (value, index) {
      rowObject[headers[index]] = value;
    });
    result.push(rowObject);
  });

  return result
}


// スプレッドシートの内容を初期化する
function initDataBase(sheet) {
  const rowNum = sheet.getLastRow();
  if (rowNum >= 3) {
    sheet.getRange(3, 1, rowNum - 2, 2).clear();
  }
}


// lineに情報を送る
function fetchLine(sheet, userMessage, replyToken, has_clear) {
  // LINE API
  const token = PropertiesService.getScriptProperties().getProperty("LINE_TOKEN");
  const apiUrl = 'https://api.line.me/v2/bot/message/reply';
  let response = "会話履歴を削除しました。";

  if (has_clear == false) {
    let values = [['user', userMessage]];
    writeValues(sheet, values);

    const prompts = readPrompts(sheet);
    response = requestChatGPT(prompts);

    values = [['assistant', response]];
    writeValues(sheet, values);
  }

  const payload = {
    'replyToken': replyToken,
    'messages': [{
      'type': 'text',
      'text': response
    }]
  };

  const options = {
    'payload': JSON.stringify(payload),
    'myamethod': 'POST',
    'headers': { "Authorization": "Bearer " + token },
    'contentType': 'application/json'
  };

  UrlFetchApp.fetch(apiUrl, options);
}


// main関数
function doPost(e) {
  // スプレッドシート（データベースの代わり）
  const ss = SpreadsheetApp.openByUrl(PropertiesService.getScriptProperties().getProperty("SHEET_URL"));
  const sheet = ss.getActiveSheet();

  const eventData = JSON.parse(e.postData.contents).events[0];
  const replyToken = eventData.replyToken;
  let userMessage = eventData.message.text;
  let has_clear = false;

  if (userMessage === undefined) {
    userMessage = '[スタンプ]';
  } else if (userMessage == 'clear()') {
    initDataBase(sheet);
    has_clear = true;
  }

  fetchLine(sheet, userMessage, replyToken, has_clear);
}
