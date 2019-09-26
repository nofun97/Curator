import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { login } from '../../controllers/authentications';
import { loggedIn } from '../../redux/reducers';
import { connect } from 'react-redux';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');

  const onLogin = () => {
    if (email === '' || password === '') {
      setWarning('Email and Password field can not be empty');
      return;
    }

    const nextStep = credential => {
      props.loggedIn(credential.user.uid);
      props.navigation.push('Inventory');
    };

    login(email, password)
      .then(nextStep)
      .catch(err => {
        console.log(err);
        setWarning('Email or Password are incorrect');
      });
  };

  const onRegister = () => {
    props.navigation.push('Register');
  };

  return (
    <ScreenBox>
      <ImageBox>
        <Text> Image goes here </Text>
      </ImageBox>
      <LoginBox>
        {warning !== '' && (
          <WarningStyle top="50" left="0">
            {warning}
          </WarningStyle>
        )}
        <ViewStyle top="305" left="-90">
          <ButtonStyle title={'Register'} onPress={() => onRegister()} />
        </ViewStyle>
        <ViewStyle top="270" left="90">
          <ButtonStyle title={'Login'} onPress={() => onLogin()} />
        </ViewStyle>
        <TextStyle top="80" left="-120">
          Email:
        </TextStyle>
        <TextStyle top="130" left="-120">
          Password:
        </TextStyle>
        <ViewStyle top="25" left="0">
          <TextInput
            style={styles.inputStyle1}
            underlineColorAndroid="transparent"
            placeholder="Put your email here please :)"
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </ViewStyle>
        <ViewStyle top="45" left="0">
          <TextInput
            style={styles.inputStyle1}
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            placeholder="And your password too :)"
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </ViewStyle>
      </LoginBox>
    </ScreenBox>
  );
};

const TextStyle = styled.Text`
  color: white;
  font-family: Montserrat;
  top: ${props => props.top};
  left: ${props => props.left};
`;

const WarningStyle = styled(TextStyle)`
  color: tomato;
`;

const ButtonStyle = styled.Button``;

const ViewStyle = styled.View`
  top: ${props => props.top};
  left: ${props => props.left};
`;

const styles = StyleSheet.create({
  inputStyle1: {
    color: '#d4d4d4',
    borderColor: 'gray',
    borderWidth: 1,
  },
});

const ScreenBox = styled.View`
  flex: 1;
`;

const ImageBox = styled.View`
  flex: 0.35;
  background-color: #f0f0f0;
`;

const LoginBox = styled.View`
	flex: 0.65;
	background-color: #333333;
	borderColor = black;
	alignItems: center
`;

export default connect(
  null,
  { loggedIn }
)(LoginScreen);
