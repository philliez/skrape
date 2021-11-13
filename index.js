
var exec = require('child_process').exec;

var cors = require('cors')

var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var admin = require("firebase-admin");
var functions = require("firebase-functions");
var serviceAccount = require("./serviceaccount.json");
const path = require('path');
const { google } = require('googleapis');
const sheets = google.sheets('v4');
const env = require('./env.json');

const SPREADSHEET_ID = env.SPREADSHEET_ID;

























app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()) // for parsing application/json
//app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// parse application/json
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false })

let savedEmails = []
var email = require('node-email-extractor').default;
const { appendToSheet } = require('./sheets');
const auth = new google.auth.GoogleAuth({
  // generate your service_account.json
  keyFile: path.join(__dirname, 'serviceaccount.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
async function getEmailsonload(email) {
  var email = require('node-email-extractor').default;

  const dno = await email.url('https://www.reddit.com/r/smallbusiness/comments/pn5ysk/promote_your_business_week_of_september_13_2021')
  console.log(dno)


}
async function getEmailpost() {
  var email = require('node-email-extractor').default;

  const reqFetch = await email.url(`'${req.body.url}'`)
  console.log(reqFetch)


}
app.get('/', async function (req, res) {
  sheetData = []





  google.options({ auth })
  const origVals = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'A1:A100',
  })





  res.render('index', { emails: 'test' })

});

// app.post('/clear', async function (req, res) {
//   let requests = [];


//   requests.push({

//     updateCells: {
//       range: 'Sheet1!A1:A1000'
//     },

//     fields: "userEnteredValue"
//   })



//   sheets.spreadsheets.batchUpdate({
//     spreadsheetId: SPREADSHEET_ID,
//     resource: batchUpdateRequest,
//   })
//   console.log('cleared sheet');

//   res.render('index');

// })


app.post('/emails', urlencodedParser, async function (req, res,) {
  var email = require('node-email-extractor').default
  console.log('1' + req.body.url)
  var decodedURL = decodeURI(req.body.url);

  const data = await email.url(req.body.url)
  console.log('2' + decodedURL)
  console.log('3' + data)




  var updateArray = []
  console.log(data.emails)
  updateArray.push(data.emails);

  console.log(updateArray)


  google.options({ auth })
  sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,

    range: 'A1:Z100',

    valueInputOption: 'USER_ENTERED',
    includeValuesInResponse: 'true',
    requestBody: {
      values: updateArray,
      majorDimension: "COLUMNS",

    }
  }
  )



  res.render('index', { emails: updateArray })
})


// const obj = 'test';



// emailArray.push(fetchdata.emails)
// await db.collection('emails').doc('saved').get()
//   .then((doc) => emailArray.push(doc.data().email))

// console.log(`list: ${ emailArray }`)
// var date = new Date().toDateString()
// console.log(date)
// await db.collection('emails').doc(`${ date }`).set({ scraped: JSON.stringify(emailArray) })


//  update({ email: 'test' }).then(() =>
//         console.log(emailData));
// });





var port = 80;
app.listen(port);
console.log('Listening on port ' + port + '.');
