'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import RouterLink from 'next/link';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';
import { setLogin } from 'src/redux/slices/user';
import { useMutation } from 'react-query';
import * as api from 'src/services';
import { Stack, Typography, Link, Button, Box, FormControlLabel, Checkbox, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { createCookies } from 'src/hooks/cookies';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import gIcon from '../../../public/images/svgs/g-icon.svg';
import fbIcon from '../../../public/images/svgs/Facebook.svg';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function RegisterPhoneForm() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const redirect = searchParam.get('redirect');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [newCountryCode, setCountryCode] = useState('pk');

  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [error, setError] = useState('');

  // Define phone validation using Yup
  const phoneRegExp = /^[1-9][0-9]{9,14}$/;
  const LoginSchema = Yup.object().shape({
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required')
  });

  const formik = useFormik({
    initialValues: {
      phone: '',
      countryCode: newCountryCode.toUpperCase(),
      role: 'user'
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      if (!isTermsChecked) {
        setShowTermsError(true);
        return;
      }
      setLoading(true);
      await mutate({
        phone: values.phone,
        countryCode: newCountryCode.toUpperCase(),
        role: 'user'
      });
    }
  });

  const handleCheckboxChange = (event) => {
    setIsTermsChecked(event.target.checked);
    if (event.target.checked) {
      setShowTermsError(false);
    }
  };

  const { mutate } = useMutation(api.signupWithPhone, {
    onSuccess: async (data) => {
      await createCookies('token', data.token);
      dispatch(setLogin(data.user)); // remove this line later
      toast.success('OTP sent to your phone number');
      setLoading(false);
      router.push(`/auth/verify-otp?origin=signup`);
    },
    onError: (err) => {
      const message = JSON.stringify(err.response?.data?.message || 'Something went wrong!');
      toast.error(message);
      setLoading(false);
      setError(err.response?.data?.message);
    }
  });

  const handlePhoneChange = (number, countryData) => {
    const nationalNumber = number.replace(`${countryData.dialCode}`, '');
    setPhone(nationalNumber);
    setCountryCode(countryData.countryCode);
    formik.setFieldValue('phone', nationalNumber); // Update Formik's value
  };

  const socialLoginCall = (type) => {
    const callbackURL = process.env.NEXTAUTH_URL;

    signIn(type, {
      callbackUrl: callbackURL + '/auth/register-phone'
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
      setLoading(false);

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
      setLoading(false);

      toast.error(err.response.data.message);
      setError(err.response.data.message);
    }
  });

  // const { data: session, status } = useSession();
  const { data: session, status } = useSession();
  const [sessionData, setSessionData] = useState(session);
  const [callAPISend, setCallAPI] = useState(session?.callAPI ?? false);

  console.log('Google Login 000', session?.user?.name + '=' + status + '=' + JSON.stringify(session));

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

        setLoading(true);
        SocialMutate({ token, authType }); // Programmatically trigger the mutation with token and type
      }
    }
  }, [session?.token]); // Run the effect whenever token or type change

  useEffect(() => {
    setSessionData(session);
  }, [session]);

  const { errors, touched, handleSubmit } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit} className="forms">
          <Stack spacing={3}>
            <Stack gap={0.5} width={1}>
              <Typography variant="overline" color="text.primary" component={'label'}>
                Enter your mobile number
              </Typography>
              <PhoneInput
                country={'pk'}
                enableAreaCodes={true}
                enableSearch={true}
                placeholder="Phone Number"
                copyNumbersOnly={true}
                onChange={handlePhoneChange}
                //   value={phone} // Set initial value
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true
                }}
                className={`phone-input ${touched.phone && errors.phone ? 'input-error' : ''}`}
              />
              {touched.phone && errors.phone && (
                <Typography variant="caption" color="error">
                  {errors.phone}
                </Typography>
              )}
            </Stack>

            <FormControlLabel
              control={<Checkbox checked={isTermsChecked} onChange={handleCheckboxChange} />}
              label={
                <Typography variant="body2" align="center" color="text.secondary">
                  By registering I agree with BuyHalalGoods&nbsp;
                  <Link underline="always" color="text.primary" href="/info/termscondition" fontWeight={700}>
                    Term &Conditions
                  </Link>
                  &nbsp;and&nbsp;
                  <Link underline="always" color="text.primary" href="/info/privacy-policy" fontWeight={700}>
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
              Sign up
            </LoadingButton>
          </Stack>

          <Typography variant="subtitle2" my={4} textAlign="center">
            Sign up using your &nbsp;
            <Link href="/auth/register" component={RouterLink}>
              email address
            </Link>
          </Typography>
        </Form>
      </FormikProvider>
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        mb={5} // Margin top and bottom for spacing
      >
        <Box flexGrow={1} height="1px" bgcolor="#CBD5E0" />
        <Typography
          variant="body1"
          px={2}
          color="text.secondary" // Optional: adjust text color
          fontWeight="bold"
        >
          Or
        </Typography>
        <Box flexGrow={1} height="1px" bgcolor="#CBD5E0" />
      </Box>
      <Box
        gap={2} // Adds space between the buttons
        className="header signup-option"
      >
        <Button variant="outlined" onClick={() => socialLoginCall('google')}>
          <Image src={gIcon} alt="icon" width={20} height={20} />
          &nbsp; Sign Up with Google
        </Button>
        {/* <Button variant="outlined" onClick={() => socialLoginCall('facebook')}>
          <Image src={fbIcon} alt="icon" width={20} height={20} />
          &nbsp; Sign Up with Facebook
        </Button> */}
      </Box>
      <Typography variant="subtitle2" my={4} textAlign="center">
        Already have an account? &nbsp;
        <Link href={`/auth/login`} component={RouterLink}>
          Sign In
        </Link>
      </Typography>
    </>
  );
}
