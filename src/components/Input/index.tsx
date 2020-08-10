import React from 'react';
/* Importando todos os atributos do Input */
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => (
  <Container>
    <Icon name={icon} size={20} color="#666360" />

    {/* Passando todas as propriedades de um input, menos name e icon que não são necessárias */}
    <TextInput
      /* Configurando apar}encia do teclado no IOS */
      keyboardAppearance="dark"
      /* Cor do placeholder */
      placeholderTextColor="#666360"
      {...rest}
    />
  </Container>
);

export default Input;
