import React from 'react';
import { Image } from 'react-native';

import { Container, Title } from './styles';

import logoImg from '../../assets/logo.png'; // Inserido na pasta @types um tipo para parar o erro

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />

      <Title>Faça seu logon</Title>
    </Container>
  );
};

export default SignIn;
