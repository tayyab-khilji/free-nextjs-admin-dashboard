'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import * as api from 'src/services';
import { setLogin } from 'src/redux/slices/user';
import { createCookies } from 'src/hooks/cookies';
import { Stack, TextField, Typography, InputAdornment, FormControlLabel, Checkbox, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { BsPerson } from 'react-icons/bs';
import toast from 'react-hot-toast';
import useFcmToken from "src/hooks/notifications/useFCMToken";


export default function RegisterPhoneInfoForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [newCountryCode, setCountryCode] = useState('pk');

  const phoneRegExp = /^[1-9][0-9]{9,14}$/;
  const [phone, setPhone] = useState('');

  const { fcmToken } = useFcmToken();

  const LoginSchema = Yup.object().shape({
    name: Yup.string().max(50, 'Too long!').required('Full name is required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required')
  });

  const formik = useFormik({
    initialValues: {
      phone: '',
      countryCode: newCountryCode.toUpperCase(),
      name: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      mutate({
        phone: values.phone,
        countryCode: newCountryCode.toUpperCase(),
        name: values.name,
        deviceType: 'web',
        fcmToken
      });
    }
  });

  const { mutate } = useMutation(api.updateProfile, {
    onSuccess: async (data) => {
      dispatch(setLogin(data.user));
      // dispatch(setWishlist(data.user.wishlist));
      setLoading(false);

      router.push(`/auth/location-access`);
    },
    onError: (err) => {
      const message = JSON.stringify(err.response?.data?.message);
      toast.error(message ? JSON.parse(message) : 'Something went wrong!');
      setLoading(false);
    }
  });

  // Update Formik's 'phone' field with formatted number
  const handlePhoneChange = (number, countryData) => {
    const nationalNumber = number.replace(`${countryData.dialCode}`, '');
    setPhone(nationalNumber);
    setCountryCode(countryData.countryCode);
    formik.setFieldValue('phone', number); // Update Formik's phone field directly
  };

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} className="forms">
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Stack gap={0.5} width={1}>
              <Typography variant="overline" color="text.primary" htmlFor="name" component="label">
                Full Name
              </Typography>
              <TextField
                id="name"
                placeholder="Enter your name"
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
            <Typography variant="overline" color="text.primary" htmlFor="phone" component="label">
              Enter your mobile number
            </Typography>
            <PhoneInput
              id="phone"
              country="pk"
              enableAreaCodes={true}
              enableSearch={true}
              placeholder="Phone Number"
              copyNumbersOnly={true}
              onChange={handlePhoneChange}
              value={formik.values.phone} // Ensure Formik's phone field value is displayed
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

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            Next
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

