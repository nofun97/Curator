import React, {Component} from 'react';
import {View, Text, DatePicker, StyleSheet, TouchableOpacity, Image} from 'react-native';
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
    };
    console.log(this.props.id);
    this.onItemSavePress = this.onItemSavePress.bind(this);
    this.itemLoad = this.itemLoad.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.getNames = this.getNames.bind(this);
  }

  onItemSavePress = () => {
    this.props.navigation.navigate('Inventory');
  };


  itemLoad = () => {
    viewItem(this.state.id)
      .then(data => {
        this.setState({
          ...this.state,
          description: data.description,
          dateRegistered: `${data.dateRegistered.getDate()}/${data.dateRegistered.getMonth() + 1}/${data.dateRegistered.getFullYear()}`,
          photos: data.photos,
          dateOwned: `${data.dateOwned.getDate()}/${data.dateOwned.getMonth() + 1}/${data.dateOwned.getFullYear()}`,
          categories: data.categories.join(','), // TODO: to show this better, change the format accordingly
          name: data.name,
        }, () => this.getNames(data.owners));
      })
      .catch(err => {
        console.log(err);
        this.setState({...this.state, warning: 'Something is not right, please go back'});
      });
  }

  getNames = (ids) => {
    getProfilesOfIds(ids)
      .then(data => {
        const names = data.map(profile => {
          var name = `${profile.firstName}`;
          if (profile.lastName !== '') name += ` ${profile.lastName}`;
          return name;
        });
        this.setState({...this.state, owners: names.join(', ')});
      })
      .catch(err => {
        console.log(err);
        this.setState({...this.state, warning: 'Something is not right, please go back'});
      })
  }

  componentDidMount = () => {this.itemLoad();};

  renderImage = () => {
    var images = [];
    for (let i = 0; i < this.state.photos.length; i++){
      if (this.state.photos[i] === '' || this.state.photos[i] === null) continue;
      images.push(<Image style={{flex: 1, width: 50, height: 50}} key={i} source={{uri: this.state.photos[i]}}/>);
    }

    return images;
  }

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
