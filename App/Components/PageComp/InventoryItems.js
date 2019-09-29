import {Component}, from 'react';
import {View, Image, Text`, TouchableOpacity} from 'react-native';

export default class InventoryItems extends Component {
  render(){
    return(
      <View style= styles.container>
        <TouchableOpacity>
          <Image
            style={styles.itemImage}
            source ={require['../../someplace]'}/>
          <Text style=styles.textStyle>input some text here
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container : {
    flexDirection : 'row'
  },
  itemImage : {

  },
  textStyle : {

  }
})
