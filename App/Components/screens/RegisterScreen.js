import React from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity, TextInput} from 'react-native';
import styled from 'styled-components/native';

const RegisterScreen = ({navigation}) => {
    return (
        <ScreenBox>
                <TextStyle top = '15'>
                        Email Address:
                </TextStyle>
                <ViewStyle top = '15' left = '0'>
                        <TextInput
                            style={styles.inputStyle1}
                            underlineColorAndroid = 'transparent'
                        />
                </ViewStyle>
                <TextStyle top = '15'>
                        First Name:
                </TextStyle>
                <ViewStyle top = '15' left = '0'>
                        <TextInput
                            style={styles.inputStyle1}
                            underlineColorAndroid = 'transparent'
                        />
                </ViewStyle>
                <TextStyle top = '15'>
                        Last Name:
                </TextStyle>
                <ViewStyle top = '15' left = '0'>
                        <TextInput
                            style={styles.inputStyle1}
                            underlineColorAndroid = 'transparent'
                        />
                </ViewStyle>
                <TextStyle top = '15'>
                        Password:
                </TextStyle>
                <ViewStyle top = '15' left = '0'>
                        <TextInput
                            style={styles.inputStyle1}
                            underlineColorAndroid = 'transparent'
                            secureTextEntry={true}
                        />
                </ViewStyle>
                <TextStyle top = '15'>
                        Confirm Password:
                </TextStyle>
                <ViewStyle top = '15' left = '0'>
                        <TextInput
                            style={styles.inputStyle1}
                            underlineColorAndroid = 'transparent'
                            secureTextEntry={true}
                        />
                </ViewStyle>
                <ViewStyle top = '80' left = '0'>
                        <ButtonStyle
                            title = {'Register'}/>
                </ViewStyle>
        </ScreenBox>
    );
};

const ScreenBox = styled.View`
	flex: 1;
	background-color: #333333;
`;

const styles = StyleSheet.create({
        inputStyle1: {
                color: '#d4d4d4',
                borderColor: 'gray',
                borderWidth: 1
        }
});

const TextStyle = styled.Text`
    color: white;
    fontFamily: Montserrat;
    top: ${props => props.top};
`;

const ButtonStyle = styled.Button`
`;

const ViewStyle = styled.View`
    top: ${props => props.top};
    left: ${props => props.left};
`;

export default RegisterScreen;
