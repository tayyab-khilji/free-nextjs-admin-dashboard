'use client';
import React from 'react';
import { Box, Container, Grid, useMediaQuery, Drawer } from '@mui/material';
import ChatListing from 'src/components/_main/chat/chatListing';

export default function VendorDashboardPage() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isMobile = useMediaQuery('(max-width:900px)');

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>

            <Box>
                <ChatListing />
            </Box>

        </>
    );
}