import React,{Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';


export default class ItemEditPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: "yeet",
      owners: "yeetersons",
      description: "passed down from your great yeetparents",
      dateRegistered:"1909 Nov 2019",
      dateOwned:"1900 Dec 2010",
      categories: "Yeet, Yeetyeet, yeetyeetyeet"
    };
    this.onItemSavePress = this.onItemSavePress.bind(this);
  }

  onItemSavePress = () => {
    this.props.navigation.navigate('Inventory');
  };

  render(){
    return(
      <ScrollView style={styles.viewStyle}>
        <Text style = {styles.titleStyle}>
          Edit Artifact Information
        </Text>

        <Text style = {styles.textStyle}>
          Name :
        </Text>
        <TextInput
          style = {styles.textInputStyle}
          placeholder={this.state.name}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"/>

        <Text style = {styles.textStyle}>
          Owners :
        </Text>
        <TextInput
          style = {styles.textInputStyle}
          placeholder={this.state.owners}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"/>

        <Text style = {styles.textStyle}>
          Description :
        </Text>
        <TextInput
          style = {styles.textInputStyle}
          placeholder={this.state.description}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"/>

        <Text style = {styles.textStyle}>
          Date Registered :
        </Text>
        <TextInput
          style = {styles.textInputStyle}
          placeholder={this.state.dateRegistered}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"/>

        <Text style = {styles.textStyle}>
          Date Owned :
        </Text>
        <TextInput
          style = {styles.textInputStyle}
          placeholder={this.state.dateOwned}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"/>

        <Text style = {styles.textStyle}>
          Categories :
        </Text>
        <TextInput
          style = {styles.textInputStyle}
          placeholder={this.state.categories}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"/>

        <TouchableOpacity
          style={styles.saveButtonStyle}
          onPress={this.onItemSavePress}>
          <Text style = {styles.buttonTextStyle}> Save </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButtonStyle}
          onPress={this.onItemSavePress}>
          <Text style = {styles.buttonTextStyle}> Cancel </Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles=StyleSheet.create({
  viewStyle:{
    backgroundColor: '#264242',
    width:'100%',
  },
  titleStyle: {
    color: '#ffffff',
    fontFamily: 'proxima-nova-semibold',
    fontSize: 18,
    marginBottom: 12,
    marginTop: 7,
    alignSelf: 'center',
  },
  
  textStyle: {
    color: '#ffffff',
    fontFamily: 'Montserrat',
    marginLeft: 61,
    alignSelf: 'flex-start',
  },
  textInputStyle:{
    marginBottom: 10,
    color: '#ffffff',
    fontFamily: 'Montserrat',
    marginLeft: 58,
    width: 280,
  },
  saveButtonStyle: {
    width: 245,
    marginTop: 10,
    marginBottom: 25,
    height: 50,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  cancelButtonStyle: {
    width: 245,
    marginBottom: 25,
    height: 50,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: '#ffffff',
  }
})
