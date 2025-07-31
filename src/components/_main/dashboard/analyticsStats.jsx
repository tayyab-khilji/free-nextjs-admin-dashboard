'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  Skeleton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import LineChart from 'src/utils/linechart';

import PropTypes from 'prop-types';
import { BsBoxSeam } from 'react-icons/bs';

import PersonIcon from '@mui/icons-material/Person';
import TokenIcon from '@mui/icons-material/Token';
import NextLink from 'next/link';

export default function DashboardStats({ data: dashboardStats, isLoading: dataLoading }) {
  // Sample data for stats, bank cards, and table rows

  const theme = useTheme();
  const isDeskTop = useMediaQuery(theme.breakpoints.up('md'));

  const formatChange = (current, previous) => {
    if (previous === 0) {
      return current > 0 ? '+100%' : '+0%'; // Handle cases where previous is 0
    }
    const change = ((current - previous) / previous) * 100;
    return `${change > 0 ? '+' : ''}${Math.round(change)}%`;
  };

  const generateStats = () => {
    return [
      {
        title: 'Chat Interactions',
        value: 15,
        change: formatChange(15, 45),
        isPositive: 15 >= 45
        //  change: formatChange(data.totalOrders.thisMonth, data.totalOrders.lastMonth),
        // isPositive: data.totalOrders.thisMonth >= data.totalOrders.lastMonth
      },
      {
        title: 'Users',
        value: `225`,
        change: formatChange(15, 45),
        isPositive: 15 >= 45

      },
      {
        title: 'Tokens Used',
        value: '12.5%',
        change: formatChange(15, 5),
        isPositive: 15 >= 45
      },
      {
        title: 'Others',
        value: 112,
        change: formatChange(830, 435),
        isPositive: 830 >= 435
      }
    ];
  };

  const [stats, setStats] = useState(generateStats()); // Initialize with default stats

  useEffect(() => {
    let isMounted = true;
    async function updateStats() {
      if (dashboardStats) {
        const updatedStats = await generateStats(dashboardStats.data);
        if (isMounted) {
          setStats(updatedStats);
        }
      }
    }
    updateStats();
    return () => {
      isMounted = false;
    }; // Cleanup function to prevent memory leaks
  }, [dashboardStats]);



  const renderIcon = (index) => {
    switch (index) {
      case 0:
        return <PersonIcon sx={{ fontSize: 32, color: '#6667fa' }} />; // 003C26
      case 1:
        return <TokenIcon sx={{ fontSize: 32, color: '#6667fa' }} />;
      case 2:
        return <BsBoxSeam fontSize={32} color="#6667fa" />;
      default:
        return <PersonIcon sx={{ fontSize: 32, color: '#6667fa' }} />;
    }
  };



  return (
    <Box sx={{ my: 2, width: '100%' }}>
      <Grid container spacing={4}>
        {/* Stats Cards */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {dataLoading ? (
              <>
                <Grid item xs={12} sm={4}>
                  <Skeleton variant="rectangular" width="100%" height={170} sx={{ borderRadius: 2 }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Skeleton variant="rectangular" width="100%" height={170} sx={{ borderRadius: 2 }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Skeleton variant="rectangular" width="100%" height={170} sx={{ borderRadius: 2 }} />
                </Grid>
              </>
            ) : (
              stats?.map((stat, index) => (
                <Grid item xs={12} sm={3} md={3} key={index}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: 2,
                      borderRadius: '16px',
                      boxShadow: 2,
                      backgroundColor: '#f9f9f9'
                    }}
                  >
                    {/* Top Section with Data */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body1" color="text.secondary">
                          {stat.title}
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {stat.value}
                        </Typography>
                      </Box>

                      {/* <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 64,
                          height: 64,
                          backgroundColor: '#e0f7fa',
                          borderRadius: '50%'
                        }}
                      >
                        {renderIcon(index)}
                      </Box> */}
                    </Box>


                    {/* Chart Section */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          height: 28,
                          borderRadius: 16,
                          alignItems: 'center',
                          px: 0.7
                        }}
                      >

                        <Typography
                          variant="body2"
                          sx={{ color: stat.isPositive ? 'green' : 'red', fontWeight: 'bold' }}
                        >
                          {`${stat.change}`}
                        </Typography>

                      </Box>

                      <LineChart isGreen={stat.isPositive} />
                    </Box>

                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

DashboardStats.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool
};
