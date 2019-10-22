import React, {Component} from 'react';
import {View, Text, DatePicker, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {viewItem} from '../controllers/items';
import {getProfilesOfIds} from '../controllers/authentications';

class ItemDetailsForm extends Component{
  constructor(props){
    super(props);
    console.log('Going to item details form');
    this.state = {
      id: this.props.id,
      warning: '',
      photos: [],
      ownerNames: [],
      owners: this.props.item.owners, // user ids
      name: this.props.item.name,
      description: this.props.item.description,
      dateRegistered: this.props.item.dateRegistered, // milliseconds since unix epoch
      dateOwned: this.props.item.dateOwned, // milliseconds since unix epoch
      categories: this.props.item.categories,
      allowEdit: false,
    };
    this.onItemSavePress = this.onItemSavePress.bind(this);
    this.itemLoad = this.itemLoad.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.getNames = this.getNames.bind(this);
    this.onEditItemPress = this.onEditItemPress.bind(this);
  }

  onEditItemPress = () => {
    this.props.navigation.navigate('ItemEdit',{
      id: this.state.id,
      navigation: this.props.navigation
    });
  };

  render(){
    return (
      <View style= {styles.viewStyle}>
        {this.state.warning !== '' && <Text>{this.state.warning}</Text>}
        <Text style = {styles.textStyle}>
          Details
        </Text>
        <Text style = {styles.textStyle}>
          Name: {this.state.name}
        </Text>
        <Text style = {styles.textStyle}>
          Owner: {this.state.owners}
        </Text>
        <Text style = {styles.textStyle}>
          Description: {this.state.description}
        </Text>
        <Text style = {styles.textStyle}>
          Date Registered: {this.state.dateRegistered}
        </Text>
        <Text style = {styles.textStyle}>
          Date Owned: {this.state.dateOwned}
        </Text>
        <Text style = {styles.textStyle}>
          Categories: {this.state.categories}
        </Text>

        {this.renderImage()}
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

export default connect((state) => {
  const {user} = state;
  return {uid: user.uid, email: user.email};
}, null)(ItemDetailsForm);
