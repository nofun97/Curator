import React, {Component} from 'react';
import {View, Text, DatePicker, StyleSheet} from 'react-native';

export default class ItemDetailsForm extends Component{
  var dateReg = "";//get date
  var dateOwn = "";//date
  constructor(props){
    super(props);
    this.state = {
      owners: "", // user ids
      name: "",
      description: "",
      dateRegistered: dateReg, // milliseconds since unix epoch
      dateOwned: dateOwn, // milliseconds since unix epoch
      categories: "",
    }
  }
  render(){
    return(
      <View style= {styles.viewStyle}>
        <Text style = {styles.textStyle}>
          Details
        </Text>
        <Text style = {styles.textStyle}>
          Name: {this.props.name}
        </Text>
        <Text style = {styles.textStyle}>
          Owner: {this.props.owners}
        </Text>
        <Text style = {styles.textStyle}>
          Description: {this.props.description}
        </Text>
        <Text style = {styles.textStyle}>
          Date Registered: {this.props.dateRegistered}
        </Text>
        <Text style = {styles.textStyle}>
          Date Owned: {this.props.dateOwned}
        </Text>
        <Text style = {styles.textStyle}>
          Categories: {this.props.categories}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {

  },
  textStyle: {

  }
})
