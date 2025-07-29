'use client';
import React, { useEffect } from 'react';

// components
import StatsCards from 'src/components/_main/dashboard/analyticsStats';
// api
import * as api from 'src/services';
import { Box, Container, Grid } from '@mui/material';

import { useQuery } from 'react-query';
import toast from 'react-hot-toast';

export default function VendorDashboard(isVendor) {
    isVendor = true;
    // const { data: dashboard, isLoading } = useQuery(
    //     isVendor ? 'get-dashboard' : 'dashboard-analytics',
    //     api[isVendor ? 'getDashboard' : 'adminDashboardAnalytics'],
    //     {
    //         // refetchInterval: 10000,
    //         onError: (error) => {
    //             toast.error(error.message || 'Something went wrong!');
    //         }
    //     }
    // );

    // const data = dashboard?.data || {};


    return (
        <>
            <Container fullWidth maxWidth="100%" sx={{ backgroundColor: '#f4f5f7', p: '0px !important' }}>

                <Box>
                    <StatsCards isLoading={false} data={null} />

                    {/* <Grid className='dashboard_column' container spacing={2}>
                        <Grid className='firstcol' item xs={12}>

                        </Grid>

                    </Grid> */}

                </Box>
            </Container>
        </>
    );
}
