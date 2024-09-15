import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
});

export const getBalanceSheet = async () => {
  try {
    const response = await api.get('/balancesheet');
    
    return response.data;
  } catch (error) {
    console.error('Error fetching balance sheet data:', error);
    
    throw new Error('Could not retrieve balance sheet data');
  }
};
