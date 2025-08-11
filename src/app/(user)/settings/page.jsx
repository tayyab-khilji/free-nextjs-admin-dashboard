import React from 'react';

import { Container } from '@mui/material';
// guard
import AuthGuard from 'src/guards/auth';

// next
import dynamic from 'next/dynamic';

// components
import GeneralSkeleton from 'src/components/_main/skeletons/profile/general';

// dynamic import
const AccountGeneral = dynamic(() => import('src/components/_main/profile/edit/accountGeneral'), {
  loading: () => <GeneralSkeleton />
});

// layout
import MainLayout from 'src/layout/_main';

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
      <MainLayout>
        {/* <AuthGuard> */}
        <Container fullWidth className='dashboard-container' maxWidth="100%" sx={{ backgroundColor: '#f4f5f7' }}>
          <AccountGeneral />
        </Container>
      </MainLayout>
      {/* </AuthGuard> */}
    </>
  );
}
