
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Button, Slider } from '@mui/material';
import SellIcon from '@mui/icons-material/Sell';
import PaidIcon from '@mui/icons-material/Paid';
import CouponModal from './couponModal';
import OnTopModal from './onTopModal';
import SeasonalModal from './seasonalModal';
import OrderCard from './orderCard';
import { removeFromCart, updateQuantity } from '../redux/reducers/cartSlice';



function Cart() {
  const dispatch = useDispatch();
  const [openCoupon, setOpenCoupon] = useState(false);
  const [openOnTop, setOpenOnTop] = useState(false);
  const [openSeasonal, setOpenSeasonal] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState({ type: '', value: 0 });
  const [onTopDiscount, setOnTopDiscount] = useState({ type: '', value: 0 });
  const [seasonalDiscount, setSeasonalDiscount] = useState({ every: 0, discount: 0 });
  const [pointsToUse, setPointsToUse] = useState(0);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const groupedItems = _.groupBy(cartItems, 'id');
  const itemsWithQuantity = _.map(groupedItems, (items) => ({
    product: items[0],
    quantity: items[0].quantity,
  }));

  const handleOpenCoupon = () => setOpenCoupon(true);
  const handleCloseCoupon = () => setOpenCoupon(false);
  const handleOpenOnTop = () => setOpenOnTop(true);
  const handleCloseOnTop = () => setOpenOnTop(false);
  const handleOpenSeasonal = () => setOpenSeasonal(true);
  const handleCloseSeasonal = () => setOpenSeasonal(false);

  const applyCouponDiscount = (coupon) => {
    setCouponDiscount({ type: coupon.type, value: coupon.discount });
    handleCloseCoupon();
  };
  const applyOnTopDiscount = (campaign) => {
    setOnTopDiscount({ type: campaign.type, value: campaign.discount, product_category: campaign.product_category, points: campaign.customer_points, maxPercentage: campaign.maxPercentage });
    if (campaign.type === 'point') {
      setPointsToUse(0);
    }
    handleCloseOnTop();
  };
  const applySeasonalDiscount = (campaign) => {
    setSeasonalDiscount({ type: 'seasonal', every: campaign.every, discount: campaign.discount });
    handleCloseSeasonal();
  };

  const handleCancelCouponDiscount = () => {
    setCouponDiscount({ type: '', value: 0 });
  };
  const handleCancelOnTopDiscount = () => {
    setOnTopDiscount({ type: '', value: 0 });
    setPointsToUse(0);
  };
  const handleCancelSeasonalDiscount = () => {
    setSeasonalDiscount({ every: 0, discount: 0 });
  };

  const handleSliderChange = (event, newValue) => {
    setPointsToUse(newValue);
  };
  const createMarks = (totalAmount) => {
    const maxPoints = Math.min(onTopDiscount.points, totalAmount * (onTopDiscount.maxPercentage / 100));
    return [
      {
        value: maxPoints,
        label: `${maxPoints} (MAX)`,
      },
    ];
  };

  const handleCancelItem = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };
  const totalAmount = itemsWithQuantity.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const calculateCouponDiscount = () => {
    if (couponDiscount.type === 'amounts') {
      return couponDiscount.value;
    } else if (couponDiscount.type === 'percentage') {
      return totalAmount * (couponDiscount.value / 100);
    }
    return 0;
  };
  const couponDiscountAmount = calculateCouponDiscount();

  const calculateOnTopDiscount = () => {
    let onTopDiscountAmount = 0;
    if (onTopDiscount.type === 'percentage') {
      const applicableItems = itemsWithQuantity.filter(
        (item) => item.product.category === onTopDiscount.product_category
      );
      const applicableAmount = applicableItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      onTopDiscountAmount = (applicableAmount - couponDiscountAmount) * (onTopDiscount.value / 100);
    } else if (onTopDiscount.type === 'point') {
      const maxDiscount = (totalAmount - couponDiscountAmount) * (onTopDiscount.maxPercentage / 100);
      onTopDiscountAmount = Math.min(pointsToUse, maxDiscount);
    } else if (onTopDiscount.type === 'amounts') {
      const applicableItems = itemsWithQuantity.filter(
        (item) => item.product.category === onTopDiscount.product_category
      );
      const applicableAmount = applicableItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      onTopDiscountAmount = Math.min(onTopDiscount.value, applicableAmount);
    }
    return onTopDiscountAmount;
  };
  const onTopDiscountAmount = calculateOnTopDiscount();

  const calculateSeasonalDiscount = () => {
    if (seasonalDiscount.every > 0) {
      return Math.floor((totalAmount - couponDiscountAmount - onTopDiscountAmount) / seasonalDiscount.every) * seasonalDiscount.discount;
    }
    return 0;
  };
  const seasonalDiscountAmount = calculateSeasonalDiscount();
  const totalDiscountAmount = couponDiscountAmount + seasonalDiscountAmount + onTopDiscountAmount;
  const totalNetAmount = totalAmount - totalDiscountAmount;

  return (
    <main className='mx-40 my-8'>
      <article className='bg-black text-white text-center p-2 w-full'>Order</article>
      {itemsWithQuantity.length > 0 ? (
        itemsWithQuantity.map(({ product, quantity }) => (
          <OrderCard
            key={product.id}
            product={product}
            quantity={quantity}
            handleCancel={handleCancelItem}
            handleQuantityChange={handleQuantityChange}
          />
        ))
      ) : (
        <p className='text-center p-10 text-gray-500'>There are no products in the cart.</p>
      )}
      <section className='p-2 border border-black border-dashed '>
        <div className='group'>
          <Button onClick={handleOpenCoupon}> <SellIcon sx={{ mr: 1 }} />use a discount coupon </Button>

          {couponDiscount.value > 0 && (
            <div className='flex justify-between px-10'>
              <p>{couponDiscount.value} {couponDiscount.type === 'amounts' ? 'THB' : '%'} Discount coupon </p>
              <div className='flex flex-wrap'>
                <button className='invisible mr-8 text-blue-500 px-1 group-hover:visible hover:bg-blue-50'
                  onClick={handleCancelCouponDiscount}> cancel </button>
                <p>- {couponDiscountAmount.toFixed(2)} THB</p>
              </div>
            </div>
          )}
        </div>
        <CouponModal open={openCoupon} handleClose={handleCloseCoupon} applyCouponDiscount={applyCouponDiscount} />
        <div className=' group'>
          <Button onClick={handleOpenOnTop}> <SellIcon sx={{ mr: 1 }} />Use a on top discount </Button>
          {onTopDiscount.type && (
            <div className='flex justify-between px-10 '>
              {onTopDiscount.type === 'percentage' && (
                <p>On Top {onTopDiscount.value}% on {onTopDiscount.product_category}</p>
              )}
              {onTopDiscount.type === 'amounts' && (
                <p>On Top {onTopDiscount.value} THB on {onTopDiscount.product_category}</p>
              )}
              {onTopDiscount.type === 'point' && (
                <div className='items-center'>
                  <p>Use {pointsToUse} points for discount</p>
                  <Slider
                    value={pointsToUse}
                    onChange={handleSliderChange}
                    aria-labelledby="on-top-slider"
                    valueLabelDisplay="auto"
                    max={Math.min(onTopDiscount.points, (totalAmount - couponDiscountAmount) * (onTopDiscount.maxPercentage / 100))}
                    marks={createMarks(totalAmount - couponDiscountAmount)}
                  />
                </div>
              )}
              <div className='flex flex-wrap'>
                <button className='invisible mr-8 text-blue-500 px-1 group-hover:visible hover:bg-blue-50'
                  onClick={handleCancelOnTopDiscount}> cancel </button>
                <p className=' flex items-center'> - {onTopDiscountAmount.toFixed(2)} THB</p>
              </div>
            </div>
          )}
        </div>

        <OnTopModal
          open={openOnTop}
          handleClose={handleCloseOnTop}
          applyOnTopDiscount={applyOnTopDiscount}
          totalAmount={totalAmount}
        />
        <div className=' group'>
          <Button onClick={handleOpenSeasonal}> <SellIcon sx={{ mr: 1 }} /> Use a seasonal discounts </Button>
          {seasonalDiscount.every > 0 && (
            <div className='flex justify-between px-10 '>
              <p>Every {seasonalDiscount.every} THB get {seasonalDiscount.discount} THB Discount</p>
              <div className='flex flex-wrap'>
                <button className='invisible mr-8 text-blue-500 px-1 group-hover:visible hover:bg-blue-50'
                  onClick={handleCancelSeasonalDiscount}> cancel </button>
                <p>- {seasonalDiscountAmount.toFixed(2)} THB</p>
              </div>
            </div>
          )}
        </div>
        <SeasonalModal
          open={openSeasonal}
          handleClose={handleCloseSeasonal}
          applySeasonalDiscount={applySeasonalDiscount}
        />
      </section>
      <article className='p-2 text-lg  text-right border-t border-black border-double mt-5 '>
        <div className=' text-sm text-gray-500'>
          <p className=''>Total amount <span className='pl-4'>{totalAmount.toFixed(2)}</span> THB</p>
          <p className=''>Total discount amount <span className='pl-2'> - {totalDiscountAmount.toFixed(2)}</span> THB</p>
        </div>
        <p className=''>Total net amount <span className='pl-5 font-bold text-xl'>{totalNetAmount.toFixed(2)}</span> THB</p>
      </article>
      <section className='flex justify-end'>
        <Link to="/payment" className=' text-white bg-blue-500 px-2 py-1 rounded-sm '> <PaidIcon /> Payment  </Link>
      </section>


    </main>
  )
}

export default Cart