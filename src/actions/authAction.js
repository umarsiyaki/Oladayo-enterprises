import axios from 'axios';
import { LOAD_USER, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/auth/me');
    dispatch({ type: LOAD_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = ({ name, email, password, role }) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/register', { name, email, password, role });
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.response.data.errors });
  }
};

export const login = ({ email, password }) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/login', { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data.errors });
  }
};