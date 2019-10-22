import React,{Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import Tags from 'react-native-tags';
import ImagePickingComponent from '../Components/ImagePickingComponent';
import PickerCheckBox from 'react-native-picker-checkbox';
import {editItem, deleteImageAsPromise, uploadAdditionalImagesAsPromise} from '../controllers/items';
import {getListOfProfiles} from '../controllers/authentications';
import ImageSelection from '../Components/ImageSelection';
export default class ItemEditPage extends Component{
  constructor(props){
    super(props);
    console.log('HERE');
    this.state = {
      id: this.props.navigation.getParam('id'),
      name: this.props.navigation.getParam('name'),
      pickedOwners: this.props.navigation.getParam('owners'),
      description: this.props.navigation.getParam('description'),
      dateOwned: this.props.navigation.getParam('dateOwned'),
      categories: this.props.navigation.getParam('categories'),
      photosReferences: this.props.navigation.getParam('photosReferences'),
      photos: this.props.navigation.getParam('photos'),
      dataModified: false,
      additionalPhotos: [],
      photosToDelete: [],
      warning: '',
      owners: [],
      isLoading: false,
      isProcessingPhotos: false,
    };
    this.onItemSavePress = this.onItemSavePress.bind(this);
    this.saveModifications = this.saveModifications.bind(this);
    this.loadOwners = this.loadOwners.bind(this);
    this.onHandleFinishOwner = this.onHandleFinishOwner.bind(this);
    this.onPressImage = this.onPressImage.bind(this);
    this.displayFullName = this.displayFullName.bind(this);
    console.log(this.state.pickedOwners);
    this.loadOwners();
  }

  onPressImage = (reference, picked) => {
    if (!picked){
      for (let i = 0; i < this.state.photosToDelete.length; i++){
        if (this.state.photosToDelete[i].name === reference.name) {
          var newSelections = this.state.photosToDelete;
          newSelections.splice(i);
          this.setState({...this.state, photosToDelete: newSelections});
          return;
        }
      }
    }
    this.setState({...this.state, photosToDelete: [...this.state.photosToDelete, reference]});
  }

  onItemSavePress = () => {
    const isProcessingPhotos = this.state.additionalPhotos.length !== 0 || this.state.photosToDelete.length !== 0;
    this.setState({...this.state, isLoading: true, isProcessingPhotos: isProcessingPhotos}, () => this.saveModifications());
  };

  saveModifications = () => {
    var editPromise = [];

    if (this.state.dataModified){
      editPromise.push(editItem(this.state.id, {
        name: this.state.name,
        owners: this.state.pickedOwners,
        dateOwned: this.state.dateOwned.valueOf(),
        description: this.state.description,
        categories: this.state.categories,
      }));
    }

    if (this.state.additionalPhotos.length !== 0){
      editPromise.push(
        uploadAdditionalImagesAsPromise(this.state.id,
            this.state.additionalPhotos
            , null, 
            () => {this.setState({warning: 'Image is not uploaded correctly, please try again'});}, 
            () => {this.setState({isProcessingPhotos: false});}));
    }

    if (this.state.photosToDelete.length !== 0) {
      editPromise.push(deleteImageAsPromise(this.state.id, this.state.photosToDelete));
    }

    Promise.all(editPromise)
      .then(() => {
        this.setState({isLoading: false, warning: 'You modification is saved! Please return to the previous page.'});
      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false, warning: err.toString()});
      });
  }

  onHandleFinishOwner = (data) => {
    this.setState({pickedOwners: data});
  }

  loadOwners = () => {
    getListOfProfiles()
      .then(data => {
        const owners = data.map(d => {
          return {...d, fullName: this.displayFullName(d)};
        });

        var modifiedPickedOwners = this.state.pickedOwners.map(pickedOwners => {
          for (let i = 0; i < owners.length; i++){
            if (pickedOwners.uid === owners[i].uid) {return owners[i];}
          }
        });

        this.setState({
          ...this.state,
          owners: owners,
          pickedOwners: modifiedPickedOwners,
          isLoading: false,
          warning: ''});
        })
      .catch(err =>{
        console.log(err);
        this.setState({warning: 'Something is not right please refresh'});
      });
  }

  displayFullName = (name) => {
    if (name === undefined) return;
    var fullName = name.firstName;
    if (name.lastName !== '') {fullName += ' ' + name.lastName;};
    return fullName;
  }

  render(){
    return (
      <ScrollView style={styles.viewStyle}>
        {this.state.isLoading && <ActivityIndicator animating size="large" />}

        {this.state.warning !== '' && (
          <Text style={styles.textStyle}>{this.state.warning}</Text>
        )}
        <Text style = {styles.titleStyle}>
          Edit Artifact Information
        </Text>

        <Text style = {styles.textStyle}>
          Name :
        </Text>
        <TextInput
          style = {styles.textInputStyle}
          value={this.state.name}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          onChangeText={t => {this.setState({name: t, dataModified: true});}}
          />

        <Text style = {styles.textStyle}>
          Owners : {this.state.pickedOwners.map((d) => {
            return this.displayFullName(d)
          }).join(', ')}
        </Text>
        <View style={{flex: 1, marginHorizontal: 70}}>
          <PickerCheckBox
            data={this.state.owners}
            headerComponent={<Text style={{fontSize:25}} >owners</Text>}
            OnConfirm={(pItems) => this.setState({pickedOwners: pItems, dataModified: true})}
            ConfirmButtonTitle="OK"
            DescriptionField="fullName"
            KeyField="uid"
            placeholder="Press to select owners"
            arrowColor="#338c83"
            arrowSize={10}
            checkedItems={this.state.pickedOwners}
            style={styles.textStyle}
          />
        </View>

        <Text style = {styles.textStyle}>
          Description :
        </Text>
        <TextInput
          multiline
          style = {styles.textInputStyle}
          value={this.state.description}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          onChangeText={t => {this.setState({description: t, dataModified: true});}}
          />

        <Text style = {styles.textStyle}>
          Date Owned :
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
              top: 4,
              left: 0,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
            onDateChange={(date) => {this.setState({dateOwned: moment(date), dataModified: true});}}
        />

        <Text style = {styles.textStyle}>
          Categories :
        </Text>
        <Text style = {styles.textStyle}>(Add up to {this.state.maxNumberOfTags}, press space after each tag to add tag, touch tag to delete tag)</Text>

        <Tags
          textInputProps={{
            placeholder: 'Add any categories that describe the item',
          }}
          initialTags={this.state.categories}
          onChangeTags={tags => this.setState({categories: tags, dataModified: true})}
          containerStyle={styles.tagSystemContainerStyle}
          tagContainerStyle={styles.tagContainerStyle}
          maxNumberOfTags={this.state.maxNumberOfTags}
          inputStyle={styles.tagInputTextStyle}
          tagTextStyle={styles.tagTextStyle}
        />

        <ImagePickingComponent
          OnError={err => this.setState({...this.state, warning: err})}
          OnSucceed={uri => this.setState({...this.state, additionalPhotos: [...this.state.additionalPhotos, uri]})}
          ButtonStyle={styles.saveButtonStyle}
          ButtonTextStyle={styles.buttonTextStyle}
          />

        { this.state.photosReferences.length > 0 &&
        <Text style = {styles.textStyle}>
          Choose images to delete:
        </Text>}
        <ImageSelection references={this.state.photosReferences} onPressImage={this.onPressImage}/>
        <TouchableOpacity
          style={styles.saveButtonStyle}
          onPress={this.onItemSavePress}>
          <Text style = {styles.buttonTextStyle}> Save </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButtonStyle}
          onPress={() => {this.props.navigation.goBack();}}>
          <Text style = {styles.buttonTextStyle}> Cancel </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  datePickerStyle:{
    width: 180,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 70,
  },
  viewStyle:{
    backgroundColor: '#264242',
    width:'100%',
  },
  titleStyle: {
    color: '#ffffff',
    fontFamily: 'proxima-nova-semibold',
    fontSize: 18,
    marginBottom: 12,
    marginTop: 7,
    alignSelf: 'center',
  },

  textStyle: {
    color: '#ffffff',
    fontFamily: 'Montserrat',
    marginLeft: 61,
    alignSelf: 'flex-start',
  },
  textInputStyle:{
    marginBottom: 10,
    color: '#ffffff',
    fontFamily: 'Montserrat',
    marginLeft: 58,
    width: 280,
  },
  saveButtonStyle: {
    width: 245,
    marginTop: 10,
    marginBottom: 25,
    height: 50,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  cancelButtonStyle: {
    width: 245,
    marginBottom: 25,
    height: 50,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: '#ffffff',
  },
  tagContainerStyle: {
    flexWrap: 'wrap',
    backgroundColor: '#338c83'
  },
  tagSystemContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 70,
    marginBottom: 50,
    marginTop: 10,
  },
});
