import React, {Component} from 'react';
import {View, Text, DatePicker, StyleSheet, TouchableOpacity} from 'react-native';

var dateReg = "";//get date
var dateOwn = "";//date

export default class ItemDetailsForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      owners: this.props.item.owners, // user ids
      name: this.props.item.name,
      description: this.props.item.description,
      dateRegistered: this.props.item.dateRegistered, // milliseconds since unix epoch
      dateOwned: this.props.item.dateOwned, // milliseconds since unix epoch
      categories: this.props.item.categories,
    }
    this.onItemSavePress = this.onItemSavePress.bind(this);
  }

  onItemSavePress = () => {
    this.props.navigation.navigate('Inventory');
  };

  render(){
    return(
      <View style= {styles.viewStyle}>
        <Text style = {styles.textStyle}>
          Details
        </Text>
        <Text style = {styles.textStyle}>
          Name: {this.state.name}
        </Text>
        <Text style = {styles.textStyle}>
          Owner: {this.state.owners}
        </Text>
        <Text style = {styles.textStyle}>
          Description: {this.state.description}
        </Text>
        <Text style = {styles.textStyle}>
          Date Registered: {this.state.dateRegistered}
        </Text>
        <Text style = {styles.textStyle}>
          Date Owned: {this.state.dateOwned}
        </Text>
        <Text style = {styles.textStyle}>
          Categories: {this.state.categories}
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.onItemSavePress}>
          <Text> Save </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.onItemSavePress}>
          <Text> Cancel </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {

  },
  textStyle: {

  },
  buttonStyle: {

  }
})
