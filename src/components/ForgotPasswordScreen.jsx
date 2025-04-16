import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  BackWrapper,
  BackArrow,
  BackText,
  Title,
  Description,
  Input,
  Button,
} from './ForgotPasswordScreen.styles';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email) {
      alert('Por favor, insira seu e-mail.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Link de redefinição enviado! Verifique seu email.');
      navigate('/'); // Redireciona para a tela de login
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar o link. Verifique o e-mail e tente novamente.');
    }
  };

  return (
    <Container>
      <BackWrapper onClick={() => navigate('/')}>
        <BackArrow>←</BackArrow>
        <BackText>Voltar</BackText>
      </BackWrapper>

      <Title>Esqueci a senha</Title>
      <Description>Nós enviaremos um link para resetar sua senha</Description>

      <Input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <Button onClick={handleReset}>Enviar Link</Button>
    </Container>
  );
};

export default ForgotPasswordScreen;
