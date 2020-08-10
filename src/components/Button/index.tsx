/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
/* Importando as propriedades do RectButton, para passarmos ao componente a propriedade onPress */
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  /* Informando que o children é obrigatório */
  children: string;
}

const Button: React.FC = ({ children, ...rest }) => (
  /* Passando para o botão todas as propriedades de botão, além do children. Desta forma conseguimos passar que qualquer propriedade adicionada ao botão(componente) será passada aqui tbm, inclusive o onPress */
  <Container {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;
