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
    .doc(user.id)
    .set({
      firstName: user.firstName,
      lastName: user.lastName,
    });
};

export const getListOfProfiles = async () => {
  const snapshot = await firebase.firestore().collection('users').orderBy('firstName', 'asc').get();
  return snapshot.docs.map(doc => {
    return {
      uid: doc.id,
      ...doc.data(),
    };
  });
};

export const getPersonalProfile = async (userID) => {
  const snapshot = await firebase.firestore().collection('users').doc(userID).get();
  return snapshot.data();
};

export const editProfile = (profileId, newProfile) => {
  return firebase.firestore().collection('users').doc(profileId).update(newProfile);
};

export const getProfilesOfIds = async (profileIds) => {
  var profiles = [];
  for (let i = 0; i < profileIds.length; i++){
    const snapshot = await firebase.firestore().collection('users').doc(profileIds[i]).get();

    // adds full name
    const data = snapshot.data();
    var name = data.firstName;
    if (data.lastName !== '') {name += ' ' + data.lastName;}
    profiles.push({...data, uid: profileIds[i], fullName: name});
  }
  return profiles;
};

export const signOut = async () => {
  if (firebase.auth().currentUser !== null)
  {await firebase.auth().signOut();}
  return;
};
