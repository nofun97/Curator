import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { ImagePickerTest } from '../ImagePickerTest';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

// styled components
const ScreenBox = styled.View`
  flex: 1;
  alignContent: stretch;
`;

const ImageBox = styled.View`
  flex: 0.35;
  background-color: #f0f0f0;
`;

const LoginBox = styled.View`
	flex: 0.65;
	background-color: #333333;
	borderColor = black;
	alignItems: center
`;

const InventoryScreen = props => {
  return (
    <ScreenBox>
      {/* <ImageBox>
                <Text> Image goes here </Text>
            </ImageBox>
            <LoginBox>
                <ButtonStyle title = 'Register Artifact'/>
            </LoginBox> */}
      <ImagePickerTest user={props.user} />
    </ScreenBox>
  );
};

const ButtonStyle = styled.Button``;

export default connect(
  state => {
    const { user } = state;
    return { user: user };
  },
  null
)(InventoryScreen);
