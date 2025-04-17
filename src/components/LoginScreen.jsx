import React, { useState } from 'react';
import {
  Container,
  Title,
  ToggleWrapper,
  ToggleButton,
  Label,
  SubLabel,
  Input,
  Button,
  TextButton,
  Error,
} from './LoginScreen.styles';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';




const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!isLogin && senha !== repetirSenha) {
      setErroSenha('As senhas não coincidem');
      return;
    }
  
    setErroSenha('');
  
    try {
      if (isLogin) {
        // LOGIN
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;
        console.log('Logado como:', user.email);
        navigate('/home');
      } else {
        // CADASTRO
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;
        console.log('Usuário criado:', user.email);
        await setDoc(doc(db, 'users', user.uid), {
            email,
            isEc : false
          });
        alert('Cadastro realizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro:', error.code, error.message);
      alert(`Erro: ${error.message}`);
    }
  };  

  return (
    <Container>
      <Title>concentraPay</Title>

      <ToggleWrapper>
        <ToggleButton active={isLogin} onClick={() => setIsLogin(true)}>Entrar</ToggleButton>
        <ToggleButton active={!isLogin} onClick={() => setIsLogin(false)}>Cadastro</ToggleButton>
      </ToggleWrapper>

      {isLogin ? (
        <>
          <Label>Olá, entre com sua informações para logar</Label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <Button onClick={handleSubmit}>Entrar</Button>
          <TextButton onClick={() => navigate('/esqueci-senha')}>
            Esqueceu a senha?
            </TextButton>
        </>
      ) : (
        <>
          <Label>Crie sua conta</Label>
          <SubLabel>Preencha as informações para se cadastrar no aplicativo</SubLabel>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Repetir senha"
            value={repetirSenha}
            onChange={e => setRepetirSenha(e.target.value)}
          />
          {erroSenha && <Error>{erroSenha}</Error>}
          <Button onClick={handleSubmit}>Cadastrar</Button>
          <TextButton onClick={() => navigate('/cadastrar-estabelecimento')}>
                Cadastrar estabelecimento
        </TextButton>
        </>
      )}
    </Container>
  );
};

export default LoginScreen;
