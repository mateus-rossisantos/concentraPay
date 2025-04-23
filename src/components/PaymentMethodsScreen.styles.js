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
  text-align: center;
`;

export const Description = styled.p`
  margin: 2rem 0 1.5rem;
  font-size: 1.2rem; 
  color: #000;
  font-weight: bold; 
  text-align: center;
`;


const baseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  cursor: pointer;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }

  svg {
    flex-shrink: 0;
  }
`;

export const Button = styled(baseButton)`
  background-color: #4b39ef;
`;

export const GreenButton = styled(baseButton)`
  background-color: #00c2a8;
`;

export const OrangeButton = styled(baseButton)`
  background-color: #ff9800;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
