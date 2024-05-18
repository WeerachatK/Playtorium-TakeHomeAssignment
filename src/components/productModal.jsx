import React from 'react';
import { Modal, Box, Typography} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import QuantityInput from './quantityInput';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
};

export default function ProductModal({ open, handleClose, product, quantity, setQuantity, handleAddToCart }) {
    if (!product) return null;

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <img src={product.img} alt={product.name} style={{ width: '100%', borderRadius: '8px' }} />
                <Typography id="product-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="h6" color="text.primary" className='text-right ' sx={{ mt: 2 }}>
                    {product.price} THB
                </Typography>
                <div className="flex items-center justify-center mt-4">
                    <QuantityInput value={quantity} onChange={(event, value) => setQuantity(value)} />
                </div>
                <button className='bg-orange-600 w-full h-full mt-8 p-1 text-white rounded-sm shadow-md hover:text-red-700 hover:bg-orange-300'
                    onClick={() => {
                        handleAddToCart(product, quantity);
                        handleClose();
                      }}
                > <AddShoppingCartIcon /> Add to cart</button>
            </Box>
        </Modal>
    );
}
