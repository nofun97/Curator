import React from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const ScreenBox = styled.View`
	flex: 1;
	alignContent: stretch;
	background-color: #333333;
`;

const ItemDescriptionScreen = ({navigation}) => {
    return (
        <ScreenBox>
            <Text>First Name: </Text>
        </ScreenBox>
    )
};

export default ItemDescriptionScreen;
