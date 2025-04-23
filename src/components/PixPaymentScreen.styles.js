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
  margin-bottom: 1.5rem;
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

export const BoldText = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: #000;
  text-align: center;
  margin-bottom: 1rem;
`;

export const QRCodeWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;

  img {
    width: 200px;
    height: 200px;
    border-radius: 8px;
  }
`;

export const PixCodeBox = styled.div`
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  word-break: break-all;
`;

export const PixCodeText = styled.p`
  font-size: 0.9rem;
  color: #333;
`;

export const CopyButton = styled.button`
  margin-top: 0.75rem;
  background-color: #00c2a8;
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const PayButton = styled.button`
  background-color: #4b39ef;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  width: 100%;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
