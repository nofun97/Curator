import React,{Component} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

export default class ImageDetailsPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      url : this.props.items,
      imageWidth : 200,
      imageHeight : 200,
    }
  }
  render(){
    return
    <View>
      <ImageZoom
        cropWidth = {Dimeonsions.get('window').width}
        cropHeight = {Dimensions.get('window').height}
        imageWidth = {this.state.imageWidth}
        imageHeight = {this.state.imageHeight}>
        <Image
          style={{width:this.state.imageWidth, height:this.state.imageHeight}}
          source={this.state.url}/>
      </ImageZoom>
    </View>
  }
}
