'use client';
import React, { useState, useEffect } from 'react';
// mui
import { Typography, Card, CardContent, Stack, Fab, Grid, Skeleton } from '@mui/material';
import { IoPersonSharp } from 'react-icons/io5';
import { HiCurrencyDollar } from 'react-icons/hi2';
import { useRouter } from 'next-nprogress-bar';

// hooks
// api
import * as api from 'src/services';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';

import PropTypes from 'prop-types';

const Orderplaced = ({ data, oid }) => {
  const router = useRouter();

  console.log("============", data);

  const [shippingCharges, setShippingCharges] = useState(0);
  const [transactionFees, setTransactionFees] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // const response = api.getOrderDetail(null, oid); // Fetch product details
  const orderData = data?.subOrder;


  const [itemsTotal, setItemsTotal] = useState(0);

  useEffect(() => {
    const sumOfTotalPrices = orderData.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.totalPrice;
    }, 0);

    const sumOfShippingPrices = orderData.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.shipping;
    }, 0);
    setShippingCharges(sumOfShippingPrices.toFixed(2));

    const formattedPrice = parseFloat(sumOfTotalPrices).toFixed(2);
    setItemsTotal(formattedPrice);

    // Calculate the sum of itemTotalPrices and shippingCharges
    const totalPriceWithShipping = parseFloat(formattedPrice) + sumOfShippingPrices;

    // Calculate 0.25% of the totalPriceWithShipping
    const percentageAmount = totalPriceWithShipping * 0.0025;

    // Add the percentage amount and 25 cents (0.25)
    const calculatedFinalPrice = percentageAmount + 0.25;

    // Format the final price to two decimal places
    const formattedFinalPrice = calculatedFinalPrice.toFixed(2);
    setTransactionFees(formattedFinalPrice);

    const lastPrice = (totalPriceWithShipping + calculatedFinalPrice).toFixed(2);

    setTotalPrice(lastPrice);
  }, [orderData]); // Include shippingCharges in the dependency array

  return (
    <>
      <div className="mainheading">
        <h2 className="order-title">Thank you for your purchase!</h2>
      </div>
      <div className="order-container">
        <div className="order-details">
          {/* left section----- */}

          <div className="order-left-wrapper">
            <h2 className="title">Your Order</h2>
            <div className="order-list">
              {orderData.map((order) => (
                <div className="order-card" key={order.id}>
                  <img
                    src={order.variation?.mainImage?.url || order.variation?.images?.[0]?.url || '/images/bottle.png'}
                    className="order-image"
                    alt=""
                  />{' '}
                  {/* Added alt for accessibility */}
                  <div className="order-info">
                    <p className="order-number">
                      Order Number Is <strong>{order.orderNo}</strong>
                    </p>
                    <p className="order-seller">sold by {order.product?.brand?.name}</p>
                    <p className="order-date">
                      {(() => {
                        if (order?.deliveryOption === 'Free') {
                          const futureDate = new Date();
                          futureDate.setDate(futureDate.getDate() + 10);
                          return `Arrives by ${futureDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                          })}`;
                        }


                        if (order?.deliveryOption === 'Standard') {
                          const deliveryEstimateString =
                            order?.shippingOptions?.rates?.retail?.cheapestOption?.deliveryEstimate;
                          const match = deliveryEstimateString?.match(/\((\d{4}-\d{2}-\d{2})\)/);

                          if (match && match[1]) {
                            const parsedDate = new Date(match[1]);
                            if (!isNaN(parsedDate.getTime())) {
                              return `Arrives by ${parsedDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                              })}`;
                            }
                          }

                          return 'Delivery estimate not available';
                        }

                        // For commercial option (default/fallback)
                        const deliveryEstimateString =
                          order?.shippingOptions?.rates?.commercial?.cheapestOption?.deliveryEstimate;
                        const match = deliveryEstimateString?.match(/\((\d{4}-\d{2}-\d{2})\)/);
                        if (match && match[1]) {
                          const parsedDate = new Date(match[1]);
                          if (!isNaN(parsedDate.getTime())) {
                            return `Arrives by ${parsedDate.toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric'
                            })}`;
                          }
                        }

                        return 'Delivery estimate not available';
                      })()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-footer">
              <p>To Track The Delivery Of Your Order, Go To Manage Orders Page</p>
              <button className="view-orders-btn" onClick={() => { router.push('/account/manage-orders') }}> View Orders</button>
            </div>
          </div>

          {/* right section------ */}

          <div className="order-right">
            <div className="order-summary">
              <div className="order-header">
                <h2>Order Summary</h2>
              </div>

              <hr />
              <div className="summary-row">
                <div className="paragraph">{orderData?.length}x Items Subtotal</div>
                <div>${itemsTotal}</div>
              </div>
              <div className="summary-row">
                <div className="paragraph">Shipping Charges</div>
                <div>${shippingCharges}</div>
              </div>
              <div className="summary-row">
                <div className="paragraph">Transaction fee (0.25% + 25 Cents)</div>
                <div>${transactionFees}</div>
              </div>
              {/* <div className="summary-row">
                <div className="paragraph">Platform Fee</div>
                <div>$1.00</div>
              </div> */}
              <div className="summary-row borderline">
                <div className="paragraph">Estimated tax to be collected (%)</div>
              </div>
              <div className="summary-row total">
                <div>
                  <p>Total</p>
                </div>
                <div className="digit">
                  ${totalPrice}
                  <p className="fees">
                    {`Paid by ${data?.last4Digits ? 'Credit Card' : (data?.paymentBrand || '').charAt(0).toUpperCase() + (data?.paymentBrand || '').slice(1)}`}
                  </p>
                </div>
              </div>
            </div>
            {/* Added the Continue Shopping button here */}
            <button
              className="continue-shopping-btn"
              onClick={(e) => {
                router.push(`/all-categories`);
              }}

            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orderplaced;

Orderplaced.propTypes = {
  data: PropTypes.object.isRequired,
  oid: PropTypes.string.isRequired
};
