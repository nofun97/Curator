/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
// import AccountDetailScreen from "./Screens/AccountDetailScreen"; -- done not tested
import InventoryPage from '../Pages/InventoryPage';
 import ItemDetailsPage from '../Pages/ItemDetailsPage';
// import RegisterItemScreen from "./Screens/RegisterItemScreen";

const navigator = createStackNavigator(
  {
    Login: LoginPage,
    Register: RegisterPage,
    // RegisterItem: RegisterItemScreen,
    // Account: AccountDetailScreen,
    Inventory: InventoryPage,
    ItemDetails: ItemDetailsPage
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'Curator',
      // change the navigation bar's styling here
      headerStyle: {
        backgroundColor: '#349e77',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default createAppContainer(navigator);
