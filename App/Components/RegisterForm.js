import React, { Component } from 'react';
import {
  TextInput,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { loggedIn } from '../redux/reducers';
import { signUp, uploadProfile } from '../controllers/authentications';
import {StackActions, NavigationActions} from 'react-navigation';


class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.MINIMUM_PASSWORD_LENGTH = 8;
    this.state = {
      emailInput: '',
      firstName: '',
      lastName: '',
      password: '',
      reconfirmPass: '',
      isLoading: false,
      warning:
        'Password must be at least ' +
        this.MINIMUM_PASSWORD_LENGTH +
        ' characters',
      user: null,
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  // after register, dispatch redux actions and move to inventory page
  nextStep = data => {
    this.props.loggedIn(data);
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Inventory' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  // after user is registered and authenticated, do the next step
  componentDidUpdate() {
    if (this.state.user !== null) {
      this.nextStep(this.state.user);
    }
  }

  // input sanitization and calling the controller
  onSubmitForm = () => {
    // first name can not be empty
    if (this.state.firstName === '') {
      this.setState({ ...this.state, warning: 'First Name is required' });
      return;
    }

    // checking email is of valid format
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(this.state.emailInput)) {
      this.setState({
        ...this.state,
        warning: 'Please enter the correct email',
      });
      return;
    }

    // password must be at least of certain length
    if (this.state.password < this.MINIMUM_PASSWORD_LENGTH) {
      this.setState({
        ...this.state,
        warning:
          'Password must be at least ' +
          this.MINIMUM_PASSWORD_LENGTH +
          ' characters',
      });
      return;
    }

    // confirm password must be the same as password
    if (this.state.password !== this.state.reconfirmPass) {
      this.setState({
        ...this.state,
        warning: 'Please confirm password correctly',
      });
      return;
    }

    // register user and profile
    const registerPromise = async () => {
      const userCredential = await signUp(
        this.state.emailInput,
        this.state.password
      );
      await uploadProfile({
        id: userCredential.user.uid,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      });
      return userCredential;
    };

    // sets loading indicator and calls the promise
    this.setState({ ...this.state, isLoading: true }, () => {
      registerPromise()
        .then(data => {
          this.setState({ ...this.state, isLoading: false, user: data.user });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            ...this.state,
            warning: 'The email is already used',
          });
        });
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.ViewStyle}>
        <Text style={styles.TextStyle}>Enter your information below:</Text>
        <Text style={styles.registerTextStyle}> Email Address: </Text>
        <TextInput
          style={styles.InputStyle}
          keyboardType="email-address"
          autoCorrect={false}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          placeholder="Enter your email address"
          onChangeText={input => this.setState({ emailInput: input })}
        />
        <Text style={styles.registerTextStyle}> First Name: </Text>
        <TextInput
          style={styles.InputStyle}
          autoCorrect={false}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          placeholder="Enter your first name"
          onChangeText={input => this.setState({ firstName: input })}
        />
        <Text style={styles.registerTextStyle}> Last Name: </Text>
        <TextInput
          style={styles.InputStyle}
          autoCorrect={false}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          placeholder="Enter your last name"
          onChangeText={input => this.setState({ lastName: input })}
        />
        <Text style={styles.registerTextStyle}> Password: </Text>
        <TextInput
          style={styles.InputStyle}
          secureTextEntry={true}
          autoCorrect={false}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          placeholder="Enter your password"
          onChangeText={input => this.setState({ password: input })}
        />
        <Text style={styles.registerTextStyle}> Re-confirm Password: </Text>
        <TextInput
          style={styles.InputStyle}
          secureTextEntry={true}
          autoCorrect={false}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          placeholder="Re-confirm your password"
          onChangeText={input => this.setState({ reconfirmPass: input })}
        />
        {this.state.warning !== '' && <Text style={styles.TextStyle}>{this.state.warning}</Text>}
        {this.state.isLoading && <ActivityIndicator animating size="large"/>}
        <TouchableOpacity
          style={styles.ButtonStyle}
          title="submit"
          onPress={this.onSubmitForm}
        >
          <Text style={styles.ButtonTextStyle}> Submit </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  InputStyle: {
    width: '90%',
    height: '8%',
    paddingHorizontal: 10,
    color: '#c8dede',
  },
  ViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonStyle: {
    width: 165,
    marginBottom: 50,
    height: 50,
    borderRadius: 2,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonTextStyle: {
    color: '#ffffff',
    fontFamily: 'Montserrat',
  },
  TextStyle: {
    color: '#c8dede',
    fontFamily: 'Montserrat',
    marginTop: 50,
    marginBottom: 15,
  },
  registerTextStyle: {
    marginLeft: 22,
    color: '#ffffff',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
});

const mapDispatchToProps = { loggedIn };
export default connect(
  state => {
    const { status } = state;
    return { status: status };
  },
  mapDispatchToProps
)(RegisterForm);
