import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
//import styled from 'styled-components/native';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
    this.onLoginPress = this.onLoginPress.bind(this);
    this.onRegisterPress = this.onRegisterPress.bind(this);
  }

  onLoginPress = () => {
    this.props.navigation.navigate('Inventory');
  };

  onRegisterPress = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    return (
      <View>
        <Text style={styles.textStyle}>Username: </Text>
        <TextInput
          style={styles.inputTextStyles}
          autoCorrect={false}
          onChangeText={input => this.setState({ userName: input })}
          value={this.state.userName}
        />
        <Text style={styles.textStyle}>Password: </Text>
        <TextInput
          style={styles.inputTextStyles}
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={input => this.setState({ password: input })}
          value={this.state.password}
        />
        <TouchableOpacity
          style={styles.loginButtonStyle}
          onPress={this.onLoginPress}
        >
          <Text style={styles.buttonTextStyle}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.registerTextStyle}> Don't have an account? </Text>
        <TouchableOpacity
          title="Register Now"
          style={styles.registerButtonStyle}
          onPress={this.onRegisterPress}
        >
          <Text style={styles.buttonTextStyle}>Register Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputTextStyles: {
    marginBottom: 10,
    color: '#d4d4d4',
    borderColor: 'gray',
    alignItems: 'center',
    borderWidth: 1,
    width: 225,
  },
  textStyle: {
    color: '#89abab',
    fontFamily: 'Montserrat',
  },
  buttonTextStyle: {
    color: '#ffffff',
    fontFamily: 'Montserrat',
  },
  loginButtonStyle: {
    marginTop: 30,
    marginBottom: 35,
    height: 50,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonStyle: {
    marginTop: 10,
    height: 50,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerTextStyle: {
    color: '#596e6c',
    fontFamily: 'Montserrat',
  },
});
