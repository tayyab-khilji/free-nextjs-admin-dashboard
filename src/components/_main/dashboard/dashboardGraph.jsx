
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Box, Card, CardHeader, CardContent, MenuItem, Select, FormControl } from '@mui/material';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

// api
import * as api from 'src/services';

const response = {
    "yearly": [
        {
            "label": "Jan",
            "count": 0
        },
        {
            "label": "Feb",
            "count": 1
        },
        {
            "label": "Mar",
            "count": 8
        },
        {
            "label": "Apr",
            "count": 0
        },
        {
            "label": "May",
            "count": 15
        },
        {
            "label": "Jun",
            "count": 19
        },
        {
            "label": "Jul",
            "count": 45
        },
        {
            "label": "Aug",
            "count": 0
        },
        {
            "label": "Sep",
            "count": 0
        },
        {
            "label": "Oct",
            "count": 0
        },
        {
            "label": "Nov",
            "count": 0
        },
        {
            "label": "Dec",
            "count": 0
        }
    ],
    "monthly": [
        {
            "label": "1-Jul",
            "count": 0
        },
        {
            "label": "2-Jul",
            "count": 0
        }
    ],
    "weekly": [
        {
            "label": "Sun",
            "count": 0
        },
        {
            "label": "Mon",
            "count": 0
        },
        {
            "label": "Tue",
            "count": 0
        },
        {
            "label": "Wed",
            "count": 1
        },
        {
            "label": "Thu",
            "count": 0
        },
        {
            "label": "Fri",
            "count": 1
        },
        {
            "label": "Sat",
            "count": 0
        }
    ]
}

const OrderStatus = () => {
    const [data, setData] = useState([]);
    const [series, setSeries] = useState([]);
    const [filter, setFilter] = useState('yearly');

    const isLoading = false;

    // const { data: response, isLoading } = useQuery(
    //    'get-dashboard-summary' 
    //     api['getDashboardSummary'],
    //     {
    //         onError: (error) => {
    //             toast.error(error.message || 'Something went wrong!');
    //         }
    //     }
    // );

    useEffect(() => {
        if (response) {
            const filteredData = response[filter];
            const seriesName = `Completed Orders (${filter.charAt(0).toUpperCase() + filter.slice(1)})`;

            setSeries([{
                name: seriesName,
                data: filteredData.map((item) => item.count)
            }]);
            setData(filteredData);
        }
    }, [response, filter]);

    const chartOptions = {
        chart: {
            type: 'line',
            toolbar: {
                show: false
            }
        },
        stroke: {
            width: 3,
            curve: 'smooth' // Makes it a spline chart
        },
        colors: ['#66CB9F'],
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0 // Hide all markers
        },
        xaxis: {
            categories: data?.map((item) => item.label),
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            tickAmount: 5,
            labels: {
                formatter: (val) => Math.floor(val)
            }
        },
        tooltip: {
            enabled: true,
            intersect: false,
            shared: true
        },
        grid: {
            show: true,
            borderColor: '#E2E8F0',
            strokeDashArray: 5,
            position: 'back',
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        }
    };

    return (
        <Card
            sx={{
                backgroundColor: 'white',
                p: 4,
                mb: 3,
                borderRadius: 'md',
                border: 0,
                boxShadow: 'lg',
                width: '100%'
            }}
        >
            <CardHeader
                title="Chart Interactions"
                titleTypographyProps={{ variant: 'h5' }}
                sx={{
                    border: 0,
                    bgcolor: 'transparent',
                    mb: 3,
                    mx: 0,
                    px: 0,
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
                action={
                    <FormControl
                        sx={{
                            width: 130,
                            backgroundColor: 'white',
                            borderRadius: '40px',
                            border: '1px solid #d1d5db',
                            '& .MuiInputBase-root': {
                                borderRadius: '40px',
                                height: 32,
                                padding: '0px 10px'
                            },
                            '& .MuiSelect-select': {
                                paddingRight: '40px'
                            },
                            '& .MuiSelect-icon': {
                                right: '12px',
                                color: '#6b7280'
                            }
                        }}
                    >
                        <Select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Select timeframe' }}
                        >
                            <MenuItem value="yearly">Yearly</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                        </Select>
                    </FormControl>
                }
            />

            <CardContent sx={{ p: 0 }}>
                {!isLoading ? (
                    <Chart
                        options={chartOptions}
                        series={series}
                        type="line"
                        height={180}
                        className="apex-charts"
                    />
                ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>Loading...</Box>
                )}
            </CardContent>

            {/* <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(247, 250, 252, 1)',
                    borderRadius: '50px',
                    width: '100%',
                    height: '35px',
                    pr: '10px'
                }}
            >
                <Box
                    sx={{
                        width: '181px',
                        p: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                backgroundColor: 'rgba(101, 210, 53, 1)',
                                width: '26px',
                                height: '25px',
                                borderRadius: '50px',
                                p: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <img src="/images/svgs/man-img.svg" alt="Orders completed" />
                        </Box>
                    </Box>
                    <Box sx={{ color: 'rgba(16, 24, 40, 1)', fontWeight: 'bold', fontSize: '13px' }}>
                        {data.reduce((sum, item) => sum + item.count, 0)}
                    </Box>
                    <Box sx={{ color: 'rgba(113, 128, 150, 1)', fontSize: '12px' }}>Graph Title</Box>
                </Box>
            </Box> */}
        </Card>
    );
};

OrderStatus.propTypes = {
    isVendor: PropTypes.bool
};

export default OrderStatus;