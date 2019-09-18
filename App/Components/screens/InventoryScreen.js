import React from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

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

const InventoryScreen = ({navigation}) => {
    return (
        <ScreenBox>
            <ImageBox>
                <Text> Image goes here </Text>
            </ImageBox>
            <LoginBox>
                <ButtonStyle title = 'Register Artifact'/>
            </LoginBox>
        </ScreenBox>
    );
};

const ButtonStyle = styled.Button`
`;

export default InventoryScreen;
