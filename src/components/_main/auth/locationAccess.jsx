'use client';
import { useSearchParams } from 'next/navigation';
import RouterLink from 'next/link';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';
import { setLogin } from 'src/redux/slices/user';
import { useMutation } from 'react-query';
import * as api from 'src/services';
import { Stack, Typography, Link, FormControlLabel, Checkbox, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next-nprogress-bar';
import { useState, useEffect } from 'react';

export default function LocationAccess() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [permissionStatus, setPermissionStatus] = useState(''); // Track permission status
  const [error, setError] = useState('');

  const handleSetupLaterClick = () => {
    router.push('/auth/order-status');
  };

  const handleAllowClick = () => {
    console.log('Allow button clicked');
    router.push('/auth/address-info');
  };

  // Function to get user's location
  const requestLocationAccess = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // setLocation({ lat: latitude, lng: longitude });
        // setError("");
        console.error('Success:', longitude + '=' + latitude);
      },
      (err) => {
        // setError("Location access denied. Please enable it manually.");
        console.error('Error:', err);
      }
    );
  };

  // Check the current permission status using the Permissions API
  const checkPermissionStatus = async () => {
    try {
      const status = await navigator.permissions.query({ name: 'geolocation' });
      setPermissionStatus(status.state);

      status.onchange = () => setPermissionStatus(status.state); // Listen for status changes
    } catch (err) {
      console.error('Error checking permission status:', err);
    }
  };

  useEffect(() => {
    checkPermissionStatus(); // Check permission status on page load
  }, []);

  // Handle button click: request location if possible
  const handleAllowLocation = () => {
    if (permissionStatus === 'granted') {
      console.log('heh');
      handleAllowClick();
      // requestLocationAccess();
    } else if (permissionStatus === 'prompt') {
      requestLocationAccess(); // Trigger native prompt
    } else {
      setError('Location permission denied. Please enable it manually from browser settings.');
    }
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
            Allow
          </LoadingButton>
        </Grid>
      </Grid>
    </Stack>
    // <Stack direction="row" spacing={2}>
    //   <LoadingButton size="large" onClick={handleSetupLaterClick} variant="contained" loading={loading}>
    //     Setup Later
    //   </LoadingButton>
    //   <LoadingButton size="large" onClick={handleAllowLocation} variant="contained" loading={loading}>
    //     Allow
    //   </LoadingButton>
    // </Stack>
  );
}
