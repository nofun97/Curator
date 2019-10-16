import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

export default class AccountDetailsForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      emailAddress : '@gmail.com',
      firstName : 'Yeeter',
      lastName : 'Yeeterson',
      userName: 'YeetYeetYeet',
    };
    this.onAccountSavePress = this.onAccountSavePress.bind(this);
  }

  onAccountSavePress = () => {
    this.props.navigation.navigate('Inventory');
  };

  render(){
    return (
      <View style = {styles.viewStyle}>
        <Text style = {styles.textStyle}> Email Address </Text>
        <TextInput
            style = {styles.inputTextStyles}
            autoCorrect={false}
            onChangeText={input => this.setState({ emailAddress: input })}
            value={this.state.emailAddres}
        />
        <Text style = {styles.textStyle}> First Name </Text>
        <TextInput
            style = {styles.inputTextStyles}
            autoCorrect={false}
            onChangeText={input => this.setState({ firstName: input })}
            value={this.state.firstName}
        />
        <Text style = {styles.textStyle}> Last Name </Text>
        <TextInput
            style = {styles.inputTextStyles}
            autoCorrect={false}
            onChangeText={input => this.setState({ lastName: input })}
            value={this.state.lastName}
        />
        <Text style = {styles.textStyle}> Username </Text>
        <TextInput
            style = {styles.inputTextStyles}
            autoCorrect={false}
            onChangeText={input => this.setState({ userName: input })}
            value={this.state.userName}
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.onAccountSavePress}>
          <Text> Save </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputTextStyles: {
    marginBottom: 10,
    color: '#d4d4d4',
    alignItems: 'center',
    width: 260,
  },
  textStyle: {
    color: '#ffffff',
    fontFamily: 'Montserrat',
  },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
