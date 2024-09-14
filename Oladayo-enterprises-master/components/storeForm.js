   // StoreForm.js
   import React, { useState } from 'react';
   import axios from 'axios';

   const StoreForm = ({ addStore }) => {
     const [storeName, setStoreName] = useState('');
     const [storeAddress, setStoreAddress] = useState('');

     const handleSubmit = (e) => {
       e.preventDefault();

       const newStore = { name: storeName, address: storeAddress };
       
       axios.post('/api/stores', newStore)
         .then(response => {
           addStore(response.data);
           setStoreName('');
           setStoreAddress('');
         })
         .catch(error => {
           console.error('Error creating store:', error);
         });
     };

     return (
       <form onSubmit={handleSubmit}>
         <input
           type="text"
           value={storeName}
           onChange={(e) => setStoreName(e.target.value)}
           placeholder="Store Name"
           required
         />
         <input
           type="text"
           value={storeAddress}
           onChange={(e) => setStoreAddress(e.target.value)}
           placeholder="Store Address"
           required
         />
         <button type="submit">Create Store</button>
       </form>
     );
   };

   export default StoreForm;