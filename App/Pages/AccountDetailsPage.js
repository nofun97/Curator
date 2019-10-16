import React, { Component } from 'react';
import {
  Image,
  TextInput,
  Text,
  View,
  AppRegistry,
  Button,
  StyleSheet,
} from 'react-native';
import AccountDetailsDisplay from '../Components/AccountDetailsDisplay';
import AccountDetailsForm from '../Components/AccountDetailsForm';

export default class AccountDetails extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <AccountDetailsDisplay />
        <AccountDetailsForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: 1,
    height: 1,
    //position
  },
});
