// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import EstablishmentRegistrationScreen from './components/EstablishmentRegistrationScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/esqueci-senha" element={<ForgotPasswordScreen />} />
        <Route path="/cadastrar-estabelecimento" element={<EstablishmentRegistrationScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
