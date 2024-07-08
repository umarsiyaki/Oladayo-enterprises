import axios from 'axios';
import { FETCH_CASHIER_ORDERS, CASHIER_ERROR } from './types';

export const fetchCashierOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/cashier/orders');
    dispatch({ type: FETCH_CASHIER_ORDERS, payload: res.data });
  } catch (err) {
    dispatch({ type: CASHIER_ERROR, payload: err.response.data.errors });
  }
};