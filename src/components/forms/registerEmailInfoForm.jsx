'use client';
import { useState } from 'react';
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
  Checkbox
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// icons
import { BsEnvelope, BsKey, BsEyeSlash, BsEye, BsPerson } from 'react-icons/bs';
// hooks
import { createCookies } from 'src/hooks/cookies';
import { useRouter } from 'next/navigation';
import useFcmToken from "src/hooks/notifications/useFCMToken";


export default function RegisterEmailForm() {
  // const router = useRouter();
  const router = useRouter();

  const searchParam = useSearchParams();
  const redirect = searchParam.get('redirect');
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { fcmToken } = useFcmToken();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().max(50, 'Too long!').required('Full name is required'),
    email: Yup.string().email('Enter valid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password should be 8 characters or longer.'),
    confirmPassword: Yup.string()
      .required('Confirmation password is required')
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .min(8, 'Password should be 8 characters or longer.')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setloading(true);
      await mutate({
        ...values,
        deviceType: 'web',
        fcmToken
      });
    }
  });

  const { mutate } = useMutation(api.updateProfile, {
    onSuccess: async (data) => {
      await createCookies('token', data.token);
      setloading(false);
      dispatch(setLogin(data.user));
      // dispatch(setWishlist(data.user.wishlist));
      router.push(`/auth/location-access`);
    },
    onError: (err) => {
      const message = JSON.stringify(err.response.data.message);
      toast.error(message ? JSON.parse(message) : 'Something went wrong!');
      setloading(false);
    }
  });

  const { errors, touched, handleSubmit, values, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} className="forms ">
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Stack gap={0.5} width={1}>
              <Typography variant="overline" color="text.primary" htmlFor="name" component={'label'}>
                Full Name
              </Typography>
              <TextField
                id="name"
                fullWidth
                type="text"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
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
              Email Address
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
          <Stack gap={0.5} width={1}>
            <Typography variant="overline" color="text.primary" htmlFor="confirmPassword" component={'label'}>
              Confirm Password
            </Typography>
            <TextField
              id="confirmPassword"
              fullWidth
              autoComplete="current-password"
              type={showConfirmPassword ? 'text' : 'password'}
              {...getFieldProps('confirmPassword')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BsKey size={18} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                      {showConfirmPassword ? <BsEye size={18} /> : <BsEyeSlash size={18} />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            Next
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
