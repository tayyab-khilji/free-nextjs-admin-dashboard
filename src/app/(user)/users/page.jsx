// src/app/admin/products/page.js
import React from 'react';
import { Container } from '@mui/material';
// guard
import AuthGuard from 'src/guards/auth';
import UserList from 'src/components/_main/users/userList'; // New component

// Meta information
export const metadata = {
  title: 'Login or Sign In – AI Chat',
  description: 'Chatting',
  applicationName: 'AI-Chat',
  authors: ' AI- Chat',
  keywords:
    'AI, AI-Chat, Chat, chat'
};


export default function AdminProducts() {
  return (
    <>
      {/* <AuthGuard> */}
      <Container className='dashboard-container' maxWidth="100%" sx={{ backgroundColor: '#f4f5f7' }}>
        <UserList />
      </Container>
      {/* </AuthGuard> */}
    </>
  );
}


