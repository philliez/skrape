const path = require('path');
const { google } = require('googleapis');
const sheets = google.sheets('v4');
const env = require('./env.json');

const SPREADSHEET_ID = env.SPREADSHEET_ID;

exports.appendToSheet = async (row, column) => {
  const auth = new google.auth.GoogleAuth({
    // generate your service_account.json
    keyFile: path.join(__dirname, 'serviceaccount.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  google.options({ auth });

  sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: 'A1:A1',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        [


        ]
      ],
    },
  })

  // get values from a spreadsheet.
  // const request = {
  //   spreadsheetId: SPREADSHEET_ID,
  //   range: 'Hoja 1',
  // };
  // const response = (await sheets.spreadsheets.values.get(request)).data;
  // console.log(JSON.stringify(response, null, 2));

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'A1:A1',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        row,
      ],
    },
  });
}