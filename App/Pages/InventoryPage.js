import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import InventoryScroll from '../Components/InventoryScroll';
import MenuButton from '../Components/MenuButton';

export default class InventoryPage extends Component {
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
          <Text style = {styles.welcomeTextStyle}> (Username)! </Text>
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
  },
  accountIconStyle: {
    flex: 1,
    backgroundColor: '#338c83',
    resizeMode: 'contain',
    marginLeft: 15,
  },
  accountButtonStyle: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//place your functions here
