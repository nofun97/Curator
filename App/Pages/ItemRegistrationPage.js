import React, {Component} from 'react';
import {StyleSheet, KeyboardAvoidingView} from 'react-native';
import ItemRegistrationForm from '../Components/ItemRegistrationForm';

export default class ItemRegistrationPage extends Component{
  render(){
    return (
      <KeyboardAvoidingView enabled style= {styles.viewContainer}>
        <ItemRegistrationForm
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
    flex: 1,
  },
});
