import React from 'react';
// guard
import GuestGuard from 'src/guards/guest';
// mui
import { Card, Stack, Container, Typography, Box } from '@mui/material';
// components
import RegisterMain from 'src/components/_main/auth/register';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../../public/images/logo.png';

// Meta information
export const metadata = {
  title: 'Login or Sign In – AI Chat',
  description: 'Chatting',
  applicationName: 'AI-Chat',
  authors: ' AI- Chat',
  keywords:
    'AI, AI-Chat, Chat, chat'
};

export default async function CreateAccount() {
  return (
    <>
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
            Create Your Account

          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              marginBottom: '32px'
            }}
          >
            Create account to explore more...
          </Typography>
        </Box>

        <RegisterMain />
      </Container >
    </>
  );
}
