import React, {Component} from 'react';
import {View, Text, DatePicker, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {viewItem} from '../controllers/items';

class ItemDetailsForm extends Component{
  constructor(props){
    super(props);
    console.log('Going to item details form');
    this.state = {
      id: this.props.id,
      warning: '',
      // owners: this.props.item.owners, // user ids
      // name: this.props.item.name,
      // description: this.props.item.description,
      // dateRegistered: this.props.item.dateRegistered, // milliseconds since unix epoch
      // dateOwned: this.props.item.dateOwned, // milliseconds since unix epoch
      // categories: this.props.item.categories,
    };
    console.log(this.props.id);
    this.onItemSavePress = this.onItemSavePress.bind(this);
    this.itemLoad = this.itemLoad.bind(this);
  }

  onItemSavePress = () => {
    this.props.navigation.navigate('Inventory');
  };


  itemLoad = () => {
    viewItem(this.state.id)
      .then(data => {
        console.log(data);
        this.setState({
          ...this.state,
          owners: data.owners.join(','), // TODO: change this to name somehow
          description: data.description,
          dateRegistered: `${data.dateRegistered.getDate()}/${data.dateRegistered.getMonth() + 1}/${data.dateRegistered.getFullYear()}`,
          photos: data.photos,
          dateOwned: `${data.dateOwned.getDate()}/${data.dateOwned.getMonth() + 1}/${data.dateOwned.getFullYear()}`,
          categories: data.categories.join(','), // TODO: to show this better, change the format accordingly
          name: data.name,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({...this.state, warning: 'Something is not right, please refresh'});
      });
  }

  componentDidMount = () => {this.itemLoad();};
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

  },
  textStyle: {

  },
  buttonStyle: {

  },
});

export default connect((state) => {
  const {user} = state;
  return {uid: user.uid, email: user.email};
}, null)(ItemDetailsForm);
