import React, {Component} from 'react';
import {View, Text, DatePicker, StyleSheet, TouchableOpacity} from 'react-native';

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
        <Text style = {styles.titleStyle}>
          Details
        </Text>
        <Text style = {styles.textStyle}>
          Name: {this.props.name}
        </Text>
        <Text style = {styles.textStyle}>
          Owner: {this.props.owners}
        </Text>
        <Text style = {styles.textStyle}>
          Description: {this.props.description}
        </Text>
        <Text style = {styles.textStyle}>
          Date Registered: {this.props.dateRegistered}
        </Text>
        <Text style = {styles.textStyle}>
          Date Owned: {this.props.dateOwned}
        </Text>
        <Text style = {styles.textStyle}>
          Categories: {this.props.categories}
        </Text>
        <TouchableOpacity
          style={styles.saveButtonStyle}
          onPress={this.onItemSavePress}>
          <Text style={styles.buttonTextStyle}> Save </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButtonStyle}
          onPress={this.onItemSavePress}>
          <Text style={styles.buttonTextStyle}> Cancel </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#264242',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#ffffff',
    fontFamily: 'proxima-nova-semibold',
    fontSize: 18,
    marginBottom: 12,
    marginTop: 7,
  },
  textStyle: {
    color: '#ffffff',
    fontFamily: 'Montserrat',
    marginBottom: 10,
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
