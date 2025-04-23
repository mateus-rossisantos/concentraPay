import React from 'react';
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

const PixPaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;

  const pixKey = '00020126360014BR.GOV.BCB.PIX0114+5599999999995204000053039865802BR5925ConcentraPay Pagamentos6009SAO PAULO62290525PixPagamentoConcentraPay6304B13F';

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    alert('Código Pix copiado!');
  };

  const handleConfirmPayment = () => {
    alert('Pagamento confirmado (simulado)');
    navigate('/pagamento-sucesso');
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
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PagamentoConcentraPix"
          alt="QR Code Pix"
        />
      </QRCodeWrapper>

      <PixCodeBox>
        <PixCodeText>{pixKey}</PixCodeText>
        <CopyButton onClick={handleCopy}>
          <FiCopy size={18} /> Copiar
        </CopyButton>
      </PixCodeBox>

      <PayButton onClick={handleConfirmPayment}>
        <FiRefreshCw size={20} />
        Verificar Status
      </PayButton>
    </Container>
  );
};

export default PixPaymentScreen;
