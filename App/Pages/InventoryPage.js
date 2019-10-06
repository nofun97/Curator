import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import InventoryScroll from '../Components/InventoryScroll';

export default class InventoryPage extends Component {
  render() {
    return (
      <View>
        <InventoryScroll style={styles.scrollContainer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  scrollContainer: {},
});

//place your functions here
