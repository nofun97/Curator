import React, { Component } from 'react';
import { StyleSheet, View ,Text, TouchableOpacity} from 'react-native';
import InventoryScroll from '../Components/InventoryScroll';
import MenuButton from '../Components/MenuButton';

export default class InventoryPage extends Component {
  render() {
    return (
      <View style={styles.viewContainer}>
        <MenuButton
          style={styles.menuButtonStyle}
          navigation={this.props.navigation}
        />
        <View style={styles.viewContainerTop}>
          <Text> Welcome to Curator! </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={()=>this.props.navigation.navigate('ItemRegister')}
        >
          <Text style = {styles.textStyle}> Add Items </Text>
        </TouchableOpacity>
        <View style={styles.viewContainerBottom}>
          <InventoryScroll navigation={this.props.navigation}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainerTop: {
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#264242',
  },
  textStyle: {
    backgroundColor: '#264242',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContainerBottom: {
    backgroundColor: '#264242',
  },
});

//place your functions here
