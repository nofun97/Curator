import React from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import HomeComponent from "./HomeComponent";

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
	flex-direction: row
`;

const HomeScreen = (navigation) => {
    return (
        <ScreenBox>
            <ImageBox>
                <Text> Image goes here </Text>
            </ImageBox>
            <LoginBox>
                <HomeComponent top = '0'
                               left = '0'
                               right = '0'
                               text = {'Register'}/>
                <HomeComponent top = '0'
                               left = '0'
                               right = '0'
                               text = {'Login'}/>
                <HomeComponent top = '0'
                               left = '0'
                               right = '0'
                               text = {'Username'}/>
                <HomeComponent top = '0'
                               left = '0'
                               right = '0'
                               text = {'Password'}/>
            </LoginBox>
        </ScreenBox>
    );
};

export default HomeScreen
