import React from 'react';

import { Container } from '@mui/material';
// guard
import AuthGuard from 'src/guards/auth';
import DashboardPage from 'src/components/_main/dashboard/Dashboard';

// layout
import VendorLayout from 'src/layout/_vendor';

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
      <VendorLayout>
        {/* <AuthGuard> */}
        <Container fullWidth className='dashboard-container' maxWidth="100%" sx={{ backgroundColor: '#f4f5f7' }}>
          <DashboardPage />
        </Container>
      </VendorLayout>
      {/* </AuthGuard> */}
    </>
  );
}
