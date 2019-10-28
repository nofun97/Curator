import React,{Component} from 'react';
import {View, Image, Dimensions} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

// component to get full view of the image
export default class ImageDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      url : this.props.items,
      imageWidth : 350,
      imageHeight : 350,
    };
  }
  render(){
    return (
      <View>
        <ImageZoom
          cropWidth = {Dimensions.get('window').width}
          cropHeight = {Dimensions.get('window').height - 200}
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
