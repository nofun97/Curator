import React, {Component} from 'react';
import {AppRegistry, View, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';

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
      <View style>
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
        <TouchableOpacity style = {styles.button}
          title = "submit"/>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  Container : {
    padding : 10
  },

  Input : {
    height : 30,
    backgroundColor : "#ffffff",
    marginBottom : 10,
    color : "#5f9ea0",
    paddingHorizontal : 10,
  },

  button:{
    height : 30,
    backgroundColor : "#5f9ea0",
  }
})
