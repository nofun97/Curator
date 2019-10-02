import React,{Component} from 'react';
import {StyleSheet, AppRegistry, View, Button, Image,Text, KeyboardAvoidingView} from 'react-native';
import RegisterForm from '../PageComp/RegisterForm';

export default class RegisterPage extends Component{
  render(){
    return(
		  <View style={styles.ViewStyle}>
			  <RegisterForm/>
		  </View>
    )
  }
}

const styles = StyleSheet.create({
	ViewStyle: {
		flex : 1,
		backgroundColor : '#264242'
	}
});
