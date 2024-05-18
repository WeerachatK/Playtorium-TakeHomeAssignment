import React from 'react';
import './campaignsTemplate.css';
import { useSelector } from 'react-redux';

const CampaignsTemplate = ({ campaign }) => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const hasSpecifiedCategory = cartItems.some(item => item.category === campaign.product_category);
    return (
        <div className="container group p-1 flex justify-center w-">
            <div className="card flex flex-col h-full ">
                <div className="main h-full">
                    <div className='text-center w-full'>
                        <p className=' text-xl font-bold'>
                            {campaign.discount}
                            <span>{campaign.type === 'percentage' && '%'}</span>
                            <span>{(campaign.type === 'percentage' && campaign.category === 'onTop') && ' OFF'}</span>
                            <span>{campaign.type === 'special' && ' THB'}</span>
                            <span>{campaign.type === 'amounts' && ' THB'}</span>
                            <span>{campaign.type === 'point' && 'POINTS'}</span>
                        </p>
                        <p className=' text-xl font-bold'>{(campaign.type === 'percentage' && campaign.category === 'coupon') && 'OFF'}</p>
                        <p className=' text-sm text-gray-500 '>{(campaign.category === 'onTop' && campaign.type === 'percentage')
                            && (<span>Only {campaign.product_category}</span>)}</p>
                        <p className=' text-sm text-gray-500 '>{(campaign.category === 'onTop' && campaign.type === 'amounts')
                            && (<span>Only {campaign.product_category}</span>)}</p>
                        <p className=' text-sm text-gray-500 '>{campaign.type === 'point'
                            && (<span> for discounts <br /> (max 20%) </span>)}</p>
                        <span>{campaign.type === 'special' && `every ${campaign.every} THB`}</span>
                    </div>
                    <span className='h-full border-l border-black border-dashed'></span>
                    <div className='text-center w-full uppercase'>
                        <p>{campaign.category === 'onTop' ? 'on top' : campaign.category}</p>
                        <p>discount</p>
                    </div>
                </div>
                <div className="text-sm absolute end-0 bottom-0 z-auto m-1 mx-2">
                    {campaign.category === 'onTop' && campaign.type !== 'point' && !hasSpecifiedCategory ? (
                        <p className='text-xs text- text-gray-500'>*Category specified only</p>
                    ) : (
                        <button className='text-blue-500 px-2 rounded-full uppercase group-hover:bg-blue-100'>use</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CampaignsTemplate;
