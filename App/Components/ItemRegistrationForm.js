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
import PickerCheckBox from 'react-native-picker-checkbox';
import {getListOfProfiles} from '../controllers/authentications';
import Tags from 'react-native-tags';

class ItemRegistrationForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      owners: [], //TODO: need to be a list of {firstName: string, lastName: string, id: string}
      dateOwned: moment(),
      pickedOwners: [],
      // origin: '',  Not used?
      description: '',
      photos: [], // a list of items
      categories: ['antique'], //TODO: needs to be a list
      warning: '',
      isLoadingImage: false,
      isLoading: false,
      // TODO: make this look better
      finishedMessage: <Text>Uploading is complete! You can continue doing anything else</Text>,
      showFinishedMessage: false,
      maxNumberOfTags: 5,
    };
    this.onPressHandler = this.onPressHandler.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onAddImage = this.onAddImage.bind(this);
    this.onAddOwner = this.onAddOwner.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.goBack = this.goBack.bind(this);
    this.loadOwners = this.loadOwners.bind(this);
    this.onHandleFinishOwner = this.onHandleFinishOwner.bind(this);
    this.renderCategoriesTag = this.renderCategoriesTag.bind(this);
    this.loadOwners();
  }

  renderCategoriesTag = () => (
    <Tags
      textInputProps={{
        placeholder: 'Add any categories that describe the item',
      }}
      initialTags={this.state.categories}
      onChangeTags={tags => this.setState({categories: tags})}
      containerStyle={{ justifyContent: 'center' }}
      tagContainerStyle={styles.tagContainer}
      maxNumberOfTags={this.state.maxNumberOfTags}
      inputStyle={styles.tagInputTextStyle}
      renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
        <TouchableOpacity key={`${tag}-${index}`} onPress={onPress} >
          <Text>{`${tag}${index !== this.state.maxNumberOfTags - 1 ? ', ' : ''}`}</Text>
        </TouchableOpacity>
      )}
    />
  );

  loadOwners = () => {
    getListOfProfiles()
      .then(data => {
        const owners = data.map(d => {
          var name = `${d.firstName}`;
          if (d.lastName !== '') {name += ` ${d.lastName}`;}
          return {...d, fullName: name};
        });
        this.setState({
          ...this.state,
          owners: owners,
          isLoading: false, warning: ''});
        })
      .catch(err =>{
        console.log(err);
        this.setState({warning: 'Something is not right please refresh'});
      });
  }

  goBack = () => {this.props.navigation.navigate('Inventory');};

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

  onAddOwner = () => {
    if (this.state.owners.length === 0) {
      this.setState({isLoading: true, warning: 'Owner list is still being loaded, please wait and try again'});
      return;
    }
    this.setState({showOwnerChecklist: true});
  }

  onHandleFinishOwner = (data) => {
    this.setState({pickedOwners: data, isLoading: false, warning: '', showOwnerChecklist: false});
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

    const owners = this.state.pickedOwners.map(data => {return data.uid;});
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
        isLoading: true,
        isLoadingImage: state.photos.length > 0,
      };
    }, () => this.addItem(itemToUpload));
  }

  addItem = data => {
    const completeStorage = () => {this.setState({...this.state, isLoadingImage: false});};

    registerItem(data, null, null, completeStorage)
      .then(() => this.setState({
        ...this.state,
        isLoading: false,
        showFinishedMessage: true,
      }))
      .catch(err => {
        console.log(err);
        this.setState({...this.state, isLoading: false, warning: err.toString()});
      });
  }



  render(){
    console.log(this.state.dateOwned.valueOf());

    return (
      <SafeAreaView style = {styles.viewContainer}>
        {this.state.warning !== '' && <Text>{this.state.warning}</Text>}
        {this.state.isLoading && <ActivityIndicator animating size="large" />}
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
          <Text style = {styles.textStyle}>
          Owner:
          </Text>
          <PickerCheckBox
          data={this.state.owners}
          headerComponent={<Text style={{fontSize:25}} >owners</Text>}
          OnConfirm={(pItems) => this.onHandleFinishOwner(pItems)}
          ConfirmButtonTitle="OK"
          DescriptionField="fullName"
          KeyField="uid"
          placeholder="select owners"
          arrowColor="#338c83"
          arrowSize={10}
          />
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
          <Text style = {styles.textStyle}>
          Description:
          </Text>
          <TextInput
            style = {styles.inputTextStyles}
            autoCorrect={false}
            onChangeText={input => this.setState({ description: input })}
            value={this.state.description}
          />

          <Text style = {styles.textStyle}>
          Categories:
          </Text>
          <Text style = {styles.textStyle}>(Add up to {this.state.maxNumberOfTags}, press space after each tag to add tag, touch tag to delete tag)</Text>
          {this.renderCategoriesTag()}
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
    flex: 1
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
  tagStyle: {
    flex: 1,
    borderRadius: 25,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#338c83',
  },
  tagSystemContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'stretch',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  tagContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'stretch',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  tagInputTextStyle: { 
    backgroundColor: 'white', 
    borderBottomColor: '#000000',
    borderBottomWidth: 1 
  },
});

export default connect((state) => {
  const {user} = state;
  return {uid: user.uid, email: user.email};
}, null)(ItemRegistrationForm);
