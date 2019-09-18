import firebase from 'react-native-firebase';

export const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signUp = (email, password) => {
  return firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);
};
