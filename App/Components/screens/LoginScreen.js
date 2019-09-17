import React from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity, TextInput} from 'react-native';
import styled from 'styled-components/native';
import GeneralComponent from "../components/GeneralComponent";

// styled components
const ScreenBox = styled.View`
	flex: 1
`;

const ImageBox = styled.View`
	flex: 0.35;
	background-color: #f0f0f0
`;

const LoginBox = styled.View`
	flex: 0.65;
	background-color: #333333;
	borderColor = black;
	alignItems: center
`;

const LoginScreen = ({navigation}) => {
    return (
        <ScreenBox>
            <ImageBox>
                <Text> Image goes here </Text>
            </ImageBox>
            <LoginBox>
                <GeneralComponent navigation={navigation}
                                  type = 'button'
                                  top = '305'
                                  left = '-90'
                                  path = 'Register'
                                  text = {'Register'}/>
                <GeneralComponent navigation={navigation}
                                  type = 'button'
                                  top = '270'
                                  left = '90'
                                  path = 'Inventory'
                                  text = {'Login'}/>
                <GeneralComponent type = 'text'
                                  top = '80'
                                  left = '-120'
                                  text = {'Username'}/>
                <GeneralComponent type = 'text'
                                  top = '130'
                                  left = '-120'
                                  text = {'Password'}/>
                <GeneralComponent type = 'input'
                                  top = '25'
                                  left = '0'/>
                <GeneralComponent type = 'input'
                                  top = '45'
                                  left = '0'/>
            </LoginBox>
        </ScreenBox>
    );
};

export default LoginScreen;
