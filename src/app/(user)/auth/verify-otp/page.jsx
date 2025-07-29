import React from 'react';
// mui
import { Card, Stack, Container, Typography, Box } from '@mui/material';
// components
import OTPMain from 'src/components/_main/auth/otp';

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
      <Container maxWidth="sm">

        <OTPMain />
      </Container >
    </>
  );
}
