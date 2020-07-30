import React from 'react';
import { View, StatusBar } from 'react-native';

const App: React.FC = () => (
  <>
    {/* Alterando a cor da status bar e colocando a cor de texto mais branca */}
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <View style={{ flex: 1, backgroundColor: '#312e38' }} />
  </>
);

export default App;
