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
import HomeScreen from "./HomeScreen";

const navigator = createStackNavigator(
    {
      Home: HomeScreen
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        title: 'Curator',
        // change the navigation bar's styling here
        headerStyle: {
          backgroundColor: '#509682',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }
    }
);

export default createAppContainer(navigator);
