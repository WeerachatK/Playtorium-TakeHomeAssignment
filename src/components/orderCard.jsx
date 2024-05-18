import React from 'react';
import Swal from 'sweetalert2';
import QuantityInput from './quantityInput';

function OrderCard({ product, quantity, handleCancel, handleQuantityChange }) {
    const handleRemoveOrder = () => {
        Swal.fire({
          title: 'Are you sure?',
          html: `You want to remove <span class="font-semibold">${product.name}</span><br>
             <span class="font-semibold">${quantity}</span> pieces from your shopping cart?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, remove it!',
        }).then((result) => {
          if (result.isConfirmed) {
            handleCancel(product.id);
            Swal.fire({
              title: 'Removed!',
              html: `<span class="font-semibold">${product.name}</span> has been removed from your shopping cart.`,
              timer: 1500,
              icon: 'success',
              timerProgressBar: true,
            });
          }
        });
      };
    return (
        <section className='group w-full h-full flex my-2 justify-between px-10 items-center'>
            <div className='flex'>
                <figure className='bg-gray-600 h-20 w-20'>
                    <img src={product.img} alt={product.name} className='h-full w-full object-cover' />
                </figure>
                <div className='m-2'>
                    <div>{product.name}</div>
                    <div>{product.price} THB/piece</div>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <QuantityInput
                    value={quantity}
                    onChange={(event, value) => handleQuantityChange(product.id, value)}
                />
                <p className=' text-sm text-gray-500'>piece</p>
            </div>
            <button
                className='invisible rounded-sm text-blue-500 px-2 group-hover:visible  hover:bg-blue-50'
                onClick={handleRemoveOrder}
            >
                remove
            </button>
            <div>
                <span>{product.price * quantity}</span> THB
            </div>
        </section>
    );
}

export default OrderCard;
