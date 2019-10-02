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
      <View>
        <Text style = {styles.textStyle}>Username: </Text>
        <TextInput
          style = {styles.inputTextStyles}
          autoCorrect = {false}
          onChangeText = {(input)=>this.setState({userName : input})}
          />
        <Text style = {styles.textStyle}>Password: </Text>
        <TextInput
          style = {styles.inputTextStyles}
          autoCorrect = {false}
          secureTextEntry= {true}
          onChangeText = {(input)=>this.setState({password : input})}
          />
        <TouchableOpacity
          title = "Login"
          style = {styles.loginButtonStyle}
          onPress = {()=>{this.props.navigation.navigate('Inventory')}}
        />
        <Text style = {styles.registerTextStyle}> Don't have an account? </Text>
        <TouchableOpacity
          title = "Register Now"
          style = {styles.registerButtonStyle}
          onPress = {()=>{this.props.navigation.navigate('Register')}}
        />
      </View>
    )
  }
}

const styles= StyleSheet.create({
    inputTextStyles:{
    marginBottom: 10,
    color: '#d4d4d4',
    borderColor: 'gray',
    alignItems : 'center',
    borderWidth: 1,
    width: 225,
  },
  textStyle:{
    color: '#89abab',
    fontFamily: 'Montserrat'
  },
  loginButtonStyle: {
      marginTop: 25,
      marginBottom: 40,
      height : 30,
      backgroundColor : "#5f9999",
  },
  registerButtonStyle: {
      marginTop: 10,
      height : 30,
      backgroundColor : "#5f9999",
  },
    registerTextStyle:{
        color: '#596e6c',
        fontFamily: 'Montserrat'
    },
})
