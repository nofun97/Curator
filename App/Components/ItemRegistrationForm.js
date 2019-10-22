import React, {Component} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { SliderBox } from 'react-native-image-slider-box';

export default class ItemRegistrationForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      owner: '',
      dateAdded: '',
      origin: '',
      description: '',
      images:[/*give list of images*/""]
    };
    this.onPressHandler = this.onPressHandler.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  onPressHandler(){
    this.props.navigation.navigate('Inventory');
  }

  getImages = () =>{
    //Get id and shit
    let image=".";
    while(image!=null){
      //get from backend
    }
  }

  render(){
    return (
      <View>
        <SliderBox
          style= {styles.sliderBoxStyle}
          images={this.state.images}
          sliderBoxHeight={200}
          circleLoop/>
        <ScrollView style = {styles.scrollViewContainer}>
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
          <TextInput
            style = {styles.inputTextStyles}
            autoCorrect={false}
            onChangeText={input => this.setState({ owner: input })}
            value={this.state.owner}
            underlineColorAndroid={'#65807d'}
            placeholderTextColor="#6f8c89"
            placeholder="Enter artifact's owner "
          />
          <Text style = {styles.textStyle}>
          Date Added:
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
            onDateChange={(date) => {this.setState({dateAdded: date});}}
          />
          <Text style ={styles.textStyle}>
          Origin:
          </Text>
          <TextInput
            style = {styles.inputTextStyles}
            autoCorrect={false}
            onChangeText={input => this.setState({ origin: input })}
            value={this.state.origin}
            underlineColorAndroid={'#65807d'}
            placeholderTextColor="#6f8c89"
            placeholder="Enter artifact's origin "
          />
          <Text style = {styles.textStyle}>
          Description:
          </Text>
          <TextInput
            style = {styles.inputTextStyles}
            autoCorrect={false}
            onChangeText={input => this.setState({ description: input })}
            value={this.state.description}
            underlineColorAndroid={'#65807d'}
            placeholderTextColor="#6f8c89"
            placeholder="Enter artifact's description "
          />
          <TouchableOpacity
            style={styles.addButtonStyle}
            onPress={this.onPressHandler}>
            <Text style={styles.buttonTextStyle}> Add Item </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButtonStyle}
            onPress={this.onPressHandler}>
            <Text style={styles.buttonTextStyle}> Cancel </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
    fontFamily: 'Montserrat',
    alignSelf: 'flex-start',
  },
  inputTextStyles:{
    marginBottom: 10,
    color: '#d4d4d4',
    alignSelf: 'center',
    width: 260,
  },
  datePickerStyle:{
    width: 180,
    marginTop: 10,
    marginBottom: 10,
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
});
