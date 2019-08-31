import React from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

// styled components
const Container = styled.View`
	flex: 1;
	background-color: #333333;
	align-items: center;
`;

const Container2 = styled.View`
	flex: 0.5;
	background-color: #f0f0f0;
	align-self: flex-end;
`;

const TextStyle = styled.Text`
    flex: 0.5;
    marginBottom: 20
`;

const HomeScreen = ({navigation}) => {
    return (
        <Container>
            <Container2>
            </Container2>
        </Container>
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
