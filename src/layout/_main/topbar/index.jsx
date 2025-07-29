'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSelector } from 'react-redux';

// mui
import { Toolbar, Container, Stack, useTheme, Divider, Skeleton, Box, Typography, Menu, MenuItem } from '@mui/material';

// icons
import { MdOutlinePhone } from 'react-icons/md';
import { MdOutlineMail } from 'react-icons/md';
import ROLES from 'src/utils/userRoles';
import { SlArrowDown } from 'react-icons/sl';
import { useRouter } from 'next-nprogress-bar';
import { deleteCookies } from 'src/hooks/cookies';
import { useDispatch } from 'react-redux';
import { setLogout } from 'src/redux/slices/user';
import { resetWishlist } from 'src/redux/slices/wishlist';

const UserSelect = dynamic(() => import('src/components/select/userSelect'), {
  ssr: false,
  loading: () => (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Skeleton variant="rectangular" width={29.4} height={18.9} sx={{ borderRadius: '4px' }} />
      <Divider orientation="vertical" flexItem />
      <Skeleton variant="rectangular" width={48.4} height={18.9} sx={{ borderRadius: '4px' }} />
    </Stack>
  )
});

export default function UserTopbar() {
  const theme = useTheme();
  const { user, isAuthenticated } = useSelector(({ user }) => user);

  const [anchorEl, setAnchorEl] = useState(null);

  // Open dropdown
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const onLogout = () => {
    deleteCookies('token');
    dispatch(setLogout());
    dispatch(resetWishlist());
    setTimeout(() => {
      location.href = '/auth/login';
    }, 1000);
  };

  const languages = ['English', 'Spanish', 'French', 'German'];

  return (
    <Box bgcolor={(theme) => theme.palette.primary.main}>
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            minHeight: `36px !important`,
            background: theme.palette.background.default,
            justifyContent: 'space-between',
            display: { xs: 'none', md: 'flex' },
            position: 'static',
            zIndex: 999,
            width: '100%',
            px: '0px!important',
            bgcolor: (theme) => theme.palette.primary.main
          }}
        >
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              gap: 4,
              color: '#fff'
            }}
          >
            {/* Navigation Links */}
            {/* <Link href="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="body1">Save more on app</Typography>
            </Link>
            <Link href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="body1">Sell on BHG</Typography>
            </Link>
            <Link href="/services" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="body1">Help & Support</Typography>
            </Link> */}

            <Box
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            ></Box>

            {/* Login and Logout */}

            <Box
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
              // onClick={handleMenuOpen}
            >
              {/* <Typography variant="body1">Language</Typography>
              &nbsp;&nbsp;
              <SlArrowDown fontSize={10} /> */}
              {isAuthenticated ? (
                <>
                  <Link href="#" onClick={onLogout} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="body1">Logout</Typography>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="body1">Log in</Typography>
                  </Link>
                  <Link href="auth/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="body1">Sign up</Typography>
                  </Link>
                </>
              )}
            </Box>

            {/* Language Dropdown */}
            {/* <Box
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              onClick={handleMenuOpen}
            >
              <Typography variant="body1">Language</Typography>
              &nbsp;&nbsp;
              <SlArrowDown fontSize={10} />
            </Box>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              {languages.map((language) => (
                <MenuItem key={language} onClick={() => console.log(`Selected: ${language}`)}>
                  {language}
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
}
