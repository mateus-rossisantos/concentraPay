import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import {
  Container,
  Header,
  BackButton,
  Title,
  Description,
  OrderList,
  OrderItem,
  TotalContainer,
  Button,
} from './OpenOrdersScreen.styles';
import { FiArrowLeft } from 'react-icons/fi';

const OpenOrdersScreen = () => {
  const navigate = useNavigate();
  const { commandNumber } = useParams();
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchOrdersWithEstablishmentNames = async () => {
      const ordersRef = collection(db, 'order');
      const q = query(
        ordersRef,
        where('commandNumber', '==', commandNumber),
        where('status', '==', 'CREATED')
      );

      const querySnapshot = await getDocs(q);
      const tempOrders = [];
      let calculatedTotal = 0;

      for (const docSnap of querySnapshot.docs) {
        const orderData = docSnap.data();

        let establishmentName = 'Estabelecimento desconhecido';

        if (orderData.ec) {
          const estRef = doc(db, 'estabelecimento', orderData.ec);
          const estSnap = await getDoc(estRef);
          if (estSnap.exists()) {
            establishmentName = estSnap.data().name;
          }
        }

        const orderTotal = orderData.value && !isNaN(orderData.value) ? orderData.value : 0;
        calculatedTotal += orderTotal;

        tempOrders.push({
          ...orderData,
          establishmentName,
          value: orderTotal,
        });
      }

      setOrders(tempOrders);
      setTotal(calculatedTotal);
    };

    fetchOrdersWithEstablishmentNames();
  }, [commandNumber]);

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <FiArrowLeft size={20} />
        </BackButton>
        <Title>Pedidos em Aberto</Title>
      </Header>

      <Description>
        Pedidos em aberto na comanda {commandNumber}
      </Description>

      <OrderList>
        {orders.map((order, index) => (
          <OrderItem key={index}>
            <div><strong>Estabelecimento:</strong> {order.establishmentName}</div>
            <div><strong>Total:</strong> R${order.value.toFixed(2)}</div>
          </OrderItem>
        ))}
      </OrderList>

      <TotalContainer>
        <div><strong>Total geral:</strong> R${total.toFixed(2)}</div>
        <Button onClick={() => alert('Pagamento realizado!')}>Pagar</Button>
      </TotalContainer>
    </Container>
  );
};

export default OpenOrdersScreen;
