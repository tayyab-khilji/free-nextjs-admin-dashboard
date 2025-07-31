'use client';
import React from 'react';
import { Box, Container, Grid, useMediaQuery, Drawer, useTheme } from '@mui/material';
import SidebarNav from 'src/components/_main/sidebarNav';
import DashboardDetail from 'src/components/_main/dashboard/dashboardDetail';

export default function VendorDashboardPage() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* <Container
        className="dashboard-container"
        maxWidth="100%"
        disableGutters
        sx={{
          backgroundColor: '#f4f5f7',
          minHeight: '100vh',
          display: 'flex',
          padding: '0 !important',
          position: 'relative'
        }}
      > */}


      <Box>
        <DashboardDetail />
      </Box>

      {/* </Container> */}
    </>
  );
}