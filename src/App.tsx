import 'react-native-gesture-handler'; /* Importado para utilizarmos o react-navigation */

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

/* Trazendo hooks, neste caso somente temos o hook de autenticação, que passaremos por volta do conteúdo que precisará acessar sas informações */
import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    {/* Alterando a cor da status bar e colocando a cor de texto mais branca */}
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
