// src/components/MenuScreen.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Header,
  BackButton,
  Title,
  Description,
  Input,
  ProductList,
  ProductItem,
  ProductName,
  ProductPrice,
  QuantitySelect,
  Footer,
  Total,
  Button,
} from './MenuScreen.styles';
import { FiArrowLeft } from 'react-icons/fi';
import { db, auth } from '../firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from 'firebase/firestore';

const MenuScreen = () => {
  const navigate = useNavigate();
  const [commandNumber, setCommandNumber] = useState('');
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);
  const isButtonDisabled = total === 0 || commandNumber.trim() === '';

  const user = auth.currentUser;

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return;

      const q = query(collection(db, 'product'), where('ec', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const productsData = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });

      setProducts(productsData);
    };

    fetchProducts();
  }, [user]);

  useEffect(() => {
    let newTotal = 0;
    products.forEach((product) => {
      const quantity = quantities[product.id] || 0;
      newTotal += product.price * quantity;
    });
    setTotal(newTotal);
  }, [quantities, products]);

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: parseInt(value),
    }));
  };

  const handleCreateOrder = async () => {
    const selectedItems = products
      .filter((product) => quantities[product.id] > 0)
      .map((product) => ({
        name: product.name,
        quantity: quantities[product.id],
        unitPrice: product.price,
      }));

    if (selectedItems.length === 0 || !commandNumber) {
      alert('Selecione pelo menos um item e preencha o número da comanda.');
      return;
    }

    try {
      await addDoc(collection(db, 'order'), {
        date: Timestamp.now(),
        ec: user.uid,
        value: total,
        status: 'CREATED',
        commandNumber,
        products: selectedItems,
      });

      navigate('/area-estabelecimento');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/area-estabelecimento')}>
          <FiArrowLeft size={20} />
        </BackButton>
        <Title>Cardápio</Title>
      </Header>

      <Description>Digite o número da comanda</Description>
      <Input
        type="text"
        placeholder="Número da comanda"
        value={commandNumber}
        onChange={(e) => setCommandNumber(e.target.value)}
      />

      <ProductList>
        {products.map((product) => (
          <ProductItem key={product.id}>
            <div>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>
            </div>
            <QuantitySelect
              value={quantities[product.id] || 0}
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
            >
              {[...Array(11).keys()].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </QuantitySelect>
          </ProductItem>
        ))}
      </ProductList>

      <Footer>
        <Total>Total: R$ {total.toFixed(2)}</Total>
        <Button onClick={handleCreateOrder} disabled={isButtonDisabled}>
          Criar Pedido
        </Button>
      </Footer>
    </Container>
  );
};

export default MenuScreen;
