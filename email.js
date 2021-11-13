
var admin = require("firebase-admin");

var serviceAccount = require("./serviceaccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const email = require('node-email-extractor').default;

var myArgs = process.argv.slice(2);


(async () => {
    var data = await email.url(myArgs[0])
    // .then(result => {
    console.log(data.emails);
    // const obj = 'test';
    const emailData = data.emails
    const emailArray = []
    emailArray.push(data.emails)
    await db.collection('emails').doc('saved').get()
        .then((doc) => emailArray.push(doc.data().email))

    console.log(`current list: ${emailArray}`)
    var date = new Date().toDateString()
    console.log(date)
    await db.collection('emails').doc(`${date}`).set({ scraped: emailArray[0] })

    //  update({ email: 'test' }).then(() =>
    //         console.log(emailData));
    // });


})()