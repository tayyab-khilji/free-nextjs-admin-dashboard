// 'use client';
// // react
// import { useMutation, useQuery } from 'react-query';
// import React, { useEffect, useState } from 'react';
// import { useCallback } from 'react';
// import { toast } from 'react-hot-toast';
// import { usePathname } from 'next/navigation';
// import { useRouter } from 'next-nprogress-bar';
// // icons
// import { MdVerified } from 'react-icons/md';
// // mui
// import { Box, Grid, Card, Dialog, Stack, Button, TextField, Typography, FormHelperText, Skeleton } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// import EditIcon from '@mui/icons-material/Edit'; // Or use a React Icon: import { FaEdit } from 'react-icons/fa';

// // component
// import UploadAvatar from 'src/components/upload/UploadAvatar';
// // api
// import * as api from 'src/services';
// // yup
// import * as Yup from 'yup';
// // formik
// import { Form, FormikProvider, useFormik } from 'formik';
// // axios
// import axios from 'axios';
// // redux
// import { setLogin } from 'src/redux/slices/user';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';

// // redux
// import { setLogout } from 'src/redux/slices/user';

// // hooks
// import { deleteCookies } from 'src/hooks/cookies';

// export default function AccountGeneral() {
//   const { user: adminUser } = useSelector(({ user }) => user);
//   const pathname = usePathname();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { data, isLoading: profileLoading } = useQuery(['user-profile'], () => api.getProfile(), {
//     onSuccess: ({ data }) => {
//       setAvatarId(data?.cover?._id || null);
//     }
//   });

//   const [loadingUpload, setLoadingUpload] = React.useState(false);
//   const { mutate, isLoading: updateLoading } = useMutation(api.updateProfile, {
//     onSuccess: (res) => {
//       dispatch(setLogin(res.data));
//       toast.success('Updated profile');
//     }
//   });

//   const { mutate: avatarMutate, isLoading: avatarLoading } = useMutation(api.singleDeleteFile, {
//     onSuccess: () => { },
//     onError: (error) => {
//       toast.error(error.response.data.message);
//     }
//   });

//   const isLoading = profileLoading;
//   const user = data?.data || {};
//   const [loading, setLoading] = React.useState(100);
//   const [apicall, setApicall] = useState(false);

//   const [avatarId, setAvatarId] = React.useState(null);
//   const callbackLoading = useCallback(
//     (value) => {
//       setLoading(value);
//     },
//     [setLoading]
//   );

//   const UpdateUserSchema = Yup.object().shape({
//     name: Yup.string().required('Name required'),
//     apiKey: Yup.string().required('Api Key required')
//   });
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       name: user?.name || user?.firstName || '',
//       apiKey: user?.apiKey,
//       photoURL: user?.cover?.url || '',
//       file: ''
//     },

//     validationSchema: UpdateUserSchema,
//     onSubmit: async (values) => {

//       const updatedData = {};

//       if (values.name !== user.name) {
//         updatedData.name = values.name;
//       }

//       if (values.apiKey !== user.apiKey) {
//         updatedData.apiKey = values.apiKey;
//       }

//       if (Object.keys(updatedData).length === 0) {
//         // toast.error('No changes detected. Please update at least one field.');
//         return;
//       }

//       // mutate(updatedData);

//     }
//   });

//   const { values, errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;
//   const handleDrop = async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (file) {
//       setLoadingUpload(true);
//       setFieldValue('file', file);
//       setFieldValue('photoURL', { ...file, preview: URL.createObjectURL(file) });
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', 'my-uploads');

//       const config = {
//         onUploadProgress: (progressEvent) => {
//           const { loaded, total } = progressEvent;
//           const percentage = Math.floor((loaded * 100) / total);
//           callbackLoading(percentage);
//         }
//       };
//       await axios
//         .post(
//           `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//           formData,
//           config
//         )
//         .then(({ data }) => {
//           setFieldValue('cover', { _id: data.public_id, url: data.secure_url });
//         })
//         .then(() => {
//           avatarId && avatarMutate(avatarId);
//           setLoadingUpload(false);
//         });
//     }
//   };


//   const { mutate: ResendOTPMutate } = useMutation(api.resendOTP, {
//     retry: false,
//     onSuccess: async () => {
//       toast.success('OTP resent');
//       setVerifyLoading(false);
//       router.push(`/auth/verify-otp`);
//     },
//     onError: () => {
//       toast.error('Invalid OTP.');
//       setVerifyLoading(false);
//     }
//   });


