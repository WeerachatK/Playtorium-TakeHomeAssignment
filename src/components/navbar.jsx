import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import PaidIcon from '@mui/icons-material/Paid';

function Navbar() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <nav className="bg-blue-500 py-4 px-24 flex justify-center items-center">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-200 px-8"> <StoreIcon/> Shop</Link>
        </li>
        <li>
          <Link to="/cart" className="text-white hover:text-gray-200 px-8">  <ShoppingCartIcon/> Cart ({itemCount})</Link>
        </li>
        <li>
          <Link to="/payment" className="text-white hover:text-gray-200 px-8"><PaidIcon/> Payment</Link>
        </li>
       
      </ul>
    </nav>
  );
}

export default Navbar