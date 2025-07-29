import React from 'react';
// guard
import GuestGuard from 'src/guards/guest';
// mui
import { Card, Stack, Container, Typography, Box } from '@mui/material';
// components
import LoginMain from 'src/components/_main/auth/login';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/images/logo.png';


// Meta information
export const metadata = {
  title: 'Login or Sign In – AI Chat',
  description: 'Chatting',
  applicationName: 'AI-Chat',
  authors: ' AI- Chat',
  keywords:
    'AI, AI-Chat, Chat, chat'
};

export default async function Login() {
  return (
    <>
      <GuestGuard>
        <Container maxWidth="sm">
          <Box
            sx={{
              marginBottom: '80px',
              marginTop: '30px'
            }}
          >
            <Link href="">

              <Image src={logo} width="180" alt="logo" />
            </Link>
          </Box>
          <Typography
            textAlign="left"
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontSize: '36px',
              marginBottom: '0px'
            }}
          >
            Login
          </Typography>
          <Typography
            textAlign="left"
            color="text.secondary"
            sz={{
              marginBottom: '32px'
            }}
          >
            Login to your account to continue
          </Typography>

          <LoginMain />
        </Container>
      </GuestGuard>
    </>
  );
}
