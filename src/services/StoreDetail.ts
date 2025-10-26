// src/services/ProductService.ts
import axios from 'axios';
import { Store } from '../models/Store';
import { STORE_DETAIL } from '../constants/API';

export const getStores = async (params: number): Promise<Store> => {
  try {
    const response = await axios.get(STORE_DETAIL + params);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching products', error);
    throw error;
  }
};
