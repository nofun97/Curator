import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import ItemRegistrationForm from '../Components/ItemRegistrationForm';
import ItemRegistrationTop from '../Components/ItemRegistrationTop';

export default class ItemRegistrationPage extends Component{
  render(){
    return (
      <View style= {styles.viewContainer}>
        <ItemRegistrationForm
          style = {styles.itemRegistrationFormStyle}
          navigation = {this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer:{
    flex: 1,
  },
  ItemRegistrationForm:{

  },
})
