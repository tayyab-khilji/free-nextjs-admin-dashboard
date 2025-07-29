'use client';
import React from 'react';
import { useRouter } from 'next-nprogress-bar';

// mui
import { Box, Button, Typography } from '@mui/material';

// svg
import { NotFoundIllustration } from 'src/illustrations';

export default function NotFound() {
  const router = useRouter();
  return (
    <Box
      spacing={3}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 3 }}
    >
      <NotFoundIllustration />

    </Box >
  );
}
