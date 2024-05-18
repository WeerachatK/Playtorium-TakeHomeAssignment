
import React, { useState } from 'react';
import { products } from '../data';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducers/cartSlice';
import { Alert, Snackbar, Box } from '@mui/material';
import ProductCard from './productCard';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Shop() {
  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState([]);

  const handleAddToCart = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
    const newAlert = {
      id: new Date().getTime(),
      message: `${product.name} ${quantity} pieces have been added to the cart.`
    };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };
  const handleAlertClose = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <main className='h-full overflow-hidden mx-44 pt-8 flex flex-wrap'>
      {products.map(product => (
        <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} />
      ))}
      <Box
        sx={{
          zIndex: 9999,
        }}
      >
        {alerts.map((alert, index) => (
          <Snackbar
            key={alert.id}
            open={true}
            autoHideDuration={1500}
            onClose={() => handleAlertClose(alert.id)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ marginTop: `${index * 60}px` }}
          >
            <Alert
              onClose={handleAlertClose}
              icon={<AddShoppingCartIcon sx={{ color: 'white' }} />}
              sx={{ bgcolor: '#f56b2a', color: 'white' }}
              severity="success"
            >
              {alert.message}
            </Alert>
          </Snackbar>
        ))}
      </Box>

    </main>
  );
}

export default Shop