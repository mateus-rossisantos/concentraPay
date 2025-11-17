import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import {
  Container,
  IconWrapper,
  Title,
  Subtitle,
  Button,
} from './PaymentSuccessScreen.styles';

const PaymentSuccessScreen = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <IconWrapper>
        <FiCheckCircle size={80} />
      </IconWrapper>
      <Title>Pagamento realizado com sucesso!</Title>
      <Subtitle>Obrigado por utilizar o <strong>ConcentraPay</strong>.</Subtitle>
      <Button onClick={() => navigate('/home')}>Voltar ao início</Button>
    </Container>
  );
};

export default PaymentSuccessScreen;
