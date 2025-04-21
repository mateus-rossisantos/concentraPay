import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin-left: 1rem;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1rem;
`;

export const OrderList = styled.div`
  margin-bottom: 1rem;
`;

export const OrderItem = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
