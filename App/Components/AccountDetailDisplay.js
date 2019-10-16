import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

export default class AccountDetailsDisplay extends Component{
  render(){
    return (
      <View style = {styles.Container}>
        <Image style = {styles.ImageIcon}
          source = {require('../Assets/Images/MenuIcon.png')}
        />
        <Text style = {styles.TextBox}>
          My Account
        </Text>
        <Text style = {styles.Username}>
          Username
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    paddingLeft: 1,
    paddingTop: 1,
    height: 1,
    width: 1,
  },
  ImageIcon: {
    height: 1,
    width: 1,
  },
  TextBox: {
    height: 1,
    width: 1,
  },
  Username: {
    height: 1,
    width: 1,
  },
});
