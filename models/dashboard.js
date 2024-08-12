
import React, { useState, useEffect } from 'react';
import StoreForm from './StoreForm';
import axios from 'axios';

const Dashboard = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios.get('/api/stores')
      .then(response => {
        setStores(response.data);
      })
      .catch(error => {
        console.error('Error fetching stores:', error);
      });
  }, []);

  const addStore = (store) => {
    setStores([...stores, store]);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <StoreForm addStore={addStore} />
      <h2>Stores</h2>
      <ul>
        {stores.map(store => (
          <li key={store.id}>{store.name} - {store.address}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;