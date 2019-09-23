import React, {Component} from "react";
import {StyleSheet, View, Image, KeyboardAvoidingView,Text} from "react-native";
import LoginForm from "../PageComp/LoginForm";

export default class Login extends Component{
	render(){
		return(
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style= {styles.LogoContainer}>
					<Image
						style={styles.Logo}
						source ={require['../Assets/Logo/Logo.png']}/>
					<Text	style={styles.Title}>
						Curator
					</Text>
				</View>
				<View style={styles.FormContainer}>
					<LoginForm/>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	Container : {
		flex : 1,
		backgroundColor : "#5f9ea0"
	},
	LogoContainer : {
		alignItems : "center",
		justifyContent: "center"
	},
	Logo : {
		height : 100,
	},
	Title : {
		color : "#5f9ea0",
		marginTop : 10,
		textAlign : "center",
		fontSize : 40,
		opacity : 0.9,
		paddingBottom : 15
	},
	FormContainer : {
		margin : 5,
		alignSelf : "stretch",
		justifyContent : "center",
		backgroundColor : "#2f4f4f"
	},
});
