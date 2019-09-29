import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';

export default class InventoryItems extends Component {
  render(){
    return(
      <View style= {styles.container}>
        <TouchableOpacity
          style = {styles.buttonsTyle}
          onPress = {()=>navigate}>
          <Image
            style={styles.itemImage}
            source ={require['../../someplace']}/>
          <Text style={styles.textStyle}>input some text here
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container : {
    flexDirection : 'row'
  },
  itemImage : {

  },
  textStyle : {

  }
})

//place your functions here
//function to move to the individual items page
//function to update Image
//function to update texts
