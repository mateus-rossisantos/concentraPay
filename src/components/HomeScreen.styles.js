// src/components/HomeScreen.styles.js
import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #ffffff;
  min-height: 100vh;
  padding: 1.5rem;
  box-sizing: border-box;
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
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  display: block;
`;

export const Button = styled.button`
  margin: 1.5rem auto 0;
  width: 80%;
  padding: 0.75rem;
  background-color: #4b39ef;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: block;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const TextButton = styled.button`
  margin-top: 1rem;
  background: none;
  border: none;
  color: #4b39ef;
  font-size: 0.95rem;
  cursor: pointer;
  text-decoration: underline;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
