import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import InventoryScroll from '../Components/InventoryScroll';
import {getPersonalProfile} from '../controllers/authentications';
import {connect} from 'react-redux';
import {loggedOut} from '../redux/reducers';

class InventoryPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: ''
    };

    // get the name of the current user
    getPersonalProfile(this.props.uid)
      .then(data => {
        var fullName = data.firstName;
        if (data.lastName !== '') fullName += ' ' + data.lastName;
        this.setState({name: fullName});
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <View style={styles.navBarStyle}>

          <TouchableOpacity
            style={styles.accountButtonStyle}
            onPress={()=>this.props.navigation.navigate('AccountDetails')}
          >
            <Image style = {styles.accountIconStyle}
                   source = {require('../Assets/Images/UserEditIcon.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewContainerTop}>
          <Text style = {styles.welcomeTextStyle}> Welcome to Curator, </Text>
          {this.state.name !== '' && <Text style = {styles.welcomeTextStyle}> {this.state.name}! </Text>}
        </View>
        <View style={styles.artifactButtonViewStyle}>
          <TouchableOpacity
            style={styles.artifactButtonStyle}
            onPress={()=>this.props.navigation.navigate('ItemRegister')}
          >
            <Text style = {styles.textStyle}> REGISTER ARTIFACT </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewContainerBottom}>
          <InventoryScroll navigation={this.props.navigation}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  viewContainerTop: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#264242',
  },
  textStyle: {
    color: '#ffffff',
  },
  viewContainerBottom: {
    flex: 1,
    backgroundColor: '#5f9999',
  },
  artifactButtonStyle: {
    width: 165,
    height: 50,
    borderRadius: 2,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  artifactButtonViewStyle: {
    backgroundColor: '#338c83',
    height: 70,
    borderBottomWidth: 10,
    borderColor: '#264242',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTextStyle: {
    fontWeight: 'bold',
    textShadowRadius: 120,
    textShadowColor: 'black',
    fontSize: 25,
    color: '#e8e8e8',
  },
  navBarStyle: {
    backgroundColor: '#338c83',
    borderBottomWidth: 0.5,
    flexDirection: 'row'
  },
  accountIconStyle: {
    flex: 1,
    backgroundColor: '#338c83',
    resizeMode: 'contain',
    width: 20,
    marginLeft: 15,
  },
  accountButtonStyle: {
    width: 45,
    height: 45,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// connecting page to redux store
export default connect((state) => {
  const {user} = state;
  return {uid: user.uid, email: user.email};
}, {loggedOut})(InventoryPage);
