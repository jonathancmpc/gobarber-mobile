import React from 'react';
/* O KeyboardAvoidingView serve para que o teclado não cubra o input */
/* O Platform verifica se a plataforma é android ou ios */
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png'; // Inserido na pasta @types um tipo para parar o erro

import { Container, Title, BackToSign, BackToSignText } from './styles';

const SignUp: React.FC = () => {
  return (
    <>
      {/* Verifica qual a plataforma(android ou ios) e aplica o efeito do teclado, para não ficar em cima do input. Se for ios vai aplicar um padding e se for android não passará nada */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        enabled
      >
        {/* Colocado um scroll para quando aparecer o teclado o usuário poder rolar a tela até o fim */}
        <ScrollView
          /* Habilita o padrão do teclado quando clicamos fora dele, no caso quando clicamos fora ele fecha */
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <Title>Crie sua conta</Title>

            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button
              onPress={() => {
                console.log('nada');
              }}
            >
              Entrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSign onPress={() => {}}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignText>Voltar para logon</BackToSignText>
      </BackToSign>
    </>
  );
};

export default SignUp;
