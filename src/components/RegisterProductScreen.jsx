// src/components/RegisterProductScreen.jsx
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
} from './RegisterProductScreen.styles';
import { FiArrowLeft } from 'react-icons/fi';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const RegisterProductScreen = () => {
  const navigate = useNavigate();
  const [nome, setName] = useState('');
  const [descricao, setDescription] = useState('');
  const [preco, setPrice] = useState('');

  const handleRegisterProduct = async () => {
    const user = auth.currentUser;

    if (!user || !nome || !preco) {
      console.warn('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await addDoc(collection(db, 'produto'), {
        nome,
        descricao,
        preco: parseFloat(preco),
        ec: user.uid,
      });

      navigate('/area-estabelecimento');
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/area-estabelecimento')}>
          <FiArrowLeft size={20} />
        </BackButton>
        <Title>Cadastro de Produto</Title>
      </Header>

      <Description>Preencha os dados do produto abaixo</Description>

      <Input
        type="text"
        placeholder="Nome do produto"
        value={nome}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Preço (somente números)"
        value={preco}
        onChange={(e) => setPrice(e.target.value)}
        min="0"
        step="0.01"
      />

      <Button onClick={handleRegisterProduct}>Cadastrar Produto</Button>
    </Container>
  );
};

export default RegisterProductScreen;
