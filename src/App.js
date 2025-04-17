// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import EstablishmentRegistrationScreen from './components/EstablishmentRegistrationScreen';
import HomeScreen from './components/HomeScreen';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/esqueci-senha" element={<ForgotPasswordScreen />} />
        <Route path="/cadastrar-estabelecimento" element={<EstablishmentRegistrationScreen />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
