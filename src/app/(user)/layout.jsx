
'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import TagManager from 'react-gtm-module';
import UserLayoutWrapper from './UserLayoutWrapper';
import FcmTokenComp from 'src/components/fcm/firebaseForeground';



export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <body>
        <UserLayoutWrapper>
          <FcmTokenComp />
          {children}
        </UserLayoutWrapper>
      </body>
    </html>
  );
}
