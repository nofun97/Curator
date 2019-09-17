import React from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import GeneralComponent from "../components/GeneralComponent";

const ScreenBox = styled.View`
	flex: 1;
	background-color: #333333;
`;

const RegisterScreen = ({navigation}) => {
    return (
        <ScreenBox>
            <GeneralComponent navigation={navigation}
                              type = 'text'
                              top = '15'
                              left = '0'
                              text = {'Email Address:'}/>
            <GeneralComponent navigation={navigation}
                              type = 'input'
                              top = '15'
                              left = '0'/>
            <GeneralComponent navigation={navigation}
                              type = 'text'
                              top = '10'
                              left = '0'
                              text = {'First Name:'}/>
            <GeneralComponent navigation={navigation}
                              type = 'input'
                              top = '10'
                              left = '0'/>
            <GeneralComponent navigation={navigation}
                              type = 'text'
                              top = '10'
                              left = '0'
                              text = {'Last Name:'}/>
            <GeneralComponent navigation={navigation}
                              type = 'input'
                              top = '10'
                              left = '0'/>
            <GeneralComponent navigation={navigation}
                              type = 'text'
                              top = '10'
                              left = '0'
                              text = {'Username:'}/>
            <GeneralComponent navigation={navigation}
                              type = 'input'
                              top = '10'
                              left = '0'/>
            <GeneralComponent navigation={navigation}
                              type = 'text'
                              top = '10'
                              left = '0'
                              text = {'Password:'}/>
            <GeneralComponent navigation={navigation}
                              type = 'input'
                              top = '10'
                              left = '0'/>
            <GeneralComponent navigation={navigation}
                              type = 'text'
                              top = '10'
                              left = '0'
                              text = {'Re-confirm Password:'}/>
            <GeneralComponent navigation={navigation}
                              type = 'input'
                              top = '10'
                              left = '0'/>
            <GeneralComponent type = 'button'
                              path = 'Register'
                              top = '60'
                              left = '0'
                              text = {'Submit'}/>
        </ScreenBox>
    );
};

export default RegisterScreen
