import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import RegisterForm from '../Components/RegisterForm';

export default class RegisterPage extends Component {
  render() {
    return (
      <View style={styles.ViewStyle}>
        <RegisterForm navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextStyle: {
    color: '#c8dede',
    marginTop: 20,
  },
  ViewStyle: {
    flex: 1,
    backgroundColor: '#264242',
  },
});
