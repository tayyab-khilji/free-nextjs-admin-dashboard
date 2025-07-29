// 'use client';
// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// // mui
// import {
//   Box,
//   ToggleButton,
//   ToggleButtonGroup,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Grid,
//   Stack,
//   TextField,
//   FormControl,
//   FormLabel,
//   Card,
//   Button,
//   CardHeader,
//   Divider,
//   IconButton
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// // countries
// import countries from '../_main/checkout/countries.json';
// import LoadingButton from '@mui/lab/LoadingButton';

// import { useRouter } from 'next-nprogress-bar';
// import { useDispatch, useSelector } from 'react-redux';
// import { useMutation } from 'react-query';
// // yup
// import * as Yup from 'yup';
// // formik
// import { useFormik, Form, FormikProvider } from 'formik';
// // api
// import * as api from 'src/services';
// import toast from 'react-hot-toast';
// // import DeleteIcon from '@mui/icons-material/Delete';
// import { RiDeleteBinLine } from 'react-icons/ri';

// const ADDRESS_OPTIONS = ['Home', 'Work', 'Shop', 'Other'];

// export default function AddressGuestForm({ currentAddress }) {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { user: userData } = useSelector(({ user }) => user);
//   const [isDefault, setIsDefault] = React.useState(currentAddress?.isDefault || false);
//   const [deleteAddressLoading, setDeleteAddressLoading] = React.useState(false);
//   const [addressLoading, setAddressLoading] = React.useState(false);

//   const [error, setError] = React.useState('');

//   const NewAddressSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     phoneNumber: Yup.string().required('Phone Number is required'),
//     addressLine1: Yup.string().required('Address is required'),
//     city: Yup.string().required('City is required'),
//     state: Yup.string().required('State is required'),
//     zip: Yup.string().min(5, 'ZipCode must be at least 5 digits').required('ZipCode is required'),
//     country: Yup.string().required('Country is required'),
//     countryCode: Yup.string().required('Country Code is required'),
//     stateCode: Yup.string().required('State Code is required')
//   });

//   // Define initial values
//   const formik = useFormik({
//     initialValues: {
//       addressType: currentAddress?.addressType || userData?.addressType || ADDRESS_OPTIONS[0],
//       addressLine1: currentAddress?.addressLine1 || userData?.addressLine1 || '',
//       addressLine2: currentAddress?.addressLine2 || userData?.addressLine2 || '',
//       apartment: currentAddress?.apartment || userData?.apartment || '',
//       city: currentAddress?.city || userData?.city || '',
//       state: currentAddress?.state || userData?.state || '',
//       stateCode: currentAddress?.stateCode || userData?.stateCode || '',
//       name: currentAddress?.name || userData?.name || '',
//       phoneNumber: currentAddress?.phoneNumber || userData?.phoneNumber || '',
//       zip: currentAddress?.zip || userData?.zip || '',
//       country: currentAddress?.country || userData?.country || 'United States',
//       countryCode: currentAddress?.countryCode || userData?.countryCode || 'US',
//       dogInstruction: currentAddress?.dogInstruction || null,
//       doorInstructions: currentAddress?.doorInstructions || 0,
//       saturdayInstruction: currentAddress?.saturdayInstruction || null,
//       sundayInstruction: currentAddress?.sundayInstruction || null,
//       deliveryInstructions: currentAddress?.deliveryInstructions || ''
//     },
//     enableReinitialize: true,
//     validationSchema: NewAddressSchema,
//     onSubmit: async (values) => {
//       console.log('checking values', values);
//       setAddressLoading(true);

//       // Prepare final payload
//       const transformedData = {
//         ...values,
//         isDefault: isDefault,
//         doorInstructions: getDoorInstructions(packageLocation),
//         dogInstruction: hasDog === 'Yes',
//         saturdayInstruction: weekendDelivery.saturday === 'Yes',
//         sundayInstruction: weekendDelivery.sunday === 'Yes'
//       };

//       if (currentAddress) mutateUpdateAddress({ _id: currentAddress?._id, ...transformedData });
//       else mutate(transformedData);
//     }
//   });

//   const [addressType, setAddressType] = useState(formik.initialValues.addressType || 'Home');

//   const [packageLocation, setPackageLocation] = useState(null);

//   // Map packageLocation to numeric code
//   const getDoorInstructions = (location) => {
//     switch (location) {
//       case 'Front Door':
//         return 1;
//       case 'Outside Garage':
//         return 2;
//       case 'No Preference':
//         return 3;
//       default:
//         return null; // or handle as needed
//     }
//   };

//   const [hasDog, setHasDog] = useState();

//   const [weekendDelivery, setWeekendDelivery] = useState({});

//   useEffect(() => {
//     setWeekendDelivery({
//       saturday:
//         (formik.initialValues.saturdayInstruction || currentAddress?.saturdayInstruction) === true
//           ? 'Yes'
//           : (formik.initialValues.saturdayInstruction || currentAddress?.saturdayInstruction) === false
//             ? 'No'
//             : '',
//       sunday:
//         (formik.initialValues.sundayInstruction || currentAddress?.saturdayInstruction) === true
//           ? 'Yes'
//           : (formik.initialValues.sundayInstruction || currentAddress?.saturdayInstruction) === false
//             ? 'No'
//             : ''
//     });

//     setHasDog(
//       (formik.initialValues.dogInstruction || currentAddress?.dogInstruction) === true
//         ? 'Yes'
//         : (formik.initialValues.dogInstruction || currentAddress?.dogInstruction) === false
//           ? 'No'
//           : ''
//     );

