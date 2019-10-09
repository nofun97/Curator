import React, { Component } from 'react';
import {ScrollView} from 'react-native';

import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      reconfirmPass: '',
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm = () => {
    this.props.navigation.navigate('Inventory');
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.ViewStyle}>
        <Text style={styles.TextStyle}>Enter your information below:</Text>
        <Text style={styles.registerStartTextStyle}> EMAIL ADDRESS </Text>
        <TextInput
          style={styles.InputStyle}
          keyboardType="email-address"
          autoCorrect={false}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          placeholder="Enter your email address"
          onSubmitEditing={input => this.setState({ emailInput: input })}
        />
        <Text style={styles.registerTextStyle}> FIRST NAME </Text>
        <TextInput
          style={styles.InputStyle}
          autoCorrect={false}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          placeholder="Enter your first name"
          onChangeText={input => this.setState({ firstName: input })}
        />
        <Text style={styles.registerTextStyle}> LAST NAME </Text>
        <TextInput
          style={styles.InputStyle}
          autoCorrect={false}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          placeholder="Enter your last name"
          onChangeText={input => this.setState({ lastName: input })}
        />
        <Text style={styles.registerTextStyle}> USERNAME </Text>
        <TextInput
          style={styles.InputStyle}
          autoCorrect={false}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          placeholder="Enter your username"
          onChangeText={input => this.setState({ username: input })}
        />
        <Text style={styles.registerTextStyle}> PASSWORD </Text>
        <TextInput
          style={styles.InputStyle}
          secureTextEntry={true}
          autoCorrect={false}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          placeholder="Enter your password"
          onChangeText={input => this.setState({ password: input })}
        />
        <Text style={styles.registerTextStyle}> RECONFIRM </Text>
        <TextInput
          style={styles.InputStyle}
          secureTextEntry={true}
          autoCorrect={false}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          placeholder="Re-confirm your password"
          onChangeText={input => this.setState({ reconfirmPass: input })}
        />
        <TouchableOpacity
          style={styles.ButtonStyle}
          title="submit"
          onPress={this.onSubmitForm}
        >
          <Text style={styles.TextStyle}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  InputStyle: {
    width: 375,
    height: 45,
    marginTop: 10,
    paddingHorizontal: 10,
    color: '#c8dede',
  },
  ViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonStyle: {
    width: 225,
    marginTop: 30,
    height: 50,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextStyle: {
    color: '#c8dede',
    fontFamily: 'Montserrat',
  },
  registerStartTextStyle: {
    color: '#ffffff',
    marginTop: 30,
  },
  registerTextStyle: {
    color: '#ffffff',
    marginTop: 10,
  },
});