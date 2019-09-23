import React,{Component} from 'react';
import {AppRegistry, Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';

export default class MainPage extends Component{
  render(){
    return(
      <View style=styles.MainContainer>
        <TouchableOpacity style = {styles.ManageProfile}>
          <Image
            source = {require('...')}
            style = {styles.ImageIcon}
          />
          <Text style = {styles.TextStyle}>
            Manage Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.ManageItems}>
          <Image
            source = {require('...')}
            style = {styles.ImageIcon}
          />
          <Text style = {styles.TextStyle}>
            Manage Items
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.ConnectPeople}>
          <Image
            source = {require('...')}
            style = {styles.ImageIcon}
          />
          <Text style = {styles.TextStyle}>
            Family & Friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.ViewInheritance}>
          <Image
            source = {require('...')}
            style = {styles.ImageIcon}
          />
          <Text style = {styles.TextStyle}>
            View Inheritance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.AddAttorney}>
          <Image
            source = {require('...')}
            style = {styles.ImageIcon}
          />
          <Text style = {styles.TextStyle}>
            Attorney
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    MainContainer:{
      paddingBottom: 1,
      height: 2,
      width: 3,
      backgroundColor: "white"
    },
    ManageProfile:{
      width: 1,
      height: 1,
      backgroundColor: "light blue"
    },
    ManageItems:{
      width: 1,
      height: 1,
      backgroundColor: "light blue"
    },
    ConnectPeople:{
      width: 1,
      height: 1,
      backgroundColor: "light blue"
    },
    ViewInheritance:{
      width: 1,
      height: 1,
      backgroundColor: "light blue"
    },
    AddAttorney:{
      width: 1,
      height: 1,
      backgroundColor: "light blue"
    },
    ImageIcon:{
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch'
    },
    TextStyle:{
      marginBottom: 4,
      marginRight: 20,
      Fontweight: 12
    }
  }
)
