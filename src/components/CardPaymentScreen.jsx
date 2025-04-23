import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft, FiCreditCard } from 'react-icons/fi';
import {
  Container,
  Header,
  BackButton,
  Title,
  Description,
  Input,
  InputGroup,
  SmallInput,
  Button,
} from './CardPaymentScreen.styles';

const CardPaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    alert('Pagamento processado com cartão (simulado)');
    navigate('/pagamento-sucesso');
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <FiArrowLeft size={20} />
        </BackButton>
        <Title>Pagamento com Cartão</Title>
      </Header>

      <Description>Valor a pagar: <strong>R${totalAmount.toFixed(2)}</strong></Description>
      <Description>Preencha os dados do cartão abaixo:</Description>

      <Input
        type="text"
        placeholder="Nome do titular"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Número do cartão"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        maxLength={19}
      />

      <InputGroup>
        <SmallInput
          type="text"
          placeholder="MM/AA"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          maxLength={5}
        />

        <SmallInput
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          maxLength={4}
        />
      </InputGroup>

      <Button onClick={handlePayment}>
        <FiCreditCard size={20} />
        Pagar com Cartão
      </Button>
    </Container>
  );
};

export default CardPaymentScreen;
