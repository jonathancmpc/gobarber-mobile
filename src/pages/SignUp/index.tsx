/* eslint-disable no-unused-expressions */
import React, { useRef, useCallback } from 'react';
/* O KeyboardAvoidingView serve para que o teclado não cubra o input */
/* O Platform verifica se a plataforma é android ou ios */
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
/* Importando métodos do Unform */
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png'; // Inserido na pasta @types um tipo para parar o erro

import { Container, Title, BackToSign, BackToSignText } from './styles';

const SignUp: React.FC = () => {
  /* Criando uma Ref para informar ao botão para dar submit, pois no React-Native não temos a funcionalidade de submit no botão */
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const { goBack } = useNavigation();

  /* Pedindo para mostrar no console as informações de input quando o botão for clicado e as informações submetidas */
  const handleSignIn = useCallback((data: object) => {
    console.log(data);
  }, []);

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

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                /* Deixa em caixa alta apenas a primeira letra de cada uma das palavras */
                autoCapitalize="words"
                /* Tirando a correção automática de texto */
                autoCorrect={false}
                /* Mudando o botão enter do teclado para next */
                returnKeyType="next"
                /* Quando clicar no botão do teclado enter, ele chama a função para passar ao próximo campo, independente do formato do botão, utilizamos as Refs pra isso */
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                /* Tirando a correção automática de texto */
                autoCorrect={false}
                /* Tira a caixa alta automática no início de cada palavra */
                autoCapitalize="none"
                /* Trocando o tipo de teclado para esse input */
                keyboardType="email-address"
                /* Mudando o botão enter do teclado para next */
                returnKeyType="next"
                /* Quando clicar no botão do teclado enter, ele chama a função para passar ao próximo campo, independente do formato do botão, utilizamos as Refs pra isso */
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                /* Escodendo a senha */
                secureTextEntry
                /* Mudando o botão enter do teclado para send(enviar) */
                returnKeyType="send"
                /* Quando clicar no botão do teclado enter, ele chama a função para fazer o submit, independente do formato do botão */
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSign
        onPress={() => {
          goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignText>Voltar para logon</BackToSignText>
      </BackToSign>
    </>
  );
};

export default SignUp;
