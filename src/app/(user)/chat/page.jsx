import React from 'react';

import { Container } from '@mui/material';
// guard
import AuthGuard from 'src/guards/auth';
import ChatList from 'src/components/_main/chat/chatMain';

// Meta information
export const metadata = {
  title: 'Login or Sign In – AI Chat',
  description: 'Chatting',
  applicationName: 'AI-Chat',
  authors: ' AI- Chat',
  keywords:
    'AI, AI-Chat, Chat, chat'
};

export default function page() {
  return (
    <>
      {/* <AuthGuard> */}
      <Container className='dashboard-container' maxWidth="100%" sx={{ backgroundColor: '#f4f5f7' }}>
        <ChatList />
      </Container>
      {/* </AuthGuard> */}
    </>
  );
}
