import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { BsCreditCard, BsCash, BsBank } from 'react-icons/bs';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { PaymentService } from '../service/PaymentService';

import {
  Container,
  Header,
  BackButton,
  Title,
  Description,
  Button,
  IconWrapper,
  GreenButton,
  OrangeButton,
} from './PaymentMethodsScreen.styles';

const PaymentMethodsScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;
  const numeroComanda = location.state?.numeroComanda || 0;

  const [isEstablishment, setIsEstablishment] = useState(false);

  useEffect(() => {
    const checkUserType = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'usuario', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setIsEstablishment(userSnap.data().isEc === true);
        }
      }
    };

    checkUserType();
  }, []);

  const handleCashPayment = async () => {
    const confirm = window.confirm('Confirmar pagamento em dinheiro?');
  
    if (!confirm) return;
  
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado');
  
      const ecId = user.uid;
  
      await PaymentService.createMoneyPayment({
        amount: totalAmount,
        ec: ecId,
        numeroComanda,
      });
  
      navigate('/pagamento-sucesso');
    } catch (error) {
      console.error('Erro ao processar pagamento em dinheiro:', error);
      alert('Falha ao registrar pagamento em dinheiro. Tente novamente.');
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <FiArrowLeft size={20} />
        </BackButton>
        <Title>Forma de Pagamento</Title>
      </Header>

      <Description>Valor Total: R$ {totalAmount.toFixed(2)}</Description>

      <Button onClick={() => navigate('/pagamento-cartao', { state: { totalAmount } })}>
        <IconWrapper><BsCreditCard size={20} /></IconWrapper>
        Pagar com Cartão de Crédito
      </Button>

      <GreenButton onClick={() => navigate('/pagamento-pix', { state: { totalAmount, numeroComanda } })}>
        <IconWrapper>
            <BsBank size={20} />
        </IconWrapper>
        Pagar com Pix
      </GreenButton>

      {isEstablishment && (
        <OrangeButton onClick={handleCashPayment}>
          <IconWrapper><BsCash size={20} /></IconWrapper>
          Pagar com dinheiro
        </OrangeButton>
      )}
    </Container>
  );
};

export default PaymentMethodsScreen;
