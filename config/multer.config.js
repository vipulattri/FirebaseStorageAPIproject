const { credential } = require('firebase-admin');
const multer = require('multer');
const firebaseStorage = require('multer-firebase-storage');
const firebase = require('./firebase.config')
const serviceAccount = require('../hptuexam-firebase-adminsdk-t1fx2-5b8ba66de0.json')
const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
   bucketName : 'hptuexam.appspot.com',
   unique:true
})

const upload = multer({
    storage: storage,

})
module.exports = upload;