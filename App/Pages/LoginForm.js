import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar} from 'react-native';

export default class Loginform extends Component{
	render(){
		return(
			<View style = {styles.Container}>
				<StatusBar barStyle= "light-content"/>
				<TextInput
					placeholder = "username"
					returnKeyType = "next"
					onSubmitEditing ={()=>this.passwordInput.focus()}
					autoCapitalize ="none"
					autoCorrect = {false}
					style = {styles.Input}
					/>
				<TextInput
					placeholder= "password"
					secureTextEntry= {true}
					returnKeyType= "Go"
					style={styles.Input}
					ref={(input)=>this.passwordInput = input}
					/>
				<TouchableOpacity style={styles.buttonContainer}>
					<Text style={styles.button}> Login </Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	Container:{
	padding:20
	},
	Input:{
		Height: 40,
		Backgroundcolor: "red",
		marginBottom:20,
		Color:"white",
		paddingHorizontal: 10,
	},
	buttonContainer:{
		backgroundColor: "blue",
		paddingVertical:10,
	},
	buttonText:{
		textAlign:"center",
		Color:"white",
		Fontweight: 700,
	}
});
