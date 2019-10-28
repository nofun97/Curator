import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import ItemDetailsForm from '../Components/ItemDetailsForm';

export default class ItemDetailsPage extends Component {
  render(){
    const { navigation } = this.props;
    const id = navigation.getParam('id', '');
    return(
      <View style = {styles.viewContainer}>
        <ItemDetailsForm
          navigation={this.props.navigation}
          id= {id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer:{
    flex: 1,
    backgroundColor: '#264242',
  },
});
