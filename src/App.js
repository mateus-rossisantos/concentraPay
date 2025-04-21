// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import EstablishmentRegistrationScreen from './components/EstablishmentRegistrationScreen';
import HomeScreen from './components/HomeScreen';
import EstablishmentHomeScreen from './components/EstablishmentHomeScreen';
import RegisterProductScreen from './components/RegisterProductScreen';
import MenuScreen from './components/MenuScreen';
import OpenOrdersScreen from './components/OpenOrdersScreen';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/esqueci-senha" element={<ForgotPasswordScreen />} />
        <Route path="/cadastrar-estabelecimento" element={<EstablishmentRegistrationScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/area-estabelecimento" element={<EstablishmentHomeScreen />} />
        <Route path="/cadastrar-produto" element={<RegisterProductScreen />} />
        <Route path="/criar-pedido" element={<MenuScreen />} />
        <Route path="/pedidos/:commandNumber" element={<OpenOrdersScreen />} />



      </Routes>
    </Router>
  );
}

export default App;
