// src/components/HomeScreen.js
import React, { useState, useEffect } from 'react';
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
} from './HomeScreen.styles';
import { FiArrowLeft } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [commandNumber, setCommandNumber] = useState('');
  const [isEstablishment, setIsEstablishment] = useState(false); 

  useEffect(() => {
    const checkIfEstablishment = async () => {
      const user = auth.currentUser;
  
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
  
          if (userSnap.exists()) {
            const data = userSnap.data();
            setIsEstablishment(data.isEc === true);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };
  
    checkIfEstablishment();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleLogout}>
          <FiArrowLeft size={20} />
        </BackButton>
        <Title>concentraPay</Title>
      </Header>

      <Description>
        Leia o consumo de sua comanda para fazer o pagamento
      </Description>

      <Input
        type="text"
        placeholder="Digite o número da comanda"
        value={commandNumber}
        onChange={(e) => setCommandNumber(e.target.value)}
      />

        <Button
        onClick={() => navigate(`/pedidos/${commandNumber}`)}
        disabled={commandNumber.trim() === ''}
        >
        Ler comanda
        </Button>


      {isEstablishment && (
        <TextButton onClick={() => navigate('/area-estabelecimento')}>
          Área de Estabelecimento
        </TextButton>
      )}
    </Container>
  );
};

export default HomeScreen;
