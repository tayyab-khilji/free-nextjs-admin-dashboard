'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

// mui
import {
  Toolbar,
  Skeleton,
  Stack,
  AppBar,
  useMediaQuery,
  Box,
  Container,
  Typography,
  Link,
  Menu,
  MenuItem,
  IconButton,
  TextField,
  InputAdornment, // Import InputAdornment for the search icon inside TextField
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import { useRouter } from 'next-nprogress-bar';

// redux
import { useDispatch } from 'react-redux';
import { resetWishlist } from 'src/redux/slices/wishlist';
import { cartItemsCount } from 'src/redux/slices/product';
import { setLogout } from 'src/redux/slices/user';
import { deleteAddress, getAddress } from 'src/redux/slices/address';

// hooks
import { deleteCookies } from 'src/hooks/cookies';
import { useSession, signIn, signOut } from 'next-auth/react';

// components
import Logo from 'src/components/logo';
import WishlistPopover from 'src/components/popover/wislist';
import CartWidget from 'src/components/cartWidget';
import { IoLocationOutline } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import AddressMenu from '../addressMenu';
import { resetCart } from 'src/redux/slices/product';

import AddressList from 'src/components/_main/profile/edit/addressList';

import { useMutation } from 'react-query';
// api
import * as api from 'src/services';
import toast from 'react-hot-toast';

// dynamic import components
const MobileBar = dynamic(() => import('src/layout/_main/mobileBar'));
const LogInWidget = dynamic(() => import('src/components/signn_singup'), {
  loading: () => (
    <Stack direction="row" spacing={1} alignItems="center">
      <Skeleton variant="circular" width={40} height={40} />
      <Box>
        <Skeleton variant="text" width={60} sx={{ mb: 0.6 }} />
        <Skeleton variant="text" width={60} />
      </Box>
    </Stack>
  )
});

// ----------------------------------------------------------------------
export default function Navbar() {
  const { checkout } = useSelector(({ product }) => product);
  const { user, isAuthenticated } = useSelector(({ user }) => user);
  const router = useRouter();
  const { address } = useSelector(({ address }) => address);

  const dispatch = useDispatch();

  const isMobile = useMediaQuery('(max-width:640px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [notificationBadge, setNotificationBadge] = useState(0);


  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
  };

  // useEffect(() => {
  //   if (isAuthenticated) setDefaultAddress(getAddress());
  // }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (!hasNullValues(address)) setDefaultAddress(address);
    }
  }, [address]);

  useEffect(() => {
    setAnchorEl(null);
  }, [isAuthenticated]);


  const onLogout = async () => {
    mutateUpdateFCM({
      deviceType: 'web',
      fcmToken: ''
    });

    await signOut();
    handleClose();
    deleteCookies('token');
    dispatch(setLogout());
    dispatch(resetWishlist());
    dispatch(deleteAddress());

    dispatch(cartItemsCount(0));
    dispatch(resetCart());

    router.replace('https://www.buyhalalgoods.com');
  };

  const { mutate: mutateUpdateFCM } = useMutation(api.updateProfile, {
    onSuccess: async (data) => {
      console.error("FCM token Success:", data);
    },
    onError: (err) => {
      console.error("FCM token Error:", err);
    }
  });

  const navigateTo = (path) => {
    handleClose();
    router.push(path);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/products/search?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  function hasNullValues(obj) {
    for (const key in obj) {
      if (obj[key] === null) {
        return true; // Found a null value
      }
    }
    return false; // No null values found
  }


  const { mutate } = useMutation(api.getAllNotifications, {
    onSuccess: async (response) => {
      // Handle success
      const unOpenedCount = response?.data.filter(notification => !notification.opened).length;
      setNotificationBadge(unOpenedCount);
    },
    onError: (err) => {
      // Handle error
    }
  });


  useEffect(() => {
    mutate();
  }, [mutate]);



  return (
    <>
      <AppBar
        sx={{
          boxShadow: 'none',
          position: 'sticky',
          top: -0.5,
          zIndex: 999,
          borderRadius: 0,
          pr: '0px !important',
          bgcolor: (theme) => theme.palette.primary.main,
          borderTop: (theme) => `1px solid ${theme.palette.primary.main}`,
          display: { md: 'block', xs: 'block' },
          '& .toolbar': {
            justifyContent: 'space-between',
            backdropFilter: 'blur(6px)',
            borderRadius: 0,
            WebkitBackdropFilter: 'blur(6px)',
            bgcolor: (theme) => theme.palette.primary.main,
            px: 3,
            py: 1.5
          }
        }}
      >
        <Container className='navbar_cart' maxWidth="xl">
          {isMobile ? (
            // Mobile View Layout
            <Box className="navbar_header">
              <Toolbar disableGutters className="toolbar" sx={{ p: '0px!important' }}>
                <Stack direction="row" alignItems="center">
                  {/* Hamburger Menu Icon for Mobile */}
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, color: '#fff' }}
                    onClick={toggleDrawer(true)}
                  >
                    <MenuIcon />
                  </IconButton>

                  {/* Mobile Address Display */}
                  {defaultAddress ? (
                    // when address is added----
                    <Stack
                      style={{ cursor: 'pointer' }}
                      onClick={() => router.push(`/account/edit-address/${defaultAddress._id}`)}
                      direction="row"
                      alignItems="center"
                      padding="10px"
                      sx={{ bgcolor: '#fff', color: '#0B1C13', marginTop: '-16px', paddingTop: "20px" }}
                    >
                      <IoLocationOutline fontSize={20} />
                      <Box marginLeft="5px" marginRight="5px">
                        <Typography variant="caption" mb={0} fontWeight="bold" color="#505050">
                          Deliver to
                        </Typography>
                        <Typography style={{ fontSize: "10px" }} variant="body2" mb={0}>
                          {defaultAddress.addressLine1}
                        </Typography>
                        <Typography variant="caption" mb={0} fontWeight={200}>
                          {defaultAddress.city} {defaultAddress.stateCode} {', '}
                          {defaultAddress.zip}
                        </Typography>
                      </Box>
                      <AddressMenu addressId={defaultAddress._id} />
                    </Stack>
                  ) : (
                    //  when defaultAddress is NOT present
                    <Stack
                      style={{ cursor: 'pointer' }}
                      onClick={() => (window.location.href = '/account/add-address')}
                      direction="row"
                      alignItems="center"
                      padding="10px" // Adjust padding as needed for your design
                      sx={{
                        bgcolor: '#fff', // Or your desired background color
                        color: '#0B1C13', // Or your desired text color
                        // Add any other styling to match your screenshot
                        border: '1px solid #ccc' // Example border to visually represent the box
                      }}
                    >
                      <IoLocationOutline fontSize={24} style={{ marginRight: '10px' }} />
                      <Box flexGrow={1}>
                        <Typography variant="body2">Click To Add</Typography>
                        <Typography variant="h6" fontWeight="bold">
                          Delivery Address{' '}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          width: 30, // Adjust size as needed
                          height: 30, // Adjust size as needed
                          borderRadius: '50%',
                          bgcolor: '#E0FFE0', // Light green background for the plus button
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          marginLeft: '5px'
                        }}
                      >
                        <Typography variant="h5" color="#00A000">
                          +
                        </Typography>
                      </Box>
                    </Stack>
                  )}
                </Stack>

                {/* Mobile Cart Widget (right side) */}
                <Box display="flex" alignItems="center">
                  <CartWidget checkout={checkout} />
                </Box>
              </Toolbar>
            </Box>
          ) : (
            // Desktop View Layout (your original code)
            <Toolbar disableGutters className="toolbar" sx={{ p: '0px!important' }}>
              <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
                {/* Desktop Logo */}
                <Logo />

                {/* Desktop Address Display */}

                {defaultAddress ? (
                  // when address is added----
                  <Stack
                    style={{ cursor: 'pointer' }}
                    onClick={() => router.push(`/account/edit-address/${defaultAddress._id}`)}
                    direction="row"
                    alignItems="center"
                    padding="10px"
                    sx={{ bgcolor: '#fff', color: '#0B1C13', marginLeft: '10px', marginTop: '-16px' }}
                  >
                    <IoLocationOutline fontSize={20} />
                    <Box marginLeft="5px" marginRight="5px">
                      <Typography variant="caption" mb={0} fontWeight="bold" color="#505050">
                        Deliver to
                      </Typography>
                      <Typography variant="body2" mb={0}>
                        {defaultAddress.addressLine1}
                      </Typography>
                      <Typography variant="caption" mb={0} fontWeight={200}>
                        {defaultAddress.city} {defaultAddress.stateCode} {', '}
                        {defaultAddress.zip}
                      </Typography>
                    </Box>
                    <AddressMenu />
                  </Stack>
                ) : (
                  //  when defaultAddress is NOT present
                  <Stack
                    style={{ cursor: 'pointer' }}
                    onClick={() => (window.location.href = '/account/add-address')}
                    direction="row"
                    alignItems="center"
                    padding="10px" // Adjust padding as needed for your design
                    sx={{
                      bgcolor: '#fff', // Or your desired background color
                      color: '#0B1C13', // Or your desired text color
                      border: '1px solid #ccc', // Example border to visually represent the box
                      width: '250px',
                      marginLeft: '20px',
                      marginTop: '-17px',
                      height: '90px'
                    }}
                  >
                    <IoLocationOutline fontSize={24} style={{ marginRight: '10px' }} />
                    <Box flexGrow={1}>
                      <Typography variant="body2">Click To Add</Typography>
                      <Typography variant="h6" fontWeight="bold">
                        Delivery Address{' '}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 36, // Adjust size as needed
                        height: 36, // Adjust size as needed
                        borderRadius: '50%',
                        bgcolor: '#E0FFE0', // Light green background for the plus button
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Typography variant="h5" color="#00A000">
                        +
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </Stack>

              {/* Desktop Login/Signup, Wishlist, Cart */}
              <Stack gap={2} direction="row" alignItems={'center'} fontSize="14px">
                <Box display="flex" alignItems="center" onClick={handleClick} style={{ cursor: 'pointer' }}>
                  <LogInWidget />
                  <Typography>
                    {isAuthenticated ? (
                      <Typography variant="body1">{user?.name || user?.firstName || ''}</Typography>
                    ) : (
                      <Typography variant="body1">Sign in / Sign up</Typography>
                    )}
                  </Typography>
                  {/* Dropdown Menu for LogInWidget */}
                  {isAuthenticated && (
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button'
                      }}
                    >
                      <>
                        <MenuItem onClick={() => navigateTo('/account/profile')}>
                          <img style={{ marginRight: '20px' }} src="/images/user1.png" alt="" /> View My Account
                        </MenuItem>
                        <MenuItem onClick={() => navigateTo('/account/address-book')}>
                          <img style={{ marginRight: '20px' }} src="/images/address.png" alt="" />
                          View Address Book
                        </MenuItem>
                        <MenuItem onClick={() => navigateTo('/account/manage-orders')}>
                          <img
                            src="/images/new-box.png"
                            alt=""
                            style={{ marginRight: '20px', width: '24px', height: '24px' }}
                          />
                          Manage Orders
                        </MenuItem>

                        <MenuItem onClick={() => navigateTo('/account/notifications')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <img
                            src="/images/bell.png"
                            alt=""
                            style={{ marginRight: '20px', width: '24px', height: '24px' }}
                          />
                          <span style={{ flexGrow: 1 }}>Notifications</span>
                          <Badge badgeContent={notificationBadge} color="error" />
                        </MenuItem>
                        <MenuItem onClick={() => navigateTo('/account/wishlist')}>
                          <img style={{ marginRight: '20px' }} src="/images/heart 1 (1).png" alt="" />
                          My Wishlist
                        </MenuItem>
                        {/* <MenuItem onClick={onLogout}>
                          <img style={{ marginRight: '20px' }} src="/images/logout 1.png" alt="" />
                          Logout
                        </MenuItem> */}
                        <MenuItem onClick={onLogout}>
                          <img
                            src="/images/logout.png"
                            alt=""
                            style={{ marginRight: '20px', width: '24px', height: '24px' }}
                          />
                          <span style={{ color: 'red' }}>Logout</span>
                        </MenuItem>
                      </>
                    </Menu>
                  )}
                </Box>

                <Box display="flex" alignItems="center">
                  <CartWidget checkout={checkout} />
                  <p> Cart</p>
                </Box>
              </Stack>
            </Toolbar>
          )}
        </Container>
      </AppBar>

      {/* Side Drawer for Hamburger Menu */}
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {/* Example Drawer Items - you can customize these */}
            <ListItem button onClick={() => router.push('/')}>
              {/* <ListItemText primary="Home" /> */}
              <img style={{ width: '154px', height: '65px' }} src="/images/hlogo.png" alt="" />
            </ListItem>

            {/* menuburgar sidebar icons------- */}
            {isAuthenticated && (
              <>
                <div className="testside_bar">
                  <ListItem button onClick={() => router.push('/account/profile')}>
                    <img src="/images/user1.png" style={{ paddingRight: '15px' }} alt="" />
                    <ListItemText primary="View My Account" />
                  </ListItem>
                  <ListItem button onClick={() => router.push('/account/address-book')}>
                    <img src="/images/address.png" style={{ paddingRight: '15px' }} />
                    <ListItemText primary="View Address book" />
                  </ListItem>
                  <ListItem button onClick={() => router.push('')}>
                    <img src="/images/new-box.png" style={{ paddingRight: '15px', width: '40px', height: '30px' }} />
                    <ListItemText primary="Manage Orders" />
                  </ListItem>
                  <ListItem button onClick={() => router.push('/account/wishlist')}>
                    <img src="/images/bell.png" style={{ paddingRight: '15px' }} />
                    <ListItemText primary="Notifications" />
                  </ListItem>
                  <ListItem button onClick={() => router.push('/account/wishlist')}>
                    <img src="/images/heart 1 (1).png" style={{ paddingRight: '15px' }} />
                    <ListItemText primary="My Wishlist" />
                  </ListItem>
                  <ListItem button onClick={onLogout}>
                    <img src="/images/log.png" style={{ paddingRight: '15px' }} />
                    <ListItemText primary="Logout" />
                  </ListItem>
                </div>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Box style={{ display: 'flex' }}>
                  <ListItem button onClick={() => router.push('/auth/login')}>
                    <ListItemText
                      primary="Sign in /"
                      primaryTypographyProps={{
                        style: { fontWeight: 'bold' }
                      }}
                    />
                  </ListItem>
                  <ListItem className="signup_btn" onClick={() => router.push('/auth/register')}>
                    <ListItemText
                      primary="Sign up"
                      primaryTypographyProps={{
                        style: { fontWeight: 'bold' }
                      }}
                    />
                  </ListItem>
                </Box>
              </>
            )}
          </List>
        </Box>
      </Drawer>

      {/* This is your MobileBar component (bottom navigation), displayed on mobile */}
      {isMobile && <MobileBar />}
    </>
  );
}
