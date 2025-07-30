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
import { Html5QrcodeScanner } from 'html5-qrcode';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [numeroComanda, setnumeroComanda] = useState('');
  const [isEstablishment, setIsEstablishment] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    const checkIfEstablishment = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const userRef = doc(db, 'usuario', user.uid);
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

  useEffect(() => {
    if (showScanner) {
      const scanner = new Html5QrcodeScanner('qr-reader', {
        fps: 10,
        qrbox: 250,
      });

      scanner.render(
        (decodedText) => {
          setnumeroComanda(decodedText);
          scanner.clear();
          setShowScanner(false);
        },
        (error) => {
        }
      );

      return () => {
        scanner.clear().catch((e) => console.error('Erro ao limpar scanner', e));
      };
    }
  }, [showScanner]);

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

      <Button onClick={() => setShowScanner(true)}>📷 Ler QR Code</Button>

      {showScanner && <div id="qr-reader" style={{ width: '100%' }} />}

      <Input
        type="text"
        placeholder="Digite o número da comanda"
        value={numeroComanda}
        onChange={(e) => setnumeroComanda(e.target.value)}
      />

      <Button
        onClick={() => navigate(`/pedidos/${numeroComanda}`)}
        disabled={numeroComanda.trim() === ''}
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
