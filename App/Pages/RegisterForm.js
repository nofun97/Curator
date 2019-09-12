import React, {Component} from 'react';
import {AppRegistry, View, TextInput, Button, StyleSheet} from 'react-native';

export default class RegisterForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      emailInput : "",
      firstName : "",
      lastName : "",
      userName : "",
      password : "",
      reconfirmPass : ""
    }
  }
  render(){
    return(
      <View style = {styles.Container}>
        <TextInput style ={styles.Input}
          placeholder = "Email"
          keyboardType = "email-address"
          autoCorrect = {false}
          onSubmitEditing={(input)=>this.setState({emailInput: input})}
          />
        <TextInput style ={styles.Input}
          placeholder = "First Name"
          autoCorrect = {false}
          onChangeText={(input)=>this.setState({firstName: input})}
          />
        <TextInput style ={styles.Input}
          placeholder = "Last Name"
          autoCorrect = {false}
          onChangeText = {(input)=>this.setState({lastName: input})}
          />
        <TextInput style = {styles.Input}
          placeholder = "Username"
          autoCorrect = {false}
          onChangeText={(input)=>this.setState({username: input})}
          />
        <TextInput style ={styles.Input}
          placeholder = "Password"
          secureTextEntry= {true}
          autoCorrect = {false}
          onChangeText={(input)=>this.setState({password: input})}
          />
        <TextInput style = {styles.Input}
          placeholder = "Reconfirm Password"
          secureTextEntry = {true}
          autoCorrect = {false}
          onChangeText={(input)=>this.setState({reconfirmPass: input})}
          />
        <Button style = {styles.button}
          title = "submit"/>
      </View>
    )
  }
}

const styles= Stylesheet.create({
  Container : {
    padding : 10
  },

  Input : {
    Height : 1,
    Backgroundcolor : "white",
    marginBottom : 10,
    Color : "blue",
    paddingHorizontal : 10,
  },

  button:{
    Height : 1,
    backgroundColor : "blue",
    Weight : 4,
  }
})
