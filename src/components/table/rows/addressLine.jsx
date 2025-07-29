'use client';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper } from '@mui/material';
import { useRouter } from 'next-nprogress-bar';

export default function AddressRow({ address, isLoading, isMobile, handleSetDefault }) {
  const {
    _id,
    name,
    addressLine1,
    addressLine2,
    city,
    state,
    zip,
    country,
    phoneNumber,
    deliveryInstructions,
    isDefault
  } = address;

  const setDefaultClicked = () => {
    handleSetDefault(_id);
  };

  const router = useRouter();

  return (
    <>
      {!isLoading && (
        <TableRow  className='table_addresdata'>
          <TableCell  className='address_row' component="th" scope="row">
            {name}
          </TableCell>
          <TableCell className='address_row'>
            {addressLine1}  
            <br />
            {addressLine2 ? `${addressLine2}, ${city}` : city}
            <br />
            {`${state}, ${zip} `},
            <br />  
            {country} <br />
            <p style={{ color: '#65D235' }}>{deliveryInstructions}</p>
          </TableCell>
          <TableCell className='address_row'>{phoneNumber}</TableCell>
          <TableCell className='address_row'>
            <Box className="default_editbtn" display="flex" justifyContent="space-between" alignItems="center">
              {isDefault ? (
                <TableCell>
                  <Button className='defaultbtn'
                    style={{
                      width: '150px',
                      borderRadius: '50px',
                      background: '#EBF9F3',
                      border: '2px solid #65D235',
                      color: 'grey'
                    }}
                  >
                    Default Address
                  </Button>
                </TableCell>
              ) : (
                <TableCell>
                  <Button  className='defaultbtn2'
                    style={{ width: '150px', borderRadius: '50px' }}
                    onClick={(e) => {
                      setDefaultClicked();
                    }}
                  >
                    Default Address
                  </Button>
                </TableCell>
              )}
              <Button className='editbtn'
                variant="contained"
                size="small"
                sx={{ bgcolor: '#66cc33', borderRadius: '50px' }}
                onClick={(e) => {
                  router.push(`/account/edit-address/${_id}`);
                }}
              >
                Edit
              </Button>
            </Box>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

AddressRow.propTypes = {
  address: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  handleSetDefault: PropTypes.func.isRequired
};


