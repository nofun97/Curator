import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Text
} from 'react-native';
import InventoryItems from './InventoryItems';

const { height, width } = Dimensions.get('window');

export default class InventoryScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: 0,
      children: [
        {
          id: 'string',
          owners: 'list of owners', // user ids
          name: 'string',
          description: 'string',
          dateRegistered: 'Date', // milliseconds since unix epoch
          dateOwned: 'Date', // milliseconds since unix epoch
          categories: '[string]', // categories name
          thumbnail: 'url string',
        },
        {
          id: 'yeet',
          owners: 'list of owners', // user ids
          name: 'string',
          description: 'string',
          dateRegistered: 'Date', // milliseconds since unix epoch
          dateOwned: 'Date', // milliseconds since unix epoch
          categories: '[string]', // categories name
          thumbnail: 'url string',
        },
     ]
    };
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }


  renderItems = () => {
    var render = [];
    for (let i = 0; i < this.state.children.length; i++){
      render.push(<InventoryItems
        item={this.state.children[i]}
        key={this.state.children[i].id}
        navigation={this.props.navigation}/>);
    }
    return render;
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollView}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
          <View style={styles.content}>
            {this.renderItems()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaContainer:{},
  scrollView:{},
  content:{},
  scrollContainer: {}
});

//place your functions here
//function to update height
//function to update the 'children'
