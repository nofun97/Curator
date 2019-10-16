import React, { Component } from 'react';
import { StyleSheet, View ,Text} from 'react-native';
import InventoryScroll from '../Components/InventoryScroll';

export default class InventoryPage extends Component {
  render() {
    return (
      <View style={styles.viewContainer}>
        <InventoryScroll navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {}
});

//place your functions here
