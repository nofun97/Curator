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
      logo: require('../Assets/Logo/Logo.png'), //the image
    };
    this.onPressHandler = this.onPressHandler.bind(this);
  }

  onPressHandler(){
    this.props.navigation.navigate('ItemDetails', {
      id: this.state.id,
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
            <Text style={styles.textStyle}>Date Owned: {this.state.categories}</Text>
            <Text style={styles.textStyle}>Owners: {this.state.owners}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderTopWidth: 20,
    borderColor: '#264242',
  },
  buttonStyle:{
    flexDirection:'row',
  },
  itemImageContainer:{
  },
  textContainer:{
    marginTop: 5,
    width: '45%',
  },
  itemImage: {

  },
  textStyle: {
    marginLeft: 10,
    color: '#e8e8e8',
  },
});

//place your functions here
//function to move to the individual items page
//function to update Image
//function to update texts
