import firebase from 'react-native-firebase';

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
