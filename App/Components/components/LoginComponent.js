import React from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const LoginComponent = (props) => {
    // If the component is a TouchableOpacity
    if (props.type === 'button') {
        return (
            <ViewStyle top = {props.top} left = {props.left}>
                <ButtonStyle title = {props.text}
                             onPress = {() => props.navigation.navigate('Register')}/>
            </ViewStyle>
        );
    }
    else if (props.type === 'text') {
        return (
            <TextStyle top = {props.top} left = {props.left}>
                {props.text}
            </TextStyle>
        );
    }
    else if (props.type === 'input') {
        return (
            <TextStyle top = {props.top} left = {props.left}>
                {props.text}
            </TextStyle>
        );
    }
};

const TextStyle = styled.Text`
    borderColor: red;
    borderWidth: 3;
    top: ${props => props.top};
    left: ${props => props.left};
`;
const ButtonStyle = styled.Button`
`;
const ViewStyle = styled.View`
    borderColor: red;
    borderWidth: 3;
    top: ${props => props.top};
    left: ${props => props.left};
`;

export default LoginComponent
