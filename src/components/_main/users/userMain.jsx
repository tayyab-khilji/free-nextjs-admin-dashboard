'use client';
import React from 'react';
import { Box, Container, Grid, useMediaQuery, Drawer, useTheme } from '@mui/material';
import Users from 'src/components/_main/users/userMain';

export default function VendorDashboardPage() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isMobile = useMediaQuery('(max-width:900px)');


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Box>
                <Users />
            </Box>

        </>
    );
}