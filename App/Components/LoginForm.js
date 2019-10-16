import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {login} from '../controllers/authentications';
import {loggedIn} from '../redux/reducers';

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

  onLoginPress = () => {
    if (this.state.email === '' || this.state.password === '') {
      this.setState({...this.state, warning: 'Email and password can not be empty'});
      return;
    }


    // const dispatch = (data) => {
    //   const x = this.props.loggedIn(data.user);
    //   console.log(x);
    // };

    this.setState({...this.state, isLoading: true}, 
        () => {
          login(this.state.email, this.state.password)
            .then((data) => {
              this.setState({...this.state, isLoading: false, user: data});
              // dispatch(data);
              // this.props.navigation.navigate('Inventory');
            })
            .catch((err) => {
              console.log(err);
              this.setState({...this.state, warning: 'Email or password is wrong'});
            });
        }
      )

  };

  componentDidUpdate() {
    if (this.state.user !== null) {
      this.nextStep(this.state.user);
    }
  }

  nextStep = () => {
    this.props.loggedIn(this.state.user);
    this.props.navigation.navigate('Inventory');

  }

  onRegisterPress = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    return (
        <ScrollView>
          {this.state.warning !== '' && <Text style={styles.textStyle}>{this.state.warning}</Text>}
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
          {this.state.isLoading && <ActivityIndicator animating size="large"/>}
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
  inputTextStyles: {
    marginBottom: 10,
    color: '#d4d4d4',
    alignItems: 'center',
    width: 260,
  },
  textStyle: {
    color: '#ffffff',
    fontFamily: 'Montserrat',
    marginLeft: 3,
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
    width: 175,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonStyle: {
    marginTop: 10,
    height: 50,
    width: 175,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerTextStyle: {
    color: '#4f6361',
    fontFamily: 'Montserrat',
  },
});

export default connect((state) => {
  const {payload} = state;
  return {user: payload}
}, () => {return {loggedIn};})(LoginForm);
