
'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import TagManager from 'react-gtm-module';
import FcmTokenComp from 'src/components/fcm/firebaseForeground';
import Box from '@mui/material/Box';



export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <body>
        <Box>
          <FcmTokenComp />
          {children}
        </Box>
      </body>
    </html>
  );
}

