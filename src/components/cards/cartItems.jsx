'use client';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

// mui
import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Button,
  Box,
  Divider,
  Typography,
  Grid,
  Skeleton,
  Avatar,
  IconButton,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import { RiDeleteBinLine } from 'react-icons/ri';
import { format } from 'date-fns';
import { useRouter } from 'next-nprogress-bar';

// hooks
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';

export default function CheckoutCard({
  cart,
  loading,
  subTotal,
  orderFee,
  platformFee,
  handleDeleteItem,
  shippingOptionChange,
  selectedShippingMap
}) {
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();

  const router = useRouter();

  // const [total, subTotal] = useState('');

  //   useEffect(() => {
  // subTotalsubTotal + deliveryFees + orderFee + platformFee;
  //   }, subTotal)

  const [selectedShipping, setSelectedShipping] = useState('free'); // Default to free

  const handleShippingChange = (productId, newValue) => {
    shippingOptionChange(productId, newValue);
    // setSelectedShipping(event.target.value);
    // You can also save the selected shipping to a state or context for each product ID.
    // Example: saveShippingForProduct(productId, event.target.value);
  };

  const deleteClicked = (sku, productID, variationID) => {
    handleDeleteItem(sku, productID, variationID);
  };

  const deliveryDate1 = new Date(2024, 2, 17); // March 17, 2024 (adjust year as needed)
  const deliveryDate2 = new Date(2024, 2, 14); // March 14, 2024 (adjust year as needed)

  function getFreeDeliveryDateString() {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate); // Create a copy to avoid modifying currentDate
    deliveryDate.setDate(deliveryDate.getDate() + 7);

    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const formattedDate = deliveryDate.toLocaleDateString('en-US', options);

    return formattedDate;
  }

  function getPriorityDeliveryDateString() {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate); // Create a copy to avoid modifying currentDate
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    const options = { weekday: 'short', month: 'long', day: 'numeric' };
    const formattedDate = deliveryDate.toLocaleDateString('en-US', options);

    return formattedDate;
  }


  return (
    <div>
      <Typography className="order_text" variant="h4" mb={1}>
        Your Order
      </Typography>
      {cart.map((product, index, array) => (
        <Grid className="order_card" container spacing={2} sx={{ padding: 2 }}>
          {/* Product Information */}
          <Grid item xs={12} md={6}>
            <Grid className='imgtext_checkout' container alignItems="flex-start" spacing={2}>
              <Grid item>
                <Box
                  sx={{
                    border: '1px solid lightgray',
                    borderRadius: '8px',
                    padding: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                  />
                </Box>
              </Grid>
              <Grid item xs>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  sold by {product.brand}
                </Typography>
                <Typography variant="h5" sx={{ mt: 1, mb: 0.5 }}>
                  ${(product?.discountedPrice * product.quantity).toFixed(2)}
                  {product?.price != product?.discountedPrice && (
                    <Box
                      component="span"
                      sx={{
                        backgroundColor: 'red',
                        color: 'white',
                        borderRadius: '20px',
                        padding: '2px 8px',
                        fontSize: '0.8em',
                        ml: 1
                      }}
                    >
                      {`${(100 - ((product?.discountedPrice * product.quantity) / (product?.price * product?.quantity)) * 100).toFixed(0)} % off`}
                    </Box>
                  )}
                </Typography>
                {product?.price != product?.discountedPrice && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">Actual Price: </Typography>
                    <Typography variant="body2" sx={{ textDecoration: 'line-through', marginLeft: '8px' }}>
                      $ {(product.price * product.quantity).toFixed(2)}
                    </Typography>
                  </div>
                )}
                <Typography variant="body2">
                  Quantity: {product.quantity}
                  <Button
                    size="small"
                    sx={{ textTransform: 'none', p: 0 }}
                    // onClick={() => router.replace('/product/' + product.slug)}
                    onClick={() => router.replace('/product/' + (product.slug ? product.slug : product._id))}
                  >
                    Change
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Delete Icon */}

          {/* <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'inline-flex',
              justifyContent: 'flex-end',
              cursor: 'pointer',
              '&:hover': { backgroundColor: 'transparent' }
            }}
            onClick={() => deleteClicked(product._id, product.variationID)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton aria-label="delete" style={{ padding: '2px', color: '#CF4655' }}>
                <RiDeleteBinLine />
              </IconButton>
              <span style={{ marginLeft: '4px', color: '#CF4655' }}>Delete</span>
            </div>
          </Grid> */}

          <Grid container justifyContent="flex-end">
            {/* Parent Grid with right alignment */}
            <Grid
              item
              sx={{
                display: 'inline-flex',
                justifyContent: 'flex-end',
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'rgba(207, 70, 85, 0.1)' },
                padding: '3px'
              }}
              onClick={() => deleteClicked(product.sku, product._id, product.variationID)}
            >
              <div className="delete_btn" style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton aria-label="delete" style={{ padding: '2px', color: '#CF4655' }}>
                  <RiDeleteBinLine />
                </IconButton>
                <span style={{ marginLeft: '4px', color: '#CF4655' }}>Delete</span>
              </div>
            </Grid>
          </Grid>

          {/* Delivery Options */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Select Delivery Options
            </Typography>
            <RadioGroup
              aria-label="shipping"
              name={`shipping-${product._id}`}
              value={selectedShippingMap[product._id] || 'Standard'} // default to 'retail'
              onChange={(e) => handleShippingChange(product._id, e.target.value)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      border: '1px solid lightgray',
                      borderRadius: '8px',
                      padding: 2,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <FormControlLabel
                      value={product?.isFreeShipping ? 'Free' : 'Standard'}
                      control={<Radio />}
                      label={
                        <>
                          <Typography variant="subtitle1">
                            {product?.isFreeShipping
                              ? 'Free Shipping'
                              : ` Standard Shipping - ${product?.shippingOptions?.rates?.retail?.cheapestOption?.formattedPrice || ''}`}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product?.isFreeShipping
                              ? // Free shipping: Calculate 10 days from now
                              (() => {
                                const futureDate = new Date();
                                futureDate.setDate(futureDate.getDate() + 10);
                                return `(arrives by ${futureDate.toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric'
                                })})`;
                              })()
                              : (() => {
                                const deliveryEstimateString =
                                  product?.shippingOptions?.rates?.retail?.cheapestOption?.deliveryEstimate;
                                const match = deliveryEstimateString?.match(/\((\d{4}-\d{2}-\d{2})\)/);

                                if (match && match[1]) {
                                  const parsedDate = new Date(match[1]);
                                  // Basic validation for parsed date (e.g., to avoid "Invalid Date")
                                  if (!isNaN(parsedDate.getTime())) {
                                    return `(arrives by ${parsedDate.toLocaleDateString('en-US', {
                                      weekday: 'long',
                                      month: 'long',
                                      day: 'numeric'
                                    })})`;
                                  }
                                }
                                return 'Delivery estimate not available'; // Fallback text
                              })()}
                          </Typography>
                        </>
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      border: '1px solid lightgray',
                      borderRadius: '8px',
                      padding: 2,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <FormControlLabel
                      value="Priority"
                      control={<Radio />}
                      label={
                        <>
                          <Typography variant="subtitle1">
                            Expedited Shipping -{' '}
                            {product?.shippingOptions?.rates?.commercial?.cheapestOption?.formattedPrice || ''}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            (arrives by
                            {(() => {
                              const match =
                                product?.shippingOptions?.rates?.commercial?.cheapestOption?.deliveryEstimate.match(
                                  /\((\d{4}-\d{2}-\d{2})\)/
                                );
                              return match
                                ? new Date(match[1]).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric'
                                })
                                : '';
                            })()}
                            )
                          </Typography>
                        </>
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </RadioGroup>

            {/* <RadioGroup aria-label="shipping" name="shipping" value={selectedShipping} onChange={handleShippingChange}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      border: '1px solid lightgray',
                      borderRadius: '8px',
                      padding: 2,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <FormControlLabel
                      value="free"
                      control={<Radio />}
                      label={
                        <>
                          <Typography variant="subtitle1">
                            Retail Rates - {product?.shippingOptions?.retail?.cheapestOption?.formattedPrice || ''}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            (arrives by {getFreeDeliveryDateString()})
                          </Typography>
                        </>
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      border: '1px solid lightgray',
                      borderRadius: '8px',
                      padding: 2,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <FormControlLabel
                      value="expedited"
                      control={<Radio />}
                      label={
                        <>
                          <Typography variant="subtitle1">
                            Expedited Shipping -{' '}
                            {product?.shippingOptions?.commercial?.cheapestOption?.formattedPrice || ''}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            (arrives by {getPriorityDeliveryDateString()})
                          </Typography>
                        </>
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </RadioGroup> */}

            <Divider sx={{ mt: 2, display: { xs: "none", md: "block" } }} />
          </Grid>
        </Grid>
      ))}
    </div>
  );
}

CheckoutCard.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      subTotal: PropTypes.string.isRequired
    })
  ).isRequired,
  subTotal: PropTypes.number.isRequired,
  deliveryFees: PropTypes.number.isRequired,
  orderFee: PropTypes.number.isRequired,
  platformFee: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  handleDeleteItem: PropTypes.func.isRequired
};
