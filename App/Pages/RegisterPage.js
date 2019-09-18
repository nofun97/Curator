import React,{Component} from 'react';
import {AppRegistry, View, Button, KeyboardAvoidingView} from 'react-native';
import RegistryForm from './RegistryForm';

export default class RegisterPage extends Component{
  render(){
    return(
      <KeyboardAvoidingView behavior=”padding” style={styles.container}>
				<View style= {styles.logoContainer}>
					<Image
						style={styles.logo}
						source ={require[“../../images/Something.png”]}/>
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
		backgroundColor : 'blue'
	},
	logoContainer : {
		alignItemsL : 'center',
		flexGrow : 1 ,
		justifyContent : 'center'
	},
	Logo : {
		width : 100,
		height : 100
	},
	Title : {
		Color : 'blue',
		marginTop : 10,
		width : 160,
		textAlign : 'center',
		opacity : 0.9
	}
);
