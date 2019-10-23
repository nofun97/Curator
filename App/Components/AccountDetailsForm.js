import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {getPersonalProfile, editProfile} from '../controllers/authentications';
class AccountDetailsForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      emailAddress : this.props.email,
      firstName : '',
      lastName : '',
      warning: '',
      isLoading: true,
    };
    this.onAccountSavePress = this.onAccountSavePress.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
    this.loadProfile();
  }

  onAccountSavePress = () => {
    if (this.state.firstName === '') {
      this.setState({warning: "First name is required"});
      return;
    }

    var toUpdate = {
      firstName: this.state.firstName
    }

    if (this.state.lastName !== '') {
      toUpdate.lastName = this.state.lastName;
    }

    editProfile(this.props.uid, toUpdate)
      .then(() => this.setState({warning: 'Your modification is saved!'}))
      .catch(err => {
        this.setState({warning: 'Something is not right, please go back and try again'})
        console.log(err);
      })
  };

  loadProfile = () => {
    getPersonalProfile(this.props.uid)
      .then(data => {
        this.setState({firstName: data.firstName, lastName: data.lastName, warning: '', isLoading: false,});
      })
      .catch(err => {
        console.log(err);
        this.setState({warning: 'Something is not right, please go back and try again', isLoading: false});
      })
  }

  render(){
    return (
      <View>
        <View style = {styles.viewStyle}>
          {this.state.warning !== '' && <Text style={styles.textStyle}>{this.state.warning}</Text>}
          {this.state.isLoading && <ActivityIndicator animating size="large" />}
          <Text style = {styles.textStyle}> Email Address: </Text>
          <TextInput
            style = {styles.inputTextStyles}
            autoCorrect={false}
            onChangeText={input => this.setState({ emailAddress: input })}
            value={this.state.emailAddress}
            editable={false}
          />
          <Text style = {styles.textStyle}> First Name: </Text>
          <TextInput
            style = {styles.inputTextStyles}
            underlineColorAndroid={'#65807d'}
            autoCorrect={false}
            onChangeText={input => this.setState({ firstName: input })}
            value={this.state.firstName}
          />
          <Text style = {styles.textStyle}> Last Name: </Text>
          <TextInput
            style = {styles.inputTextStyles}
            underlineColorAndroid={'#65807d'}
            autoCorrect={false}
            onChangeText={input => this.setState({ lastName: input })}
            value={this.state.lastName}
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
    width: 350,
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
    width: 245,
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


export default connect((state) => {
  const {user} = state;
  return {uid: user.uid, email: user.email};
}, null)(AccountDetailsForm);
