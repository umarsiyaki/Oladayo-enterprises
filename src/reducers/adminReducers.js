import { FETCH_TOP_PRODUCTS, FETCH_TOP_CASHIERS, FETCH_CASHIER_PERFORMANCE, FETCH_CASHIER_ACTIVITY, FETCH_MONTHLY_PERFORMANCE } from '../actions/types';

const initialState = {
  topProducts: [],
  topCashiers: [],
  cashierPerformance: [],
  cashierActivity: [],
  monthlyPerformance: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOP_PRODUCTS:
      return {
        ...state,
        topProducts: action.payload
      };
    case FETCH_TOP_CASHIERS:
      return {
        ...state,
        topCashiers: action.payload
      };
    case FETCH_CASHIER_PERFORMANCE:
      return {
        ...state,
        cashierPerformance: action.payload
      };
    case FETCH_CASHIER_ACTIVITY:
      return {
        ...state,
        cashierActivity: action.payload
      };
    case FETCH_MONTHLY_PERFORMANCE:
      return {
        ...state,
        monthlyPerformance: action.payload
      };
    default:
      return state;
  }
}