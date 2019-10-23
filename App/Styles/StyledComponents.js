import styled from 'styled-components';

export const TextStyle = styled.Text`
  color: white;
  font-family: Montserrat;
  top: ${props => (props.top ? props.top : '0')};
  left: ${props => (props.left ? props.left : '0')};
`;

export const ButtonStyle = styled.Button``;

export const ViewStyle = styled.View`
  top: ${props => (props.top ? props.top : '0')};
  left: ${props => (props.left ? props.left : '0')};
`;
