// src/services/PaymentService.js

const BASE_URL = 'http://localhost:8080/api';

export const PaymentService = {
  async createPixPayment({ amount, commandNumber }) {
    const response = await fetch(`${BASE_URL}/payments/pix`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        calendario: { expiracao: 3600 },
        valor: { original: amount.toFixed(2) },
        solicitacaoPagador: `pagamento comanda #${commandNumber}`,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar pagamento Pix');
    }

    return response.json();
  },

  async checkPixPaymentStatus(txid) {
    const response = await fetch(`${BASE_URL}/payments/pix/${txid}`);
    if (!response.ok) throw new Error('Erro ao consultar status do pagamento');
    return response.json();
  },

  async createMoneyPayment({ amount, ec, commandNumber }) {
    const response = await fetch(`${BASE_URL}/payments/money`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        valor: amount,
        ec,
        comanda: commandNumber,
      }),
    });

    if (!response.ok) throw new Error('Erro ao registrar pagamento em dinheiro');
    return response.json();
  }
};
