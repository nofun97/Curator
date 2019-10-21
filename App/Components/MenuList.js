import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet,Button} from 'react-native';

export default class MenuList extends Component{
  constructor(props){
    super(props);
    this.state={
      showMenu:this.props.showMenu
    }
  }

  render(){
    if(!this.props.showMenu){
      return (null);
    }
    return(
      <View style={styles.viewStyle}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity=1,
          OnPress={this.props.navigation.navigate("AccountDetails")}
        >
          <Text>Account Details</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  viewStyle:{
  },
  buttonStyle:{

  }
})
