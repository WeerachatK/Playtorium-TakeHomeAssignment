import React from 'react';
import { Modal, Fade, Box, Button, List, ListItem } from '@mui/material';
import { campaigns } from '../data';
import CampaignsTemplate from './campaignsTemplate';
import { useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,

};

const OnTopModal = ({ open, handleClose, applyOnTopDiscount, totalAmount }) => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const onTopCampaigns = campaigns.filter(campaign => campaign.category === 'onTop');
    const pointsDiscounts = onTopCampaigns.filter(campaign => campaign.type === 'point');
    const percentageDiscounts = onTopCampaigns.filter(campaign => campaign.type === 'percentage');
    const amountsDiscounts = onTopCampaigns.filter(campaign => campaign.type === 'amounts');

    const handleApply = (campaign) => {
        applyOnTopDiscount(campaign);
        handleClose();
    };
    const isCategoryInCart = (category) => {
        return cartItems.some(item => item.category === category);
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box sx={style}>
                    <p className='text-center text-lg font-medium p-4 bg-white border-gray-500 border-b uppercase'>On Top Discount</p>
                    <div className=' bg-[#d0d0d0]'>
                        <List
                            sx={{
                                p: 2,
                                maxHeight: '70vh',
                                overflowY: 'auto'
                            }}>
                            {pointsDiscounts.length > 0 && (
                                <>
                                    <p className='text-xs text-gray-600'>Discount by points</p>
                                    {pointsDiscounts.map(campaign => (
                                        <ListItem key={campaign.id} onClick={() => handleApply(campaign)}>
                                            <CampaignsTemplate campaign={campaign} />
                                        </ListItem>
                                    ))}
                                </>
                            )}
                            {percentageDiscounts.length > 0 && (
                                <>
                                    <p className='text-xs text-gray-600'>Percentage discount by item category</p>
                                    {percentageDiscounts.map(campaign => (
                                        <ListItem 
                                        key={campaign.id} 
                                        onClick={isCategoryInCart(campaign.product_category) ? () => handleApply(campaign) : null}
                                        className={!isCategoryInCart(campaign.product_category) ? 'cursor-not-allowed opacity-50' : ''}>
                                            <CampaignsTemplate campaign={campaign} />
                                        </ListItem>
                                    ))}
                                </>
                            )}
                            {amountsDiscounts.length > 0 && (
                                <>
                                    <p className='text-xs text-gray-600'>Amounts discount by item category</p>
                                    {amountsDiscounts.map(campaign => (
                                        <ListItem 
                                        key={campaign.id} 
                                        onClick={isCategoryInCart(campaign.product_category) ? () => handleApply(campaign) : null}
                                        className={!isCategoryInCart(campaign.product_category) ? 'cursor-not-allowed opacity-50' : ''}>
                                            <CampaignsTemplate campaign={campaign} />
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

export default OnTopModal;
