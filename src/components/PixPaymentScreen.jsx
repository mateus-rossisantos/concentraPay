import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCopy, FiRefreshCw } from 'react-icons/fi';
import {
  Container,
  Header,
  BackButton,
  Title,
  QRCodeWrapper,
  PixCodeBox,
  PixCodeText,
  CopyButton,
  BoldText,
  PayButton,
} from './PixPaymentScreen.styles';
import { PaymentService } from '../service/PaymentService';

const PixPaymentScreen = () => {
const navigate = useNavigate();
const location = useLocation();
const totalAmount = location.state?.totalAmount || 0;
const numeroComanda = location.state?.numeroComanda || 0;
const [pixKey, setPixKey] = useState('');
const [qrCodeUrl, setQrCodeUrl] = useState('');
const [loading, setLoading] = useState(true);
const hasRequested = useRef(false);
const [txid, setTxid] = useState(null);
const [checkingStatus, setCheckingStatus] = useState(false);


useEffect(() => {
  if (hasRequested.current) return;
  hasRequested.current = true;

  const fetchPixPayment = async () => {
    try {
      const data = await PaymentService.createPixPayment({
        amount: totalAmount,
        numeroComanda,
      });
      setPixKey(data.pixCopiaECola);
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data.pixCopiaECola)}`);
      setTxid(data.txid)
    } catch (err) {
      alert('Erro ao gerar pagamento Pix');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchPixPayment();
}, [totalAmount, numeroComanda]);

  useEffect(() => {
    if (!txid) return;

    const interval = setInterval(() => {
      handleConfirmPayment();
    }, 5000); 

    return () => clearInterval(interval); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txid]);


  const handleCopy = () => {
    if (pixKey) {
      navigator.clipboard.writeText(pixKey);
      alert('Código Pix copiado!');
    }
  };

  const handleConfirmPayment = async () => {
    if (!txid) {
      alert('Pagamento ainda não foi iniciado.');
      return;
    }
  
    setCheckingStatus(true);
    try {
      const statusData = await PaymentService.checkPixPaymentStatus(txid);
      if (statusData.status === 'CONCLUIDA') {
        navigate('/pagamento-sucesso');
      }
    } catch (error) {
      alert('Erro ao verificar o status do pagamento');
      console.error(error);
    } finally {
      setCheckingStatus(false);
    }
  };
  

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <FiArrowLeft size={20} />
        </BackButton>
        <Title>Pagamento via Pix</Title>
      </Header>

      <BoldText>Valor a pagar: R${totalAmount.toFixed(2)}</BoldText>

      <QRCodeWrapper>
        {loading ? (
          <p>Carregando QR Code...</p>
        ) : (
          <img src={qrCodeUrl} alt="QR Code Pix" />
        )}
      </QRCodeWrapper>

      <PixCodeBox>
        <PixCodeText>{loading ? 'Gerando código Pix...' : pixKey}</PixCodeText>
        <CopyButton onClick={handleCopy} disabled={loading}>
          <FiCopy size={18} /> Copiar
        </CopyButton>
      </PixCodeBox>

      <PayButton onClick={handleConfirmPayment} disabled={loading || checkingStatus}>
        {checkingStatus ? (
          <>
            <FiRefreshCw size={20} className="spin" />
            Verificando...
          </>
        ) : (
          <>
            <FiRefreshCw size={20} />
            Verificar Status
          </>
        )}
      </PayButton>

    </Container>
  );
};

export default PixPaymentScreen;
