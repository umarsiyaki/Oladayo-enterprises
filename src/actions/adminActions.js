import axios from 'axios';
import { FETCH_ADMIN_DATA, ADMIN_ERROR } from './types';

export const fetchAdminData = () => async dispatch => {
  try {
    const topProducts = await axios.get('/api/admin/top-products');
    const topCashiers = await axios.get('/api/admin/top-cashiers');
    const cashierPerformance = await axios.get('/api/admin/cashier-performance');
    const cashierActivity = await axios.get('/api/admin/cashier-activity');
    const monthlyPerformance = await axios.get('/api/admin/monthly-performance');

    dispatch({
      type: FETCH_ADMIN_DATA,
      payload: {
        topProducts: topProducts.data,
        topCashiers: topCashiers.data,
        cashierPerformance: cashierPerformance.data,
        cashierActivity: cashierActivity.data,
        monthlyPerformance: monthlyPerformance.data
      }
    });
  } catch (err) {
    dispatch({ type: ADMIN_ERROR, payload: err.response.data.errors });
  }
};
import axios from 'axios';
import { FETCH_TOP_PRODUCTS, FETCH_TOP_CASHIERS, FETCH_CASHIER_PERFORMANCE, FETCH_CASHIER_ACTIVITY, FETCH_MONTHLY_PERFORMANCE } from './types';

export const fetchTopProducts = () => async dispatch => {
  try {
    const res = await axios.get('/admin/top-products');
    dispatch({
      type: FETCH_TOP_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchTopCashiers = () => async dispatch => {
  try {
    const res = await axios.get('/admin/top-cashiers');
    dispatch({
      type: FETCH_TOP_CASHIERS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchCashierPerformance = () => async dispatch => {
  try {
    const res = await axios.get('/admin/cashier-performance');
    dispatch({
      type: FETCH_CASHIER_PERFORMANCE,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchCashierActivity = () => async dispatch => {
  try {
    const res = await axios.get('/admin/cashier-activity');
    dispatch({
      type: FETCH_CASHIER_ACTIVITY,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchMonthlyPerformance = () => async dispatch => {
  try {
    const res = await axios.get('/admin/monthly-performance');
    dispatch({
      type: FETCH_MONTHLY_PERFORMANCE,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};