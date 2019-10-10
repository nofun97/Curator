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
      children: [
        // {
        //   id: 'string',
        //   owners: 'list of owners', // user ids
        //   name: 'string',
        //   description: 'string',
        //   dateRegistered: 'Date', // milliseconds since unix epoch
        //   dateOwned: 'Date', // milliseconds since unix epoch
        //   categories: '[string]', // categories name
        //   thumbnail: 'url string',
        // },
      ], //change this to function for list of InventoryItems
    };
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  renderItems = () => {
    var render = [];
    // for (let i = 0; i < this.children.length; i++){
    //   render.push(<InventoryItems item={this.children[i]}/>);
    // }
    return render;
  }

  render() {
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <ScrollView
        style={styles.ScrollContainer}
        contentContainerStyle={styles.scrollview}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={this.onContentSizeChange}
      >
        <View style={styles.content}>
        {this.render()}
        </View>
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
