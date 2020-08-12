/* ROTAS PARA QUANDO O USUÁRIO JÁ ESTIVER LOGADO NA APLICAÇÃO */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/* Importando as páginas */
import Dashboard from '../pages/Dashboard';

/* Diferente da web, teremos a navegação que poderá ser acessada somente com autenticação. Então teremos navigators diferentes */
/* Haverá navegação só para a parte de autenticação e outra só para a parte do aplicativo */
const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    /* Passando as configurações da navegação, onde headerShown false não mostrará mais o header automático e o cardStyle é o estilo de cada rota que neste caso recebe um background color */
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
  </App.Navigator>
);

export default AppRoutes;
