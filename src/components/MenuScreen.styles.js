// src/components/MenuScreen.styles.js
import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #ffffff;
  min-height: 100vh;
  padding: 1.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: #000;
`;

export const Description = styled.p`
  margin-top: 2rem;
  font-size: 1rem;
  color: #000;
`;

export const Input = styled.input`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
`;

export const ProductList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
`;

export const ProductName = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #000;
`;

export const ProductPrice = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

export const QuantitySelect = styled.select`
  padding: 0.4rem;
  border-radius: 6px;
  font-size: 1rem;
  border: 1px solid #ccc;
`;

export const Footer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

export const Total = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
`;

export const Button = styled.button`
  padding: 0.75rem 1rem;
  background-color: #4b39ef;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;


