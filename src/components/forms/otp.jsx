'use client';
import React from 'react';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import Countdown from 'react-countdown';
import { useSelector, useDispatch } from 'react-redux';
import { createCookies } from 'src/hooks/cookies';
import * as api from 'src/services';
import { useMutation } from 'react-query';
import { verifyUser, setLogin } from 'src/redux/slices/user';
// mui
import { Box, Card, Stack, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';


const renderer = ({ minutes, seconds }) => (
  <Stack
    direction="row"
    gap={0.5}
    sx={{
      bgcolor: '#EDF2F7',
      borderRadius: '10px',
      color: 'text.primary'
    }}
  >
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={0}
      sx={{
        height: 28,
        width: 28,
        borderRadius: '2px'
      }}
    >
      <Typography variant="body1" color="text.primary" fontWeight={800} fontSize={14} lineHeight={1}>
        {minutes}
      </Typography>
    </Stack>
    <Typography variant="body1" color="">
      :
    </Typography>
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={0}
      sx={{
        height: 28,
        width: 28,
        borderRadius: '2px'
      }}
    >
      <Typography variant="body1" color="text.primary" fontWeight={800} fontSize={14} lineHeight={1}>
        {seconds}
      </Typography>
    </Stack>
  </Stack>
);

export default function VerifyOTPForm({ countdownDate, onResetCountdown }) {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const searchParam = useSearchParams();
  const redirect = searchParam.get('redirect');
  const origin = searchParam.get('origin');
  const userName = searchParam.get('username');

  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = React.useState(false);
  const [resendLoading, setResendLoading] = React.useState(false);
  const [otp, setOtp] = React.useState('');
  const [complete, setComplete] = React.useState(false);



  const onOtpChange = (value) => {
    setOtp(value);
    setComplete(false);
  };

  const { mutate } = useMutation(api.verifyOTP, {
    retry: false,
    onSuccess: async (data) => {
      setLoading(false);
      // dispatch(verifyUser());
      dispatch(setLogin(data.user));


      if (origin === 'forgot') {
        createCookies('token', data.token);
        router.replace('/auth/reset-password');
      } else {
        if (data.user?.signupType != 'email' && data.user?.email && data.user?.name) {
          router.push(`/auth/location-access`);
        } else {
          if (data.user?.signupType === 'email') router.replace('/auth/register-info-phone');
          else router.replace('/auth/register-info-email');
        }
      }
    },
    onError: () => {
      toast.error('Invalid OTP.');
      setLoading(false);
    }
  });


  const { mutate: ForgotOTPMutate } = useMutation(api.forgetPasswordOTP, {
    retry: false,
    onSuccess: async (data) => {
      setLoading(false);
      setComplete(true);


      console.log('checking data', origin + '=' + JSON.stringify(user) + '=' + JSON.stringify(data));

      if (origin == 'forgot') {
        createCookies('token', data.token);

        router.replace('/auth/reset-password');
      } else {
        // if (data.user.isVerified) {
        //         router.push("/");
        //       } else {

        router.replace('/auth/register-info-email');
      }
    },
    onError: () => {
      toast.error('Invalid OTP.');
      setLoading(false);
    }
  });

  const { mutate: ResendOTPMutate } = useMutation(api.resendOTP, {
    retry: false,
    onSuccess: async () => {
      setComplete(true);
      toast.success('OTP resent');
      setResendLoading(false);
    },
    onError: () => {
      toast.error('Failed to resend OTP.');
      setResendLoading(false);
    }
  });

  const handleClick = () => {
    setLoading(true);
    if (origin == 'forgot') {
      // ForgotOTPMutate({
      //   otp,
      //   username: userName
      // });
      router.replace('/auth/reset-password');

    } else {
      // mutate({
      //   otp
      // });

      router.replace('/auth/reset-password');

    }
  };

  const { mutate: ResendForgetOTPMutate } = useMutation(api.forgetPassword, {
    onSuccess: async (data) => {
      setComplete(true);
      toast.success('OTP resent');
      setResendLoading(false);
    },
    onError: (err) => {
      toast.error('Failed to resend OTP.');
      setResendLoading(false);
    }
  });

  const onResend = () => {
    // setResendLoading(true);
    const typeEmail = userName ? true : false;

    if (origin == 'forgot') {
      // ResendForgetOTPMutate({ username: userName });
    } else {
      // ResendOTPMutate({ isEmail: typeEmail });
    }
    onResetCountdown(); // Use the provided reset function to reset the timer
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Box
        >
          <Image src={logo} width="230" alt="logo" />
        </Box>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontSize: '36px',
            marginBottom: '0px'
          }}
        >
          Verify Your Email
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            marginBottom: '32px'
          }}
        >
          We've sent a verification code to your email address. Please enter the code below to verify your account.
        </Typography>
      </Box>


      <Stack className="otp-form-box">

        <Box
          className="otp-box"
          sx={{
            textAlign: 'left',
            '& > div': {
              justifyContent: 'start'
            },
            span: {
              fontSize: 22,
              p: 0.5
            },
            input: {
              minWidth: 40,
              height: 40,
              bgcolor: theme.palette.background.default,
              color: 'text.primary',
              border: `1px solid ${theme.palette.divider}`
            }
          }}
        >
          <Typography textAlign="left" mb={2} style={{ fontWeight: 400 }}>
            Enter Verification Code
          </Typography>
          <Box className="input-box">
            <OtpInput
              value={otp}
              onChange={onOtpChange}
              numInputs={4}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              shouldAutoFocus
            />
          </Box>
        </Box>
        {complete ? (
          <Box className="resend-message" my={4}>
            <Typography>Didn’t receive the email? Check your spam folder or</Typography>
            <LoadingButton loading={resendLoading} onClick={onResend} variant="contained" color="secondary">
              Resend OTP
            </LoadingButton>
          </Box>
        ) : (
          <Box className="timer-text" my={4}>
            <Typography className="timer-label">Send code again</Typography>
            <Countdown date={countdownDate} renderer={renderer} onComplete={() => setComplete(true)} />
          </Box>
        )}
        <LoadingButton
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            maxWidth: '100%',
            mx: 'auto',
            mt: 2
          }}
          loading={loading}
          disabled={otp.length < 4 || (complete && loading)}
          onClick={handleClick}
        >
          Verify
        </LoadingButton>
      </Stack>
    </Container>
  );
}
