'use client';

import { Stack, Typography, Link, FormControlLabel, Checkbox, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { useState, useEffect } from 'react';

export default function NotificationAllow() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSetupLaterClick = () => {
    router.push('/auth/success-page');
  };

  const handleAllowClick = () => {
    router.push('/auth/success-page');
  };

  // Handle button click: request location if possible
  const handleAllowLocation = () => {
    handleAllowClick();
  };

  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <LoadingButton fullWidth size="large" onClick={handleSetupLaterClick} variant="outlined" loading={loading}>
            Setup Later
          </LoadingButton>
        </Grid>
        <Grid xs={6} sx={{ pl: '15px' }}>
          <LoadingButton fullWidth size="large" onClick={handleAllowLocation} variant="contained" loading={loading}>
            Enable push notification
          </LoadingButton>
        </Grid>
      </Grid>
    </Stack>
  );
}
