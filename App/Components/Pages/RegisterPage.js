import React,{Component} from 'react';
import {StyleSheet, AppRegistry, View, Button, KeyboardAvoidingView} from 'react-native';
import RegisterForm from '../PageComp/RegisterForm';

export default class RegisterPage extends Component{
  render(){
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style= {styles.logoContainer}>
					<Image
						style={styles.logo}
						source ={require['../Assets/Logo/Logo.png']}/>
					<Text	style={styles.title}>
						Curator
					</Text>
				</View>
				<View style={styles.formContainer}>
					<RegistryForm/>
				</View>
			</KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
	Container : {
		flex : 1 ,
		backgroundColor : '#5f9ea0'
	},
	logoContainer : {
		alignItems : 'center',
		flexGrow : 1 ,
		justifyContent : 'center'
	},
	Logo : {
		width : 100,
		height : 100
	},
	Title : {
		color : '#5f9ea0',
		marginTop : 10,
		width : 160,
		textAlign : 'center',
		opacity : 0.9
	}
});
