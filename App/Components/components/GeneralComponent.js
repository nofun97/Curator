import React from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity, TextInput} from 'react-native';
import styled from 'styled-components/native';

// These are all the different component types that you can modify,
// they are the same as default react-native components (e.g Button, Text, etc.)

const GeneralComponent = (props) => {
    // If the component is a Button
    if (props.type === 'button') {
        return (
            <ViewStyle top = {props.top} left = {props.left}>
                <ButtonStyle title = {props.text}
                             onPress = {() => props.navigation.navigate(props.path)}/>
            </ViewStyle>
        );
    }
    // If the component is a Text
    else if (props.type === 'text') {
        return (
            <TextStyle top = {props.top} left = {props.left}>
                {props.text}
            </TextStyle>
        );
    }
    // If the component is a Input
    else if (props.type === 'input') {
        return (
            <ViewStyle top = {props.top} left = {props.left}>
                <TextInput
                    style={styles.inputStyle1}
                    underlineColorAndroid = 'transparent'
                />
            </ViewStyle>
        );
    }
};

const TextStyle = styled.Text`
    color: white;
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

export default GeneralComponent
