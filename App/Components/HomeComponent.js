import React from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const HomeComponent = (props) => {
    return (
        <HomeStyle top = {props.top} left = {props.left} right = {props.right}>
            {props.text}
        </HomeStyle>
    );
};

const HomeStyle = styled.Text`
    borderColor: red;
    borderWidth: 3;
    top: ${props => props.top};
    left: ${props => props.left};
    right: ${props => props.right};
`;

export default HomeComponent
