import React, {Component} from 'react';
import {View} from 'react-native';
import {StyleSheet,
        Image,
        TouchableOpacity} from 'react-native';

export default class ItemDescriptionTop entends Component{
  constructor(props){
    super(props);
    this.state = {
      addImageIcon : require (../Assets/Image/AddImageIcon);
    }
  }
  render(){
    return(
      <View style = styles.viewContainer>
        <TouchableOpacity style = styles.buttonContainer>
          <Image style = styles.textStyle source = this.state.addImageIcon/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer : {

  },
  buttonContainer : {
    alignItems : "center";
  },
  textStye : {

  }
})
