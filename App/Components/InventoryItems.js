import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

export default class InventoryItems extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.item.id,
      owners: this.props.item.owners, // user ids
      name: this.props.item.name,
      description: this.props.item.description,
      dateRegistered: this.props.item.dateRegistered, // milliseconds since unix epoch
      dateOwned: this.props.item.dateOwned, // milliseconds since unix epoch
      categories: this.props.item.categories, // categories name
      thumbnail: this.props.item.thumbnail,
      logo: require('../Assets/Logo/Logo.png') //the image
    }
    this.onPressHandler = this.onPressHandler.bind(this);
  }

  onPressHandler(){
    this.props.navigation.navigate('ItemDetails', {
      owners:  this.state.owners,// user ids
      name: this.state.name,
      description: this.state.description,
      dateRegistered: this.state.dateRegistered, // milliseconds since unix epoch
      dateOwned: this.state.dateOwned, // milliseconds since unix epoch
      categories: this.state.categories, // categories name
      thumbnail: this.state.thumbnail,
      logo: this.state.logo
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonStyle} onPress={this.onPressHandler}>
          <View style = {styles.itemImageContainer}>
            <Image style={styles.itemImage} source={this.state.logo} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Item ID: {this.state.id}</Text>
            <Text style={styles.textStyle}>Name: {this.state.name}</Text>
            <Text style={styles.textStyle}>DateOwned: {this.state.categories}</Text>
            <Text style={styles.textStyle}>Item Description: {this.state.description}</Text>
            <Text style={styles.textStyle}>Owners: {this.state.owners}</Text>
            <Text style={styles.textStyle}>Item ID: {this.state.categories}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  buttonStyle:{
    flexDirection:'row',
  },
  itemImageContainer:{
  },
  textContainer:{
  },
  itemImage: {

  },
  textStyle: {

  },
});

//place your functions here
//function to move to the individual items page
//function to update Image
//function to update texts
