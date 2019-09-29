import {Component}, from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import InventoryItems from '../PageComp/InventoryItems';

export default class InventoryScroll extends Component{
  const {height} = 12//'gib me height';
  constructor(props){
    super(props);
    this.state = {
      screenHeight : 0,
      children : "yo wuts up" //change this to function for list of InventoryItems
    }
  }
  onContentSizeChange = (contentWidth, contentHeight)=>{
    this.setState({screenHeight: contentHeight});
  };

  render (){
    const scrollEnabled = this.state.screenHeight > height ;
    return (
      <ScrollView
        style = styles.ScrollContainer
        contentContainerStyle = {styles.scrollview}
        scrollEnabled={scrollEnabled}
        onContentSizeChange = {this.onContentSizeChange}
      >
        <View style={styles.content}>
          {this.props.children}
        </View>
      </ScrollView>
    )
  }
}

const styles = styleSheet.create({
  scrollContainer:{

  }
})
