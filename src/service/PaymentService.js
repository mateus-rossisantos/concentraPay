// src/services/PaymentService.js

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const PaymentService = {
  async createPixPayment({ amount, numeroComanda }) {
    const response = await fetch(`${BASE_URL}/payments/pix`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        calendario: { expiracao: 3600 },
        valor: { original: amount.toFixed(2) },
        solicitacaoPagador: `pagamento comanda #${numeroComanda}`,
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

  async createMoneyPayment({ amount, ec, numeroComanda }) {
    const response = await fetch(`${BASE_URL}/payments/money`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        valor: amount,
        ec,
        comanda: numeroComanda,
      }),
    });

    if (!response.ok) throw new Error('Erro ao registrar pagamento em dinheiro');
    return response.json();
  },

  async processPendingPayments(id) {
    const response = await fetch(`${BASE_URL}/payments/${id}/pending`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Erro ao processar pagamentos pendentes');
    }

    return response.text();
  },

  async consultPendingPaymentByE2EId(id, e2eId) {
    const response = await fetch(`${BASE_URL}/payments/${id}/pending/${e2eId}`);

    if (!response.ok) {
      throw new Error('Erro ao consultar pagamento pendente por E2E ID');
    }

    return response.json();
  }
};
