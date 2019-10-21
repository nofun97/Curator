import React,{Compoent} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

export default class ItemEditPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.item.id,
      name: "yeet",
      owners: "yeetersons",
      description: "passed down from your great yeetparents",
      dateRegistered:"1909 Nov 2019",
      dateOwned:"1900 Dec 2010",
      categories: "Yeet, Yeetyeet, yeetyeetyeet"
    };
    this.onEditItemPress = this.onEditItemPress.bind(this);
  }

  onItemSavePress = () => {
    this.props.navigation.navigate('Inventory');
  };

  render(){
    return(
      <View style={styles.viewStyle}>
        <Text style = {styles.textStyle}>
          Name :
        </Text>
        <TextInput
          style = {styles.textInputStyle}
          placeholder={this.state.name}/>

        <Text style = {styles.textStyle}>
          Owners :
        </Text>
        <TextInput
          style = {styles.textInputStyle}
          placeholder={this.state.owners}/>

        <Text style = {styles.textStyle}>
          Description :
        </Text>
        <TextInput
          style = {styles.textInputStyle}
          placeholder={this.state.description}/>

        <Text style = {styles.textStyle}>
          Date Registered :
        </Text>
        <TextInput
          style = {styles.textInputStyle}
          placeholder={this.state.dateRegistered}/>

        <Text style = {styles.textStyle}>
          Date Owned :
        </Text>
        <TextInput
          style = {styles.textInputStyle}
          placeholder={this.state.dateOwned}/>

        <Text style = {styles.textStyle}>
          Categories :
        </Text>
        <TextInput
          style = {styles.textInputStyle}
          placeholder={this.state.categories}/>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.onItemSavePress}>
          <Text> Save </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.onItemSavePress}>
          <Text> Cancel </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  viewStyle:{

  },
  textStyle:{

  },
  textInputStyle:{

  },
  buttonStyle:{

  }
})
