import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #ffffff;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const IconWrapper = styled.div`
  color: #00c851; /* verde sucesso */
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  color: #000;
  text-align: center;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #444;
  text-align: center;
  margin-bottom: 2rem;
`;

export const Button = styled.button`
  background-color: #4b39ef;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