//   const handleEditProfile = () => {
//     formik.handleSubmit();
//   };



//   return (
//     <FormikProvider value={formik}>
//       <Form autoComplete="off" noValidate>
//         <Grid container spacing={3} mt={1}>
//           <Grid item xs={12} md={12}>
//             <Card sx={{ p: 3, '& .MuiTypography-root': { marginBottom: '8px !important' } }}>
//               <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <Typography fontWeight="bold" variant="h5" color="text.primary">
//                   Account Details
//                 </Typography>
//               </Box>

//               <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <Box sx={{ py: 6, px: 3, textAlign: 'center' }}>
//                   {isLoading || avatarLoading || loadingUpload ? (
//                     <Stack alignItems="center">
//                       <Skeleton variant="circular" width={162} height={162} />
//                     </Stack>
//                   ) : (
//                     <UploadAvatar
//                       accept="image/*"
//                       file={values.photoURL}
//                       loading={loading}
//                       maxSize={3145728}
//                       error={Boolean(touched.photoURL && errors.photoURL)}
//                       caption={
//                         <Typography
//                           variant="caption"
//                           sx={{
//                             mt: 2,
//                             mx: 'auto',
//                             display: 'block',
//                             textAlign: 'center',
//                             color: 'text.secondary',
//                             mb: 1,
//                             position: 'relative',
//                             svg: {
//                               color: 'primary.main',
//                               position: 'absolute',
//                               top: '-123px',
//                               right: '33%',
//                               transform: 'translate(24%, -100%)'
//                             }
//                           }}
//                         >
//                           {user?.isVerified && <MdVerified size={24} />}
//                           Allowed *.jpeg, *.jpg, *.png, *.gif
//                         </Typography>
//                       }
//                     />
//                   )}
//                   <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
//                     {touched.photoURL && errors.photoURL}
//                   </FormHelperText>
//                 </Box>
//               </Box>

//               <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <Stack spacing={2} sx={{ width: '100%', maxWidth: '800px' }}>
//                   <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
//                     <Stack spacing={0.5} width={1}>
//                       <Typography variant="body" color="text.primary" htmlFor="name" component={'label'}>
//                         Full Name
//                       </Typography>
//                       <TextField
//                         id="name"
//                         fullWidth
//                         {...getFieldProps('name')}
//                         error={Boolean(touched.name && errors.name)}
//                         helperText={touched.name && errors.name}
//                       />
//                     </Stack>
//                   </Stack>
//                   <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
//                     <Stack spacing={0.5} width={1}>
//                       <Typography variant="body" color="text.primary" htmlFor="apiKey" component={'label'}>
//                         Api Key
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         id="apiKey"
//                         {...getFieldProps('apiKey')}
//                         error={Boolean(touched.apiKey && errors.apiKey)}
//                         helperText={touched.apiKey && errors.apiKey}
//                       />
//                     </Stack>
//                   </Stack>
//                 </Stack>
//               </Box>

//               <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
//                 <LoadingButton
//                   loading={updateLoading || avatarLoading || loadingUpload}
//                   variant="contained"
//                   sx={{
//                     borderRadius: '10px',
//                     padding: '8px 26px',
//                     textTransform: 'none',
//                     fontSize: '14px',
//                     width: '160px'
//                   }}
//                   onClick={handleEditProfile}
//                 >
//                   Save
//                 </LoadingButton>
//               </Box>
//             </Card>
//           </Grid>
//         </Grid>
//       </Form>
//     </FormikProvider>
//   );
// }


