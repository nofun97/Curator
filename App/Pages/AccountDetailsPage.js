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
import AccountDetailsDisplay from '../Components/AccountDetailDisplay';
import AccountDetailsForm from '../Components/AccountDetailsForm';

export default class AccountDetails extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <AccountDetailsDisplay />
        <AccountDetailsForm navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#264242',
    //position
  },
});
