import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import InventoryItems from './InventoryItems';

const { height } = Dimensions.get('window');

export default class InventoryScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: 0,
      children: 'yo wuts up', //change this to function for list of InventoryItems
    };
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
  }
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <ScrollView
        style={styles.ScrollContainer}
        contentContainerStyle={styles.scrollview}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={this.onContentSizeChange}
      >
        <View style={styles.content}>{this.props.children}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {},
});

//place your functions here
//function to update height
//function to update the 'children'