//     setPackageLocation(() => {
//       switch (formik.initialValues.doorInstructions || currentAddress?.doorInstructions) {
//         case 1:
//           return 'Front Door';
//         case 2:
//           return 'Outside Garage';
//         case 3:
//           return 'No Preference';
//         default:
//           return '';
//       }
//     });
//   }, [currentAddress]);

//   const handleSingleSelect = (value, setter) => {
//     setter((prev) => (prev === value ? '' : value));
//   };

//   const handleSetDefault = (event) => {
//     setIsDefault(event.target.checked);
//   };

//   const { mutate, isLoading } = useMutation(api.addNewAddress, {
//     onSuccess: (data) => {
//       toast.success(data.message);
//       setAddressLoading(false);

//       router.back();
//     },
//     onError: (err) => {
//       toast.error(err.response.data.message || 'Something went wrong');
//       setError(err.response.data.message);
//       setAddressLoading(false);
//     }
//   });

//   const { mutate: mutateUpdateAddress } = useMutation(api.updateAddress, {
//     onSuccess: (data) => {
//       toast.success(data.message);
//       setAddressLoading(false);

//       router.back();
//     },
//     onError: (err) => {
//       toast.error(err.response.data.message || 'Something went wrong');
//       setError(err.response.data.message);
//       setAddressLoading(false);
//     }
//   });

//   const { mutate: mutateDeleteAddress } = useMutation(api.deleteAddress, {
//     onSuccess: (data) => {
//       toast.success(data.message);
//       setDeleteAddressLoading(false);

//       router.back();
//     },
//     onError: (err) => {
//       toast.error(err.response.data.message || 'Something went wrong');
//       setDeleteAddressLoading(false);
//     }
//   });

//   const handleDeleteAddress = () => {
//     setDeleteAddressLoading(true);

//     mutateDeleteAddress({ _id: currentAddress?._id });
//   };

//   const handleCountryCodeChange = (event) => {
//     const newValue = event.target.value.toUpperCase(); // Capitalize directly
//     formik.setFieldValue('countryCode', newValue);
//   };

//   const { errors, values, touched, handleSubmit, getFieldProps, isValid } = formik;
//   const [showInstructions, setShowInstructions] = useState(false); // Initialize state to false

//   const toggleInstructions = () => {
//     setShowInstructions(!showInstructions); // Toggle the state
//   };
//   return (
//     <>
//       <FormikProvider value={formik}>
//         <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
//           <Card style={{ marginTop: '49px' }}>
//             <CardHeader
//               title={
//                 <Typography className="textaddress" variant="h4">
//                   {currentAddress ? 'Edit Your Delivery address' : 'Add New Delivery address'}
//                 </Typography>
//               }
//               action={
//                 // Place the entire Box component with the LoadingButton here
//                 <Box
//                   className="addaddress_btn delbtn"
//                   sx={{
//                     mt: 3,
//                     display: 'flex', // Add display: 'flex' to center the button in the Box
//                     justifyContent: 'center', // Center horizontally
//                     alignItems: 'center' // Center vertically
//                   }}
//                 >
//                   {currentAddress && (
//                     <LoadingButton
//                       variant="contained"
//                       color="error" // Use the default MUI error color (red)
//                       loading={deleteAddressLoading}
//                       sx={{
//                         // Make it a perfect circle
//                         width: '40px', // Set equal width and height
//                         height: '40px', // Set equal width and height
//                         minWidth: 'auto', // Override min-width to allow a smaller size
//                         borderRadius: '50%', // Make it a circle
//                         // Center the icon inside the button
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         // Optional: Remove padding if needed, but flexbox handles it well
//                         padding: 0,
//                         // Remove text-related styles as there is no text
//                         textTransform: 'none',
//                         fontSize: '13px',
//                         fontWeight: 500
//                       }}
//                       onClick={(e) => {
//                         handleDeleteAddress();
//                       }}
//                     >
//                       {/* Place the icon directly inside the button */}
//                       <RiDeleteBinLine fontSize={20} />
//                       {/* Removed the text "Delete Address" */}
//                     </LoadingButton>
//                   )}
//                 </Box>
//               }
//             />

//             <Divider sx={{ mt: 2 }} />
//             <Stack spacing={{ xs: 2, sm: 3 }} p={3} mt={1}>
//               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//                 <Stack spacing={0.5} width={1}>
//                   {/* <Typography variant="overline" color="text.primary" for="address" component={'label'}> */}
//                   <Typography variant="body1" color="text.primary" for="name" component={'label'}>
//                     Full Name *
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     placeholder="Enter full name"
//                     {...getFieldProps('name')}
//                     error={Boolean(touched.name && errors.name)}
//                     helperText={touched.name && errors.name}
//                   />
//                 </Stack>
//                 <Stack spacing={0.5} width={1}>
//                   <Typography variant="body1" color="text.primary" for="name" component={'label'}>
//                     Contact Number *
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     placeholder="Enter phone number"
//                     {...getFieldProps('phoneNumber')}
//                     error={Boolean(touched.phoneNumber && errors.phoneNumber)}
//                     helperText={touched.phoneNumber && errors.phoneNumber}
//                     inputProps={{ type: 'tel', maxLength: 10 }}
//                   />
//                 </Stack>
//               </Stack>

