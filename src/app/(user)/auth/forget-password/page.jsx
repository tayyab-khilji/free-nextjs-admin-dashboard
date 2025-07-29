import React from 'react';
// mui
import { Card, Stack, Container, Typography, Box } from '@mui/material';
// components
import ForgetPasswordMain from 'src/components/_main/auth/forgetPassword';
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

export default async function Login() {
  return (
    <>
      <Container maxWidth="sm">

        <ForgetPasswordMain />
      </Container >
    </>
  );
}

