import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { login } from '../controllers/authentications';
import { loggedIn, loggedOut } from '../redux/reducers';
import {StackActions, NavigationActions} from 'react-navigation';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      warning: '',
      isLoading: false,
      user: null,
    };
    this.onLoginPress = this.onLoginPress.bind(this);
    this.onRegisterPress = this.onRegisterPress.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  // authenticate the user
  onLoginPress = () => {
    if (this.state.email === '' || this.state.password === '') {
      this.setState({
        ...this.state,
        warning: 'Email and password can not be empty',

      });
      return;
    }

    // set loading indicator and calls the controller
    this.setState({ ...this.state, isLoading: true }, () => {
      login(this.state.email, this.state.password)
        .then(data => {
          this.setState({ ...this.state, isLoading: false, user: data, email: '', password: '' });

        })
        .catch(err => {
          console.log(err);
          this.setState({
            ...this.state,
            warning: 'Email or password is wrong',
            isLoading: false,
          });
        });
    });
  };

  // if user is loggedIn call the next step
  componentDidUpdate() {
    if (this.state.user !== null) {
      this.nextStep(this.state.user);
    }
  }

  // dispatch redux actions and navigate to the inventory page
  nextStep = data => {
    this.props.loggedIn(data.user);
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Inventory' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  // move to register page
  onRegisterPress = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    return (
      <ScrollView>
        {this.state.warning !== '' && (
          <Text style={styles.textStyle}>{this.state.warning}</Text>
        )}
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Email: </Text>
        </View>
        <TextInput
          style={styles.inputTextStyles}
          autoCorrect={false}
          onChangeText={input => this.setState({ email: input })}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          placeholder="Enter your email"
          value={this.state.email}
        />
        <Text style={styles.textStyle}>Password: </Text>
        <TextInput
          style={styles.inputTextStyles}
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={input => this.setState({ password: input })}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          placeholder="Enter your password"
          value={this.state.password}
        />
        {this.state.isLoading && <ActivityIndicator animating size="large" />}
        <View style={styles.registerViewStyle}>
          <TouchableOpacity
            style={styles.loginButtonStyle}
            onPress={this.onLoginPress}
          >
            <Text style={styles.buttonTextStyle}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.registerTextStyle}> Don't have an account? </Text>
          <TouchableOpacity
            title="Register Now"
            style={styles.registerButtonStyle}
            onPress={this.onRegisterPress}
          >
            <Text style={styles.buttonTextStyle}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    width: '55%',
  },
  inputTextStyles: {
    marginBottom: 10,
    color: '#d4d4d4',
    alignItems: 'center',
    width: 260,
  },
  textStyle: {
    marginLeft: 4,
    color: '#ffffff',
    fontFamily: 'Montserrat',
  },
  registerViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewStyle: {
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#ffffff',
    fontFamily: 'Montserrat',
  },
  loginButtonStyle: {
    marginTop: 30,
    marginBottom: 35,
    height: 50,
    width: 245,
    borderRadius: 2,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonStyle: {
    marginTop: 10,
    height: 50,
    width: 245,
    borderRadius: 2,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerTextStyle: {
    color: '#4f6361',
    fontFamily: 'Montserrat',
  },
});

const mapDispatchToProps = { loggedIn, loggedOut };

export default connect(
  state => {
    const { status } = state;
    return { status: status };
  },
  mapDispatchToProps
)(LoginForm);
