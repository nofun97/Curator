import React, {Component} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  View,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { SliderBox } from 'react-native-image-slider-box';
import {registerItem} from '../controllers/items';
import {connect} from 'react-redux';
import moment from 'moment';
import PickerCheckBox from 'react-native-picker-checkbox';
import {getListOfProfiles} from '../controllers/authentications';
import Tags from 'react-native-tags';
import ImagePickingComponent from './ImagePickingComponent';

class ItemRegistrationForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      owners: [],
      dateOwned: moment(),
      pickedOwners: [],
      description: '',
      photos: [],
      categories: [],
      warning: '',
      isLoadingImage: false,
      isLoading: false,
      finishedMessage: <Text>Uploading is complete! You can continue doing anything else</Text>,
      showFinishedMessage: false,
      maxNumberOfTags: 5,
    };
    this.onPressHandler = this.onPressHandler.bind(this);
    this.addItem = this.addItem.bind(this);
    this.goBack = this.goBack.bind(this);
    this.loadOwners = this.loadOwners.bind(this);
    this.onHandleFinishOwner = this.onHandleFinishOwner.bind(this);
    this.renderCategoriesTag = this.renderCategoriesTag.bind(this);
    this.loadOwners();
  }

  // The tag component for categories
  renderCategoriesTag = () => (
    <Tags
      textInputProps={{
        placeholder: 'Add any categories that describe the item',
      }}
      initialTags={this.state.categories}
      onChangeTags={tags => this.setState({categories: tags})}
      containerStyle={styles.tagSystemContainerStyle}
      tagContainerStyle={styles.tagContainerStyle}
      maxNumberOfTags={this.state.maxNumberOfTags}
      inputStyle={styles.tagInputTextStyle}
      tagTextStyle={styles.tagTextStyle}
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

  onHandleFinishOwner = (data) => {
    this.setState({pickedOwners: data, isLoading: false, warning: ''});
  }

  // saving the item
  onPressHandler = () => {
    const owners = this.state.pickedOwners.map(data => {return data.uid;});
    const dateOwned = this.state.dateOwned.valueOf();

    // transformed values to upload
    const itemToUpload = {
      name: this.state.name,
      owners: owners,
      dateOwned: dateOwned,
      description: this.state.description,
      photos: this.state.photos,
      categories: this.state.categories,
    };

    // set loading and call the controller to add item
    this.setState((state, props) => {
      return {
        ...state,
        isLoading: true,
        isLoadingImage: state.photos.length > 0,
      };
    }, () => this.addItem(itemToUpload));
  }

  // calls the controller to add item
  addItem = data => {
    const completeStorage = () => {this.setState({...this.state, isLoadingImage: false});};

    try {
      registerItem(data, null, null, completeStorage)
        .then(() => {
          this.setState({
          ...this.state,
          isLoading: false,
          showFinishedMessage: true,
        }, () => {this.props.navigation.goBack();});
       })
        .catch(err => {
          console.log(err);
          this.setState({...this.state, isLoading: false, warning: err.message});
        });
    }
    catch (err) {
      this.setState({...this.state, isLoading: false, warning: err.message});
    }

  }

  render(){
    console.log(this.state.dateOwned.valueOf());

    return (
      <ScrollView>
      <View>
        <SliderBox
          style= {styles.sliderBoxStyle}
          images={this.state.photos}
          circleLoop
          sliderBoxHeight={200}
          />
      </View>
        <ScrollView style = {styles.scrollViewContainer}>
        {this.state.warning !== '' && <Text style={styles.textStyle}>{this.state.warning}</Text>}
        {this.state.isLoading && <ActivityIndicator animating size="large" />}
        {this.state.showFinishedMessage && <SafeAreaView>{this.state.finishedMessage}</SafeAreaView>}
          <Text style = {styles.nameStyle}>
          Name:
          </Text>
          <TextInput
            style = {styles.inputTextStyles}
            autoCorrect={false}
            onChangeText={input => this.setState({ name: input })}
            value={this.state.name}
            underlineColorAndroid={'#65807d'}
            placeholderTextColor="#6f8c89"
            placeholder="Enter artifact's name "
          />
          <Text style = {styles.textStyle}>
          Owner:
          </Text>
        <View style={styles.selectOwnersButton}>
          <PickerCheckBox
            data={this.state.owners}
            headerComponent={<Text style={{fontSize:25}} >owners</Text>}
            OnConfirm={(pItems) => this.onHandleFinishOwner(pItems)}
            ConfirmButtonTitle="OK"
            DescriptionField="fullName"
            KeyField="uid"
            placeholder="Press to select owners"
            arrowColor="#338c83"
            arrowSize={10}
            style={styles.textStyle}
          />
        </View>
        <Text style = {styles.textStyle}>
          Date Owned:
        </Text>
        <DatePicker
          style={styles.datePickerStyle}
            date={this.state.dateOwned}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          cancelBtnText="Cancel"
          confirmBtnText="Confirm"
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
            dateText: {
              color: '#fff',
            },
          }}
            onDateChange={(date) => {this.setState({dateOwned: moment(date)});}}
        />
        <Text style = {styles.textStyle}>
        Description:
        </Text>
        <TextInput
          multiline
          autoCorrect={false}
          style = {styles.inputTextStyles}
          value={this.state.description}
          onChangeText={input => this.setState({ description: input })}
          underlineColorAndroid={'#65807d'}
          placeholderTextColor="#6f8c89"
          placeholder="Enter artifact's description "
        />
          <Text style = {styles.textStyle}>
          Categories:
          </Text>
          <Text style = {styles.textStyle}>(Describe this artifact with up to {this.state.maxNumberOfTags} tags. Press
            space after typing to add tag. Touch tag to delete it.) </Text>
          {this.renderCategoriesTag()}
          <ImagePickingComponent
            OnError={err => this.setState({...this.state, warning: err})}
            OnSucceed={uri => this.setState({...this.state, photos: [...this.state.photos, uri]})}
            ButtonStyle={styles.addButtonStyle}
            ButtonTextStyle={styles.buttonTextStyle}
            />

        <TouchableOpacity
          style={styles.addButtonStyle}
          onPress={this.onPressHandler}>
          <Text style={styles.buttonTextStyle}> Add Item </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButtonStyle}
            onPress={this.goBack}>
          <Text style={styles.buttonTextStyle}> Cancel </Text>
        </TouchableOpacity>
        </ScrollView>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  scrollViewContainer:{
    width: '100%',
    backgroundColor: '#264242',
  },
  nameStyle: {
    color: '#ffffff',
    fontFamily: 'Montserrat',
    marginTop: 10,
    marginLeft: 70,
    alignSelf: 'flex-start',
  },
  textStyle: {
    color: '#ffffff',
    marginLeft: 70,
    marginRight: 70,
    fontFamily: 'Montserrat',
    alignSelf: 'flex-start',
  },
  inputTextStyles:{
    marginTop: -5,
    marginBottom: 15,
    color: '#d4d4d4',
    alignSelf: 'center',
    width: 260,
  },
  datePickerStyle:{
    width: 180,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 70,
  },
  addButtonStyle: {
    width: 245,
    marginTop: 5,
    marginBottom: 25,
    height: 50,
    borderRadius: 2,
    backgroundColor: '#5f9999',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonStyle: {
    width: 245,
    marginBottom: 25,
    height: 50,
    borderRadius: 2,
    backgroundColor: '#5f9999',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: '#ffffff',
  },
  tagSystemContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 70,
    marginBottom: 50,
    marginTop: 10,
  },
  tagContainerStyle: {
    flexWrap: 'wrap',
    backgroundColor: '#338c83',
  },
  wholeViewStyle: {
    flex: 1,
    backgroundColor: '#338c83',
  },
  selectOwnersButton: {
    flex: 1,
    marginTop: 7,
    marginBottom: 20,
    width: '65%',
    marginHorizontal: '17%',
    borderWidth: 1.5,
    borderColor: '#6f8c89',
  },
});

export default connect((state) => {
  const {user} = state;
  return {uid: user.uid, email: user.email};
}, null)(ItemRegistrationForm);
