'use client';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

// yup
import * as Yup from 'yup';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// mui
import { TextField, Stack, InputAdornment, Typography, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// icons
import { IoMdMail } from 'react-icons/io';
// components
import useIsMountedRef from 'src/hooks/useIsMountedRef';
// api
import * as api from 'src/services';
import { useMutation } from 'react-query';
import { useRouter } from 'next-nprogress-bar';
// cookies
import { createCookies } from 'src/hooks/cookies';
// redux
import { useDispatch } from 'react-redux';
import { setLogin } from 'src/redux/slices/user';

export default function ForgetPasswordForm({ ...props }) {
  const { onSent, onGetEmail } = props;
  const isMountedRef = useIsMountedRef();
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const [emailData, setEmailData] = useState('');
  const redirect = '';
  const dispatch = useDispatch();
  const emailDataRef = useRef('');
  const [error, setError] = useState('');

  const { mutate } = useMutation(api.forgetPassword, {
    onSuccess: async (data) => {
      // onSent();
      toast.success('Email sent check inbox');
      setloading(false);

      // router.push(`/auth/verify-otp?email=${encodeURIComponent(emailData)}&origin=forgot&isEmail=true`);
      // router.push(`/auth/verify-otp?redirect=${redirect}&origin=forgot`);
      router.push(`/auth/verify-otp?origin=forgot&username=` + emailDataRef.current);
    },
    onError: (err) => {
      setError(err.response.data.message);

      const message = JSON.stringify(err.response.data.message);
      setloading(false);
      toast.error(message || 'Email incorrect please try again.');
    }
  });

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Enter valid email').required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      try {
        console.log('1' + values.email);
        setloading(true);
        //onGetEmail(values.email);
        emailDataRef.current = values.email;
        setEmailData(values.email);
        router.push(`/auth/verify-otp?origin=forgot&username=` + emailDataRef.current);

        // mutate({ username: values.email });
      } catch (error) {
        if (isMountedRef.current) {
          toast.error(error.message);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack gap={0.5} width={1}>
            <Typography variant="overline" color="text.primary" for="email" component={'label'}>
              Email
            </Typography>
            <TextField
              id="email"
              fullWidth
              type={'text'}
              {...getFieldProps('email')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoMdMail size={24} />
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>

          {error && (
            <FormHelperText
              error
              sx={{ mt: 2, fontSize: '1rem' }} // Increase font size here (default is ~0.75rem)
            >
              {error}
            </FormHelperText>
          )}

          <LoadingButton fullWidth size="large" mb={3} type="submit" variant="contained" loading={loading}>
            Send Code
          </LoadingButton>
        </Stack>
      </Form>
      {/* )} */}
    </FormikProvider>
  );
}
ForgetPasswordForm.propTypes = {
  onSent: PropTypes.func.isRequired,
  onGetEmail: PropTypes.func.isRequired
};
