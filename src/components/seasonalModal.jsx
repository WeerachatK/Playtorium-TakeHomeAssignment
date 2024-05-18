import React from 'react';
import { Modal, Box, Fade, Button, List, ListItem} from '@mui/material';
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

const SeasonalModal = ({ open, handleClose, applySeasonalDiscount }) => {
    const seasonalCampaigns = campaigns.filter(campaign => campaign.category === 'seasonal');

    const handleApply = (campaign) => {
        applySeasonalDiscount(campaign);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose} closeAfterTransition>
            <Fade in={open}>
                <Box sx={style}>
                    <p className='text-center text-lg font-medium p-4 bg-white border-gray-500 border-b uppercase'>Special Seasonal Discount</p>
                    <div className=' bg-[#d0d0d0]'>
                        <List
                            sx={{
                                p: 2,
                                maxHeight: '70vh',
                                overflowY: 'auto'
                            }}>
                            {seasonalCampaigns.length > 0 && (
                                <>
                                    {seasonalCampaigns.map(campaign => (
                                        <ListItem key={campaign.id} onClick={() => handleApply(campaign)}>
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


export default SeasonalModal;
