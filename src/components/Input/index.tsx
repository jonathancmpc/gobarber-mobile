import React, { useEffect, useRef } from 'react';
/* Importando todos os atributos do Input */
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const inputElementRef = useRef<any>(null);

  /* Informações necessárias para cadastra o input dentro do Unform */
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  /* Usando Ref para recebermos o conteúdo do input e passando um valor inicial como o valor default digitado pelo usuário no input */
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      /* Onde vai buscar o valor do input */
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      /* O que o Unform tem que fazer quando quiser limpar um campo */
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />

      {/* Passando todas as propriedades de um input, menos name e icon que não são necessárias */}
      <TextInput
        /* Configurando apar}encia do teclado no IOS */
        keyboardAppearance="dark"
        /* Cor do placeholder */
        placeholderTextColor="#666360"
        /* Verifica toda vez que tiver um novo valor digitado no input(já vem em formato texto) e insere este valor no ref */
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
};

export default Input;
