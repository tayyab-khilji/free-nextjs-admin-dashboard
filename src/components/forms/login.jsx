'use client';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import RouterLink from 'next/link';
import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next-nprogress-bar';
import toast from 'react-hot-toast';

// formik
import { useFormik, Form, FormikProvider } from 'formik';
// cookies
import { createCookies } from 'src/hooks/cookies';
// redux
import { useDispatch } from 'react-redux';
import { setWishlist } from 'src/redux/slices/wishlist';
import { cartItemsCount } from 'src/redux/slices/product';

import { setLogin } from 'src/redux/slices/user';
import { saveAddress } from 'src/redux/slices/address';

// api
import * as api from '../../services';
// mui
import {
  Link,
  Typography,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Button,
  Alert,
  AlertTitle,
  Box,
  FormHelperText
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// icons
import { BsEnvelope, BsKey, BsEyeSlash, BsEye } from 'react-icons/bs';
// import { IoMdMail } from 'react-icons/io';
import ROLES from 'src/utils/userRoles';
import { useSession, signIn, signOut } from 'next-auth/react';
import googleFacebookAuthApi from '../_main/auth/googleFacebookAuthApi';
import gIcon from '../../../public/images/svgs/g-icon.svg';
import fbIcon from '../../../public/images/svgs/Facebook.svg';
import Image from 'next/image';
import { useRouter } from 'next-nprogress-bar';
import useFcmToken from "src/hooks/notifications/useFCMToken";


export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState('');
  const [error, setError] = useState('');

  const { fcmToken } = useFcmToken();

  const { mutate } = useMutation(api.loginWithEmail, {
    onSuccess: async (data) => {

      dispatch(setLogin(data.user));
      dispatch(setWishlist(data.user.wishlist));
      await createCookies('token', data.token);
      setloading(false);

      dispatch(cartItemsCount(data?.user?.cartItemCount || 0));

      mutateUpdateFCM({
        deviceType: 'web',
        fcmToken
      });

      toast.success('Logged in successfully!');
      mutateAddress();

      if (data.user.isVerified) {
        router.push('/');
      } else {
        router.push(`/auth/verify-otp?redirect=${''}&origin=login`);
        // router.push('/auth/verify-otp', {
        //   email_param: email + '',
        //   isEmail_param: true,
        //   origin_param: 'signup'
        // });
      }
    },
    onError: (err) => {
      setloading(false);
      toast.error(err.response.data.message);
      setError(err.response.data.message);
    }
  });


  const { mutate: mutateUpdateFCM } = useMutation(api.updateProfile, {
    onSuccess: async (data) => {
      console.error("FCM token Success:", data);
    },
    onError: (err) => {
      console.error("FCM token Error:", err);
    }
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Enter valid email').required('Email is required.'),
    password: Yup.string().required('Password is required.').min(8, 'Password should be 8 characters or longer.')
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,

    onSubmit: async (values) => {
      const { email, password } = values;
      setloading(true);
      router.push('/dashboard');

      // mutate({ email, password, role: 'user' });
    }
  });

  const { errors, touched, setFieldValue, values, handleSubmit, getFieldProps } = formik;

  const { mutate: mutateAddress, isLoading } = useMutation(api.getAllAddresses, {
    onSuccess: (data) => {
      if (data?.data?.length > 0) {
        const defaultAdd = data?.data.find((address) => address.isDefault === true);
        dispatch(saveAddress(defaultAdd));
      }
    },
    onError: (err) => {
      console.error('Failed to fetch addresses:', err);
    }
  });

  const socialLoginCall = (type) => {
    // setLoginType(type);
    const callbackURL = process.env.NEXTAUTH_URL;

    signIn(type, {
      // callbackUrl
      callbackUrl: callbackURL + '/auth/login'
      // callbackUrl: callbackURL
    }); // /social
  };

  // Mutation setup
  const { mutate: SocialMutate } = useMutation(api.googleFacebookAuth, {
    onSuccess: async (data) => {
      dispatch(setLogin(data.user));
      // dispatch(setWishlist(data.user.wishlist));
      await createCookies('token', data.token);

      // setloading(false);
      toast.success('Logged in successfully!');
      setloading(false);

      // if (data.user.isVerified) {
      router.push('/');
      // } else {
      //   useSearchParams.push('/auth/verify-otp', {
      //     email_param: email + '',
      //     isEmail_param: true,
      //     origin_param: 'signup'
      //   });
      // }
    },
    onError: (err) => {
      setloading(false);

      toast.error(err.response.data.message);
      setError(err.response.data.message);
    }
  });

  // const { data: session, status } = useSession();
  const { data: session, status } = useSession();
  const [sessionData, setSessionData] = useState(session);
  const [callAPISend, setCallAPI] = useState(session?.callAPI ?? false);

  const refreshSession = async () => {
    await fetch('/api/auth/session?update');
    window.location.reload(); // Optionally reload the page to update UI
  };

  // FOR FACEBOOK LOGIN
  const handleSignin = (e) => {
    e.preventDefault();
    signIn('facebook');
  };
  const handleSignout = (e) => {
    e.preventDefault();
    signOut('facebook');
  };

  // useEffect to trigger mutation when the component loads or when token and type change
  useEffect(() => {
    if (session) {
      const authType = session?.provider;
      const token = session?.token;
      const callAPI = session?.callAPI;

      if (session && token && authType && callAPI) {
        // sessionData.callAPI = false;
        setSessionData((prevSession) => ({ ...prevSession, callAPI: false }));

        setloading(true);
        SocialMutate({ token, authType }); // Programmatically trigger the mutation with token and type
      }
    }
  }, [session?.token]); // Run the effect whenever token or type change

  useEffect(() => {
    setSessionData(session);
  }, [session]);


  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit} className="forms login-form">
          <Stack spacing={3}>
            <Stack gap={0.5} width={1}>
              <Typography variant="overline" color="text.primary" htmlFor="email" component={'label'}>
                Email
              </Typography>
              <TextField
                className="form-input"
                id="email"
                fullWidth
                autoComplete="email"
                type="email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BsEnvelope size={18} />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>

            <Stack gap={0.5} width={1}>
              <Typography variant="overline" color="text.primary" htmlFor="password" component={'label'}>
                Password
              </Typography>
              <TextField
                id="password"
                fullWidth
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                {...getFieldProps('password')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BsKey size={18} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <BsEye size={18} /> : <BsEyeSlash size={18} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>
          </Stack>
          {error && (
            <FormHelperText
              error
              sx={{ mt: 2, fontSize: '1rem' }} // Increase font size here (default is ~0.75rem)
            >
              {error}
            </FormHelperText>
          )}

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Remember me"
            />
            <Link component={RouterLink} variant="subtitle2" href="/auth/forget-password">
              Forgot password
            </Link>
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            login
          </LoadingButton>

        </Form>
      </FormikProvider>

      <Box
        // display="flex"
        // justifyContent="center"
        // alignItems="center"
        className="header signup-option"
      >
        <Button variant="outlined" className="social-sign-in" >
          {/* onClick={() => socialLoginCall('google')} */}
          <Image src={gIcon} alt="icon" width={20} height={20} />
          &nbsp; Sign In with Google
        </Button>
        {/* <Button variant="outlined" className="social-sign-in" onClick={() => socialLoginCall('facebook')}>
          <Image src={fbIcon} alt="icon" width={20} height={20} />
          &nbsp; Sign In with Facebook
        </Button> */}
      </Box>
      <Box>
        <Typography variant="subtitle2" mt={4} textAlign="center">
          Don't you have an account? &nbsp;
          <Link href={`/auth/register${'?redirect=' + ''}`} component={RouterLink}>
            Register
          </Link>
        </Typography>
      </Box>
    </>
  );
}
