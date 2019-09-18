import React from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity, TextInput} from 'react-native';
import styled from 'styled-components/native';

const LoginScreen = ({navigation}) => {
    return (
        <ScreenBox>
            <ImageBox>
                <Text> Image goes here </Text>
            </ImageBox>
            <LoginBox>
                <ViewStyle top = '305' left = '-90'>
                    <ButtonStyle
                        title = {'Register'}/>
                </ViewStyle>
                <ViewStyle top = '270' left = '90'>
                    <ButtonStyle
                        title = {'Login'}/>
                </ViewStyle>
                <TextStyle top = '80' left = '-120'>
                    Username:
                </TextStyle>
                <TextStyle top = '130' left = '-120'>
                    Password:
                </TextStyle>
                <ViewStyle top = '25' left = '0'>
                    <TextInput
                        style={styles.inputStyle1}
                        underlineColorAndroid = 'transparent'
                    />
                </ViewStyle>
                <ViewStyle top = '45' left = '0'>
                    <TextInput
                        style={styles.inputStyle1}
                        underlineColorAndroid = 'transparent'
                        secureTextEntry={true}
                    />
                </ViewStyle>
            </LoginBox>
        </ScreenBox>
    );
};

const TextStyle = styled.Text`
    color: white;
    fontFamily: Montserrat;
    top: ${props => props.top};
    left: ${props => props.left};
`;

const ButtonStyle = styled.Button`
`;

const ViewStyle = styled.View`
    top: ${props => props.top};
    left: ${props => props.left};
`;

const styles = StyleSheet.create({
    inputStyle1: {
        color: '#d4d4d4',
        borderColor: 'gray',
        borderWidth: 1
    }
});

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

export default LoginScreen;
