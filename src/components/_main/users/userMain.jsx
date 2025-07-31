'use client';
import React from 'react';
import { Box, Container, Grid, useMediaQuery, Drawer, useTheme } from '@mui/material';
import SidebarNav from 'src/components/_main/sidebarNav';
import Users from 'src/components/_main/users/userMain';

export default function VendorDashboardPage() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isMobile = useMediaQuery('(max-width:900px)');


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Container
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
            >
                {!isMobile && (
                    <Grid
                        item
                        xs={false}
                        md={2.5}
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            width: '280px',
                            zIndex: 1200,
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <SidebarNav />
                    </Grid>
                )}

                <Grid
                    item
                    xs={12}
                    md={9.5}
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflowY: 'auto',
                        padding: { xs: '16px', md: '24px' },
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                        scrollbarWidth: 'none',
                        marginLeft: { md: '280px' }
                    }}
                >

                    <Box>
                        <Users />
                    </Box>
                </Grid>

                {isMobile && (
                    <Drawer
                        anchor="left"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true
                        }}
                        PaperProps={{
                            sx: {
                                maxWidth: '300px'
                            }
                        }}
                    >
                        <SidebarNav onClose={handleDrawerToggle} />
                    </Drawer>
                )}
            </Container>
        </>
    );
}