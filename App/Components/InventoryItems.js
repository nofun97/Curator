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
      dateOwned: new Date(this.props.item.dateOwned), // milliseconds since unix epoch
      categories: this.props.item.categories, // categories name
      thumbnail: this.props.item.thumbnail,
      logo: require('../Assets/Logo/Logo.png'), //the image
    };
    this.onPressHandler = this.onPressHandler.bind(this);
    console.log(this.props.item.thumbnail)
  }

  onPressHandler(){
    this.props.navigation.navigate('ItemDetails', {
      id: this.state.id,
      navigation: this.props.navigation
    });
  }

  render() {
    const dateOwned = `${this.state.dateOwned.getDate()}/${this.state.dateOwned.getMonth() + 1}/${this.state.dateOwned.getFullYear()}`
    const image = (this.state.thumbnail === '') ? this.state.logo : {uri: this.state.thumbnail};

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonStyle} onPress={this.onPressHandler}>
          <View style = {styles.itemImageContainer}>
            <Image style={styles.itemImage} source={image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Name: {this.state.name}</Text>
            <Text style={styles.textStyle}>Date Owned: {dateOwned}</Text>
            <Text style={styles.textStyle}>Item Description: {this.state.description}</Text>
            <Text style={styles.textStyle}>Categories: {this.state.categories.join(', ')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

// TODO: make image size more responsive, images only appear when size is defined
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderWidth: 10,
    borderColor: '#264242',
  },
  buttonStyle:{
    flexDirection:'row',
  },
  itemImageContainer:{
    flex: 2,
    height: 200,
    width: 200,
  },
  textContainer:{
    flex: 2,
    marginTop: 5,
    width: '40%',
  },
  itemImage: {
    flex: 1
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
