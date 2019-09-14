import React from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import LoginComponent from "../components/LoginComponent";

// styled components
const ScreenBox = styled.View`
	flex: 1;
	alignContent: stretch
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
                <LoginComponent navigation={navigation}
                                type = 'button'
                                top = '80'
                                left = '80'
                                text = {'Register'}/>
                <LoginComponent navigation={navigation}
                                type = 'button'
                                top = '250'
                                left = '0'
                                text = {'Login'}/>
                <LoginComponent type = 'text'
                                top = '80'
                                left = '-120'
                                text = {'Username'}/>
                <LoginComponent type = 'text'
                                top = '130'
                                left = '-120'
                                text = {'Password'}/>
            </LoginBox>
        </ScreenBox>
    );
};

export default LoginScreen;
