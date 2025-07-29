'use client';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

// mui
import { Card, CardContent, CardMedia, Stack, Box, Divider, Typography, Grid, Skeleton, Avatar } from '@mui/material';
// hooks
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';

export default function CheckoutCard({
  selectedDelivery,
  cart,
  loading,
  subTotal,
  deliveryFees,
  orderFee,
  platformFee
}) {
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();

  // const [total, subTotal] = useState('');

  //   useEffect(() => {
  // subTotalsubTotal + deliveryFees + orderFee + platformFee;
  //   }, subTotal)

  console.log('===========', cart);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h4" mb={1}>
          {' '}
          Order Summary
        </Typography>

        {cart.map((product, index, array) => (
          <React.Fragment key={Math.random()}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                borderRadius: 1,
                boxShadow: 'none', // Ensures shadow is removed
                backgroundColor: '#E2E8F080', // Background color for the card
                maxWidth: 400,
                margin: 'auto',
                marginTop: 2,
                border: 'none !important' // Forcefully removes any border
              }}
            >
              <Avatar
                src={product.image}
                alt={product.name}
                sx={{
                  width: 80,
                  height: 80,
                  marginRight: 2,
                  borderRadius: 1
                }}
              />
              <CardContent sx={{ padding: 0, flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {product.name} <span style={{ fontWeight: 'normal' }}> x {product.quantity}</span>
                </Typography>
                {/* <Typography variant="body2" color="textSecondary">
                  {`300 ml`}
                </Typography> */}
                <Typography variant="body1" fontWeight="bold">
                  ${product.subtotal.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>


          </React.Fragment>
        ))}

        <Stack spacing={0} mt={1} mb={2} gap={1}>
          <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Subtotal
            </Typography>
            <Typography variant="subtitle2">{'$' + subTotal.toFixed(2) || ''}</Typography>
          </Stack>

          <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              {selectedDelivery === 'Priority' ? 'Expedited Delivery' : 'Standard Delivery'}
            </Typography>
            <Typography variant="subtitle2">{'$' + deliveryFees.toFixed(2) || ''}</Typography>
          </Stack>
          <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              Transaction Fee
              <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 1 }}>
                (0.25% + 25 Cents)
              </Typography>
            </Typography>
            <Typography variant="subtitle2">{'$' + orderFee.toFixed(2) || ''}</Typography>
          </Stack>
          {/* <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Platform Fee
            </Typography>
            <Typography variant="subtitle2">{'$' + platformFee.toFixed(2) || ''}</Typography>
          </Stack> */}
        </Stack>
        <Divider />
        <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2} mt={2}>
          <Typography variant="h4">Total:</Typography>
          <Typography variant="h4" color="primary">
            {/* {'$' + subTotal.toFixed(2) ? '$' + (subTotal + deliveryFees + orderFee + platformFee).toFixed(2) : ''} */}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

CheckoutCard.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      subtotal: PropTypes.string.isRequired
    })
  ).isRequired,
  subTotal: PropTypes.number.isRequired,
  deliveryFees: PropTypes.number.isRequired,
  orderFee: PropTypes.number.isRequired,
  platformFee: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
};
