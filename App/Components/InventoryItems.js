import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

export default class InventoryItems extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      owners: '', // user ids
      name: '',
      description: '',
      dateRegistered: '', // milliseconds since unix epoch
      dateOwned: '', // milliseconds since unix epoch
      categories: '', // categories name
      thumbnail: '',
    }
    this.onPressHandler = this.onPressHandler.bind(this);
  }

  onPressHandler(){
    this.props.navigation.navigate('Inventory');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonsTyle} onPress={this.onPressHandler}>
          <Image style={styles.itemImage} source={require['../../someplace']} />
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Item ID: ${this.state.id}</Text>
            <Text style={styles.textStyle}>Name: ${this.state.name}</Text>
            <Text style={styles.textStyle}>DateOwned: ${this.state.categories}</Text>
            <Text style={styles.textStyle}>Item Description: ${this.state.description}</Text>
            <Text style={styles.textStyle}>Owners: ${this.state.owners}</Text>
            <Text style={styles.textStyle}>Item ID: ${this.state.categories}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textContainer:{
  },
  itemImage: {},
  textStyle: {},
});

//place your functions here
//function to move to the individual items page
//function to update Image
//function to update texts
