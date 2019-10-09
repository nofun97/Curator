import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import LoginForm from '../Components/LoginForm';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: require('../Assets/Logo/Logo.png'),
    };
  }
  render() {
    return (
      <View style={styles.ScreensBox}>
        <View style={styles.LogoContainer}>
          <Image style={styles.LogoStyle} source={this.state.logo} />
          {/* <Text style={styles.TitleStyle}>Curator</Text> */}
        </View>
        <View style={styles.FormContainer}>
          <LoginForm navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ScreensBox: {
    flex: 1,
  },
  LogoContainer: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LogoStyle: {
    height: 100,
  },
  TitleStyle: {
    color: '#1d2e2e',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 40,
    opacity: 0.9,
    paddingBottom: 15,
  },
  FormContainer: {
    flex: 0.65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#264242',
  },
});