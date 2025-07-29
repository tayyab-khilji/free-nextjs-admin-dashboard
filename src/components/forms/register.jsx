'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next-nprogress-bar';
import RouterLink from 'next/link';
import { toast } from 'react-hot-toast';
// yup
import * as Yup from 'yup';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// redux
import { useDispatch } from 'react-redux';
import { setLogin } from 'src/redux/slices/user';
// api
import { useMutation } from 'react-query';
import * as api from 'src/services';
// mui
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  FormHelperText,
  Grid
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// icons
import { BsEnvelope, BsKey, BsEyeSlash, BsEye, BsPerson } from 'react-icons/bs';
// hooks
import { createCookies } from 'src/hooks/cookies';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import gIcon from '../../../public/images/svgs/g-icon.svg';
import fbIcon from '../../../public/images/svgs/Facebook.svg';
import Image from 'next/image';

export default function RegisterForm() {
  // const router = useRouter();
  const router = useRouter();

  const searchParam = useSearchParams();
  const redirect = searchParam.get('redirect');
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [error, setError] = useState('');

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const RegisterSchema = Yup.object().shape({
    // firstName: Yup.string().max(50, 'Too long!').required('First name is required'),
    // lastName: Yup.string().max(50, 'Too long!').required('Last name is required'),
    // email: Yup.string().email('Enter valid email').required('Email is required'),
    // phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
    // password: Yup.string().required('Password is required').min(8, 'Password should be 8 characters or longer.')

    email: Yup.string().email('Enter valid email').required('Email is required'),
    // countryCode: Yup.string().max(50, 'Too long!').required('Last name is required'),
    password: Yup.string().required('Password is required').min(8, 'Password should be 8 characters or longer.')
  });
  const formik = useFormik({
    initialValues: {
      // firstName: '',
      // lastName: '',
      // phone: '',
      // gender: 'male',
      // email: '',
      // password: ''

      email: '',
      role: 'user',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      if (!isTermsChecked) {
        setShowTermsError(true);
        return;
      }

      setloading(true);
      // await mutate({
      //   ...values
      // });

      router.push(
        redirect
          ? `/auth/verify-otp?redirect=${redirect}&origin=signup&username=` + data.user.username
          : `/auth/verify-otp?username=` + data.user.username
      );
    }
  });

  const { mutate } = useMutation(api.signupWithEmail, {
    onSuccess: async (data) => {
      await createCookies('token', data.token);
      toast.success('OTP sent to your email');
      setloading(false);
      router.push(
        redirect
          ? `/auth/verify-otp?redirect=${redirect}&origin=signup&username=` + data.user.username
          : `/auth/verify-otp?username=` + data.user.username
      );
      // router.push(`/auth/verify-otp`);
    },
    onError: async (err) => {
      const message = JSON.stringify(err.response.data.message);
      toast.error(message ? JSON.parse(message) : 'Something went wrong!');
      setloading(false);
      setError(err.response?.data?.message);
    }
  });

  const socialLoginCall = (type) => {
    const callbackURL = process.env.NEXTAUTH_URL;

    signIn(type, {
      callbackUrl: callbackURL + '/auth/register'
    }); // /social
  };

  const handleCheckboxChange = (event) => {
    setIsTermsChecked(event.target.checked);
    if (event.target.checked) {
      setShowTermsError(false);
    }
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

  // useEffect to trigger mutation when the component loads or when token and type change
  useEffect(() => {
    if (session) {
      console.log('API Calling started:', '=' + JSON.stringify(session));

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

  const { errors, touched, handleSubmit, values, getFieldProps } = formik;
  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit} className="forms ">
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Stack gap={0.5} width={1}>
                <Typography variant="overline" color="text.primary" htmlFor="email" component={'label'}>First Name</Typography>
                <TextField
                  id="firstName"
                  fullWidth
                  autoComplete="firstName"
                  type="firstName"
                  {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BsPerson size={18} />
                      </InputAdornment>
                    )
                  }}
                />
              </Stack>
              <Stack gap={0.5} width={1}>
                <Typography variant="overline" color="text.primary" htmlFor="email" component={'label'}>Last Name</Typography>
                <TextField
                  id="lastName"
                  fullWidth
                  autoComplete="lastName"
                  type="lastName"
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BsPerson size={18} />
                      </InputAdornment>
                    )
                  }}
                />
              </Stack>
            </Stack>
            <Stack gap={0.5} width={1}>
              <Typography variant="overline" color="text.primary" htmlFor="email" component={'label'}>
                Email
              </Typography>
              <TextField
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

            <FormControlLabel
              control={<Checkbox checked={isTermsChecked} onChange={handleCheckboxChange} />}
              label={
                <Typography variant="body2" align="center" color="text.secondary">
                  By registering I agree with &nbsp;
                  <Link underline="always" color="text.primary" href="/info/termscondition" fontWeight={700}>
                    Term & Conditions
                  </Link>
                  &nbsp;and&nbsp;
                  <Link underline="always" color="text.primary" href="/info/termscondition" fontWeight={700}>
                    Privacy policy
                  </Link>
                  .
                </Typography>
              }
            />
            {showTermsError && (
              <Typography variant="caption" color="error">
                You must agree to the terms and privacy policy.
              </Typography>
            )}

            {error && (
              <FormHelperText
                error
                sx={{ mt: 2, fontSize: '1rem' }} // Increase font size here (default is ~0.75rem)
              >
                {error}
              </FormHelperText>
            )}

            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
              Sign Up
            </LoadingButton>
          </Stack>

        </Form>
      </FormikProvider>

      <Box
        gap={2} // Adds space between the buttons
        className="header signup-option"
      >
        <Button variant="outlined" >
          {/* onClick={() => socialLoginCall('google')} */}
          <Image src={gIcon} alt="icon" width={20} height={20} />
          &nbsp; Sign Up with Google
        </Button>
        {/* <Button variant="outlined" onClick={() => socialLoginCall('facebook')}>
          <Image src={fbIcon} alt="icon" width={20} height={20} />
          &nbsp; Sign Up with Facebook
        </Button> */}
      </Box>
      <Typography variant="subtitle2" mt={3} textAlign="center">
        Already have an account? &nbsp;
        <Link
          href={`/auth/login${router.query?.redirect ? '?redirect=' + router.query?.redirect : ''}`}
          component={RouterLink}
        >
          Sign In
        </Link>
      </Typography>
    </>
  );
}
