'use client';
import React from 'react';
import PropTypes from 'prop-types';

// guard
import GuestGuard from 'src/guards/guest';
// mui
import { Container, Typography, Box } from '@mui/material';
// component
import ResetPasswordMain from 'src/components/_main/auth/resetPassword';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import logo from '../../../../../public/images/logo.png';

export default function ResetPassword() {
  // { params }
  // const { token } = params;
  const { user } = useSelector((state) => state.user);

  console.log('checking data', origin + '=' + JSON.stringify(user));

  return (
    <>
      {/* <GuestGuard> */}
      <Container maxWidth="sm">

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Box
          >
            <Image src={logo} width="230" alt="logo" />
          </Box>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontSize: '36px',
              marginBottom: '0px'
            }}
          >
            Reset Password
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              marginBottom: '32px'
            }}
          >
            Enter your new password
          </Typography>
        </Box>


        <Box
          sx={{
            maxWidth: 560,
            m: 'auto',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 3
          }}
        >
          <>

            {/* <ResetPasswordMain token={user._id} /> */}
            <ResetPasswordMain />
          </>
        </Box>
      </Container>
      {/* </GuestGuard> */}
    </>
  );
}
