import React,{useState, useEffect} from 'react';
import {TouchableOpacity, Image, FlatList, StyleSheet, View} from 'react-native';

const ImageSelection = (props) => {
  console.log('HIIIIII');
  return (
    <FlatList
      style={props.imageSelectionStyle}
      // ItemSeparatorComponent={(<View style={styles.separatorStyle}></View>)}
      renderItem={({item}) => {
        return (<ImageObject reference={item} onPressImage={props.onPressImage}/>)
      }}
      keyExtractor={item => {
        return item.fullPath
      }}
      data={props.references}
      horizontal={true}
    />
  );
}

const ImageObject = (props) => {
  const [picked, setPicked] = useState(false);
  const [image, setImage] = useState('')

  useEffect(() => {
    const fetchImage = async () => {
      setImage(await props.reference.getDownloadURL());
    }
    fetchImage();
  }, []);

  const onPress = () => {
    props.onPressImage(props.reference, !picked);
    setPicked(!picked);
  };

  return (
    <TouchableOpacity onPress={onPress} style={{flex: 1}}>
      {image !== '' && <Image style={picked ? styles.pickedImage : styles.regularImage} source={{uri: image}}/>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pickedImage: {
    borderColor: '#50d4c6',
    borderWidth: 3,
    overlayColor: 'grey',
    height: 150,
    width: 150,
    margin: 5,
    flex: 1,
  },
  regularImage: {
    height: 150,
    width: 150,
    margin: 5,
    flex: 1,
  },
  separatorStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

export default ImageSelection;