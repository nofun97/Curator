import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar} from 'react-native';

export default class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      userName : "",
      password : "",
    }
  }
  // isValid(){
  //   const {email, password} = this.state;
  //   let valid = false;
  //
  //   if (email.length  "" && password.length === ""){
  //     valid = true;
  //   }
  //   return valid;
  // }
  // onSignIn(){
  //   const {username, password} = this.state;
  //   if(this.state.username === "" && this.state.password === ""){
  //
  //   }
  // }
  render(){
    const {navigate} = this.props.navigation;
    return(
      <View style = {styles.Container}>
        <StatusBar barSTyle = "light-content"/>
        <TextInput
          placeholder = "Username"
          returnKeyType = "next"
          onChangeText = {(text)=>this.setState({username : text})}
          autoCorrect = {false}
          style = {styles.Input}
        />
        <TextInput
          placeholder = "Password"
          secureTextEntry = {true}
          returnKeyType = "next"
          style = {styles.Input}
          onSubmitEditing = {(text)=>this.setState({password : text})}
        />
        <TouchableOpacity style={styles.ButtonContainer}>
          <Text style = {styles.ButtonText}>
          Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ButtonContainer}
          onPress={() => navigation.navigate("RegisterPage")}>
          <Text style = {styles.ButtonText}>
          Register
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Container : {
  },
  Input : {
    height : 40,

    backgroundColor : "#5f9ea0",
    margin : 5,
    color : "#ffffff",
  },
  ButtonContainer : {
    height : 40,
    backgroundColor : "#5f9ea0",
    margin : 5,
  },
  ButtonText : {
    textAlign : "center",
    color : "#ffffff",
    fontWeight : "700",
  }
})
