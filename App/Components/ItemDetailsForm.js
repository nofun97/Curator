import React, {Component} from 'react';
import {View, Text, DatePicker, StyleSheet, TouchableOpacity,TextInput} from 'react-native';

export default class ItemDetailsForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.item.id,
      owners: this.props.item.owners, // user ids
      name: this.props.item.name,
      description: this.props.item.description,
      dateRegistered: this.props.item.dateRegistered, // milliseconds since unix epoch
      dateOwned: this.props.item.dateOwned, // milliseconds since unix epoch
      categories: this.props.item.categories,
    };
    this.onItemSavePress = this.onItemSavePress.bind(this);
  }

  onItemSavePress = () => {
    this.props.navigation.navigate('Inventory');
  };

  render(){
    return(
    <View style= {styles.viewStyle}>
      <Text style = {styles.textStyle}>
        Details
      </Text>

      <Text style = {styles.textStyle}>
        Name
      </Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder={this.props.name}/>

      <Text style = {styles.textStyle}>
        Owners
      </Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder={this.props.owners}/>

      <Text style = {styles.textStyle}>
        Description
      </Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder={this.props.description}/>

      <Text style = {styles.textStyle}>
        DateRegistered
      </Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder={this.props.dateRegistered}/>

      <Text style = {styles.textStyle}>
        dateOwned
      </Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder={this.props.dateOwned}/>

      <Text style = {styles.textStyle}>
        Categories
      </Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder={this.props.categories}/>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={this.onItemSavePress}>
        <Text> Save </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={this.onItemSavePress}>
        <Text> Cancel </Text>
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#264242',
  },
  inputviewStyle:{
  },
  titleStyle: {
    color: '#ffffff',
    fontFamily: 'proxima-nova-semibold',
    fontSize: 18,
    marginBottom: 12,
    marginTop: 7,
  },
  textInputStyle:{
    color: '#ffffff',
    fontFamily: 'Montserrat',
    marginLeft: 124,
    marginBottom: 10,
  },
  textStyle: {
    color: '#ffffff',
    fontFamily: 'Montserrat',
    marginLeft: 124,
    alignSelf: 'flex-start',
  },
  saveButtonStyle: {
    width: 165,
    marginTop: 30,
    marginBottom: 25,
    height: 50,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonStyle: {
    width: 165,
    marginBottom: 25,
    height: 50,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: '#ffffff',
  }
})
