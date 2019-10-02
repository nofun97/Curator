import React, {Component} from "react";
import {StyleSheet, View, Image, KeyboardAvoidingView,Text} from "react-native";
import LoginForm from "../PageComp/LoginForm";

export default class Login extends Component{
	render(){
		return(
			<View style={styles.ScreensBox}>
				<View style={styles.LogoContainer}>
					<Image
						style={styles.LogoStyle}
						source ={require['../../Assets/Logo/Logo.png']}/>
					<Text style={styles.TitleStyle}>
						Curator
					</Text>
				</View>
				<View style={styles.FormContainer}>
					<LoginForm navigation={this.props.navigation}/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	ScreensBox: {
		flex: 1
	},
	LogoContainer : {
		flex: 0.35,
		alignItems : "center",
		justifyContent: "center"
	},
	LogoStyle : {
		height : 100,
	},
	TitleStyle : {
		color : "#233838",
		marginTop : 10,
		textAlign : "center",
		fontSize : 40,
		opacity : 0.9,
		paddingBottom : 15
	},
	FormContainer : {
		flex: 0.65,
		alignItems : "center",
		justifyContent : "center",
		backgroundColor : "#264242"
	},
});
