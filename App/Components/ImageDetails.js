import React,{Component} from 'react';
import {View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

export default class ImageDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      url : this.props.items,
      imageWidth : 350, // might want to update this
      imageHeight : 350, // might want to update this
    }
    console.log(this.state.url);
  }
  render(){
    return(
      <View>
        <ImageZoom
          cropWidth = {Dimensions.get('window').width}
          cropHeight = {Dimensions.get('window').height-200}
          imageWidth = {this.state.imageWidth}
          imageHeight = {this.state.imageHeight}>
          <Image
            style={{width:this.state.imageWidth, height:this.state.imageHeight}}
            source={{uri:this.state.url}}/>
        </ImageZoom>

      </View>
    );
  }
}
