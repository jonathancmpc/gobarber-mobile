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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
/* Importando métodos do Unform */
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErros from '../../utils/getValidationErros';

import logoImg from '../../assets/logo.png'; // Inserido na pasta @types um tipo para parar o erro

import { Container, Title, BackToSign, BackToSignText } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  /* Criando uma Ref para informar ao botão para dar submit, pois no React-Native não temos a funcionalidade de submit no botão */
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const { goBack, navigate } = useNavigation();

  /* Função para validação de formulário */
  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        // Zerando os erros antes de começar a validação
        formRef.current?.setErrors({});

        /* Criado um schema de validação, utilizado para validar um objeto inteiro(.object) e terá a forma descrita no .shape. No nosso caso teremos o campo de nome, email e senha */
        const schema = Yup.object().shape({
          /* Este campo será do tipo string e será obrigatório(requered) */
          name: Yup.string().required('Nome obrigatório'),
          /* Neste caso, além de ser string, obrigatório, deve ser um email */
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          /* A senha é uma string com no mínimo 6 caracteres */
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        // Aguarde a validação(await) do schema com os dados recebidos pelo form
        // Passamos algumas configurações para a validação, como o abortEarly que retorna todos os erros que for encontrado(false), e não somente um(true). Recuperamos esses erros através do inner do validate(verificar o retorno do validate através do console.log(err)).
        await schema.validate(data, {
          abortEarly: false,
        });

        /* Após realizada a autenticação, cadastramos o usuário na API passando os dados do formulário */
        await api.post('/users', data);

        /* Fazendo o redirecionamento e mostrando uma mensagem para o usuário */
        Alert.alert(
          'Cadastro realizado!',
          'Você já pode fazer seu logon no GoBarber.',
        );

        navigate('SignIn');
      } catch (err) {
        // console.log(err);

        // Se o erros forem originados no Yup validate através da instancia do Yup chamada ValidationError então pegamos os erros para mostrar
        if (err instanceof Yup.ValidationError) {
          // Utilizando a função que criamos para percorrer os erros e trazer um objeto com o name:mensagem que passamos no yup.
          const errors = getValidationErros(err);
          // console.log(errors);

          // Enviando os erros para aparecer no input através do useRef/Unform com a variável error(input). Onde errors é um objeto retornado da função getValidationErrors com o name de cada input.
          // Traz as mensagens de erros que configuramos no Yup.
          formRef.current?.setErrors(errors);

          /* Com o return, ele não continua processando o resto do código quando o erro não for de validação */
          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer seu cadastro, verifique os dados e tente novamente',
        );
      }
    },
    [navigate],
  );

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

            <Form ref={formRef} onSubmit={handleSignUp}>
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
