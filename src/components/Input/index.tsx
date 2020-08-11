/* eslint-disable no-shadow */
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
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

interface InputRef {
  focus(): void;
}

/* Como estamos recebendo uma referência como parâmetro no SigIn, temos que passar ela para este componente, e o Ref é o único parâmetro que não podemos passar como padrão do componente, por isso temos que mudar de React.FC para React.ForwardingComponent, dessa forma passamos o Ref fora, como segundo parâmetro */
/* No primeiro parâmetro do tipo passamos o tipo da ref(InputRef) e no segundo passamos o tipo do resto das propriedades(<InputProps>) */
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  /* Informações necessárias para cadastra o input dentro do Unform */
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  /* Usando Ref para recebermos o conteúdo do input e passando um valor inicial como o valor default digitado pelo usuário no input */
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  /* Estados para verificarmos se o campo está com foco ou se está preenchido */
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    /* Quando o input tiver algum valor, setamos o estado como true, se não falso */
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  /* utilizando o hook e pasando a função para o elemento pai, onde criamos um elemento focus e passamos a referencia do objeto que queremos dar foco, que é o input */
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

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
    /* Passamos ao container se o input tem foco ou não para fazermos a estilização */
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        /* Passada a propriedade para dizer se está preenchido ou não o campo para estilizarmos o ícone quando estiver preenchido */
        isFilled={isFilled}
        isFocused={isFocused}
        name={icon}
      />

      {/* Passando todas as propriedades de um input, menos name e icon que não são necessárias */}
      <TextInput
        ref={inputElementRef}
        /* Configurando apar}encia do teclado no IOS */
        keyboardAppearance="dark"
        /* Cor do placeholder */
        placeholderTextColor="#666360"
        /* Verifica toda vez que tiver um novo valor digitado no input(já vem em formato texto) e insere este valor no ref */
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        /* Verifica se tem foco e seta no estado atavés da função */
        onFocus={handleInputFocus}
        /* Verifica se está preenchido e seta no estado atavés da função */
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
