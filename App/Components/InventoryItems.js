import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

export default class InventoryItems extends Component {
  constructor(props){
    super(props);
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
          <Text style={styles.textStyle}>input some text here</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  itemImage: {},
  textStyle: {},
});

//place your functions here
//function to move to the individual items page
//function to update Image
//function to update texts
