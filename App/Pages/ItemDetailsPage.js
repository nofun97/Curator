import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import ItemDetailsForm from '../Components/ItemDetailsForm';

export default class ItemDetailsPage extends Component {
  render(){
    const { navigation } = this.props;
    const towners = navigation.getParam('owners', '');
    const tname = navigation.getParam('name', '');
    const tdescription = navigation.getParam('description', '');
    const tdateRegistered = navigation.getParam('dateRegistered', '');
    const tdateOwned = navigation.getParam('dateOwned', '');
    const tcategories = navigation.getParam('categories', '');
    const data={owners: towners, name: tname, description:tdescription, dateRegistered:tdateRegistered, dateOwned:tdateOwned, categories: tcategories}
    return(
      <View style = {styles.viewContainer}>
        <ItemDetailsForm
          style = {styles.itemDetailsForm}
          navigation={this.props.navigation}
          item= {data}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer:{

  },
  itemDetailsForm:{

  }
})
