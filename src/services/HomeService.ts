// src/services/ProductService.ts
import axios from 'axios';
import { Home } from '../models/Home';
import { PRODUCT_ENDPOINT } from '../constants/API';
import { useAuth } from '../context/AuthContext';

export const getStores = async (): Promise<Home> => {
  const { setLoginInfo, login, user, logout } = useAuth();
  try {
    const response = await axios.post(PRODUCT_ENDPOINT,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      }
    });
    
    return response.data.result;
  } catch (error) {
    console.error('Error fetching products', error);
    throw error;
  }
};
