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
import { onAuthStateChanged } from 'firebase/auth';

const EstablishmentHomeScreen = () => {
  const navigate = useNavigate();
  const [establishmentId, setEstablishmentId] = useState(null);
  const [showPendingButton, setShowPendingButton] = useState(false);
  const [e2eId, setE2eId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);

  // Verifica autenticação e dados do estabelecimento
  useEffect(() => {
    const savedE2eId = localStorage.getItem('pendingE2EId');
    if (savedE2eId) {
      setE2eId(savedE2eId);
      setIsProcessing(true);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!e2eId) return;

    const interval = setInterval(async () => {
      try {
        const status = await PaymentService.consultPendingPaymentByE2EId(establishmentId, e2eId);
        console.log('Consulta automática:', status);
        setStatusMessage(`Status: ${status.status}`);

        if (status.status === 'REALIZADO') {
          localStorage.removeItem('pendingE2EId');
          setIsProcessing(false);
          setE2eId(null);
          clearInterval(interval);
        }
      } catch (error) {
        console.error('Erro ao consultar status do pagamento automaticamente:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [establishmentId, e2eId]);

  const handlePendingPayments = async () => {
    try {
      const result = await PaymentService.processPendingPayments(establishmentId);
      setE2eId(result);
      localStorage.setItem('pendingE2EId', result);
      setShowPendingButton(false);
      setIsProcessing(true);
    } catch (error) {
      console.error('Erro ao processar pagamentos pendentes:', error);
      alert('Erro ao processar pagamentos pendentes');
    }
  };

  const handleConsultStatus = async () => {
    if (!e2eId) return;

    try {
      setIsLoadingStatus(true);
      const status = await PaymentService.consultPendingPaymentByE2EId(establishmentId, e2eId);
      setStatusMessage(`Status: ${status.status}`);

      if (status.status === 'CONCLUIDO' || status.status === 'CONCLUIDO_SALVO') {
        localStorage.removeItem('pendingE2EId');
        setIsProcessing(false);
        setE2eId(null);
      }
    } catch (error) {
      console.error('Erro ao consultar status do pagamento:', error);
      setStatusMessage('Erro ao consultar status');
    } finally {
      setIsLoadingStatus(false);
      setIsProcessing(false);
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
        <>
          <hr style={{ width: '100%', margin: '20px 0', borderColor: '#ccc' }} />
          <p style={{ textAlign: 'center', marginBottom: '10px', color: '#555' }}>
            Há pagamentos pendentes aguardando resgate
          </p>
          <Button onClick={handlePendingPayments}>
            Resgatar Pagamentos
          </Button>
        </>
      )}

      {isProcessing && (
        <>
          <Button onClick={handleConsultStatus} disabled={isLoadingStatus}>
            {isLoadingStatus ? 'Consultando status...' : 'Processando pagamento, consultar status'}
          </Button>
          {statusMessage && (
            <p style={{ textAlign: 'center', marginTop: '10px', color: '#333' }}>
              {statusMessage}
            </p>
          )}
        </>
      )}
    </Container>
  );
};

export default EstablishmentHomeScreen;
