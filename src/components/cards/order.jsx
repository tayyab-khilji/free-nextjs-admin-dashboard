'use client';
import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import { useRouter } from 'next-nprogress-bar';
// mui
import { Box, Typography, Button, Divider, Skeleton, Card, CardContent, Avatar, Stack } from '@mui/material';

import { styled, useTheme } from '@mui/material/styles';
import RootStyled from 'src/components/_main/product/summary/styled';

import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
// components
import Label from 'src/components/label';
import { fDDMMYYYYShort } from 'src/utils/formatTime';

export default function OrderCard({ ...props }) {
  const { item, isLoading } = props;
  const theme = useTheme();
  const router = useRouter();

  console.log("==================333", item?.variation?.dataField);

  return (
    <Card
      className="management_table"
      fullWidth
      elevation={0}
      sx={{
        borderRadius: '16px',
        border: 'none !important',
        backgroundColor: '#F7FAFC',
        p: 2,
        mx: 2,
        mt: 2,
        width: '100%'
      }}
    >
      <RootStyled>
        <Stack spacing={2}>
          {/* Top Status and Order Info */}
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h6" fontWeight="bold">
              {item?.status === 'pending' || item?.status === 'unshipped'
                ? 'In-Process'
                : item?.status === 'shipped'
                  ? 'In-Transit'
                  : item?.status === 'cancelled'
                    ? 'Cancelled'
                    : 'Delivered'}
            </Typography>
            <Box textAlign="right">
              <Typography variant="body2">
                Order Date: {item?.createdAt ? fDDMMYYYYShort(item?.createdAt) : ''}
              </Typography>
              <Typography variant="body2">Order ID: {item?.orderNo}</Typography>
            </Box>
          </Box>

          <Divider />

          {/* Seller Info and Product */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
              onClick={() => {
                router.push(`/stores/${item?.product?.brand?.slug}`);
              }}
            >
              Sold by {item?.product?.brand?.name} &gt;
            </Typography>

            <Box display="flex" gap={2}>
              {/* Product Image */}
              <Avatar
                variant="square"
                src={item?.variation?.mainImage?.url || item?.variation?.images?.[0]?.url} // replace with your static image path
                alt={item?.product?.name}
                sx={{ width: 100, height: 120, borderRadius: '12px', border: '1px solid #d1d5db' }}
              />

              {/* Product Details */}
              <Box flex={1}>
                <Typography fontWeight="bold" variant="body1">
                  {item?.product?.name}
                </Typography>

                {/* Product Variations dataField */}
                {item?.variation?.dataField && item?.variation?.dataField.length > 0 && (
                  <Box sx={{ fontSize: 12, color: '#718096', mt: 0.5 }}>
                    {item?.variation?.dataField.map((field) => (
                      <Typography variant="body2" key={field._id} >
                        {field.productField?.title}: {field.fieldValue}
                      </Typography>
                    ))}
                  </Box>
                )}

                {item?.variation?.name && (
                  <Typography variant="body2" sx={{ fontSize: 12, color: '#718096', mt: 0.5 }}>
                    Pack : {item?.variation?.name}
                  </Typography>
                )}

                {/* <Typography variant="body2" color="text.secondary">
                Flavor: Apple Grape
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Size: 200 ml
              </Typography> */}
                <Typography variant="body2" color="text.secondary" mb={0.5} mt={0.5}>
                  Quantity: {item?.quantity}
                </Typography>

                {/* <Typography fontWeight="bold">${(item?.price || 0.0).toFixed(2)}</Typography> */}

                <Stack direction="row" alignItems="center" spacing={1}>
                  {item?.price != item?.discountedPrice && (
                    <Typography className="text-price" variant="body1">
                      <Typography component="span" variant="body1" className="old-price" color="red">
                        {!isLoading && '$' + item?.price.toFixed(2)}
                      </Typography>
                    </Typography>
                  )}
                  <Typography
                    // variant="subtitle1"
                    // color="text.secondary"
                    // fontWeight={500}
                    // className="text-discount"
                    // sx={{ fontWeight: 'bold' }}
                    variant="body1"
                    color="text.secondary"
                  >
                    <span>{!isLoading && '$' + (item?.discountedPrice || 0.0).toFixed(2)}</span>
                  </Typography>
                </Stack>
              </Box>

              {/* Total and Buttons */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center" // Center horizontally within this box
                // Removed justifyContent as it's not needed if we want items stacked and centered
                // You might want to adjust width if this Box is part of a larger layout
                sx={{
                  width: '100%', // Take full width of its parent
                  maxWidth: '250px', // Optional: Limit max width for the buttons to prevent them from being too wide
                  mx: 'auto' // Center the box itself if maxWidth is applied
                }}
              >
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  {' '}
                  {/* Increased font size to h6, added margin-bottom */}
                  Total: $
                  {(
                    (item?.subTotal || 0) +
                    (item?.shipping || 0) +
                    (item?.tax || 0) +
                    (item?.transactionFee || 0)
                  ).toFixed(2)}
                </Typography>

                <Stack spacing={1} sx={{ width: '100%' }}>
                  {' '}
                  {/* Stack for vertical spacing between buttons, takes full width of parent */}
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#63d538',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      borderRadius: '50px',
                      height: '48px', // Added a fixed height for consistency with the image
                      '&:hover': { backgroundColor: '#57bd31' }
                    }}
                    onClick={() => {
                      router.push(`/account/order-detail/${item?._id}`);
                    }}
                  >
                    View Order Details
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 'bold',
                      borderRadius: '50px',
                      height: '48px', // Added a fixed height for consistency with the image
                      borderColor: '#033',
                      color: '#033'
                    }}
                    onClick={() => router.push(`/account/order-detail/track-order/${item?._id}`)}
                  >
                    Track Order
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Stack>
      </RootStyled>
    </Card>
  );
}

OrderCard.propTypes = {
  item: PropTypes.object,
  isLoading: PropTypes.bool
};
