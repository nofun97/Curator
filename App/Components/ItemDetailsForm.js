import React, {Component} from 'react';
import {View, Text, DatePicker, StyleSheet, TouchableOpacity,TextInput} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import {connect} from 'react-redux';
import {viewItem} from '../controllers/items';
import {getProfilesOfIds} from '../controllers/authentications';
import Modal from 'react-native-modal';

class ItemDetailsForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      warning: '',
      photos: [],
      isLoaded: false,
      allowEdit: false,
      categories: [],
      images:["https://source.unsplash.com/1024x768/?nature ","https://source.unsplash.com/800x600/?water"],
      confirmDelete: true,
      deleteButtonText: "Delete",
      isModalVisible: false
    };
    this.itemLoad = this.itemLoad.bind(this);
    this.getNames = this.getNames.bind(this);
    this.onEditItemPress = this.onEditItemPress.bind(this);
    this.onDeleteItemPress = this.onDeleteItemPress.bind(this);
    this.displayDate = this.displayDate.bind(this);
    this.displayName = this.displayName.bind(this);
  }

  itemLoad = () => {
    viewItem(this.state.id)
      .then(data => {
        this.setState({
          ...this.state,
          description: data.description,
          dateRegistered: data.dateRegistered,
          photos: data.photos,
          dateOwned: data.dateOwned,
          categories: data.categories,
          name: data.name,
          photosReferences: data.photosReferences,
          warning: '',
        }, () => this.getNames(data.owners));
      })
      .catch(err => {
        console.log(err);
        this.setState({...this.state, warning: 'Something is not right, please go back'});
      });
  }

  displayDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  displayName = (data) => {
    if (!this.state.isLoaded) return;
    const names = data.map(profile => {
      return profile.fullName
    });
    return names.join(', ');
  }

  getNames = (ids) => {
    getProfilesOfIds(ids)
      .then(data => {
        this.setState({...this.state, owners: data, isLoaded: true});
      })
      .catch(err => {
        console.log(err);
        this.setState({...this.state, warning: 'Something is not right, please go back'});
      })
  }

  componentDidMount = () => {this.itemLoad();};

  onEditItemPress = () => {
    if (!this.state.isLoaded) {
      this.setState({warning: 'Please wait until data is loaded'});
      return;
    }
    this.props.navigation.navigate('ItemEdit',{
      id: this.state.id,
      description: this.state.description,
      photos: this.state.photos,
      dateOwned: this.state.dateOwned,
      categories: this.state.categories,
      name: this.state.name,
      owners: this.state.owners,
      photosReferences: this.state.photosReferences,
    });
  };

  onDeletePress = ()=>{
    this.setState({isModalVisible:true})
  }

  onDeleteItemPress = () =>{
    //Delete it
    
  }

  getImages = () =>{
    //Get id and shit
    let image=".";
    while(image!=null){
      //get from backend
    }
  }


  render(){
    return(
      <View style={styles.viewStyle}>
        <SliderBox
          style= {styles.sliderBoxStyle}
          images={this.state.photos}
          sliderBoxHeight={200}
          circleLoop
          />

        <Modal
          isVisible={this.state.isModalVisible}>
          <ImageDetails items={this.state.images[this.state.currentIndex]}/>
          <TouchableOpacity
            onPress= {this.onDeleteItemPress}>
            <Text style={styles.imageTextStyle}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.setState({isModalVisible:false})}>
            <Text style={styles.imageTextStyle}t>Cancel</Text>
          </TouchableOpacity>
        </Modal>

        {this.state.warning !== '' && <Text>{this.state.warning}</Text>}

        <Text style = {styles.titleStyle}>
          Artifact Details
        </Text>
        <Text style = {styles.textStyle}>
          Name: {this.state.name}
        </Text>
        <Text style = {styles.textStyle}>
          Owner: {this.displayName(this.state.owners)}
        </Text>
        <Text style = {styles.textStyle}>
          Description: {this.state.description}
        </Text>
        <Text style = {styles.textStyle}>
          Date Owned: {this.displayDate(new Date(this.state.dateOwned))}
        </Text>
        <Text style = {styles.textStyle}>
          Categories: {this.state.categories.join(', ')}
        </Text>

        <TouchableOpacity
          style={styles.editButtonStyle}
          onPress={this.onEditItemPress}>
          <Text style = {styles.buttonTextStyle}> Edit </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButtonStyle}
          onPress={this.onDeletePress}>
          <Text style = {styles.buttonTextStyle}> Delete </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#264242',
  },

  sliderBoxStyle:{

  },
  titleStyle: {
    color: '#ffffff',
    fontFamily: 'proxima-nova-semibold',
    fontSize: 18,
    marginBottom: 12,
    marginTop: 7,
    alignSelf: 'center',
  },
  textInputStyle:{
    color: '#ffffff',
    fontFamily: 'Montserrat',
    marginLeft: 124,
    marginBottom: 10,
  },
  textStyle: {
    color: '#ffffff',
    fontFamily: 'Montserrat',
    marginLeft: 76,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  editButtonStyle: {
    width: 245,
    marginTop: 10,
    marginBottom: 25,
    height: 50,
    backgroundColor: '#5f9999',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: '#ffffff',
  }
})

export default connect((state) => {
  const {user} = state;
  return {uid: user.uid, email: user.email};
}, null)(ItemDetailsForm);
