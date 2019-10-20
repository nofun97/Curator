import React, {Component} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Button,
  Image,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {registerItem} from '../controllers/items';
import {connect} from 'react-redux';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';

class ItemRegistrationForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      owners: [], //TODO: need to be a list of {firstName: string, lastName: string, id: string}
      dateOwned: moment(),
      // origin: '',  Not used?
      description: '',
      photos: [], // a list of items
      categories: ['placeholder'], //TODO: needs to be a list
      warning: '',
      isUploadingImage: false,
      isUploading: false,
      // TODO: make this look better
      finishedMessage: <Text>Uploading is complete! You can continue doing anything else</Text>,
      showFinishedMessage: false,
    };
    this.onPressHandler = this.onPressHandler.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onAddImage = this.onAddImage.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  goBack = () => {this.props.navigation.navigate('Inventory')};

  // TODO: style this to make it look better
  renderImages = () => {
    var images = [];
    for (let i = 0; i < this.state.photos.length; i++){
      images.push(
        <Image key={i} style={{width: 100, height: 100}} source={{uri: this.state.photos[i]}} />
      );
    }
    return images;
  }

  onAddImage = () => {
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
        this.setState({...this.state, warning: response.error});
      } else {
        this.setState({...this.state, photos: [...this.state.photos, response.uri]});
      }
    });
  };

  onPressHandler = () => {

    const owners = this.state.owners.map(data => {return data.id;});
    owners.push(this.props.uid);
    const dateOwned = this.state.dateOwned.valueOf();

    const itemToUpload = {
      name: this.state.name,
      owners: owners,
      dateOwned: dateOwned,
      description: this.state.description,
      photos: this.state.photos,
      categories: this.state.categories,
    };

    this.setState((state, props) => {
      return {
        ...state,
        isUploading: true,
        isUploadingImage: state.photos.length > 0,
      };
    }, () => this.addItem(itemToUpload));
  }

  addItem = data => {
    const completeStorage = () => {this.setState({...this.state, isUploadingImage: false});};

    registerItem(data, null, null, completeStorage)
      .then(() => this.setState({
        ...this.state,
        isUploading: false,
        showFinishedMessage: true,
      }))
      .catch(err => {
        console.log(err);
        this.setState({...this.state, isUploading: false, warning: err.toString()});
      });
  }

  render(){
    console.log(this.state.dateOwned.valueOf());

    return (
      <SafeAreaView style = {styles.viewContainer}>
        {this.state.warning !== '' && <Text>{this.state.warning}</Text>}
        {this.state.isUploading && <ActivityIndicator animating size="large" />}
        {this.state.showFinishedMessage && <SafeAreaView>{this.state.finishedMessage}</SafeAreaView>}
        <ScrollView style = {styles.scrollViewContainer}>
          <Text style = {styles.textStyle}>
          Name:
          </Text>
          <TextInput
            style = {styles.inputTextStyles}
            autoCorrect={false}
            onChangeText={input => this.setState({ name: input })}
            value={this.state.name}
          />
          {/* <Text style = {styles.textStyle}>
          Owner:
          </Text>
          <TextInput
            style = {styles.inputTextStyles}
            autoCorrect={false}
            onChangeText={input => this.setState({ owner: input })}
            value={this.state.owner}
          /> */}
          <Text style = {styles.textStyle}>
          Date Owned:
          </Text>
          <DatePicker
            style={styles.datePickerStyle}
            date={this.state.dateOwned}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {this.setState({dateOwned: moment(date)});}}
          />
          {/* <Text style ={styles.textStyle}>
          Origin:
          </Text>
          <TextInput
            style = {styles.inputTextStyles}
            autoCorrect={false}
            onChangeText={input => this.setState({ origin: input })}
            value={this.state.origin}
          /> */}
          <Text style = {styles.textStyle}>
          Description:
          </Text>
          <TextInput
            style = {styles.inputTextStyles}
            autoCorrect={false}
            onChangeText={input => this.setState({ description: input })}
            value={this.state.description}
          />
          <Button title="Add Pictures" onPress={this.onAddImage} />
          {/* TODO: make the gallery look better */}
          {this.state.photos.length > 0 && this.renderImages()}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.onPressHandler}>
            <Text> Add Item </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.goBack}>
            <Text> Cancel </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer:{

  },
  scrollViewContainer:{

  },
  textStyle:{

  },
  inputTextStyles:{

  },
  datePickerStyle:{
    width: 200,
  },
  buttonStyle:{

  },
});

export default connect((state) => {
  const {user} = state;
  return {uid: user.uid, email: user.email};
}, null)(ItemRegistrationForm);
