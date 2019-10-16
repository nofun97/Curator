import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class MenuList extends Component{
  constructor(props){
    super(props);
    this.AccountDetailPress= this.AccountDetailPress.bind(this);
  }

  AccountDetailPress=()=>{
    this.props.navigation.navigate("AccountDetails");
  }

  render(){
    return(
      <View style={styles.viewStyle}>
        <TouchableOpacity
          style={styles.buttonStyle}
          OnPress={this.AccountDetailPress}
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
