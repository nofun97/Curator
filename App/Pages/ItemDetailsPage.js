import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import ItemDetailsForm from '../Components/ItemDetailsForm';

export default class ItemDetailsPage extends Component {
  render(){
    return(
      <View style = {styles.viewContainer}>
        <ItemDetailsForm style = {styles.itemDetailsForm}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer:{

  },
  itemDetailsForm:{
    
  }
})