'use client';
import { useMutation, useQuery } from 'react-query';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { MdVerified } from 'react-icons/md';
import {
  Box,
  Grid,
  Card,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  Skeleton,
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff, LockReset } from '@mui/icons-material';
import UploadAvatar from 'src/components/upload/UploadAvatar';
import * as api from 'src/services';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import axios from 'axios';
import { setLogin } from 'src/redux/slices/user';
import { useSelector, useDispatch } from 'react-redux';

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

  const [loadingUpload, setLoadingUpload] = useState(false);
  const { mutate, isLoading: updateLoading } = useMutation(api.updateProfile, {
    onSuccess: (res) => {
      dispatch(setLogin(res.data));
      toast.success('Updated profile');
    }
  });

  const { mutate: avatarMutate, isLoading: avatarLoading } = useMutation(api.singleDeleteFile, {
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });

  const isLoading = profileLoading;
  const user = data?.data || {};
  const [loading, setLoading] = useState(100);
  const [avatarId, setAvatarId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [editProfile, setEditProfile] = React.useState(false);


  const callbackLoading = useCallback((value) => setLoading(value), []);

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name required'),
    apiKey: Yup.string().required('Api Key required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || user?.firstName || '',
      apiKey: user?.apiKey,
      password: '',
      photoURL: user?.cover?.url || '',
      file: ''
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      const updatedData = {};
      if (values.name !== user.name) updatedData.name = values.name;
      if (values.apiKey !== user.apiKey) updatedData.apiKey = values.apiKey;
      if (values.password) updatedData.password = values.password;

      if (Object.keys(updatedData).length === 0) return;
      mutate(updatedData);
    }
  });

  const { values, errors, touched, getFieldProps, setFieldValue } = formik;

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
          callbackLoading(Math.floor((loaded * 100) / total));
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


  const handleEditProfile = () => {
    setEditProfile(!editProfile);

    if (editProfile) {
      formik.handleSubmit();
    } else {
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} md={12}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                '& .MuiTypography-root': { marginBottom: '8px !important' }
              }}
            >
              {/* Header */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                <Typography fontWeight="bold" variant="h5" color="text.primary">
                  Account Details
                </Typography>
              </Box>
              <Divider />

              {/* Avatar Section */}

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ py: 6, px: 3, textAlign: 'center' }}>
                  {isLoading || avatarLoading || loadingUpload ? (
                    <Stack alignItems="center">
                      <Skeleton variant="circular" width={162} height={162} />
                    </Stack>
                  ) : (
                    <UploadAvatar
                      accept="image/*"
                      file={values.photoURL}
                      loading={loading}
                      maxSize={3145728}
                      error={Boolean(touched.photoURL && errors.photoURL)}
                      caption={
                        <Typography
                          variant="caption"
                          sx={{
                            mx: 'auto',
                            display: 'block',
                            textAlign: 'center',
                            color: 'text.secondary',
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
                        </Typography>
                      }
                    />
                  )}
                  <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                    {touched.photoURL && errors.photoURL}
                  </FormHelperText>
                </Box>
              </Box>

              {/* Input Fields */}
              <Stack spacing={2} sx={{ maxWidth: '800px', mx: 'auto' }}>
                {/* Full Name */}
                <Box>
                  <Typography variant="subtitle2" color="text.primary" htmlFor="name" component="label">
                    Full Name
                  </Typography>
                  <TextField
                    id="name"
                    fullWidth
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    disabled={!editProfile}
                  />
                </Box>

                {/* API Key */}
                <Box>
                  <Typography variant="subtitle2" color="text.primary" htmlFor="apiKey" component="label">
                    API Key
                  </Typography>
                  <TextField
                    fullWidth
                    id="apiKey"
                    {...getFieldProps('apiKey')}
                    error={Boolean(touched.apiKey && errors.apiKey)}
                    helperText={touched.apiKey && errors.apiKey}
                    disabled={!editProfile}
                  />
                </Box>

                {/* Password */}
                <Box>
                  <Typography variant="subtitle2" color="text.primary" htmlFor="password" component="label">
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    id="password"
                    value="********" // dummy password
                    disabled={true}
                  />
                  <Box sx={{ textAlign: 'right', mt: 1 }}>
                    <LoadingButton
                      size="small"
                      variant="outlined"
                      startIcon={<LockReset />}
                      sx={{ textTransform: 'none' }}
                      onClick={() => router.push('/settings/change-password')}
                    >
                      Change Password
                    </LoadingButton>
                  </Box>
                </Box>
              </Stack>

              {/* Save Button */}
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <LoadingButton
                  loading={updateLoading || avatarLoading || loadingUpload}
                  variant="contained"
                  sx={{
                    borderRadius: '10px',
                    padding: '10px 30px',
                    textTransform: 'none',
                    fontSize: '15px',
                    minWidth: '180px'
                  }}
                  onClick={handleEditProfile}
                >
                  {!editProfile ? 'Edit Details' : 'Save Changes'}
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
