// src/components/EstablishmentHomeScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Header,
  BackButton,
  Title,
  Description,
  Input,
  Button,
  TextButton,
} from './EstablishmentHomeScreen.styles';
import { FiArrowLeft } from 'react-icons/fi';

const EstablishmentHomeScreen = () => {
  const navigate = useNavigate();
  const [commandCode, setCommandCode] = useState('');

  const handleOpenCommand = () => {
    console.log('Abrir comanda:', commandCode);
    // Aqui você pode redirecionar para a tela da comanda, por exemplo
    // navigate(`/comanda/${commandCode}`);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/home')}>
          <FiArrowLeft size={20} />
        </BackButton>
        <Title>concentraPay</Title>
      </Header>

      <Description>
        Digite o código da comanda para abrir uma comanda
      </Description>

      <Input
        type="text"
        placeholder="Código da comanda"
        value={commandCode}
        onChange={(e) => setCommandCode(e.target.value)}
      />

        <Button
        onClick={handleOpenCommand}
        disabled={commandCode.trim() === ''}
        >
        Abrir comanda
        </Button>

      <Button onClick={() => navigate('/criar-pedido')}>Criar Pedido</Button>

      <TextButton onClick={() => navigate('/cadastrar-produto')}>
        Cadastrar Produto
      </TextButton>
    </Container>
  );
};

export default EstablishmentHomeScreen;