//               <Stack spacing={0.5} width={1}>
//                 {/* <Typography variant="overline" color="text.primary" for="address" component={'label'}> */}
//                 <Typography variant="body1" color="text.primary" for="addressLine1" component={'label'}>
//                   Address *
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="Enter your address"
//                   {...getFieldProps('addressLine1')}
//                   error={Boolean(touched.addressLine1 && errors.addressLine1)}
//                   helperText={touched.addressLine1 && errors.addressLine1}
//                 />
//               </Stack>
//               <Stack spacing={0.5} width={1} sx={{ mt: -3 }}>
//                 {/* direction={{ xs: 'column', sm: 'row' }} */}

//                 <TextField
//                   fullWidth
//                   {...getFieldProps('addressLine2')}
//                   placeholder="Apt, suite, unit, building, floor, etc"
//                 />
//               </Stack>
//               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//                 <Stack spacing={0.5} width={1}>
//                   <Typography variant="body1" color="text.primary" for="city" component={'label'}>
//                     City *
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     placeholder="Enter city"
//                     {...getFieldProps('city')}
//                     error={Boolean(touched.city && errors.city)}
//                     helperText={touched.city && errors.city}
//                   />
//                 </Stack>
//                 <Stack spacing={0.5} width={1}>
//                   <Typography variant="body1" color="text.primary" for="state" component={'label'}>
//                     State *
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     placeholder="Enter State"
//                     {...getFieldProps('state')}
//                     error={Boolean(touched.state && errors.state)}
//                     helperText={touched.state && errors.state}
//                   />
//                 </Stack>
//                 <Stack spacing={0.5} width={1}>
//                   <Typography variant="body1" color="text.primary" for="stateCode" component={'label'}>
//                     State Code *
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     placeholder="Enter state code"
//                     {...getFieldProps('stateCode')}
//                     inputProps={{ maxLength: 3 }}
//                     error={Boolean(touched.stateCode && errors.stateCode)}
//                     helperText={touched.stateCode && errors.stateCode}
//                   />
//                 </Stack>
//               </Stack>

//               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//                 <Stack spacing={0.5} width={1}>
//                   <Typography variant="body1" color="text.primary" for="zipCode" component={'label'}>
//                     Zip Code *
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     placeholder="Enter zip code"
//                     {...getFieldProps('zip')}
//                     error={Boolean(touched.zip && errors.zip)}
//                     helperText={touched.zip && errors.zip}
//                     onInput={(e) => {
//                       if (e.target.value.length > 9) {
//                         e.target.value = e.target.value.slice(0, 9); // Truncate input to 9 digits
//                       }
//                     }}
//                   />
//                 </Stack>
//                 <Stack spacing={0.5} width={1}>
//                   <Typography variant="body1" color="text.primary" for="country" component={'label'}>
//                     Country *
//                   </Typography>
//                   <TextField
//                     select
//                     placeholder="Country"
//                     {...getFieldProps('country')}
//                     SelectProps={{ native: true }}
//                     error={Boolean(touched.country && errors.country)}
//                     helperText={touched.country && errors.country}
//                   >
//                     {countries.map((option) => (
//                       <option key={option.code} value={option.label}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </TextField>
//                 </Stack>
//                 <Stack spacing={0.5} width={1}>
//                   <Typography variant="body1" color="text.primary" for="countryCode" component={'label'}>
//                     Country Code *
//                   </Typography>

//                   <TextField
//                     fullWidth
//                     {...getFieldProps('countryCode')} // Use getFieldProps
//                     inputProps={{ maxLength: 3 }}
//                     error={Boolean(touched.countryCode && errors.countryCode)}
//                     helperText={touched.countryCode && errors.countryCode}
//                   />
//                 </Stack>
//               </Stack>
//               <Box>
//                 {/* Address Type Selector */}

//                 <Stack spacing={0.5} width={1}>
//                   <Typography variant="body1" color="text.primary" component={'label'}>
//                     Property Type:{' '}
//                     <Typography component="span" sx={{ fontWeight: 'bold', color: 'green' }}>
//                       {formik.values.addressType}
//                     </Typography>
//                   </Typography>
//                   <Box display="flex" gap={2} mb={3}>
//                     {ADDRESS_OPTIONS.map((type) => (
//                       <Button
//                         key={type}
//                         variant="outlined"
//                         onClick={() => formik.setFieldValue('addressType', type)}
//                         sx={{
//                           borderRadius: '999px',
//                           textTransform: 'none',
//                           backgroundColor: formik.values.addressType === type ? '#e6f4ea' : 'white',
//                           color: formik.values.addressType === type ? '#2e7d32' : '#000',
//                           borderColor: formik.values.addressType === type ? '#2e7d32' : '#ccc',
//                           '&:hover': {
//                             backgroundColor: '#f1f8f5'
//                           },
//                           flex: 1
//                         }}
//                       >
//                         {type}
//                       </Button>
//                     ))}
//                   </Box>
//                 </Stack>

//                 <FormControlLabel
//                   sx={{ mt: 2 }}
//                   control={<Checkbox onChange={handleSetDefault} checked={isDefault} />}
//                   label="Make this my default address"
//                 />
//                 <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                     {' '}
//                     {/* Adjusted for better layout */}
//                     <div onClick={toggleInstructions}>
//                       <h4>Delivery Instructions (Optional)</h4>

