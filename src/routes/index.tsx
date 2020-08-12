/* Importando pacotes do react */
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

/* Trazendo rotas onde o usuário tem que se autenticar ou fazer login ou se cadastrar(Públicas) */
import AuthRoutes from './auth.routes';
/* Trazendo rotas para depois que o usuário estiver logado(Privada) */
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/AuthContext';

const Routes: React.FC = () => {
  const { user, loading } = useAuth(); // Pegamos do contexto as informações que precisamos

  /* Enquanto a aplicação estiver fazendo a autenticação, mostramos um ícone de loading na tela */
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  /* Se eu tiver um usuário, eu mostro a rota privada, se não, tem que se autenticar */
  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
