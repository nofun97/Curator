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
      allowEdit: false,
    };
    this.onEditItemPress = this.onEditItemPress.bind(this);
  }

  onEditItemPress = () => {
    this.props.navigation.navigate('ItemEdit',{
      id: this.state.id,
    });
  };


  render(){
    return(
    <View style= {styles.viewStyle}>
      <Text style = {styles.titleStyle}>
        Details
      </Text>

      <Text style = {styles.textStyle}>
        Name : {this.state.name}
      </Text>

      <Text style = {styles.textStyle}>
        Owners : {this.state.owners}
      </Text>

      <Text style = {styles.textStyle}>
        Description : {this.state.description}
      </Text>

      <Text style = {styles.textStyle}>
        Date Registered : {this.state.dateRegistered}
      </Text>

      <Text style = {styles.textStyle}>
        Date Owned : {this.state.dateOwned}
      </Text>

      <Text style = {styles.textStyle}>
        Categories : {this.state.categories}
      </Text>

      <TouchableOpacity
        style={styles.editButtonStyle}
        onPress={this.onEditItemPress}>
        <Text style = {styles.buttonTextStyle}> Edit </Text>
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#264242',
  },

  titleStyle: {
    color: '#ffffff',
    fontFamily: 'proxima-nova-semibold',
    fontSize: 18,
    marginBottom: 12,
    marginTop: 7,
    alignSelf: 'center',
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
    marginLeft: 74,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  editButtonStyle: {
    width: 245,
    marginTop: 10,
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
