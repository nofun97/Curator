import React,{Component} from 'react';
import {StyleSheet, AppRegistry, View, Button, Image,Text, KeyboardAvoidingView} from 'react-native';
import RegisterForm from '../PageComp/RegisterForm';

export default class RegisterPage extends Component{
  render(){
    return(
		  <View style={styles.ViewStyle}>
			  <Text style={styles.Title}>
			 	 Enter your information below
		  	  </Text>
			  <RegisterForm/>
		  </View>
    )
  }
}

const styles = StyleSheet.create({
	ViewStyle: {
<<<<<<< HEAD
		flex : 1,
		backgroundColor : '#264242'
	}
=======
		flex : 1 ,
		backgroundColor : '#233838',
	},
	Title: {
		fontSize: 24,
		color: 'white',
		marginTop: 10,
		marginLeft: 10,
		fontFamily: 'proxima_nova_semibold',
	},
>>>>>>> f7b2a35b913fed7c2c8e17eae0a26e3f1035e2cf
});