//                       <div style={{ display: 'flex', cursor: 'pointer' }}>
//                         <p style={{ margin: 0, fontSize: '14px' }}>Add preferences, notes, access codes and more</p>{' '}
//                         <ExpandMoreIcon
//                           style={{
//                             marginLeft: '6px',
//                             height: '18px', // Adjust size as needed
//                             width: '18px', // Adjust size as needed
//                             transition: 'transform 0.3s ease-in-out', // Smooth rotation
//                             transform: showInstructions ? 'rotate(180deg)' : 'rotate(0deg)' // Rotate based on state
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {showInstructions && ( // Conditionally render the content
//                     <div style={{ fontSize: '13.5px', marginTop: '10px' }}>
//                       {' '}
//                       {/* Added margin for spacing */}
//                       <Accordion
//                         disableGutters
//                         elevation={0}
//                         sx={{
//                           mb: 2,
//                           borderRadius: 1,
//                           overflow: 'hidden',
//                           border: '1px solid #e0e0e0',
//                           mt: 2
//                         }}
//                       >
//                         <AccordionSummary
//                           expandIcon={<ExpandMoreIcon />}
//                           sx={{
//                             backgroundColor: '#CBD5E0',
//                             minHeight: 56,
//                             '&.Mui-expanded': { minHeight: 56 }
//                           }}
//                         >
//                           <Typography className="accordian_text" fontWeight="bold">
//                             Where Should We Leave Your Package At This Address?
//                           </Typography>
//                         </AccordionSummary>
//                         <AccordionDetails sx={{ backgroundColor: '#fff' }}>
//                           <Box display="flex" gap={2}>
//                             {['Front Door', 'Outside Garage', 'No Preference'].map((option) => (
//                               <FormControlLabel
//                                 key={option}
//                                 control={
//                                   <Checkbox
//                                     checked={packageLocation === option}
//                                     onChange={() => {
//                                       setPackageLocation(option);
//                                       formik.setFieldValue('doorInstructions', getDoorInstructions(option));
//                                     }}
//                                   />
//                                 }
//                                 label={option}
//                               />
//                             ))}
//                           </Box>
//                         </AccordionDetails>
//                       </Accordion>
//                       <Accordion
//                         disableGutters
//                         elevation={0}
//                         sx={{
//                           mb: 2,
//                           borderRadius: 1,
//                           overflow: 'hidden',
//                           border: '1px solid #e0e0e0'
//                         }}
//                       >
//                         <AccordionSummary
//                           expandIcon={<ExpandMoreIcon />}
//                           sx={{
//                             backgroundColor: '#CBD5E0',
//                             minHeight: 56,
//                             '&.Mui-expanded': { minHeight: 56 }
//                           }}
//                         >
//                           <Typography className="accordian_text" fontWeight="bold">
//                             Do You Have A Dog At This Address
//                           </Typography>
//                         </AccordionSummary>
//                         <AccordionDetails sx={{ backgroundColor: '#fff' }}>
//                           <Box display="flex" gap={2}>
//                             {['Yes', 'No'].map((option) => (
//                               <FormControlLabel
//                                 key={option}
//                                 control={
//                                   <Checkbox
//                                     checked={hasDog === option}
//                                     onChange={() => {
//                                       setHasDog(option);
//                                       formik.setFieldValue('dogInstruction', option === 'Yes');
//                                     }}
//                                   />
//                                 }
//                                 label={option}
//                               />
//                             ))}
//                           </Box>
//                         </AccordionDetails>
//                       </Accordion>
//                       <Accordion
//                         disableGutters
//                         elevation={0}
//                         sx={{
//                           mb: 2,
//                           borderRadius: 1,
//                           overflow: 'hidden',
//                           border: '1px solid #e0e0e0'
//                         }}
//                       >
//                         <AccordionSummary
//                           expandIcon={<ExpandMoreIcon />}
//                           sx={{
//                             backgroundColor: '#CBD5E0',
//                             minHeight: 56,
//                             '&.Mui-expanded': { minHeight: 56 }
//                           }}
//                         >
//                           <Typography className="accordian_text" fontWeight="bold">
//                             Can We Deliver On This Address On Weekends?
//                           </Typography>
//                         </AccordionSummary>
//                         <AccordionDetails sx={{ backgroundColor: '#fff' }}>
//                           <Grid container spacing={2}>
//                             {['Saturday', 'Sunday'].map((day) => (
//                               <Grid item xs={6} key={day}>
//                                 <Typography fontWeight="bold">{day}</Typography>
//                                 {['Yes', 'No'].map((option) => (
//                                   <FormControlLabel
//                                     key={option}
//                                     control={
//                                       <Checkbox
//                                         checked={weekendDelivery[day.toLowerCase()] === option}
//                                         onChange={() => {
//                                           setWeekendDelivery((prev) => ({
//                                             ...prev,
//                                             [day.toLowerCase()]: option
//                                           }));
//                                           formik.setFieldValue(`${day.toLowerCase()}Instruction`, option === 'Yes');
//                                         }}
//                                       />
//                                     }
//                                     label={option}
//                                   />
//                                 ))}
//                               </Grid>
//                             ))}
//                           </Grid>
//                         </AccordionDetails>
//                       </Accordion>
//                       <Stack spacing={0.5} width={1}>
//                         <Typography
//                           style={{ fontWeight: 'bold' }}
//                           variant="body1"
//                           for="addressType"
//                           component={'label'}
//                         >
//                           Delivery Instructions
//                         </Typography>
//                         <TextField
//                           fullWidth
//                           multiline
//                           placeholder="Enter deliver instructions "
//                           rows={8}
//                           id="deliveryInstructions"
//                           {...getFieldProps('deliveryInstructions')}
//                           type="text"
//                         />
//                       </Stack>
//                       {error && (
//                         <Typography variant="body1" color="error" for="addressType" component={'label'}>
//                           {error}
//                         </Typography>
//                       )}
//                       <Typography style={{ marginTop: '10px' }} variant="body2">
//                         Your instructions help us deliver your packages to your expectations and will be used when
//                         possible.
//                       </Typography>
//                     </div>
//                   )}
//                 </div>
//               </Box>
//             </Stack>

//             <Box
//               className="addaddress_btn"
//               sx={{
//                 display: 'flex',
//                 mt: 3,
//                 gap: '10px', // Adjust gap as needed for precise Figma match
//                 alignItems: 'center', // Vertically align items
//                 justifyContent: 'space-between'
//               }}
//             >
//               {currentAddress && (
//                 <LoadingButton
//                   className="deletebtn"
//                   variant="contained"
//                   color="error"
//                   startIcon={<RiDeleteBinLine />}
//                   loading={deleteAddressLoading}
//                   sx={{
//                     borderRadius: '100px',
//                     textTransform: 'none',
//                     fontSize: '13px',
//                     fontWeight: 500,
//                     width: '150px',
//                     marginLeft: '20px'
//                   }}
//                   onClick={(e) => {
//                     handleDeleteAddress();
//                   }}
//                 >
//                   Delete Address
//                 </LoadingButton>
//               )}
//             </Box>

//             <div
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px',
//                 justifyContent: 'end',
//                 marginTop: '-58px',
//                 paddingRight: '20px',
//                 paddingBottom: '20px'
//               }}
//             >
//               <div
//                 style={{
//                   cursor: 'pointer',
//                   fontSize: '13px',
//                   fontWeight: 500,
//                   color: '#3f51b5' /* or your theme's primary color for link-like appearance */
//                 }}
//               >
//                 Cancel
//               </div>

//               <LoadingButton
//                 variant="contained"
//                 type="submit"
//                 loading={addressLoading}
//                 sx={{
//                   width: '150px', // Maintain consistent width for buttons
//                   borderRadius: '100px',
//                   fontSize: '13px'
//                 }}
//               >
//                 {currentAddress ? 'Update Address' : 'Add Address'}{' '}
//               </LoadingButton>
//             </div>
//           </Card>
//         </Form>
//       </FormikProvider>
//     </>
//   );
// }

// AddressGuestForm.propTypes = {
//   // getFieldProps: PropTypes.func.isRequired,
//   // touched: PropTypes.object.isRequired,
//   // errors: PropTypes.object.isRequired,
//   currentAddress: PropTypes.object.isRequired
// };

'use client';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
// mui
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Stack,
  TextField,
  FormControl,
  FormLabel,
  Card,
  Button,
  CardHeader,
  Divider,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// countries
import countries from '../_main/checkout/countries.json';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'next-nprogress-bar';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
// yup
import * as Yup from 'yup';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// api
import * as api from 'src/services';
// import DeleteIcon from '@mui/icons-material/Delete';
import { RiDeleteBinLine } from 'react-icons/ri';

const ADDRESS_OPTIONS = ['Home', 'Work', 'Shop', 'Other'];

export default function AddressGuestForm({ currentAddress }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user: userData } = useSelector(({ user }) => user);
  const [isDefault, setIsDefault] = React.useState(currentAddress?.isDefault || false);
  const [deleteAddressLoading, setDeleteAddressLoading] = React.useState(false);
  const [addressLoading, setAddressLoading] = React.useState(false);

  const [error, setError] = React.useState('');

  const NewAddressSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    addressLine1: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string().min(5, 'ZipCode must be at least 5 digits').required('ZipCode is required'),
    country: Yup.string().required('Country is required'),
    countryCode: Yup.string().required('Country Code is required'),
    stateCode: Yup.string().required('State Code is required')
  });

  // Define initial values
  const formik = useFormik({
    initialValues: {
      addressType: currentAddress?.addressType || userData?.addressType || ADDRESS_OPTIONS[0],
      addressLine1: currentAddress?.addressLine1 || userData?.addressLine1 || '',
      addressLine2: currentAddress?.addressLine2 || userData?.addressLine2 || '',
      apartment: currentAddress?.apartment || userData?.apartment || '',
      city: currentAddress?.city || userData?.city || '',
      state: currentAddress?.state || userData?.state || '',
      stateCode: currentAddress?.stateCode || userData?.stateCode || '',
      name: currentAddress?.name || userData?.name || '',
      phoneNumber: currentAddress?.phoneNumber || userData?.phoneNumber || '',
      zip: currentAddress?.zip || userData?.zip || '',
      country: currentAddress?.country || userData?.country || 'United States',
      countryCode: currentAddress?.countryCode || userData?.countryCode || 'US',
      dogInstruction: currentAddress?.dogInstruction || null,
      doorInstructions: currentAddress?.doorInstructions || 0,
      saturdayInstruction: currentAddress?.saturdayInstruction || null,
      sundayInstruction: currentAddress?.sundayInstruction || null,
      deliveryInstructions: currentAddress?.deliveryInstructions || ''
    },
    enableReinitialize: true,
    validationSchema: NewAddressSchema,
    onSubmit: async (values) => {
      console.log('checking values', values);
      setAddressLoading(true);

      // Prepare final payload
      const transformedData = {
        ...values,
        isDefault: isDefault,
        doorInstructions: getDoorInstructions(packageLocation),
        dogInstruction: hasDog === 'Yes',
        saturdayInstruction: weekendDelivery.saturday === 'Yes',
        sundayInstruction: weekendDelivery.sunday === 'Yes'
      };

      if (currentAddress) mutateUpdateAddress({ _id: currentAddress?._id, ...transformedData });
      else mutate(transformedData);
    }
  });

  const [addressType, setAddressType] = useState(formik.initialValues.addressType || 'Home');

  const [packageLocation, setPackageLocation] = useState(null);

  // Map packageLocation to numeric code
  const getDoorInstructions = (location) => {
    switch (location) {
      case 'Front Door':
        return 1;
      case 'Outside Garage':
        return 2;
      case 'No Preference':
        return 3;
      default:
        return null; // or handle as needed
    }
  };

  const [hasDog, setHasDog] = useState();

  const [weekendDelivery, setWeekendDelivery] = useState({});

  useEffect(() => {
    setWeekendDelivery({
      saturday:
        (formik.initialValues.saturdayInstruction || currentAddress?.saturdayInstruction) === true
          ? 'Yes'
          : (formik.initialValues.saturdayInstruction || currentAddress?.saturdayInstruction) === false
            ? 'No'
            : '',
      sunday:
        (formik.initialValues.sundayInstruction || currentAddress?.saturdayInstruction) === true
          ? 'Yes'
          : (formik.initialValues.sundayInstruction || currentAddress?.saturdayInstruction) === false
            ? 'No'
            : ''
    });

    setHasDog(
      (formik.initialValues.dogInstruction || currentAddress?.dogInstruction) === true
        ? 'Yes'
        : (formik.initialValues.dogInstruction || currentAddress?.dogInstruction) === false
          ? 'No'
          : ''
    );

    setPackageLocation(() => {
      switch (formik.initialValues.doorInstructions || currentAddress?.doorInstructions) {
        case 1:
          return 'Front Door';
        case 2:
          return 'Outside Garage';
        case 3:
          return 'No Preference';
        default:
          return '';
      }
    });
  }, [currentAddress]);

  const handleSingleSelect = (value, setter) => {
    setter((prev) => (prev === value ? '' : value));
  };

  const handleSetDefault = (event) => {
    setIsDefault(event.target.checked);
  };

  const { mutate, isLoading } = useMutation(api.addNewAddress, {
    onSuccess: (data) => {
      toast.success(data.message);
      setAddressLoading(false);

      router.back();
    },
    onError: (err) => {
      toast.error(err.response.data.message || 'Something went wrong');
      setError(err.response.data.message);
      setAddressLoading(false);
    }
  });

  const { mutate: mutateUpdateAddress } = useMutation(api.updateAddress, {
    onSuccess: (data) => {
      toast.success(data.message);
      setAddressLoading(false);

      router.back();
    },
    onError: (err) => {
      toast.error(err.response.data.message || 'Something went wrong');
      setError(err.response.data.message);
      setAddressLoading(false);
    }
  });

  const { mutate: mutateDeleteAddress } = useMutation(api.deleteAddress, {
    onSuccess: (data) => {
      toast.success(data.message);
      setDeleteAddressLoading(false);

      router.back();
    },
    onError: (err) => {
      toast.error(err.response.data.message || 'Something went wrong');
      setDeleteAddressLoading(false);
    }
  });

  const handleDeleteAddress = () => {
    // Logic to prevent deletion of default address
    if (currentAddress?.isDefault) {
      toast.error('Default address cannot be deleted. Set another address as default, then you can delete this.');
      return;
    }

    setDeleteAddressLoading(true);
    mutateDeleteAddress({ _id: currentAddress?._id });
  };

  const handleCountryCodeChange = (event) => {
    const newValue = event.target.value.toUpperCase(); // Capitalize directly
    formik.setFieldValue('countryCode', newValue);
  };

  const { errors, values, touched, handleSubmit, getFieldProps, isValid } = formik;
  const [showInstructions, setShowInstructions] = useState(false); // Initialize state to false

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions); // Toggle the state
  };
  return (
    <>
      <ToastContainer />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card style={{ marginTop: '49px' }}>
            <CardHeader
              title={
                <Typography className="textaddress" variant="h4">
                  {currentAddress ? 'Edit Your Delivery address' : 'Add New Delivery address'}
                </Typography>
              }
              action={
                // Place the entire Box component with the LoadingButton here
                <Box
                  className="addaddress_btn delbtn"
                  sx={{
                    mt: 3,
                    display: 'flex', // Add display: 'flex' to center the button in the Box
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center' // Center vertically
                  }}
                >
                  {currentAddress && (
                    <LoadingButton
                      variant="contained"
                      color="error" // Use the default MUI error color (red)
                      loading={deleteAddressLoading}
                      sx={{
                        // Make it a perfect circle
                        width: '40px', // Set equal width and height
                        height: '40px', // Set equal width and height
                        minWidth: 'auto', // Override min-width to allow a smaller size
                        borderRadius: '50%', // Make it a circle
                        // Center the icon inside the button
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // Optional: Remove padding if needed, but flexbox handles it well
                        padding: 0,
                        // Remove text-related styles as there is no text
                        textTransform: 'none',
                        fontSize: '13px',
                        fontWeight: 500
                      }}
                      onClick={(e) => {
                        handleDeleteAddress();
                      }}
                    >
                      {/* Place the icon directly inside the button */}
                      <RiDeleteBinLine fontSize={20} />
                      {/* Removed the text "Delete Address" */}
                    </LoadingButton>
                  )}
                </Box>
              }
            />

            <Divider sx={{ mt: 2 }} />
            <Stack spacing={{ xs: 2, sm: 3 }} p={3} mt={1}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Stack spacing={0.5} width={1}>
                  {/* <Typography variant="overline" color="text.primary" for="address" component={'label'}> */}
                  <Typography variant="body1" color="text.primary" for="name" component={'label'}>
                    Full Name *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter full name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>
                <Stack spacing={0.5} width={1}>
                  <Typography variant="body1" color="text.primary" for="name" component={'label'}>
                    Contact Number *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter phone number"
                    {...getFieldProps('phoneNumber')}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    inputProps={{ type: 'tel', maxLength: 10 }}
                  />
                </Stack>
              </Stack>

              <Stack spacing={0.5} width={1}>
                {/* <Typography variant="overline" color="text.primary" for="address" component={'label'}> */}
                <Typography variant="body1" color="text.primary" for="addressLine1" component={'label'}>
                  Address *
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter your address"
                  {...getFieldProps('addressLine1')}
                  error={Boolean(touched.addressLine1 && errors.addressLine1)}
                  helperText={touched.addressLine1 && errors.addressLine1}
                />
              </Stack>
              <Stack spacing={0.5} width={1} sx={{ mt: -3 }}>
                {/* direction={{ xs: 'column', sm: 'row' }} */}

                <TextField
                  fullWidth
                  {...getFieldProps('addressLine2')}
                  placeholder="Apt, suite, unit, building, floor, etc"
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Stack spacing={0.5} width={1}>
                  <Typography variant="body1" color="text.primary" for="city" component={'label'}>
                    City *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter city"
                    {...getFieldProps('city')}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Stack>
                <Stack spacing={0.5} width={1}>
                  <Typography variant="body1" color="text.primary" for="state" component={'label'}>
                    State *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter State"
                    {...getFieldProps('state')}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                  />
                </Stack>
                <Stack spacing={0.5} width={1}>
                  <Typography variant="body1" color="text.primary" for="stateCode" component={'label'}>
                    State Code *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter state code"
                    {...getFieldProps('stateCode')}
                    inputProps={{ maxLength: 3 }}
                    error={Boolean(touched.stateCode && errors.stateCode)}
                    helperText={touched.stateCode && errors.stateCode}
                  />
                </Stack>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Stack spacing={0.5} width={1}>
                  <Typography variant="body1" color="text.primary" for="zipCode" component={'label'}>
                    Zip Code *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter zip code"
                    {...getFieldProps('zip')}
                    error={Boolean(touched.zip && errors.zip)}
                    helperText={touched.zip && errors.zip}
                    onInput={(e) => {
                      if (e.target.value.length > 9) {
                        e.target.value = e.target.value.slice(0, 9); // Truncate input to 9 digits
                      }
                    }}
                  />
                </Stack>
                <Stack spacing={0.5} width={1}>
                  <Typography variant="body1" color="text.primary" for="country" component={'label'}>
                    Country *
                  </Typography>
                  <TextField
                    select
                    placeholder="Country"
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>
                <Stack spacing={0.5} width={1}>
                  <Typography variant="body1" color="text.primary" for="countryCode" component={'label'}>
                    Country Code *
                  </Typography>

                  <TextField
                    fullWidth
                    {...getFieldProps('countryCode')} // Use getFieldProps
                    inputProps={{ maxLength: 3 }}
                    error={Boolean(touched.countryCode && errors.countryCode)}
                    helperText={touched.countryCode && errors.countryCode}
                  />
                </Stack>
              </Stack>
              <Box>
                {/* Address Type Selector */}

                <Stack spacing={0.5} width={1}>
                  <Typography variant="body1" color="text.primary" component={'label'}>
                    Property Type:{' '}
                    <Typography component="span" sx={{ fontWeight: 'bold', color: 'green' }}>
                      {formik.values.addressType}
                    </Typography>
                  </Typography>
                  <Box display="flex" gap={2} mb={3}>
                    {ADDRESS_OPTIONS.map((type) => (
                      <Button
                        key={type}
                        variant="outlined"
                        onClick={() => formik.setFieldValue('addressType', type)}
                        sx={{
                          borderRadius: '999px',
                          textTransform: 'none',
                          backgroundColor: formik.values.addressType === type ? '#e6f4ea' : 'white',
                          color: formik.values.addressType === type ? '#2e7d32' : '#000',
                          borderColor: formik.values.addressType === type ? '#2e7d32' : '#ccc',
                          '&:hover': {
                            backgroundColor: '#f1f8f5'
                          },
                          flex: 1
                        }}
                      >
                        {type}
                      </Button>
                    ))}
                  </Box>
                </Stack>

                <FormControlLabel
                  sx={{ mt: 2 }}
                  control={<Checkbox onChange={handleSetDefault} checked={isDefault} />}
                  label="Make this my default address"
                />
                <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {' '}
                    {/* Adjusted for better layout */}
                    <div onClick={toggleInstructions}>
                      <h4>Delivery Instructions (Optional)</h4>

                      <div style={{ display: 'flex', cursor: 'pointer' }}>
                        <p style={{ margin: 0, fontSize: '14px' }}>Add preferences, notes, access codes and more</p>{' '}
                        <ExpandMoreIcon
                          style={{
                            marginLeft: '6px',
                            height: '18px', // Adjust size as needed
                            width: '18px', // Adjust size as needed
                            transition: 'transform 0.3s ease-in-out', // Smooth rotation
                            transform: showInstructions ? 'rotate(180deg)' : 'rotate(0deg)' // Rotate based on state
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {showInstructions && ( // Conditionally render the content
                    <div style={{ fontSize: '13.5px', marginTop: '10px' }}>
                      {' '}
                      {/* Added margin for spacing */}
                      <Accordion
                        disableGutters
                        elevation={0}
                        sx={{
                          mb: 2,
                          borderRadius: 1,
                          overflow: 'hidden',
                          border: '1px solid #e0e0e0',
                          mt: 2
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          sx={{
                            backgroundColor: '#CBD5E0',
                            minHeight: 56,
                            '&.Mui-expanded': { minHeight: 56 }
                          }}
                        >
                          <Typography className="accordian_text" fontWeight="bold">
                            Where Should We Leave Your Package At This Address?
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ backgroundColor: '#fff' }}>
                          <Box display="flex" gap={2}>
                            {['Front Door', 'Outside Garage', 'No Preference'].map((option) => (
                              <FormControlLabel
                                key={option}
                                control={
                                  <Checkbox
                                    checked={packageLocation === option}
                                    onChange={() => {
                                      setPackageLocation(option);
                                      formik.setFieldValue('doorInstructions', getDoorInstructions(option));
                                    }}
                                  />
                                }
                                label={option}
                              />
                            ))}
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        disableGutters
                        elevation={0}
                        sx={{
                          mb: 2,
                          borderRadius: 1,
                          overflow: 'hidden',
                          border: '1px solid #e0e0e0'
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          sx={{
                            backgroundColor: '#CBD5E0',
                            minHeight: 56,
                            '&.Mui-expanded': { minHeight: 56 }
                          }}
                        >
                          <Typography className="accordian_text" fontWeight="bold">
                            Do You Have A Dog At This Address
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ backgroundColor: '#fff' }}>
                          <Box display="flex" gap={2}>
                            {['Yes', 'No'].map((option) => (
                              <FormControlLabel
                                key={option}
                                control={
                                  <Checkbox
                                    checked={hasDog === option}
                                    onChange={() => {
                                      setHasDog(option);
                                      formik.setFieldValue('dogInstruction', option === 'Yes');
                                    }}
                                  />
                                }
                                label={option}
                              />
                            ))}
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        disableGutters
                        elevation={0}
                        sx={{
                          mb: 2,
                          borderRadius: 1,
                          overflow: 'hidden',
                          border: '1px solid #e0e0e0'
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          sx={{
                            backgroundColor: '#CBD5E0',
                            minHeight: 56,
                            '&.Mui-expanded': { minHeight: 56 }
                          }}
                        >
                          <Typography className="accordian_text" fontWeight="bold">
                            Can We Deliver On This Address On Weekends?
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ backgroundColor: '#fff' }}>
                          <Grid container spacing={2}>
                            {['Saturday', 'Sunday'].map((day) => (
                              <Grid item xs={6} key={day}>
                                <Typography fontWeight="bold">{day}</Typography>
                                {['Yes', 'No'].map((option) => (
                                  <FormControlLabel
                                    key={option}
                                    control={
                                      <Checkbox
                                        checked={weekendDelivery[day.toLowerCase()] === option}
                                        onChange={() => {
                                          setWeekendDelivery((prev) => ({
                                            ...prev,
                                            [day.toLowerCase()]: option
                                          }));
                                          formik.setFieldValue(`${day.toLowerCase()}Instruction`, option === 'Yes');
                                        }}
                                      />
                                    }
                                    label={option}
                                  />
                                ))}
                              </Grid>
                            ))}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                      <Stack spacing={0.5} width={1}>
                        <Typography
                          style={{ fontWeight: 'bold' }}
                          variant="body1"
                          for="addressType"
                          component={'label'}
                        >
                          Delivery Instructions
                        </Typography>
                        <TextField
                          fullWidth
                          multiline
                          placeholder="Enter deliver instructions "
                          rows={8}
                          id="deliveryInstructions"
                          {...getFieldProps('deliveryInstructions')}
                          type="text"
                        />
                      </Stack>
                      {error && (
                        <Typography variant="body1" color="error" for="addressType" component={'label'}>
                          {error}
                        </Typography>
                      )}
                      <Typography style={{ marginTop: '10px' }} variant="body2">
                        Your instructions help us deliver your packages to your expectations and will be used when
                        possible.
                      </Typography>
                    </div>
                  )}
                </div>
              </Box>
            </Stack>

            <Box
              className="addaddress_btn"
              sx={{
                display: 'flex',
                mt: 3,
                gap: '10px', // Adjust gap as needed for precise Figma match
                alignItems: 'center', // Vertically align items
                justifyContent: 'space-between'
              }}
            >
              {currentAddress && (
                <LoadingButton
                  className="deletebtn"
                  variant="contained"
                  color="error"
                  startIcon={<RiDeleteBinLine />}
                  loading={deleteAddressLoading}
                  sx={{
                    borderRadius: '100px',
                    textTransform: 'none',
                    fontSize: '13px',
                    fontWeight: 500,
                    width: '150px',
                    marginLeft: '20px'
                  }}
                  onClick={(e) => {
                    handleDeleteAddress();
                  }}
                >
                  Delete Address
                </LoadingButton>
              )}
            </Box>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                justifyContent: 'end',
                marginTop: '-58px',
                paddingRight: '20px',
                paddingBottom: '20px'
              }}
            >
              <div
                style={{
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#3f51b5' /* or your theme's primary color for link-like appearance */
                }}
              >
                Cancel
              </div>

              <LoadingButton
                variant="contained"
                type="submit"
                loading={addressLoading}
                sx={{
                  width: '150px', // Maintain consistent width for buttons
                  borderRadius: '100px',
                  fontSize: '13px'
                }}
              >
                {currentAddress ? 'Update Address' : 'Add Address'}{' '}
              </LoadingButton>
            </div>
          </Card>
        </Form>
      </FormikProvider>
    </>
  );
}

AddressGuestForm.propTypes = {
  currentAddress: PropTypes.object.isRequired
};
