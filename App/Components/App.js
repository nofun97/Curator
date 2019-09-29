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
import {createAppContainer, createStackNavigator} from "react-navigation";
import LoginPage from "./Screens/LoginScreen";
import RegisterPage from "./Screens/RegisterScreen";
// import AccountDetailScreen from "./Screens/AccountDetailScreen";
// import InventoryScreen from "./Screens/InventoryScreen";
// import ItemDescriptionScreen from "./Screens/ItemDescriptionScreen";
// import RegisterItemScreen from "./Screens/RegisterItemScreen";

const navigator = createStackNavigator(
    {
        Login: LoginPage,
        Register: RegisterPage,
        // RegisterItem: RegisterItemScreen,
        // Account: AccountDetailScreen,
        // Inventory: InventoryScreen,
        // Item: ItemDescriptionScreen
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
        }
      }
    }
);

export default createAppContainer(navigator);
