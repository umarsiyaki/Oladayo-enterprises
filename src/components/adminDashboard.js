import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopProducts, fetchTopCashiers, fetchCashierPerformance, fetchCashierActivity, fetchMonthlyPerformance } from '../actions/adminActions';
import Chart from 'chart.js/auto';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { topProducts, topCashiers, cashierPerformance, cashierActivity, monthlyPerformance } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchTopProducts());
    dispatch(fetchTopCashiers());
    dispatch(fetchCashierPerformance());
    dispatch(fetchCashierActivity());
    dispatch(fetchMonthlyPerformance());
  }, [dispatch]);

  useEffect(() => {
    if (monthlyPerformance) {
      const ctx = document.getElementById('monthly-performance-chart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: monthlyPerformance.map(item => `${item._id.month}/${item._id.year}`),
          datasets: [
            {
              label: 'Total Sales',
              data: monthlyPerformance.map(item => item.totalSales),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Total Orders',
              data: monthlyPerformance.map(item => item.totalOrders),
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [monthlyPerformance]);

  return (
    <div className="admin-container">
      <section className="admin-section">
        <h2>Admin Dashboard</h2>
        <div className="admin-links">
          <a href="/add-product">Add Product</a>
          <a href="/add-cashier">Add Cashier</a>
          <a href="/message-user">Message User</a>
          <a href="/update-product">Update Product</a>
        </div>
      </section>
      <section id="top-products" className="admin-section">
        <h3>Top Selling Products</h3>
        {topProducts.map(product => (
          <div key={product._id} className="product-item">
            <p>Product ID: {product._id}</p>
            <p>Total Sales: {product.totalSales}</p>
          </div>
        ))}
      </section>
      <section id="top-cashiers" className="admin-section">
        <h3>Top Cashiers</h3>
        {topCashiers.map(cashier => (
          <div key={cashier._id} className="product-item">
            <p>Cashier ID: {cashier._id}</p>
            <p>Total Sales: {cashier.totalSales}</p>
          </div>
        ))}
      </section>
      <section id="cashier-performance" className="admin-section">
        <h3>Cashier Performance</h3>
        {cashierPerformance.map(item => (
          <div key={item._id} className="product-item">
            <p>Cashier Name: {item.name}</p>
            <p>Tasks: {item.tasks.join(', ')}</p>
          </div>
        ))}
      </section>
      <section id="cashier-activity" className="admin-section">
        <h3>Cashier Activity</h3>
        {cashierActivity.map(item => (
          <div key={item._id} className="product-item">
            <p>Cashier Name: {item.name}</p>
            <p>Activity: {item.activity.join(', ')}</p>
          </div>
        ))}
      </section>
      <section id="monthly-performance" className="admin-section">
        <h3>Monthly Business Performance</h3>
        <canvas id="monthly-performance-chart"></canvas>
      </section>
      <section className="admin-section">
        <h3>Messaging</h3>
        <iframe src="message-user.html" className="message-iframe"></iframe>
      </section>
    </div>
  );
};

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminData } from '../actions/adminActions';
import PerformanceChart from './PerformanceChart';
import MessageUser from './MessageUser';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { topProducts, topCashiers, cashierPerformance, cashierActivity, monthlyPerformance } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchAdminData());
  }, [dispatch]);

  return (
    <div className="admin-container">
      <nav>
        <div className="logo-container">
          <h1>Admin Dashboard</h1>
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

      <div id="top-products" className="admin-section">
        <h2>Top Products</h2>
        {topProducts.map(product => (
          <div key={product._id} className="product-item">
            <p>Product ID: {product._id}</p>
            <p>Total Sales: {product.totalSales}</p>
          </div>
        ))}
      </div>

      <div id="top-cashiers" className="admin-section">
        <h2>Top Cashiers</h2>
        {topCashiers.map(cashier => (
          <div key={cashier._id} className="product-item">
            <p>Cashier ID: {cashier._id}</p>
            <p>Total Sales: {cashier.totalSales}</p>
          </div>
        ))}
      </div>

      <div id="cashier-performance" className="admin-section">
        <h2>Cashier Performance</h2>
        {cashierPerformance.map(item => (
          <div key={item._id} className="product-item">
            <p>Cashier Name: {item.name}</p>
            <p>Tasks: {item.tasks.join(', ')}</p>
          </div>
        ))}
      </div>

      <div id="cashier-activity" className="admin-section">
        <h2>Cashier Activity</h2>
        {cashierActivity.map(item => (
          <div key={item._id} className="product-item">
            <p>Cashier Name: {item.name}</p>
            <p>Activity: {item.activity.join(', ')}</p>
          </div>
        ))}
      </div>

      <div id="monthly-performance" className="admin-section">
        <h2>Monthly Performance</h2>
        <canvas id="monthly-performance-chart"></canvas>
        <PerformanceChart data={monthlyPerformance} />
      </div>

      <div id="message-section" className="admin-section">
        <h2>Message Users</h2>
        <MessageUser />
      </div>
    </div>
  );
};

export default AdminDashboard;
