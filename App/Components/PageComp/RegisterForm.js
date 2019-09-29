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
      <View>
        <TextInput style ={styles.StartInputStyle}
                   placeholderTextColor = "#89abab"
                   placeholder = "Email"
                   keyboardType = "email-address"
                   autoCorrect = {false}
                   onSubmitEditing={(input)=>this.setState({emailInput: input})}
        />
        <TextInput style ={styles.InputStyle}
                   placeholderTextColor = "#89abab"
                   placeholder = "First Name"
                   autoCorrect = {false}
                   onChangeText={(input)=>this.setState({firstName: input})}
        />
        <TextInput style ={styles.InputStyle}
                   placeholderTextColor = "#89abab"
                   placeholder = "Last Name"
                   autoCorrect = {false}
                   onChangeText = {(input)=>this.setState({lastName: input})}
        />
        <TextInput style = {styles.InputStyle}
                   placeholderTextColor = "#89abab"
                   placeholder = "Username"
                   autoCorrect = {false}
                   onChangeText={(input)=>this.setState({username: input})}
        />
        <TextInput style ={styles.InputStyle}
                   placeholderTextColor = "#89abab"
                   placeholder = "Password"
                   secureTextEntry= {true}
                   autoCorrect = {false}
                   onChangeText={(input)=>this.setState({password: input})}
        />
        <TextInput style = {styles.InputStyle}
                   placeholderTextColor = "#89abab"
                   placeholder = "Reconfirm Password"
                   secureTextEntry = {true}
                   autoCorrect = {false}
                   onChangeText={(input)=>this.setState({reconfirmPass: input})}
        />
        <TouchableOpacity style = {styles.ButtonStyle}
          title = "submit"/>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  StartInputStyle : {
    height : 50,
    marginTop : 30,
    paddingHorizontal : 10,
    color: "#c8dede",
    borderColor: 'gray',
    borderWidth: 1,
  },
  InputStyle : {
    height : 50,
    marginTop : 20,
    paddingHorizontal : 10,
    color: "#c8dede",
    borderColor: 'gray',
    borderWidth: 1,
  },
  ButtonStyle : {
    height : 35,
    marginTop: 80,
    backgroundColor : "#537f80",
  }
});
