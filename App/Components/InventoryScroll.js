import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import InventoryItems from './InventoryItems';
import {connect} from 'react-redux';
import {getDataList} from '../controllers/items'

const { height, width } = Dimensions.get('window');

class InventoryScroll extends Component {
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
        // {
        //   id: 'yeet',
        //   owners: 'list of owners', // user ids
        //   name: 'string',
        //   description: 'string',
        //   dateRegistered: 'Date', // milliseconds since unix epoch
        //   dateOwned: 'Date', // milliseconds since unix epoch
        //   categories: '[string]', // categories name
        //   thumbnail: 'url string',
        // },
     ],
     limit: 10,
     pageStart: 0,
     order: {
       field: 'dateOwned',
       direction: 'desc',
     },
     categories: [],
     isLoading: true,
    };
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    // this.renderItems = this.renderItems.bind(this);
  }

  loadItems = () => {
    getDataList(this.props.user.uid, this.state.pageStart, this.state.limit, this.state.order, this.state.categories)
      .then(data => {
        if (data.error){
          throw data.error;
        }
        this.setState((state, props) => {return {
          ...state, 
          children: [...state.children, ...data],
          pageStart: state.pageStart + state.limit,
          isLoading: false,
        };});
      })
      .catch(err => console.log(err));
  }

  handleLoadMore = () => {
    this.setState({...this.state, isLoading: true}, () => {this.loadItems()});
  }

  renderFooter = () => {
    return (
      <View>
        {
          this.state.isLoading && <ActivityIndicator animating size="large" />
        }
      </View>
    );
  };

  componentDidMount = () => {this.loadItems()};
  // renderItems = () => {
  //   var render = [];
  //   for (let i = 0; i < this.state.children.length; i++){
  //     render.push(<InventoryItems
  //       item={this.state.children[i]}
  //       key={this.state.children[i].id}
  //       navigation={this.props.navigation}/>);
  //   }
  //   return render;
  // }

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
          initialNumToRender={this.state.limit}
          onEndReached={this.handleLoadMore}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={1}
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
  console.log(state);
  const {payload} = state;
  return {user: payload};
}, null)(InventoryScroll);
