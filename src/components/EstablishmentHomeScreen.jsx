// src/components/EstablishmentHomeScreen.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Header,
  BackButton,
  Title,
  Button,
} from './EstablishmentHomeScreen.styles';
import { FiArrowLeft } from 'react-icons/fi';
import { PaymentService } from '../service/PaymentService';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const EstablishmentHomeScreen = () => {
  const navigate = useNavigate();
  const [establishmentId, setEstablishmentId] = useState(null);
  const [showPendingButton, setShowPendingButton] = useState(false);
  const [e2eId, setE2eId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchEstablishmentData = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const userRef = doc(db, 'estabelecimento', user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setShowPendingButton(data.pendingPayment > 0);
            setEstablishmentId(user.uid);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do estabelecimento:', error);
        }
      }
    };

    fetchEstablishmentData();
  }, []);

  const handlePendingPayments = async () => {
    try {
      const result = await PaymentService.processPendingPayments(establishmentId);
      setE2eId(result); // supondo que o endpoint retorna diretamente o e2eId
      setShowPendingButton(false);
      setIsProcessing(true);
    } catch (error) {
      console.error('Erro ao processar pagamentos pendentes:', error);
      alert('Erro ao processar pagamentos pendentes');
    }
  };

  const handleConsultStatus = async () => {
    try {
      const status = await PaymentService.consultPendingPaymentByE2EId(e2eId);
      alert(`Status do pagamento:\n${JSON.stringify(status, null, 2)}`);
    } catch (error) {
      console.error('Erro ao consultar status do pagamento:', error);
      alert('Erro ao consultar status do pagamento');
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/home')}>
          <FiArrowLeft size={20} />
        </BackButton>
        <Title>concentraPay</Title>
      </Header>

      <Button onClick={() => navigate('/criar-pedido')}>Criar Pedido</Button>

      <Button onClick={() => navigate('/cadastrar-produto')}>
        Cadastrar Produto
      </Button>

      {showPendingButton && (
        <Button onClick={handlePendingPayments}>
          Resgatar Pagamentos
        </Button>
      )}

      {isProcessing && (
        <Button onClick={handleConsultStatus}>
          Processando Pagamento, consultar Status
        </Button>
      )}
    </Container>
  );
};

export default EstablishmentHomeScreen;
