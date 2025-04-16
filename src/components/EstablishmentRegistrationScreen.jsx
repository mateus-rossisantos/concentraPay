import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Importando o Firestore
import { collection, addDoc } from 'firebase/firestore';
import {
  Container,
  BackWrapper,
  BackArrow,
  BackText,
  Title,
  Input,
  InputLabel,
  RadioGroup,
  RadioLabel,
  Button,
} from './EstablishmentRegistrationScreen.styles';

const EstablishmentRegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [empreendimento, setEmpreendimento] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [multiEc, setMultiEc] = useState(false);
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
      
      await addDoc(collection(db, 'estabelecimento'), {
        name,
        email,
        cnpj,
        empreendimento,
        contact,
        address,
        zipCode,
        multiEc, 
        password,
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
          placeholder="Responsável pelo Estabelecimento"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
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

        <InputLabel>É complexo de estabelecimentos?</InputLabel>
        <RadioGroup>
        <div>
            <input
            type="radio"
            id="sim"
            name="multiEc"
            checked={multiEc === true}
            onChange={() => setMultiEc(true)}
            />
            <RadioLabel htmlFor="sim">Sim</RadioLabel>
        </div>
        <div>
            <input
            type="radio"
            id="nao"
            name="multiEc"
            checked={multiEc === false}
            onChange={() => setMultiEc(false)}
            />
            <RadioLabel htmlFor="nao">Não</RadioLabel>
        </div>
        </RadioGroup>


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
