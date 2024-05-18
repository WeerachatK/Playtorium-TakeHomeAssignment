import React, { useState } from 'react';
import ProductModal from './productModal';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ProductCard({ product, handleAddToCart }) {
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div className='Product-Card border border-black hover:border-orange-600 rounded-lg overflow-hidden m-4'>
                <section onClick={handleOpen}>
                    <figure className='bg-gray-600 h-40 w-40'>
                        <img src={product.img} alt={product.name} className='h-full w-full object-cover' />
                    </figure>
                    <article className='my-2 px-2'>
                        <p className=' font-semibold'>{product.name}</p>
                        <p className=' text-right'>{product.price} THB</p>
                    </article>
                </section>
                <section className='bg-orange-600 hover:bg-orange-300 h-8 w-full'>
                    <button
                        className='w-full h-full text-white hover:text-red-700'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product, 1);
                        }}
                    >
                        <AddShoppingCartIcon /> Add to cart
                    </button>
                </section>
            </div>
            <ProductModal
                open={open}
                handleClose={handleClose}
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
                handleAddToCart={handleAddToCart}
            />
        </>
    );
}

export default ProductCard