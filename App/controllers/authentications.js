import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

export const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const uploadProfile = user => {
  return firebase
    .firestore()
    .collection('users')
    .add(user);
};

export const getListOfProfiles = async () => {
  const snapshot = await firebase.firestore().collection('users').orderBy('firstName', 'asc').get();
  return snapshot.docs.map(doc => doc.data());
};

export const getPersonalProfile = async (userID) => {
  const query = firebase.firestore().collection('users').where('id', '==', userID);
  const snapshot = await query.get();
  if (snapshot.docs.length !== 1) {throw new Error('Profile not found');}
  return snapshot.docs[0].data();
};

export const editProfile = (profileId, newProfile) => {
  return firebase.firestore().collection('users').doc(profileId).update(newProfile);
}
;