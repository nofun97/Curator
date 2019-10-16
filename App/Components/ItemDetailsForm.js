import React, {Component} from 'react';
import {View, Text, DatePicker, StyleSheet, TouchableOpacity} from 'react-native';

export default class ItemDetailsForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.item.id,
      owners: this.props.item.owners, // user ids
      name: this.props.item.name,
      description: this.props.item.description,
      dateRegistered: this.props.item.dateRegistered, // milliseconds since unix epoch
      dateOwned: this.props.item.dateOwned, // milliseconds since unix epoch
      categories: this.props.item.categories,
    };
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
