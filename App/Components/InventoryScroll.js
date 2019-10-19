import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Text,
  FlatList,
} from 'react-native';
import InventoryItems from './InventoryItems';
import {connect} from 'react-redux';

const { height, width } = Dimensions.get('window');

class InventoryScroll extends Component {
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
     ],
     limit: 10,
     pageStart: 0,
     order: {
       field: 'dateOwned',
       direction: 'desc',
     },
     categories: [],
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
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    // const scrollEnabled = this.state.screenHeight > height;
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        {/* <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollView}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
          <View style={styles.content}>
            {this.renderItems()}
          </View>
        </ScrollView> */}

        <FlatList
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollView}
          data={this.state.children}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={styles.content}
            >
              <InventoryItems  item={item} navigation={this.props.navigation}/>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaContainer:{},
  scrollView:{},
  content:{},
  scrollContainer: {},
  flatListContainer: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
});

//place your functions here
//function to update height
//function to update the 'children'
export default connect((state) => {
  const {user} = state;
  return {user: user};
}, null)(InventoryScroll);
