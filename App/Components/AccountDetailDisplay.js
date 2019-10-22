import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

export default class AccountDetailsDisplay extends Component{
  render(){
    return (
      <View style = {styles.Container}>
        <Image style = {styles.ImageIcon}
               source = {require('../Assets/Images/UserIcon.png')}
        />
        <Text style = {styles.accountTextStyle}>
          Edit Account
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    paddingLeft: '5%',
    paddingTop: '5%',
    height: '15%',
    width: '100%',
    backgroundColor: '#264242',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2.5,
    borderColor: '#5f9999',
  },
  ImageIcon: {
    flex: 1,
    marginRight: '80%',
    resizeMode: 'contain',
  },
  accountTextStyle: {
    color: '#d4d4d4',
    position: 'absolute',
    fontSize: 25,
    fontWeight: 'bold',
    },
});
