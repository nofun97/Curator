const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.storageTest = functions.https.onCall(async (data, context) => {
  var reference = await admin.firestore().collection('items').add({'status': 'successful from cloud functions'});
  var snapshot = await reference.get();
  return snapshot.data;
});
