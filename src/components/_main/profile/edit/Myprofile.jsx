'use client';
// react
import { useMutation, useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
// icons
import { MdVerified } from 'react-icons/md';
// mui
import {
  Box,
  Grid,
  Card,
  Dialog,
  Stack,
  Button,
  TextField,
  Typography,
  FormHelperText,
  Skeleton,
  Divider
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit'; // Or use a React Icon: import { FaEdit } from 'react-icons/fa';

// component
import UploadAvatar from 'src/components/upload/UploadAvatar';
import countries from 'src/components/_main/checkout/countries.json';
// api
import * as api from 'src/services';
// yup
import * as Yup from 'yup';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// axios
import axios from 'axios';
// redux
import { setLogin } from 'src/redux/slices/user';
import { useSelector } from 'react-redux';
import ROLES from 'src/utils/userRoles';
import { BiBold } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { resetWishlist } from 'src/redux/slices/wishlist';

// redux
import { setLogout } from 'src/redux/slices/user';

// hooks
import { deleteCookies } from 'src/hooks/cookies';
import DeleteDialog from 'src/components/dialog/deleteAccount';

export default function Myprofile() {
  const { user: adminUser } = useSelector(({ user }) => user);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isLoading: profileLoading } = useQuery(['user-profile'], () => api.getProfile(), {
    onSuccess: ({ data }) => {
      setAvatarId(data?.cover?._id || null);
    }
  });

  const [loadingUpload, setLoadingUpload] = React.useState(false);
  const { mutate, isLoading: updateLoading } = useMutation(api.updateProfile, {
    onSuccess: (res) => {
      dispatch(setLogin(res.data));
      toast.success('Updated profile');
    }
  });
  const { mutate: avatarMutate, isLoading: avatarLoading } = useMutation(api.singleDeleteFile, {
    onSuccess: () => { },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });
  const isLoading = profileLoading;
  const user = data?.data || {};
  const [loading, setLoading] = React.useState(100);
  const [apicall, setApicall] = useState(false);
  const [open, setOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isEditableProfile, setIsEditableProfile] = useState(false);

  const [avatarId, setAvatarId] = React.useState(null);
  const callbackLoading = useCallback(
    (value) => {
      setLoading(value);
    },
    [setLoading]
  );

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name required'),
    email: Yup.string().required('Email required'),
    phoneNumber: Yup.string().required('Phone required')
    // gender: Yup.string().required('Gender required')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || user?.firstName || '',
      email: user?.email || '',
      photoURL: user?.cover?.url || '',
      phoneNumber: user?.phone || '',

      file: ''
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      const updatedData = {};

      if (values.name !== user.name) {
        updatedData.name = values.name;
      }
      if (values.phoneNumber !== user.phone) {
        updatedData.phone = values.phoneNumber;
      }
      if (values.email !== user.email) {
        updatedData.email = values.email;
      }

      if (Object.keys(updatedData).length === 0) {
        return;
      }

      mutate(updatedData);
    }
  });

  const { values, errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;
  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setLoadingUpload(true);
      setFieldValue('file', file);
      setFieldValue('photoURL', { ...file, preview: URL.createObjectURL(file) });
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'my-uploads');

      const config = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          callbackLoading(percentage);
        }
      };
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData,
          config
        )
        .then(({ data }) => {
          setFieldValue('cover', { _id: data.public_id, url: data.secure_url });
        })
        .then(() => {
          avatarId && avatarMutate(avatarId);
          setLoadingUpload(false);
        });
    }
  };

  React.useEffect(() => {
    if (!pathname.includes('dashboard') && adminUser?.role.includes(ROLES.ADMIN)) {
      router.push('/admin/settings');
      // toast("Admin can't access this page.", {
      //   duration: 6000
      // });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: ResendOTPMutate } = useMutation(api.resendOTP, {
    retry: false,
    onSuccess: async () => {
      toast.success('OTP resent');
      setVerifyLoading(false);
      router.push(`/auth/verify-otp`);
    },
    onError: () => {
      toast.error('Invalid OTP.');
      setVerifyLoading(false);
    }
  });

  const onVerifyAccount = () => {
    setVerifyLoading(true);
    ResendOTPMutate({ email: user.email });
  };

  const handleEditProfile = () => {
    if (isEditableProfile) {
      setIsEditableProfile(false);
      formik.handleSubmit();
    } else {
      setIsEditableProfile(true);
    }
  };

  useEffect(() => {
    if (apicall) {
      deleteCookies('token');
      dispatch(setLogout());
      setOpen(false);
      setTimeout(() => {
        location.href = '/auth/login';
      }, 1000);
    }
  }, [apicall]);

  const { mutate: deleteUserMutate, isLoading: deleteLoading } = useMutation(api.deleteUser, {
    onSuccess: (res) => { }
  });

  const handleDeleteAccount = () => {
    setOpen(true);
  };

  const onLogout = () => {
    setLogoutLoading(true);
    deleteCookies('token');
    dispatch(setLogout());
    dispatch(resetWishlist());
    setTimeout(() => {
      location.href = '/auth/login';
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Grid container spacing={3} mt={3}>
          <Grid className='profile' item xs={12} md={12}>
            <Card
              className="profileview"
              sx={{
                p: 3,
                '& .MuiTypography-root': { marginBottom: '8px !important' },

                '@media (max-width:640px)': { border: '0px  !important' }

              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Stack spacing={0.5} width="auto" sx={{ ml: 2 }}>
                  <Typography fontWeight="bold" variant="h5" color="text.primary">
                    My profile{' '}
                  </Typography>
                </Stack>
              </Box>
              <Divider />

              <Stack spacing={{ xs: 2 }} sx={{ ml: 2, mr: 2, mt: 2 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="body" color="text.primary" htmlFor="name" component={'label'}>
                      Full Name
                    </Typography>
                    <TextField
                      id="name"
                      fullWidth
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      disabled={!isEditableProfile}
                    />
                  </Stack>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="body" color="text.primary" htmlFor="last-name" component={'label'}>
                      Email
                    </Typography>
                    <TextField
                      id="email"
                      fullWidth
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      disabled={!isEditableProfile}
                    />
                  </Stack>
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="body" color="text.primary" htmlFor="phone" component={'label'}>
                      Phone
                    </Typography>
                    <TextField
                      fullWidth
                      id="phone"
                      {...getFieldProps('phoneNumber')}
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      inputProps={{ type: 'tel', maxLength: 10 }}
                      disabled={!isEditableProfile}
                    />
                  </Stack>

                  <Stack spacing={0.5} width={1}></Stack>
                </Stack>
              </Stack>

              <Box className="profile-action-buttons">
                <LoadingButton
                  variant="contained"
                  className="reset-button"
                // onClick={onLogout}
                >
                  Reset Password
                </LoadingButton>

                <LoadingButton
                  loading={updateLoading || avatarLoading || loadingUpload}
                  variant="contained"
                  className="edit-button"
                  onClick={handleEditProfile}
                >
                  {isEditableProfile ? 'Save Profile' : 'Edit Profile'}
                </LoadingButton>
              </Box>

              <Box className="deactivate-account-container">
                <Button onClick={handleDeleteAccount} variant="contained" className="deactivate-button">
                  Deactivate Account
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Dialog onClose={handleClose} open={open} maxWidth={'xs'}>
          <DeleteDialog
            onClose={handleClose}
            apicall={setApicall}
            endPoint="deleteVendor"
            type={'Account Deleted Successfully'}
            deleteMessage={'Are you sure you want to delete your Account?'}
          />
        </Dialog>
      </Form>
    </FormikProvider>
  );
}
