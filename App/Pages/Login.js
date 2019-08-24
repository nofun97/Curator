import React, { useState, useEffect } from 'react';
import firebase from 'react-native-firebase';
import { View, TextInput, Text, Button } from 'react-native';

const Login = () => {
  const [status, setStatus] = useState('Not Logged In');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const onLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(credentials => {
        setUser(credentials);
        setStatus('Logged In!');
      })
      .catch(err => {
        setError(err);
        setStatus("There's an error my dude");
      });
  };
  const [email, setEmail] = useState('username');
  const [password, setPassword] = useState('password');

  useEffect(() => {
    console.log('User', user);
    console.log('Error', error);
  });

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button
        onPress={async () => await onLogin(email, password)}
        title="Login"
        color="#841584"
        accessibilityLabel="Login"
      />
      <Text>{status}</Text>
    </View>
  );
};

export default Login;
