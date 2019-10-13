import React, {Component} from 'react';
import {View} from 'react-native';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class ItemRegistrationForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      owner: '',
      dateAdded: '',
      origin: '',
      description: '',
    };
    this.onPressHandler = this.onPressHandler.bind(this);
  }

  onPressHandler(){
    this.props.navigation.navigate('Inventory');
  }

  render(){
    return (
      <View style = {styles.viewContainer}>
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
        <TextInput
          style = {styles.inputTextStyles}
          autoCorrect={false}
          onChangeText={input => this.setState({ owner: input })}
          value={this.state.owner}
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
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.onPressHandler}>
          <Text> Add Item </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.onPressHandler}>
          <Text> Cancel </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer:{

  },
  textStyle:{

  },
  inputTextStyles:{

  },
  datePickerStyle:{
    width: 200,
  },
  buttonStyle:{
    
  }
});
