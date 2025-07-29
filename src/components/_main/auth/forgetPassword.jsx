'use client';
import React, { useState } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { toast } from 'react-hot-toast';

// mui
import { Box, Button, Container, Typography, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// api
import * as api from 'src/services';
import { useMutation } from 'react-query';
// icons
import { CiCircleCheck } from 'react-icons/ci';
// components
import ForgetPasswordForm from 'src/components/forms/forgetPassword';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/images/logo.png';

export default function ForgetPasswordMain() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setloading] = useState(false);


  return (
    <Container maxWidth="sm">
      {!sent ? (
        <>
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
              Forget Password
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                marginBottom: '32px'
              }}
            >
              Please enter the email address associated with your account and We will email you a link to reset your
              password.
            </Typography>
          </Box>



          <ForgetPasswordForm />
          {/* onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} */}

          <Box mt={3}>
            <Button fullWidth size="large" onClick={() => router.push('/auth/login')} className="full-width-btn">
              back
            </Button>
          </Box>
        </>
      ) : (
        <Box textAlign="center">
          <Box
            sx={{
              mb: 5,
              mx: 'auto',
              display: 'inline-block'
            }}
          >
            <CiCircleCheck fontSize={160} />
          </Box>

          <Typography variant="h3" gutterBottom>
            Request Sent
          </Typography>
          <Typography mb={5}>
            Email has been sent to <strong>{email}</strong>.
            <br />
          </Typography>

          <Button size="large" fullWidth onClick={() => router.push('/auth/login')} className="full-width-btn">
            back
          </Button>
        </Box>
      )}
    </Container>
  );
}
