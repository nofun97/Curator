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
  }

  onPressHandler(){
    this.props.navigation.navigate('ItemDetails', {
      id: this.state.id,
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
            <Text style={styles.textStyle}>Item ID: {this.state.id}</Text>
            <Text style={styles.textStyle}>Name: {this.state.name}</Text>
            <Text style={styles.textStyle}>Date Owned: {dateOwned}</Text>
            <Text style={styles.textStyle}>Item Description: {this.state.description}</Text>
            {/*TODO: <Text style={styles.textStyle}>Owners: {this.state.owners}</Text> maybe not show this because fetching user names take time*/}
            <Text style={styles.textStyle}>Categories: {this.state.categories}</Text>
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
    borderTopWidth: 20,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderColor: '#264242',
  },
  buttonStyle:{
    flexDirection:'row',
  },
  itemImageContainer:{
    flex: 2
  },
  textContainer:{
    flex: 2,
    marginTop: 5,
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
