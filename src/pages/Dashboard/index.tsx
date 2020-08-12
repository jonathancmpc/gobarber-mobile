import React from 'react';
import { View, Button } from 'react-native';

import { useAuth } from '../../hooks/AuthContext';

import { Container, Title } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Title>Dashboard</Title>
      <Button title="Sair" onPress={signOut} />
    </Container>
  );
};

export default Dashboard;
