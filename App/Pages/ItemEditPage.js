import React,{Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import DatePicker from 'react-native-datepicker';
import Modal from 'react-native-modal';
import ImageDetails from "../Components/ImageDetails"

export default class ItemEditPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: "yeet",
      owners: "yeetersons",
      description: "passed down from your great yeetparents",
      dateOwned:"1900 Dec 2010",
      categories: "Yeet, Yeetyeet, yeetyeetyeet",
      images:["https://source.unsplash.com/1024x768/?nature ","https://source.unsplash.com/800x600/?water"],
      isModalVisible: false,
      currentIndex: 0
    };
    this.onItemSavePress = this.onItemSavePress.bind(this);
    this.onImagePress = this.onImagePress.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
    this.onDeletePress=this.onDeletePress.bind(this);
  }

  onItemSavePress = () => {
    this.props.navigation.navigate('Inventory');
  };

  toggleModal = () =>{
    this.setState({isModalVisible:!this.state.isModalVisible});
  }

  onImagePress = (index) => {
    this.setState({isModalVisible : true});
    this.setState({currentIndex : index});
  };
  onDeletePress = ()=>{
    //delete item
    this.setState({isModalVisible : false});
  }

  render(){
    return(
      <View>
        <SliderBox
          style= {styles.sliderBoxStyle}
          images={this.state.images}
          sliderBoxHeight={200}
          circleLoop
          onCurrentImagePressed={(index)=>this.onImagePress(index)}/>
        <Modal
          isVisible={this.state.isModalVisible}>
          <ImageDetails items={this.state.images[this.state.currentIndex]}/>
          <TouchableOpacity
            onPress= {this.onDeletePress}>
            <Text style={styles.imageTextStyle}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.toggleModal}>
            <Text style={styles.imageTextStyle}t>Cancel</Text>
          </TouchableOpacity>
        </Modal>

        <ScrollView style={styles.viewStyle}>
          <Text style = {styles.titleStyle}>
            Edit Artifact Information
          </Text>

          <Text style = {styles.textStyle}>
            Name :
          </Text>
          <TextInput
            style = {styles.textInputStyle}
            placeholder={this.state.name}
            underlineColorAndroid={'#65807d'}
            placeholderTextColor="#6f8c89"
            onChangeText={input=>this.setState({name:input})}/>

          <Text style = {styles.textStyle}>
            Owners :
          </Text>
          <TextInput
            style = {styles.textInputStyle}
            placeholder={this.state.owners}
            underlineColorAndroid={'#65807d'}
            placeholderTextColor="#6f8c89"
            onChangeText={input=>this.setState({owners:input})}/>

          <Text style = {styles.textStyle}>
            Description :
          </Text>
          <TextInput
            style = {styles.textInputStyle}
            placeholder={this.state.description}
            underlineColorAndroid={'#65807d'}
            placeholderTextColor="#6f8c89"
            onChangeText={input=>this.setState({description:input})}/>

          <Text style = {styles.textStyle}>
            Date Owned :
          </Text>
          <DatePicker
            style={styles.datePickerStyle}
            date={this.state.date}
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
            onDateChange={(date) => {this.setState({dateOwned: date});}}
          />

          <Text style = {styles.textStyle}>
            Categories :
          </Text>
          <TextInput
            style = {styles.textInputStyle}
            placeholder={this.state.categories}
            underlineColorAndroid={'#65807d'}
            placeholderTextColor="#6f8c89"
            onChangeText={input=>this.setState({categories:input})}/>

          <TouchableOpacity
            style={styles.saveButtonStyle}
            onPress={this.onItemSavePress}>
            <Text style = {styles.buttonTextStyle}> Save </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButtonStyle}
            onPress={this.onItemSavePress}>
            <Text style = {styles.buttonTextStyle}> Cancel </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  viewStyle:{
    backgroundColor: '#264242',
    width:'100%',
  },
  sliderBoxStyle:{

  },
  imageTextStyle:{
    color: '#ffffff',
    fontFamily: 'proxima-nova-semibold',
    fontSize: 18,
    marginBottom: 12,
    marginTop: 7,
    alignSelf: 'center',
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
  datePickerStyle:{
    marginBottom: 10,
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
  }
})
