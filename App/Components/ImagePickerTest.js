import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { registerItem } from '../controllers/items';
import ImagePicker from 'react-native-image-picker';

export const ImagePickerTest = props => {
  const [filePath, setFilePath] = useState({});
  const [done, setDone] = useState('');
  const chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
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
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        setFilePath(source);
      }
    });
  };

  const onTest = () => {
    if (filePath === {}) {
      return;
    }
    const item = {
      owners: [props.user],
      description: 'this is a test you dummy dum dum',
      photos: [filePath.uri],
      dateOwned: Date.now(),
      categories: ['dummy', 'dum'],
    };

    registerItem(item, null, null, null)
      .then(() => setDone("It's done my dude"))
      .catch(err => setDone(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {/*<Image
          source={{ uri: this.state.filePath.path}}
          style={{width: 100, height: 100}} />*/}
        <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={{ width: 100, height: 100 }}
        />
        <Image
          source={{ uri: filePath.uri }}
          style={{ width: 250, height: 250 }}
        />
        <Text style={{ alignItems: 'center' }}>{filePath.uri}</Text>
        <Button title="Choose File" onPress={chooseFile} />
        <Button title="Test it dud" onPress={onTest} />
        {done !== '' && <Text>{done}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
