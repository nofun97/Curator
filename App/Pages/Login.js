import React, {Component} from ‘react’;
import {Stylesheet, View, Image, KeyboardAvoidingView} from ‘react-native’;
import Loginform from ‘./LoginForm’;

export default class Login extends Component{
	render(){
		return(
			<KeyboardAvoidingView behavior=”padding” style={styles.container}>
				<View style= {styles.logoContainer}>
					<Image
						style={styles.logo}
						source ={require['../../images/Something.png']}/>
					<Text	style={styles.title}>
						Curator
					</Text>
				</View>
				<View style={styles.formContainer}>
					<Loginform/>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	Container:{
		flex:1,
		backgroundColor: “blue”
	},
	logoContainer:{
		alignItemsL:‘center’,
		flexGrow: 1,
		justifyContent: ‘center’
	},
	Logo:{
		width:100,
		height:100
	}
	Title:{
		Color: “blue”,
		marginTop: 10,
		width: 160,
		textAlign: ‘center’,
		opacity: 0.9
	}
});
