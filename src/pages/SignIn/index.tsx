import React from 'react';
import { Image } from 'react-native';

import { Container } from './styles';

import logoImg from '../../assets/logo.png'; // Inserido na pasta @types um tipo para parar o erro

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
    </Container>
  );
};

export default SignIn;
