import styled from 'styled-components';

export const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Roboto', sans-serif;
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BackWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  cursor: pointer;
  align-self: flex-start;
`;

export const BackArrow = styled.span`
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;

export const BackText = styled.span`
  font-size: 1rem;
  color: #000;
`;

export const Title = styled.h2`
  color: #000;
  margin-bottom: 1rem;
  text-align: center;
`;

export const InputLabel = styled.label`
  font-size: 1rem;
  color: #000;
  margin-bottom: 0.5rem;
  align-self: flex-start;
`;

export const Input = styled.input`
  width: 90%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const RadioLabel = styled.label`
  font-size: 1rem;
  color: #000;
`;

export const Button = styled.button`
  width: 80%;               
  padding: 0.75rem;
  background-color: #4b39ef;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  margin: 1rem auto 0;       
  display: block;
`;

