import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCashierOrders } from '../actions/cashierActions';

const CashierDashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.cashier.orders);

  useEffect(() => {
    dispatch(fetchCashierOrders());
  }, [dispatch]);

  return (
    <div className="cashier-container">
      <nav>
        <div className="logo-container">
          <h1>Cashier Dashboard</h1>
        </div>
        <div className="nav-right">
          <input type="text" placeholder="Search..." />
          <div className="notification-bell">🔔</div>
          <div className="user-profile">
            <img src="/path/to/profile-pic.jpg" alt="Profile" className="user-profile-pic" />
            <span>Username</span>
          </div>
          <div className="toggle-menu">☰</div>
        </div>
      </nav>

      <div id="orders" className="cashier-section">
        <h2>Orders</h2>
        {orders.map(order => (
          <div key={order._id} className="order-item">
            <p>Order ID: {order._id}</p>
            <p>Total: {order.total}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CashierDashboard;