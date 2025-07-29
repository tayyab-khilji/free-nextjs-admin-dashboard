'use client';
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
// mui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Button } from '@mui/material';
// components
import AddressRow from 'src/components/table/rows/addressLine';
import NoDataFound from 'src/illustrations/dataNotFound';

import { useRouter } from 'next-nprogress-bar';

export default function AddressList({ address, isLoading, isMobile, pageType, handleSetDefault }) {
  const router = useRouter();
  const addresses = address;
  const [loading, setLoading] = React.useState(false);

  // State to control how many addresses are visible
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  // Determine the addresses to display based on isMobile and showAllAddresses state
  const addressesToDisplay =
    isMobile && !showAllAddresses && addresses.length > 2
      ? addresses.slice(0, 2) // Show only the first two addresses on mobile if not "show all"
      : addresses;

  // Toggle function for View All/View Less
  const handleToggleView = () => {
    setShowAllAddresses((prev) => !prev); // Toggles the state
  };

  return (
    <Box>
      <TableContainer className="addresslistdata">
        <Box
          className="address_text"
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{ pl: 2, pb: 2 }}
        >
          <div className="address_book">
            <h2>Address Book</h2>
          </div>

          {pageType === 'addressBook' && (
            <Button
              className="address_btn2"
              sx={{
                width: '170px',
                borderRadius: '50px',
                padding: '8px 26px',
                fontSize: '14px',
                backgroundColor: '#65D235',
                color: 'white',
                border: '1px solid gray'
              }}
              onClick={(e) => {
                setLoading(true);
                router.push('/account/add-address');
              }}
            >
              Add new Address
            </Button>
          )}

          {/* Conditional rendering for the "View All / View Less" button */}
          {pageType === 'profile' && isMobile && addresses.length > 2 && (
            <Button
              variant="text"
              sx={{ color: '#65D235', fontSize: '14px' }}
              onClick={handleToggleView} // Use the new toggle handler
            >
              {showAllAddresses ? 'View Less' : 'View All >'} {/* Change text based on state */}
            </Button>
          )}
        </Box>

        <Divider />

        {/* Hide table header on mobile when showing only limited addresses */}
        {!(isMobile && !showAllAddresses && addresses.length > 2) && (
          <Table>
            <TableHead>
              <TableRow className="table_header">
                <TableCell className="fullname" style={{ color: '#718096', fontSize: '14px' }}>
                  Full Name
                </TableCell>
                <TableCell className="fullname" style={{ color: '#718096', fontSize: '14px' }}>
                  Address
                </TableCell>
                <TableCell style={{ color: '#718096', fontSize: '14px' }}>Phone Number</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        )}

        {/* Display addresses */}
        <Box
          sx={{
            overflow: 'hidden', // Hide overflow for smooth transition
            transition: 'max-height 0.5s ease-in-out' // Smooth transition for height
          }}
        >
          <Table>
            <TableBody>
              {!isLoading &&
                addressesToDisplay?.map((address, index) => (
                  <AddressRow
                    key={address._id || index} // Use _id as key if available, otherwise index
                    address={address}
                    isLoading={isLoading}
                    isMobile={isMobile}
                    handleSetDefault={handleSetDefault}
                  />
                ))}
            </TableBody>
          </Table>
        </Box>

        <Divider />

        {pageType === 'profile' && (
          <div className="addressviewbtn" style={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              style={{
                width: '170px',
                borderRadius: '50px',
                padding: '8px 26px',
                fontSize: '14px',
                backgroundColor: '#65D235',
                color: 'white',
                border: '1px solid gray',
                marginTop: '20px'
              }}
              onClick={(e) => {
                setLoading(true);
                router.push('/account/add-address');
              }}
            >
              Add new Address
            </Button>
          </div>
        )}
      </TableContainer>
      {!isLoading && addresses?.length < 1 && <NoDataFound />}
    </Box>
  );
}

AddressList.propTypes = {
  address: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  pageType: PropTypes.string.isRequired,
  handleSetDefault: PropTypes.func.isRequired
};
