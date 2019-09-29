import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, Button} from 'react-native';
//import styled from 'styled-components/native';

export default class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      userName : "",
      password : "",
    }
  }
  render(){
    return(
      <View style = {styles.Container}>
        <Text style = {styles.textStyle}>Username</Text>
        <TextInput
          style = {styles.inputTextStyles}
          onChangeText = {(input)=>this.setState({userName : input})}
          />
        <Text style = {styles.textStyle}>Password</Text>
        <TextInput
          style = {styles.inputTextStyles}
          onChangeText = {(input)=>this.setState({password : input})}
          />
        <Button
          title = "Login"
          style = {styles.buttonStyle}
//          onPress = {()=>{this.props.navigate('Inventory')}}
        />
        <Button
          title = "Register"
          style = {styles.buttonStyle}
          onPress = {()=>{this.props.navigation.navigate('Register')}}
        />
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container:{
    flex: 0.65,
    alignItems : 'center',
  	backgroundColor : '#333333',
  	borderColor : 'black',
  	alignItems: 'center'
  },
  inputTextStyles:{
    color: '#d4d4d4',
    borderColor: 'gray',
    alignItems : 'center',
    borderWidth: 1,
    width: 225,
    paddingBottom: 10,
  },
  textStyle:{
    color: 'white',
    fontFamily: 'Montserrat'
},
  buttonStyle: {
    paddingBottom : 10,
  }
})
