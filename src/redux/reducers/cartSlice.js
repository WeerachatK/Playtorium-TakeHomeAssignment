import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      let updatedCartItems;
      if (existingItem) {
        updatedCartItems = state.cartItems.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item
        );
      } else {
        updatedCartItems = [...state.cartItems, action.payload];
      }
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      state.cartItems = updatedCartItems;
    },
    removeFromCart: (state, action) => {
      const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      state.cartItems = updatedCartItems;
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const updatedCartItems = state.cartItems.map(item =>
        item.id === productId ? { ...item, quantity: Number(quantity) } : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      state.cartItems = updatedCartItems;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
