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
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={()=>this.props.navigation.navigate('ItemRegister')}
          >
          <Text> Add Items </Text>
        </TouchableOpacity>
        <InventoryScroll navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {

  },
  menuButtonStyle:{

  },
  buttonStyle:{

  }
});

//place your functions here
