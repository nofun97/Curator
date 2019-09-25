import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { signUp, uploadProfile } from '../../controllers/authentications';
import styled from 'styled-components/native';
import {
  TextStyle,
  ViewStyle,
  ButtonStyle,
} from '../../Styles/StyledComponents';
import { loggedIn } from '../../redux/reducers';
import { connect } from 'react-redux';

const WarningComponent = ({ warning, top, left }) => {
  return (
    <ViewStyle top={top} left={left}>
      {warning !== '' && <TextStyle>{warning}</TextStyle>}
    </ViewStyle>
  );
};

const RegisterScreen = props => {
  const [warning, setWarning] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onRegister = () => {
    if (password.length < 5) {
      setWarning('Password must be at least 5 characters');
      return;
    }
    if (password !== confirmPassword) {
      setWarning('Confirm Password is not correct');
      return;
    }

    if (password === '' || email === '') {
      setWarning('Password and Email must be filled');
      return;
    }

    if (firstName === '') {
      setWarning('First Name is required');
      return;
    }

    var signUpPromise = signUp(email, password);
    var profilePromise = signUpPromise.then(credentials => {
      console.log(credentials);
      return uploadProfile({
        firstName: firstName,
        lastName: lastName,
        id: credentials.user.uid,
      });
    });

    const nextAction = data => {
      props.loggedIn(data.user);
      props.navigation.navigate('Inventory');
    };

    Promise.all([signUpPromise, profilePromise])
      .then(data => nextAction(data))
      .catch(err => console.log(err));
  };

  return (
    <ScreenBox>
      <TextStyle top="15">Email Address:</TextStyle>
      <ViewStyle top="15" left="0">
        <TextInput
          style={styles.inputStyle1}
          underlineColorAndroid="transparent"
          onChangeText={text => setEmail(text)}
          value={email}
        />
      </ViewStyle>
      <TextStyle top="15">Password:</TextStyle>
      <ViewStyle top="15" left="0">
        <TextInput
          style={styles.inputStyle1}
          underlineColorAndroid="transparent"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </ViewStyle>
      <TextStyle top="15">Confirm Password:</TextStyle>
      <ViewStyle top="15" left="0">
        <TextInput
          style={styles.inputStyle1}
          underlineColorAndroid="transparent"
          secureTextEntry={true}
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
        />
      </ViewStyle>
      <TextStyle top="15">First Name:</TextStyle>
      <ViewStyle top="15" left="0">
        <TextInput
          style={styles.inputStyle1}
          underlineColorAndroid="transparent"
          onChangeText={text => setFirstName(text)}
          value={firstName}
        />
      </ViewStyle>
      <TextStyle top="15">Last Name:</TextStyle>
      <ViewStyle top="15" left="0">
        <TextInput
          style={styles.inputStyle1}
          underlineColorAndroid="transparent"
          onChangeText={text => setLastName(text)}
          value={lastName}
        />
      </ViewStyle>
      <ViewStyle top="80" left="0">
        <ButtonStyle title={'Register'} onPress={() => onRegister()} />
      </ViewStyle>

      <WarningComponent warning={warning} top="90" />
    </ScreenBox>
  );
};

const ScreenBox = styled.View`
  flex: 1;
  background-color: #333333;
`;

const styles = StyleSheet.create({
  inputStyle1: {
    color: '#d4d4d4',
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default connect(
  state => {
    const { user } = state;
    return { user: user };
  },
  { loggedIn }
)(RegisterScreen);
