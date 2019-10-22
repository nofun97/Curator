import React,{Component} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default function ImagePickingComponent(props) {
  const onAddImage = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        props.OnError(response.error);
        this.setState({...this.state, warning: response.error});
      } else {
        props.OnSucceed(response.uri);
      }
    });
  };

  return (
    <TouchableOpacity
          style={props.ButtonStyle}
          onPress={onAddImage}>
          <Text style={props.ButtonTextStyle}> Add Images </Text>
    </TouchableOpacity>
  )
}