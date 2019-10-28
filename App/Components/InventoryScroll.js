import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import InventoryItems from './InventoryItems';
import {connect} from 'react-redux';
import {getDataList} from '../controllers/items';

class InventoryScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      limit: 6,
      pageStart: Number.POSITIVE_INFINITY,
      order: {
        field: 'dateOwned',
        direction: 'desc',
      },
      categories: [],
      isLoading: true,
      noMoreData: false,
    };
    this.loadItems = this.loadItems.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  // load the list of items from the database with pagination, only called when
  // user is at the bottom of the list
  loadItems = () => {
    getDataList(this.state.pageStart, this.state.limit, this.state.order, this.state.categories)
      .then(data => {
        if (data.error){
          throw data.error;
        }

        // when there is no more data to load, stop loading
        if (data.length === 0){
          this.setState((state, props) => {
            return {
              ...state,
              isLoading: false,
              noMoreData: true,
            };
          });
          return;
        }

        // appending the data
        this.setState((state, props) => {return {
          ...state,
          children: [...state.children, ...data],
          isLoading: false,
          noMoreData: data.length < state.limit,
        };});
      })
      .catch(err => console.log(err));
  }

  handleLoadMore = () => {
    // not loading if is loading or there is no more data
    if (this.state.noMoreData || this.state.isLoading) {return;}

    // show loading indicator while calling the controller
    this.setState({
      ...this.state,
      isLoading: true,
      pageStart: this.state.children[this.state.children.length - 1].dateOwned,
    }, () => {this.loadItems();});
  }

  // resets state and load all the data again
  onRefresh = () => {
    if (this.state.isLoading) {return;}

    this.setState((state, props) => {
      var nextState = {
        ...state,
        children: [],
        noMoreData: false,
        isLoading: true,
      };

      if (state.order.direction === 'desc') {
        nextState = {
          ...nextState,
          pageStart: Number.POSITIVE_INFINITY,
        };
      } else if (state.order.direction === 'asc') {
        nextState = {
          ...nextState,
          pageStart: 0,
        };
      }

      return nextState;
    }, () => this.loadItems());
  }

  // loading indicator at the foot of the list
  renderFooter = () => {
    return (
      <View>
        {
          this.state.isLoading && <ActivityIndicator animating size="large" />
        }
      </View>
    );
  };

  // load the item after UI loads
  componentDidMount = () => {this.loadItems();};

  render() {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <FlatList
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollView}
          data={this.state.children}
          keyExtractor={item => item.id}
          initialNumToRender={this.state.limit}
          onEndReached={this.handleLoadMore}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={this.state.noMoreData ? 0 : 0.5}
          refreshing={this.state.isLoading}
          onRefresh={() => this.onRefresh()}
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

export default connect((state) => {
  const {user} = state;
  return {uid: user.uid, email: user.email};
}, null)(InventoryScroll);
