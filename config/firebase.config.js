const Firebase = require('firebase-admin');
const serviceAccount = require('../hptuexam-firebase-adminsdk-t1fx2-5b8ba66de0.json')
const firebase = Firebase.initializeApp({
    credential:Firebase.credential.cert(serviceAccount),
    storageBucket: 'hptuexam.appspot.com'
})


module.exports = Firebase;