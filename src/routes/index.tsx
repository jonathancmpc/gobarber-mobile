/* Importando pacotes do react */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/* Importando as páginas */
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

/* Diferente da web, teremos a navegação que poderá ser acessada somente com autenticação. Então teremos navigators diferentes */
/* Haverá navegação só para a parte de autenticação e outra só para a parte do aplicativo */
const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    /* Passando as configurações da navegação, onde headerShown false não mostrará mais o header automático e o cardStyle é o estilo de cada rota que neste caso recebe um background color */
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
