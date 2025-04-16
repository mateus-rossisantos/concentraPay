import styled from 'styled-components';

export const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Roboto', sans-serif;
  background-color: #ffffff;
  min-height: 100vh;
`;

export const Title = styled.h1`
  text-align: center;
  color: #4b39ef;
  margin-bottom: 1rem;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const ToggleButton = styled.button`
  background-color: ${({ active }) => (active ? '#4b39ef' : '#e0e0e0')};
  color: ${({ active }) => (active ? '#ffffff' : '#000000')};
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  border-radius: 20px;
  margin: 0 0.5rem;
`;

export const Label = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const SubLabel = styled.p`
  font-size: 0.9rem;
  text-align: center;
  margin-top: -1rem;
  margin-bottom: 1.5rem;
  color: #555;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const Button = styled.button`
  width: 80%; 
  display: block;
  margin: 0 auto;
  padding: 0.75rem;
  background-color: #4b39ef;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0.5rem;
  cursor: pointer;
`;

export const TextButton = styled.button`
  background: none;
  border: none;
  color: #4b39ef;
  margin-top: 1rem;
  cursor: pointer;
  text-align: center;
  width: 100%;
  font-size: 0.9rem;
`;

export const Error = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;
