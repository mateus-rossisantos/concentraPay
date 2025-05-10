import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import {
  Container,
  BackWrapper,
  BackArrow,
  BackText,
  Title,
  Input,
  Button,
} from './EstablishmentRegistrationScreen.styles';

const EstablishmentRegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [empreendimento, setEmpreendimento] = useState('');
  const [chavePix, setChavePix] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

      await setDoc(doc(db, 'estabelecimento', user.uid), {
        name,
        email,
        cnpj,
        empreendimento,
        chavePix,
        address,
        zipCode,
        pendingPayment: 0.0, 
        advancePayment: 0.0
      });
      
      await setDoc(doc(db, 'users', user.uid), {
        email,
        isEc: true
      });

      alert('Estabelecimento cadastrado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao cadastrar estabelecimento:', error);
      alert('Erro ao cadastrar estabelecimento. Tente novamente.');
    }
  };

  return (
    <Container>
      <BackWrapper onClick={() => navigate('/')}>
        <BackArrow>←</BackArrow>
        <BackText>Voltar</BackText>
      </BackWrapper>

      <Title>Cadastro de Estabelecimento</Title>

      <form onSubmit={handleRegister}>
        <Input
          type="text"
          placeholder="Nome do Estabelecimento"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="text"
          placeholder="CNPJ"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Empreendimento"
          value={empreendimento}
          onChange={(e) => setEmpreendimento(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Chave Pix"
          value={chavePix}
          onChange={(e) => setChavePix(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Input
          type="text"
          placeholder="CEP"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />


        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Repetir a Senha"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        <Button type="submit">Cadastrar Estabelecimento</Button>
      </form>
    </Container>
  );
};

export default EstablishmentRegistrationScreen;
