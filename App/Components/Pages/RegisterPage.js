import React,{Component} from 'react';
import {StyleSheet, AppRegistry, View, Button, Image,Text, KeyboardAvoidingView} from 'react-native';
import RegisterForm from '../PageComp/RegisterForm';

export default class RegisterPage extends Component{
  render(){
    return(
		  <View style={styles.ViewStyle}>
			  <Text style={styles.TextStyle}>
			 	 Enter your information below:
		  	  </Text>
			  <RegisterForm/>
		  </View>
    )
  }
}

const styles = StyleSheet.create({
	TextStyle: {
		color : "#c8dede"
	},
	ViewStyle: {
		flex : 1,
		backgroundColor : '#264242'
	}
});
