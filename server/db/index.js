let admin = require('firebase-admin');
let serviceAccount = require('../config/admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://the-derelicts.firebaseio.com/'
});


module.exports = admin.database();