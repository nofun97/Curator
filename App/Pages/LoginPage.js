import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import LoginForm from '../Components/LoginForm';
import { connect } from 'react-redux';
import { loggedIn, loggedOut } from '../redux/reducers';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: require('../Assets/Logo/Logo.png'),
    };

    // makes sure the redux state is loggedOut
    this.props.loggedOut();
  }
  render() {
    return (
      <View style={styles.ScreensBox}>
        <View style={styles.LogoContainer}>
          <Image style={styles.LogoStyle} source={this.state.logo} />
        </View>
        <View style={styles.FormContainer}>
          <LoginForm navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ScreensBox: {
    flex: 1,
  },
  LogoContainer: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LogoStyle: {
    height: 100,
  },
  TitleStyle: {
    color: '#1d2e2e',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 40,
    opacity: 0.9,
    paddingBottom: 15,
  },
  FormContainer: {
    flex: 0.65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#264242',
  },
});

const mapDispatchToProps = { loggedIn, loggedOut };

// connecting to redux store
export default connect(
  state => {
    const { status } = state;
    return { status: status };
  },
  mapDispatchToProps
)(Login);
