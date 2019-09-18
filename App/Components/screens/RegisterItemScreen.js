import React from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const RegisterItemScreen = ({navigation}) => {
    return (
        <ScreenBox>
            <Text> First Name: </Text>
            <Text> Submit Photo </Text>
        </ScreenBox>
    )
};

const ScreenBox = styled.View`
	flex: 1;
	alignContent: stretch;
	background-color: #333333;
`;

export default RegisterItemScreen;
