import React, {Component} from 'react';
import {View, StyleSheet,TouchableOpacity, Image, Text} from 'react-native';
import MenuList from './MenuList'

export default class MenuButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      showMenu: false,
      menuImage: require('../Assets/Images/MenuIcon.png')
    }
    this.changeMenuState=this.changeMenuState.bind(this);
  }

  changeMenuState=()=>{
    this.setState({showMenu: !this.state.showMenu})
  }

  render(){
    if(this.state.showMenu){
      return(
        <View style={styles.viewStyle}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.changeMenuState}>
            <Image
              style = {styles.menuButtonStyle}
              source = {this.state.menuImage}
            />
          </TouchableOpacity>
          <MenuList
            style={styles.menuListStyle}
            item={this.state.showMenu}
            navigation={this.props.navigation}
          />
        </View>
      );
    }
    return(
      <View style={styles.viewStyle}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.changeMenuState}>
          <Image
            style = {styles.menuButtonStyle}
            source = {this.state.menuImage}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  viewStyle:{

  },
  buttonStyle:{
    height:25,
    width:25
  },
  menuButtonStyle:{
    height:25,
    width:25
  },
  menuListStyle:{

  }
})
