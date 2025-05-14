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
  const [numeroComanda, setCommandNumber] = useState('');
  const [produtos, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);
  const isButtonDisabled = total === 0 || numeroComanda.trim() === '';

  const user = auth.currentUser;

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return;

      const q = query(collection(db, 'produto'), where('ec', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const produtosData = [];
      querySnapshot.forEach((doc) => {
        produtosData.push({ id: doc.id, ...doc.data() });
      });

      setProducts(produtosData);
    };

    fetchProducts();
  }, [user]);

  useEffect(() => {
    let newTotal = 0;
    produtos.forEach((produto) => {
      const quantity = quantities[produto.id] || 0;
      newTotal += produto.preco * quantity;
    });
    setTotal(newTotal);
  }, [quantities, produtos]);

  const handleQuantityChange = (produtoId, valor) => {
    setQuantities((prev) => ({
      ...prev,
      [produtoId]: parseInt(valor),
    }));
  };

  const handleCreateOrder = async () => {
    const selectedItems = produtos
      .filter((produto) => quantities[produto.id] > 0)
      .map((produto) => ({
        nome: produto.nome,
        quantity: quantities[produto.id],
        unitPrice: produto.preco,
      }));

    if (selectedItems.length === 0 || !numeroComanda) {
      alert('Selecione pelo menos um item e preencha o número da comanda.');
      return;
    }

    try {
      await addDoc(collection(db, 'pedido'), {
        date: Timestamp.now(),
        ec: user.uid,
        valor: total,
        status: 'CREATED',
        numeroComanda,
        produtos: selectedItems,
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
        value={numeroComanda}
        onChange={(e) => setCommandNumber(e.target.value)}
      />

      <ProductList>
        {produtos.map((produto) => (
          <ProductItem key={produto.id}>
            <div>
              <ProductName>{produto.nome}</ProductName>
              <ProductPrice>R$ {produto.preco.toFixed(2)}</ProductPrice>
            </div>
            <QuantitySelect
              value={quantities[produto.id] || 0}
              onChange={(e) => handleQuantityChange(produto.id, e.target.value)}
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
