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
      <View>
        <View style = {styles.viewStyle}>
          <Text style = {styles.textStyle}> Email Address </Text>
          <TextInput
            style = {styles.inputTextStyles}
            autoCorrect={false}
            onChangeText={input => this.setState({ emailAddress: input })}
            value={this.state.emailAddress}
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
        </View>
        <View style = {styles.saveButtonViewStyle}>
          <TouchableOpacity
            style={styles.saveButtonStyle}
            onPress={this.onAccountSavePress}>
            <Text style={styles.saveButtonTextStyle}> Save </Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: '12%',
    marginLeft: '5%',
  },
  saveButtonStyle: {
    width: 165,
    marginBottom: 50,
    height: 50,
    borderRadius: 2,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonViewStyle: {
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonTextStyle: {
    color: '#ffffff',
  },
});
