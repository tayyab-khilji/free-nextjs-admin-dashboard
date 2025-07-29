'use client';
import React, { useState } from 'react';
import { Menu, MenuItem, Button, TextField, Box, Select, IconButton, Typography, Stack } from '@mui/material';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';
import { useRouter } from 'next-nprogress-bar';

const AddressMenu = ({ addressId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const router = useRouter();

  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);

    router.push(`/account/edit-address/${addressId}`);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Trigger Button */}
      <Button className="edit_icon"
        // startIcon={<FaMapMarkerAlt />}
        onClick={handleClick}
        size="large"
        sx={{
          backgroundColor: '#fff',
          color: '#000',
          '&:hover': { backgroundColor: '#D8F2E7' },
          height: '37px',
          width: '37px',
          minWidth: '37px',
          padding: '10px',
          borderRadius: '50px'
        }}
      >
        <GrEdit />
      </Button>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { width: 400, p: 2, borderRadius: 0, top: '85px !important', left: '696px !important' } }}
      >
        {/* Close Button */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box fontSize="1.2rem" fontWeight="bold">
            Set Up Your Address
          </Box>
          <IconButton onClick={handleClose}>
            <MdOutlineClose />
          </IconButton>
        </Box>

        <Box fontSize="0.9rem" color="gray" mb={2}>
          Delivery options and delivery time may vary.
        </Box>

        {/* Form Fields */}
        <TextField fullWidth label="Street Address" variant="outlined" sx={{ mb: 2 }} />
        <TextField fullWidth label="Apt/Suite/Floor" variant="outlined" sx={{ mb: 2 }} />

        <Box display="flex" gap={1}>
          <TextField fullWidth label="City" variant="outlined" />
          <TextField fullWidth label="Zip Code" variant="outlined" />
          <Select native fullWidth variant="outlined">
            <option value="">State</option>
            <option value="NY">NY</option>
            <option value="CA">CA</option>
          </Select>
        </Box>

        {/* Confirm Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#65D235', '&:hover': { backgroundColor: '#5bb030' } }}
        >
          Confirm
        </Button>
      </Menu>
    </>
  );
};

export default AddressMenu;




