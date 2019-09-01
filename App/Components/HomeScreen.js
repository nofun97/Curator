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
	align-items: center;
`;

const LoginStyle = styled.Text`
    top: 50;
    borderColor: red;
    borderWidth: 3;
`;

const UsernameStyle = styled.Text`
    top: 100;
    borderColor: red;
    borderWidth: 3;
    right: 100
`;

const HomeScreen = ({navigation}) => {
    return (
        <ScreenBox>
            <ImageBox>
                <Text> Image goes here </Text>
            </ImageBox>
            <LoginBox>
                <LoginStyle> Login </LoginStyle>
                <UsernameStyle> Username </UsernameStyle>
                <UsernameStyle> Password </UsernameStyle>
            </LoginBox>
        </ScreenBox>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30
    }
});

/*<Button
                onPress={() => navigation.navigate('Component')}
                title = "Go to Components Screen"
            />
            */

export default HomeScreen
