import React, {Component} from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import ItemRegistrationForm from '../Components/ItemRegistrationForm';
import ItemRegistrationTop from '../Components/ItemRegistrationTop';

export default class ItemRegistrationPage extends Component{
  render(){
    return (
      <KeyboardAvoidingView enabled style= {styles.viewContainer}>
        <ItemRegistrationForm
          style = {styles.itemRegistrationFormStyle}
          navigation = {this.props.navigation}/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer:{
    flex: 1,
  },
  ItemRegistrationForm:{
    flex: 1
  },
})
