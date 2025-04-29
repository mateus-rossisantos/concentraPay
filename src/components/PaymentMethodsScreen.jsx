import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { BsCreditCard, BsCash, BsBank } from 'react-icons/bs';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

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
  const commandNumber = location.state?.commandNumber || 0;

  const [isEstablishment, setIsEstablishment] = useState(false);

  useEffect(() => {
    const checkUserType = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setIsEstablishment(userSnap.data().isEc === true);
        }
      }
    };

    checkUserType();
  }, []);

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

      <GreenButton onClick={() => navigate('/pagamento-pix', { state: { totalAmount, commandNumber } })}>
        <IconWrapper>
            <BsBank size={20} />
        </IconWrapper>
        Pagar com Pix
      </GreenButton>

      {isEstablishment && (
        <OrangeButton onClick={() => navigate('/pagamento-sucesso')}>
          <IconWrapper><BsCash size={20} /></IconWrapper>
          Pagar com dinheiro
        </OrangeButton>
      )}
    </Container>
  );
};

export default PaymentMethodsScreen;
