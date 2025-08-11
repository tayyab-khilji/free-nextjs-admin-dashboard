import React from 'react';

// mui
import { Container } from '@mui/material';

// next
import dynamic from 'next/dynamic';

// components
import GeneralSkeleton from 'src/components/_main/skeletons/profile/general';

// dynamic import
const AccountGeneral = dynamic(() => import('src/components/_main/profile/edit/accountGeneral'), {
  loading: () => <GeneralSkeleton />
});

// Meta information
export const metadata = { title: 'Chatpliance', applicationName: 'Chatpliance', authors: 'Chatpliance' };

export default function General() {
  return (
    <Container>
      <AccountGeneral />
    </Container>
  );
}
