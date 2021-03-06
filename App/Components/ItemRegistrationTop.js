import React, {Component} from 'react';
import {View} from 'react-native';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class ItemDescriptionTop extends Component{
  constructor(props){
    super(props);
    this.state = {
      addImageIcon : require('../Assets/Logo/Logo.png'),
    };
  }
  render(){
    return (
      <View>
        <TouchableOpacity style = {styles.buttonContainer}>
          <Image style = {styles.textStyle} source={this.state.addImageIcon}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer : {
    alignItems : 'center',
  },
});
