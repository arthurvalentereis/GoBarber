import React from 'react';

import { RectButtonProperties} from 'react-native-gesture-handler';

interface ButtonsProps extends RectButtonProperties {
  children: string;
}

import { Container, ButtonText } from './styles';


const Button: React.FC<ButtonsProps>  = ({children, ...rest}) => (
  <Container {...rest} >
    <ButtonText>{children}</ButtonText>
  </Container>
  );

export default Button;
