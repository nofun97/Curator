/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';

import {viewItem} from '../controllers/items';
import ImagePicker from 'react-native-image-picker';

const App = () => {
  const [user, setUser] = useState('hello there');
  const [image, setImage] = useState('');
  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'test', title: 'test'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */
  ImagePicker.showImagePicker(options, response => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = {uri: response.uri};

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };

      setImage(source);
    }
  });

  // useEffect(() => {
  //   viewItem('jmRD0gUvkB7XAOiY7wr1').then(data =>
  //     setUser(Object.keys(data.data().owners)[0]),
  //   );
  // }, []);

  return (
    <View>
      <Text>{image}</Text>
      <Image source={{uri: image}} />
    </View>
  );
};

export default App;
