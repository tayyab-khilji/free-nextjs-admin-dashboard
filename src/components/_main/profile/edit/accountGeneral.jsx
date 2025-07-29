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
import { Box, Grid, Card, Dialog, Stack, Button, TextField, Typography, FormHelperText, Skeleton } from '@mui/material';
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

export default function AccountGeneral() {
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
    onSuccess: () => {},
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
      // gender: user?.gender || '',
      // about: user?.about || '',
      file: ''
      // cover: user?.cover,
      // city: user?.city || '',
      // state: user?.state || '',
      // country: user?.country || 'Andorra',
      // zip: user?.zip || ''
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      // const data = {
      //   name: values.name,
      //   email: values.email,
      //   // lastName: values.lastName,
      //   // fullName: values.firstName + ' ' + values.lastName,
      //   phone: values.phoneNumber
      //   // about: values.about,
      //   // gender: values.gender,
      //   // cover: values.cover,
      //   // address: values.address,
      //   // city: values.city,
      //   // state: values.state,
      //   // country: values.country,
      //   // zip: values.zip
      //   // photoURL: values.photoURL,
      // };

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
        // toast.error('No changes detected. Please update at least one field.');
        return;
      }

      mutate(updatedData);

      // mutate(data);
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
    formik.handleSubmit();
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
    onSuccess: (res) => {}
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
        {/* onSubmit={handleSubmit} */}
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3, '& .MuiTypography-root': { marginBottom: '8px !important' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Stack spacing={0.5} width="auto" sx={{ ml: 2 }}>
                  <Typography fontWeight="bold" variant="h5" color="text.primary">
                    Account Details
                  </Typography>
                </Stack>
              </Box>

              <Grid item xs={12} md={4}>
                <Box sx={{ py: 6, px: 3, ml: 0, textAlign: 'center' }}>
                  {isLoading || avatarLoading || loadingUpload ? (
                    <Stack alignItems="center">
                      <Skeleton variant="circular" width={162} height={162} />
                      <Skeleton variant="text" width={170} sx={{ mt: 1 }} />
                      <Skeleton variant="text" width={170} />
                    </Stack>
                  ) : (
                    <UploadAvatar
                      accept="image/*"
                      file={values.photoURL}
                      loading={loading}
                      maxSize={3145728}
                      onDrop={handleDrop}
                      error={Boolean(touched.photoURL && errors.photoURL)}
                      caption={
                        <>
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 2,
                              mx: 'auto',
                              display: 'block',
                              textAlign: 'center',
                              color: 'text.secondary',
                              mb: 1,
                              position: 'relative',
                              svg: {
                                color: 'primary.main',
                                position: 'absolute',
                                top: '-123px',
                                right: '33%',
                                transform: 'translate(24%, -100%)'
                              }
                            }}
                          >
                            {user?.isVerified && <MdVerified size={24} />}
                            Allowed *.jpeg, *.jpg, *.png, *.gif
                            {/* <br /> max size of {3145728} */}
                          </Typography>
                        </>
                      }
                    />
                  )}

                  <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                    {touched.photoURL && errors.photoURL}
                  </FormHelperText>
                </Box>
              </Grid>

              <Stack spacing={{ xs: 2 }} sx={{ ml: 2, mr: 2 }}>
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
                    />
                  </Stack>
                  <Stack spacing={0.5} width={1}></Stack>
                </Stack>
              </Stack>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, p: 2 }}>
                <LoadingButton
                  loading={logoutLoading}
                  variant="contained"
                  sx={{
                    width: '160px',
                    borderRadius: '10px',
                    padding: '8px 26px',
                    textTransform: 'none',
                    fontSize: '14px',
                    backgroundColor: 'red'
                  }}
                  onClick={onLogout}
                >
                  Log Out
                </LoadingButton>

                <LoadingButton
                  loading={updateLoading || avatarLoading || loadingUpload}
                  variant="contained"
                  sx={{
                    borderRadius: '10px',
                    padding: '8px 26px',
                    textTransform: 'none',
                    fontSize: '14px',
                    width: '160px'
                  }}
                  onClick={handleEditProfile}
                >
                  Save
                </LoadingButton>
              </Box>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button onClick={handleDeleteAccount} variant="contained" sx={{ backgroundColor: 'red' }}>
                  Deactivate Account
                </Button>
                {/* </Stack> */}
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
