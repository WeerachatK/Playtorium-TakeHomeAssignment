import React from 'react';
import { Modal, Fade, Box, Button, List, ListItem } from '@mui/material';
import { campaigns } from '../data';
import CampaignsTemplate from './campaignsTemplate';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const CouponModal = ({ open, handleClose, applyCouponDiscount }) => {
    const coupons = campaigns.filter(campaign => campaign.category === 'coupon');
    const fixedAmountCoupons = coupons.filter(coupon => coupon.type === 'amounts');
    const percentageCoupons = coupons.filter(coupon => coupon.type === 'percentage');

    return (
        <Modal open={open} onClose={handleClose} closeAfterTransition>
            <Fade in={open}>
                <Box sx={style}>
                    <p className='text-center text-lg font-medium p-4 bg-white border-gray-500 border-b uppercase'>Discount coupon</p>
                    <div className=' bg-[#d0d0d0]'>
                        <List
                            sx={{
                                p: 2,
                                maxHeight: '70vh',
                                overflowY: 'auto'
                            }}>
                            {fixedAmountCoupons.length > 0 && (
                                <>
                                    <p className='text-xs text-gray-600'>Fixed amount discount</p>
                                    {fixedAmountCoupons.map(coupon => (
                                        <ListItem key={coupon.id} onClick={() => applyCouponDiscount(coupon)}>
                                            <CampaignsTemplate campaign={coupon} />
                                        </ListItem>
                                    ))}
                                </>
                            )}
                            {percentageCoupons.length > 0 && (
                                <>
                                    <p className='text-xs text-gray-600'>Percentage discount</p>
                                    {percentageCoupons.map(coupon => (
                                        <ListItem key={coupon.id} onClick={() => applyCouponDiscount(coupon)}>
                                            <CampaignsTemplate campaign={coupon} />
                                        </ListItem>
                                    ))}
                                </>
                            )}
                        </List>
                    </div>
                    <div className='flex justify-end p-1 border-gray-500 border-t'>
                        <Button onClick={handleClose}>Close</Button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};

export default CouponModal;
