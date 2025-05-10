// src/components/EstablishmentHomeScreen.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Header,
  BackButton,
  Title,
  Button,
} from './EstablishmentHomeScreen.styles';
import { FiArrowLeft } from 'react-icons/fi';

const EstablishmentHomeScreen = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/home')}>
          <FiArrowLeft size={20} />
        </BackButton>
        <Title>concentraPay</Title>
      </Header>

      <Button onClick={() => navigate('/criar-pedido')}>Criar Pedido</Button>

      <Button onClick={() => navigate('/cadastrar-produto')}>
        Cadastrar Produto
      </Button>
    </Container>
  );
};

export default EstablishmentHomeScreen;
