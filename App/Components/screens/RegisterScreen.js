import React, { useState, useEffect } from 'react';
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

const AdditionalDetails = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [warning, setWarning] = useState('');

  useEffect(() => {
    console.log(props.user);
  });

  const onSubmit = () => {
    if (firstName === '') {
      setWarning('First Name is required');
      return;
    }
    var user = {
      firstName: firstName,
      lastName: lastName,
      user: props.user,
    };

    uploadProfile(user)
      .then(() => props.navigation.push('Inventory'))
      .catch(err => setWarning(err));
  };
  return (
    <ScreenBox>
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
        <ButtonStyle title={'Submit'} onPress={() => onSubmit()} />
      </ViewStyle>
      <WarningComponent warning={warning} top="90" />
    </ScreenBox>
  );
};

const RegisterScreen = props => {
  const additionalDetails = AdditionalDetails(props);
  const [warning, setWarning] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toggleForm, setToggleForm] = useState(true);

  const onRegister = () => {
    if (password.length < 8) {
      setWarning('Password must be at least 8 characters');
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

    signUp(email, password)
      .then(credential => {
        loggedIn(credential);
        setToggleForm(false);
      })
      .catch(err => setWarning(err));
  };

  if (toggleForm) {
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
        <ViewStyle top="80" left="0">
          <ButtonStyle title={'Register'} onPress={() => onRegister()} />
        </ViewStyle>
        <WarningComponent warning={warning} top="90" />
      </ScreenBox>
    );
  }
  return additionalDetails;
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

connect(
  state => {
    const { user } = state;
    return { user: user };
  },
  null
)(AdditionalDetails);

export default connect(
  null,
  { loggedIn }
)(RegisterScreen);
