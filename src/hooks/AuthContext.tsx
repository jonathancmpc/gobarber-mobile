/* eslint-disable @typescript-eslint/ban-types */
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object /* Passamos como um objeto genérico pq o backend pode mudar alguma informação nas informações de usuário */;
}

// Interface montada para falar ao nosso método signIn os tipos do email e da senha.
interface SignInCredentials {
  email: string;
  password: string;
}

// A interface neste caso será tudo que iremos guardar na nossa variável authContext.
interface AuthContextData {
  user: object;
  signIn(credentialsUsers: SignInCredentials): Promise<void>;
  signOut(): void;
}

// As informações que iremos passar de Contexto tem o objetivo de ficar disponível para ser acessada em qualquer página
// Como o usuário pode não estar logado quando acessar a página, então temos que passar um objeto vazio para o createContext, então passamos o objeto vazio e informamos o tipo dele.(isso é um rackzinho para não termos o erro do typescript nos obrigando a passar os tipos da interface)
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  // Criando um estado para gravar as informações de usuário, dessa forma passamos as informações pelo contexto, ao invés de usar o local storage.
  // Caso as informações já estejam no localStorage, retornamos o estado com essas informações, se não, ele busca as informações na API.
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
    }

    loadStoragedData();
  }, []);

  // Buscando informações do usuário na API. Deve-se passar o email e a senha para autenticação na nossa API, irá retornar os dados do usuário. Esses dados vem do componente SignIn.
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    // Extraindo de dentro da resposta da API o token de usuário e as informações do usuário.
    const { token, user } = response.data;

    // Gravando as informações do usuário no localStorage para utilizar durante um tempo em cache.(Até a expiração do Token que foi configurado na API)
    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);
    setData({ token, user });
  }, []);

  // Método para deslogar da aplicação(Logout)
  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:user', '@GoBarber:token']);

    setData({} as AuthState);
  }, []);

  // Retorna um módulo com as informações do usuário através do contexto. Repassamos o método signIn com as informações do usuário
  return (
    <>
      <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

// Criando o nosso próprio Hook de contexto e retornando o próprio AuthContext.(Apenas para o código não ficar muito verboso quando formos chamar o contexto)
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  // Então verificamos se o useAuth está sendo usado sem passar AuthProvider por volta do app/página, então retorna um erro.
  // Isso é mais para ajudar algum desenvolvedor que irá fazer manutenção na aplicação.
  if (!context) {
    throw new Error('useAuth must bu used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
