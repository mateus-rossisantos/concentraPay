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
  margin-bottom: 1rem;
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
  font-size: 1rem;
  color: #000;
  margin-top: 1rem;
  text-align: center;
`;

export const Input = styled.input`
  margin-top: 1rem;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SmallInput = styled(Input)`
  width: 100%;
`;

export const Button = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #4b39ef;
  color: white;
  border: none;
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
