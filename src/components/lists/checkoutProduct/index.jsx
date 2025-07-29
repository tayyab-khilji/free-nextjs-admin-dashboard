// import React, { useEffect, useState } from 'react';
// import {
//   Card,
//   CardMedia,
//   CardContent,
//   Skeleton,
//   Grid,
//   Typography,
//   Button,
//   IconButton,
//   Box,
//   Divider,
//   useMediaQuery,
//   Popover,
//   Paper,
//   Stack,
//   Tooltip
// } from '@mui/material';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import CloseIcon from '@mui/icons-material/Close';

// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import { RiDeleteBinLine } from 'react-icons/ri';

// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

// import PropTypes from 'prop-types';
// import { styled } from '@mui/material/styles';
// import { setWishlist } from 'src/redux/slices/wishlist';
// import { IoIosHeartEmpty } from 'react-icons/io';
// import { IoIosHeart } from 'react-icons/io';

// //components
// import RootStyled from './styled';
// import Incrementer from 'src/components/incrementer';
// // hooks
// import { useCurrencyConvert } from 'src/hooks/convertCurrency';
// import { useCurrencyFormatter } from 'src/hooks/formatCurrency';
// import BlurImage from 'src/components/blurImage';

// const ThumbImgStyle = styled(Box)(({ theme }) => ({
//   width: 56,
//   height: 56,
//   marginRight: theme.spacing(2),
//   borderRadius: '8px',
//   border: `1px solid ${theme.palette.divider}`,
//   position: 'relative',
//   overflow: 'hidden'
// }));

// const CartProductList = ({ ...props }) => {
//   const {
//     onDelete,
//     onIncreaseQuantity,
//     onDecreaseQuantity,
//     wishlist,
//     onClickWishList,
//     isLoading,
//     cart,
//     buyNowClicked
//   } = props;

//   const cCurrency = useCurrencyConvert();
//   const fCurrency = useCurrencyFormatter();

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [hovered, setHovered] = useState(false);
//   const isTablet = useMediaQuery('(max-width:900px)');

//   const handleMouseEnter = (event) => {
//     setAnchorEl(event.currentTarget);
//     setHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setHovered(false);
//     // Delay closing so user can move into popover
//     setTimeout(() => {
//       if (!hovered) setAnchorEl(null);
//     }, 150);
//   };

//   const handlePopoverEnter = () => {
//     setHovered(true);
//   };

//   const handlePopoverLeave = () => {
//     setHovered(false);
//     setAnchorEl(null);
//   };

//   const handleBuyNow = (pID, vID, quantity) => {
//     buyNowClicked(pID, vID, quantity);
//   };

//   const maxLength = 50;

//   return (
//     <div>
//       {cart?.map((cartItem) => (
//         <React.Fragment key={cartItem.product?._id}>
//           {/* Use React.Fragment for grouping elements */}
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               p: 2,
//               // borderRadius: 2,
//               // boxShadow: 3,
//               position: 'relative'
//             }}
//           >
//             <Box sx={{ position: 'absolute', top: 10, right: 10, textAlign: 'right' }}>
//               {cartItem?.variation.price != cartItem?.variation.discountedPrice && (
//                 <Typography style={{width:"76px",marginLeft:"40px"}}
//                   color="error"
//                   sx={{ backgroundColor: '#d32f2f', color: 'white', px: 2, py: 0.5, borderRadius: 10, fontSize: 12 }}
//                 >
//                   {`${(100 - ((cartItem?.variation.discountedPrice * cartItem.quantity) / (cartItem?.variation.price * cartItem?.quantity)) * 100).toFixed(0)} % off`}
//                 </Typography>
//               )}
//               <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
//                 $ {(cartItem.variation.discountedPrice * cartItem.quantity).toFixed(2)}
//               </Typography>
//               {cartItem?.variation.price != cartItem?.variation.discountedPrice && (
//                 // <Typography color="gray" sx={{ textDecoration: 'line-through', fontSize: 14 }}>
//                 //   Actual Price: $26.99
//                 // </Typography>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <Typography variant="body2">Actual Price: </Typography>
//                   <Typography variant="body2" sx={{ textDecoration: 'line-through', marginLeft: '8px' }}>
//                     $ {(cartItem.variation.price * cartItem.quantity).toFixed(2)}
//                   </Typography>
//                 </div>
//               )}
//             </Box>
//             <Box
//               sx={{
//                 border: '1px solid lightgray',
//                 borderRadius: '8px',
//                 padding: 2,
//                 display: 'flex',
//                 alignItems: 'center'
//               }}
//             >
//               {isLoading ? (
//                 <Skeleton variant="rounded" width={56} height={56} sx={{ mr: 2 }} />
//               ) : (
//                 <img
//                   src={cartItem.variation?.mainImage?.url || cartItem.variation.images[0]?.url}
//                   alt={'Product Image'}
//                   style={{ width: '100px', height: '100px', objectFit: 'contain' }}
//                 />
//               )}
//             </Box>

//             {/* <CardMedia
//         component="img"
//         sx={{ width: 120, height: 120, borderRadius: 2, ml: 'auto' }}
//         image="/path-to-image"
//         alt="Biotin Gummies"
//       /> */}
//             <CardContent sx={{ flex: 1, ml: 2 }}>
//               <Typography variant="h6" fontWeight="bold" sx={{ marginRight: 10 }}>
//                 {isLoading ? (
//                   <Skeleton variant="text" width={150} />
//                 ) : (
//                   // `${cartItem.variationName} - ${cartItem.cartItemName}`
//                   `${
//                     cartItem?.product.name.length > maxLength
//                       ? `${cartItem?.product.name.substring(0, maxLength)}...`
//                       : cartItem?.product.name
//                   }`
//                 )}
//               </Typography>
//               <Typography color="green" sx={{ fontSize: 14 }}>
//                 {cartItem.product?.businessCertificate === true || cartItem.product?.certificate
//                   ? 'Halal certified seller | '
//                   : ''}{' '}
//                 <span style={{ color: 'black' }}>Sold by {cartItem.product?.brand?.name}</span>
//               </Typography>
//               {/* <Typography sx={{ fontSize: 14 }}>Flavor: Strawberry</Typography>
//               <Typography sx={{ fontSize: 14 }}>Count: 60</Typography> */}

//               <Box display="flex" alignItems="center" mt={2}>
//                 <Button
//                   // size={isMobile ? 'medium' : 'large'}
//                   variant="contained"
//                   color="primary"
//                   sx={{
//                     borderRadius: '28px'
//                   }}
//                   onClick={(e) => {
//                     handleBuyNow(cartItem.product?._id, cartItem?.variation?._id, cartItem.quantity);
//                   }}
//                 >
//                   Buy Now
//                 </Button>
//                 {/* <Button variant="contained" color="success" sx={{ borderRadius: 10, px: 3 }}>
//             Buy now
//           </Button> */}
//                 <Box display="flex" alignItems="center" sx={{ mx: 2 }}>
//                   <IconButton
//                     onClick={() => {
//                       if (cartItem.quantity != 1)
//                         onDecreaseQuantity(
//                           cartItem.product?._id,
//                           cartItem.variation?._id,
//                           cartItem.multipleValuesField,
//                           cartItem.quantity - 1
//                         );
//                     }}
//                     sx={
//                       cartItem.quantity > 1
//                         ? { backgroundColor: '#64dd17', color: 'white', width: 32, height: 32, ml: 1 }
//                         : { backgroundColor: '#b0bec5', color: 'white', width: 32, height: 32, mr: 1 }
//                     }
//                   >
//                     <RemoveIcon fontSize="small" />
//                   </IconButton>
//                   <Typography sx={{ mx: 1, fontSize: 18 }}>{cartItem.quantity}</Typography>
//                   <IconButton
//                     onClick={() => {
//                       if (cartItem.quantity < cartItem.variation.stockQuantity)
//                         onIncreaseQuantity(
//                           cartItem.product?._id,
//                           cartItem.variation?._id,
//                           cartItem.multipleValuesField,
//                           cartItem.quantity + 1
//                         );
//                     }}
//                     sx={
//                       cartItem.quantity < cartItem.variation.stockQuantity
//                         ? { backgroundColor: '#64dd17', color: 'white', width: 32, height: 32, ml: 1 }
//                         : { backgroundColor: '#b0bec5', color: 'white', width: 32, height: 32, mr: 1 }
//                     }
//                     // sx={{ backgroundColor: '#64dd17', color: 'white', width: 32, height: 32, ml: 1 }}
//                   >
//                     <AddIcon fontSize="small" />
//                   </IconButton>
//                 </Box>
//                 <Typography color="green" sx={{ fontSize: 14 }}>
//                   (Stock available)
//                 </Typography>

//                 {/* <Button
//                   sx={{
//                     fontSize: '35px',
//                     color: '#fff',
//                     position: 'absolute',
//                     right: '5px',
//                     top: '10px',
//                     zIndex: '10',
//                     '&:hover': {
//                       bgcolor: 'transparent',
//                       color: '#65D235'
//                     }
//                   }}
//                 > */}
//                 {/* <IoIosHeartEmpty /> */}
//                 {wishlist?.filter((v) => v === cartItem.product?._id).length > 0 ? (
//                   <div
//                     style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
//                     onClick={() => {
//                       onClickWishList(cartItem.product?._id, 'remove');
//                     }}
//                   >
//                     <IconButton
//                       disabled={isLoading}
//                       // onClick={(event) => onClickWishList(event, 'remove')}
//                       aria-label="Remove from wishlist"
//                       color="primary"
//                       size={isTablet ? 'small' : 'medium'}
//                     >
//                       <IoIosHeart />
//                     </IconButton>
//                     <Typography sx={{ fontSize: 14 }}>Remove from wishlist</Typography>
//                   </div>
//                 ) : (
//                   <div
//                     style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
//                     onClick={() => {
//                       onClickWishList(cartItem.product?._id, 'add');
//                     }}
//                   >
//                     <IconButton
//                       disabled={isLoading}
//                       // onClick={(event) => onClickWishList(cartItem.productId, 'add')}
//                       aria-label="add to wishlist"
//                       size={isTablet ? 'small' : 'medium'}
//                     >
//                       {/* <IoMdHeartEmpty /> */}
//                       <IoIosHeartEmpty />
//                     </IconButton>
//                     <Typography sx={{ fontSize: 14 }}>Save in wishlist</Typography>
//                   </div>
//                 )}
//                 {/* </div> */}

//                 {/* <div
//                   style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
//                   onClick={() => {
//                     onClickWishList(product.productId, 'add');
//                   }}
//                 >
//                   <IconButton>
//                     <FavoriteBorderIcon />
//                   </IconButton>
//                   <Typography sx={{ fontSize: 14 }}>Save in wishlist</Typography>
//                 </div> */}

//                 {/* <IconButton>
//                   <FavoriteBorderIcon />
//                 </IconButton>
//                 <Typography sx={{ fontSize: 14 }}>Save in wishlist</Typography> */}
//                 <Grid
//                   style={{ display: 'flex', alignItems: 'center' }}
//                   sx={{
//                     display: 'inline-flex',
//                     justifyContent: 'flex-end',
//                     cursor: 'pointer',
//                     padding: '3px'
//                   }}
//                   onClick={() => onDelete(cartItem.product.name, cartItem.product._id, cartItem.variation._id)}
//                 >
//                   <IconButton sx={{ ml: 2, color: '#CF4655' }}>
//                     <RiDeleteBinLine />
//                   </IconButton>
//                   <Typography sx={{ fontSize: 14, color: '#CF4655' }}>Delete</Typography>
//                 </Grid>
//               </Box>

//               {/* <Typography sx={{ fontSize: 14, color: 'gray', mt: 1 }}>Free delivery available at checkout</Typography> */}

//               <>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                   <Typography sx={{ fontSize: 14, color: 'gray', mr: 0.5 }}>
//                     {cartItem.variation.isFreeShipping
//                       ? 'Free delivery available at checkout'
//                       : 'Delivery options available at checkout'}
//                   </Typography>

//                   <IconButton
//                     size="small"
//                     sx={{ p: 0.5 }}
//                     onMouseEnter={handleMouseEnter}
//                     onMouseLeave={handleMouseLeave}
//                   >
//                     <InfoOutlinedIcon fontSize="small" color="action" />
//                   </IconButton>
//                 </Box>

//                 <Popover
//                   open={Boolean(anchorEl)}
//                   anchorEl={anchorEl}
//                   onClose={() => setAnchorEl(null)}
//                   anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'center'
//                   }}
//                   transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'center'
//                   }}
//                   PaperProps={{
//                     onMouseEnter: handlePopoverEnter,
//                     onMouseLeave: handlePopoverLeave,
//                     sx: {
//                       mt: 1,
//                       px: 2,
//                       py: 1.5,
//                       borderRadius: 2,
//                       backgroundColor: '#f4f7fb',
//                       boxShadow: 3,
//                       maxWidth: 280,
//                       pointerEvents: 'auto',
//                       position: 'relative'
//                     }
//                   }}
//                 >
//                   {/* Arrow */}
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       top: -10,
//                       left: 30,
//                       width: 0,
//                       height: 0,
//                       borderLeft: '10px solid transparent',
//                       borderRight: '10px solid transparent',
//                       borderBottom: '10px solid #f4f7fb'
//                     }}
//                   />

//                   {/* Popover content */}
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
//                     <Typography sx={{ fontSize: 14 }}>
//                       Shipping options and costs would be available on checkout page.
//                     </Typography>
//                     <IconButton size="small" onClick={() => setAnchorEl(null)}>
//                       <CloseIcon fontSize="small" />
//                     </IconButton>
//                   </Box>
//                 </Popover>
//               </>
//             </CardContent>
//           </Box>
//           <Divider sx={{ my: 1 }} />
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

// export default CartProductList;

// CartProductList.propTypes = {
//   onDelete: PropTypes.func,
//   onDecreaseQuantity: PropTypes.func,
//   wishlist: PropTypes.object,
//   onIncreaseQuantity: PropTypes.func,
//   isLoading: PropTypes.bool,
//   // cart: PropTypes.arrayOf(PropTypes.object).isRequired
//   cart: PropTypes.arrayOf(
//     PropTypes.shape({
//       sku: PropTypes.string.isRequired,
//       variationName: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       productId: PropTypes.string.isRequired,
//       variationId: PropTypes.string.isRequired,
//       brand: PropTypes.string.isRequired,
//       category: PropTypes.string.isRequired,
//       size: PropTypes.string.isRequired,
//       color: PropTypes.string.isRequired,
//       quantity: PropTypes.number.isRequired,
//       stockQuantity: PropTypes.number.isRequired,
//       price: PropTypes.number.isRequired,
//       discountedPrice: PropTypes.number,
//       subtotal: PropTypes.number.isRequired,
//       image: PropTypes.string.isRequired
//     })
//   )
// };

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  Grid,
  Typography,
  Button,
  IconButton,
  Box,
  Divider,
  useMediaQuery, // Keep this import for responsive logic
  Popover,
  Paper,
  Stack,
  Tooltip
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { RiDeleteBinLine } from 'react-icons/ri';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { setWishlist } from 'src/redux/slices/wishlist';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoIosHeart } from 'react-icons/io';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Added for checkbox
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'; // Corrected import
import Checkbox from '@mui/material/Checkbox'; // Added for checkbox

//components (assuming these paths are correct in your project)
// import RootStyled from './styled'; // Removed if not used directly for this component
// import Incrementer from 'src/components/incrementer'; // Removed if not used directly for this component
// hooks (assuming these paths are correct in your project)
// import { useCurrencyConvert } from 'src/hooks/convertCurrency'; // Removed if not used directly for this component
// import { useCurrencyFormatter } from 'src/hooks/formatCurrency'; // Removed if not used directly for this component
// import BlurImage from 'src/components/blurImage'; // Removed if not used directly for this component

const ThumbImgStyle = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  marginRight: theme.spacing(2),
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  overflow: 'hidden'
}));

const CartProductList = ({ ...props }) => {
  const {
    onDelete,
    onIncreaseQuantity,
    onDecreaseQuantity,
    wishlist,
    onClickWishList,
    isLoading,
    cart,
    buyNowClicked
  } = props;

  // const cCurrency = useCurrencyConvert(); // Removed if not directly used here
  // const fCurrency = useCurrencyFormatter(); // Removed if not directly used here

  const [anchorEl, setAnchorEl] = useState(null);
  const [hovered, setHovered] = useState(false);
  const isTablet = useMediaQuery('(max-width:900px)'); // Your preferred breakpoint

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    // Delay closing so user can move into popover
    setTimeout(() => {
      if (!hovered) setAnchorEl(null);
    }, 150);
  };

  const handlePopoverEnter = () => {
    setHovered(true);
  };

  const handlePopoverLeave = () => {
    setHovered(false);
    setAnchorEl(null);
  };

  const handleBuyNow = (pID, vID, quantity) => {
    buyNowClicked(pID, vID, quantity);
  };

  const maxLength = 50;


  return (
    <div className="cart-product-list-container">
      {' '}
      {/* Added class for CSS targeting */}
      {cart?.map((cartItem) => (
        <React.Fragment key={`${cartItem.product?._id || 'no-product'}-${cartItem.variation?._id || 'no-variation'}`}>
          {isTablet ? (
            // MOBILE/TABLET LAYOUT (using 900px breakpoint)
            <Box
              className="cart-item-card mobile-specific-layout" // Added class for CSS targeting
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                p: 1.5,
                mb: 2
              }}
            >
              {/* Left Column: Image, Quantity, Stock */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Image Container with Checkbox */}
                <Box
                  className="product-image-wrapper-mobile" // Added class for CSS targeting
                  sx={{
                    border: '1px solid lightgray',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    width: 100,
                    height: 100,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >


                  {isLoading ? (
                    <Skeleton variant="rounded" width={90} height={90} />
                  ) : (
                    <img
                      className="cartmbl_image"
                      src={cartItem.variation?.mainImage?.url || cartItem.variation.images?.[0]?.url}
                      alt="Product"
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  )}
                </Box>

                {/* Quantity Controls - mobile-specific styles will apply from CSS */}
                <Box
                  className="mobile-quantity-controls" // Added class for CSS targeting
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 1
                  }}
                >
                  <IconButton
                    onClick={() => {
                      if (cartItem.quantity > 1)
                        onDecreaseQuantity(
                          cartItem.product?._id,
                          cartItem.variation?._id,
                          cartItem.multipleValuesField,
                          cartItem.quantity - 1
                        );
                    }}
                    size="small"
                    // Using the solid green/grey background and white text, with rounding
                    sx={
                      cartItem.quantity > 1
                        ? { backgroundColor: '#64dd17', color: 'white', width: 32, height: 32, borderRadius: '50%' }
                        : { backgroundColor: '#b0bec5', color: 'white', width: 32, height: 32, borderRadius: '50%' }
                    }
                    disabled={cartItem.quantity <= 1}
                  >
                    <RemoveIcon fontSize="inherit" />
                  </IconButton>
                  <Typography sx={{ mx: 0.5, fontSize: 12 }}>{cartItem.quantity}</Typography>
                  <IconButton
                    onClick={() => {
                      if (cartItem.quantity < cartItem.variation.stockQuantity)
                        onIncreaseQuantity(
                          cartItem.product?._id,
                          cartItem.variation?._id,
                          cartItem.multipleValuesField,
                          cartItem.quantity + 1
                        );
                    }}
                    size="small"
                    // Using the solid green/grey background and white text, with rounding
                    sx={
                      cartItem.quantity < cartItem.variation.stockQuantity
                        ? { backgroundColor: '#64dd17', color: 'white', width: 32, height: 32, borderRadius: '50%' }
                        : { backgroundColor: '#b0bec5', color: 'white', width: 32, height: 32, borderRadius: '50%' }
                    }
                    disabled={cartItem.quantity >= cartItem.variation.stockQuantity}
                  >
                    <AddIcon fontSize="inherit" />
                  </IconButton>
                </Box>

                {/* Mobile Stock Status - centered below quantity controls */}
                <Typography sx={{ fontSize: 12, color: 'green', mt: 0.5, textAlign: 'center', width: '100%' }}>
                  (Stock available)
                </Typography>
              </Box>

              {/* Right Section: Details (Name, Sold by, Price, Delivery Info, Wishlist) */}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: 14, lineHeight: 1.2, pr: 1 }}>
                    {isLoading ? (
                      <Skeleton variant="text" width="70%" />
                    ) : (
                      `${cartItem?.product.name.length > maxLength ? `${cartItem?.product.name.substring(0, maxLength)}...` : cartItem?.product.name}`
                    )}
                  </Typography>
                  {/* Mobile Wishlist Icon */}
                  <IconButton
                    onClick={() =>
                      onClickWishList(
                        cartItem.product?._id,
                        wishlist?.filter((v) => v === cartItem.product?._id).length > 0 ? 'remove' : 'add'
                      )
                    }
                    size="small"
                    sx={{
                      color:
                        wishlist?.filter((v) => v === cartItem.product?._id).length > 0
                          ? 'primary.main'
                          : 'text.secondary',
                      ml: 1,
                      mt: -0.5
                    }}
                  >
                    {wishlist?.filter((v) => v === cartItem.product?._id).length > 0 ? (
                      <IoIosHeart />
                    ) : (
                      <IoIosHeartEmpty />
                    )}
                  </IconButton>
                </Box>
                <Typography color="text.secondary" sx={{ fontSize: 12, lineHeight: 1.2 }}>
                  {isLoading ? <Skeleton variant="text" width="50%" /> : `Sold by ${cartItem.product?.brand?.name}`}
                </Typography>

                {/* Product Variations dataField */}
                {cartItem.variation.dataField && cartItem.variation.dataField.length > 0 && (
                  <Box sx={{ fontSize: 12, color: 'text.primary', mt: 0.5 }}>
                    {cartItem.variation.dataField.map((field) => (
                      <Typography key={field._id} sx={{ fontSize: 'inherit' }}>
                        {field.productField?.title}: {field.fieldValue}
                      </Typography>
                    ))}
                  </Box>
                )}

                {/* {(cartItem.variation.flavour ||
                  cartItem.variation.count ||
                  cartItem.variation.size ||
                  (cartItem.variation.colors && cartItem.variation.colors.length > 0)) && (
                    <Box sx={{ fontSize: 12, color: 'text.primary', mt: 0.5 }}>
                      {cartItem.variation.flavour && (
                        <Typography sx={{ fontSize: 'inherit' }}>Flavor: {cartItem.variation.flavour}</Typography>
                      )}
                      {cartItem.variation.count && (
                        <Typography sx={{ fontSize: 'inherit' }}>Count: {cartItem.variation.count}</Typography>
                      )}
                      {cartItem.variation.size && (
                        <Typography sx={{ fontSize: 'inherit' }}>Size: {cartItem.variation.size}</Typography>
                      )}
                      {cartItem.variation.colors && cartItem.variation.colors.length > 0 && (
                        <Typography sx={{ fontSize: 'inherit' }}>
                          Colors: {cartItem.variation.colors.join(', ')}
                        </Typography>
                      )}
                    </Box>
                  )} */}

                <Typography fontWeight="bold" sx={{ fontSize: 11, mt: 0.5 }}>
                  {isLoading ? (
                    <Skeleton variant="text" width="30%" />
                  ) : (
                    `$${(cartItem.variation.discountedPrice * cartItem.quantity).toFixed(2)}`
                  )}
                  {cartItem?.variation.price !== cartItem?.variation.discountedPrice && (
                    <Typography
                      component="span"
                      sx={{ textDecoration: 'line-through', fontSize: 12, color: 'text.secondary', ml: 1 }}
                    >
                      ${(cartItem.variation.price * cartItem.quantity).toFixed(2)}
                    </Typography>
                  )}
                  {cartItem?.variation.price !== cartItem?.variation.discountedPrice && (
                    <Typography
                      component="span"
                      color="error"
                      sx={{
                        backgroundColor: '#d32f2f',
                        color: 'white',
                        px: 0.5,
                        py: 0.2,
                        borderRadius: '4px',
                        fontSize: 10,
                        ml: 1
                      }}
                    >
                      {`${(100 - ((cartItem?.variation.discountedPrice * cartItem.quantity) / (cartItem?.variation.price * cartItem?.quantity)) * 100).toFixed(0)}% off`}
                    </Typography>
                  )}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: 'gray', mr: 0.5 }}>
                    {cartItem.variation.isFreeShipping ? 'Free delivery available' : 'Delivery options available'}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{ p: 0.2 }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <InfoOutlinedIcon fontSize="inherit" color="action" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ) : (
            // DESKTOP LAYOUT (retained from your provided original code)
            <Box
              className="cart-item-card desktop-specific-layout" // Added class for CSS targeting
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                position: 'relative'
              }}
            >
              <Box sx={{ position: 'absolute', top: 10, right: 10, textAlign: 'right' }}>
                {cartItem?.variation.price !== cartItem?.variation.discountedPrice && (
                  <Typography
                    style={{ width: '70px', marginLeft: '58px' }}
                    color="error"
                    sx={{ backgroundColor: '#d32f2f', color: 'white', px: 2, py: 0.5, borderRadius: 10, fontSize: 10 }}
                  >
                    {`${(100 - ((cartItem?.variation.discountedPrice * cartItem.quantity) / (cartItem?.variation.price * cartItem?.quantity)) * 100).toFixed(0)} % off`}
                  </Typography>
                )}
                <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
                  $ {(cartItem.variation.discountedPrice * cartItem.quantity).toFixed(2)}
                </Typography>
                {cartItem?.variation.price !== cartItem?.variation.discountedPrice && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">Actual Price: </Typography>
                    <Typography variant="body2" sx={{ textDecoration: 'line-through', marginLeft: '8px' }}>
                      $ {(cartItem.variation.price * cartItem.quantity).toFixed(2)}
                    </Typography>
                  </div>
                )}
              </Box>
              <Box
                sx={{
                  border: '1px solid lightgray',
                  borderRadius: '8px',
                  padding: 2,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {isLoading ? (
                  <Skeleton variant="rounded" width={100} height={100} />
                ) : (
                  <img
                    src={cartItem.variation?.mainImage?.url || cartItem.variation.images?.[0]?.url}
                    alt={'Product Image'}
                    style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                  />
                )}
              </Box>

              <CardContent sx={{ flex: 1, ml: 2, pr: 0 }}>
                {' '}
                {/* Adjusted pr to 0 to align content */}
                <Typography variant="h6" fontWeight="bold" sx={{ marginRight: 10 }}>
                  {isLoading ? (
                    <Skeleton variant="text" width={250} />
                  ) : (
                    `${cartItem?.product.name.length > maxLength ? `${cartItem?.product.name.substring(0, maxLength)}...` : cartItem?.product.name}`
                  )}
                </Typography>
                <Typography color="green" sx={{ fontSize: 14 }}>
                  {cartItem.product?.businessCertificate === true || cartItem.product?.certificate
                    ? 'Halal certified seller | '
                    : ''}{' '}
                  <span style={{ color: 'black' }}>Sold by {cartItem.product?.brand?.name}</span>
                </Typography>
                {/* Product Variations for Desktop/Tablet */}

                {/* Product Variations dataField */}
                {cartItem.variation.dataField && cartItem.variation.dataField.length > 0 && (
                  <Box sx={{ fontSize: 12, color: 'text.primary', mt: 0.5 }}>
                    {cartItem.variation.dataField.map((field) => (
                      <Typography key={field._id} sx={{ fontSize: 'inherit' }}>
                        {field.productField?.title}: {field.fieldValue}
                      </Typography>
                    ))}
                  </Box>
                )}

                {/* {(cartItem.variation.flavour ||
                  cartItem.variation.count ||
                  cartItem.variation.size ||
                  (cartItem.variation.colors && cartItem.variation.colors.length > 0)) && (
                    <Box sx={{ fontSize: 14, color: 'text.primary', mt: 1 }}>
                      {cartItem.variation.flavour && (
                        <Typography sx={{ fontSize: 'inherit' }}>Flavor: {cartItem.variation.flavour}</Typography>
                      )}
                      {cartItem.variation.count && (
                        <Typography sx={{ fontSize: 'inherit' }}>Count: {cartItem.variation.count}</Typography>
                      )}
                      {cartItem.variation.size && (
                        <Typography sx={{ fontSize: 'inherit' }}>Size: {cartItem.variation.size}</Typography>
                      )}
                      {cartItem.variation.colors && cartItem.variation.colors.length > 0 && (
                        <Typography sx={{ fontSize: 'inherit' }}>
                          Colors: {cartItem.variation.colors.join(', ')}
                        </Typography>
                      )}
                    </Box>
                  )} */}
                <Box display="flex" alignItems="center" mt={2}>
                  <Button
                    variant="contained"
                    sx={{ borderRadius: '28px', backgroundColor: '#64dd17', '&:hover': { backgroundColor: '#5cb85c' } }} // Adjusted hover color
                    onClick={(e) => {
                      handleBuyNow(cartItem.product?._id, cartItem?.variation?._id, cartItem.quantity);
                    }}
                  >
                    Buy Now
                  </Button>
                  <Box display="flex" alignItems="center" sx={{ mx: 2 }}>
                    <IconButton
                      onClick={() => {
                        if (cartItem.quantity !== 1)
                          onDecreaseQuantity(
                            cartItem.product?._id,
                            cartItem.variation?._id,
                            cartItem.multipleValuesField,
                            cartItem.quantity - 1
                          );
                      }}
                      sx={
                        cartItem.quantity > 1
                          ? {
                            backgroundColor: '#64dd17',
                            color: 'white',
                            width: 32,
                            height: 32,
                            ml: 1,
                            borderRadius: '50%'
                          } // Added borderRadius
                          : {
                            backgroundColor: '#b0bec5',
                            color: 'white',
                            width: 32,
                            height: 32,
                            mr: 1,
                            borderRadius: '50%'
                          } // Added borderRadius
                      }
                      disabled={cartItem.quantity <= 1}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ mx: 1, fontSize: 18 }}>{cartItem.quantity}</Typography>
                    <IconButton
                      onClick={() => {
                        if (cartItem.quantity < cartItem.variation.stockQuantity)
                          onIncreaseQuantity(
                            cartItem.product?._id,
                            cartItem.variation?._id,
                            cartItem.multipleValuesField,
                            cartItem.quantity + 1
                          );
                      }}
                      sx={
                        cartItem.quantity < cartItem.variation.stockQuantity
                          ? {
                            backgroundColor: '#64dd17',
                            color: 'white',
                            width: 32,
                            height: 32,
                            ml: 1,
                            borderRadius: '50%'
                          } // Added borderRadius
                          : {
                            backgroundColor: '#b0bec5',
                            color: 'white',
                            width: 32,
                            height: 32,
                            mr: 1,
                            borderRadius: '50%'
                          } // Added borderRadius
                      }
                      disabled={cartItem.quantity >= cartItem.variation.stockQuantity}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography color="green" sx={{ fontSize: 14 }}>
                    (Stock available)
                  </Typography>

                  <div
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => {
                      onClickWishList(
                        cartItem.product?._id,
                        wishlist?.filter((v) => v === cartItem.product?._id).length > 0 ? 'remove' : 'add'
                      );
                    }}
                  >
                    <IconButton
                      disabled={isLoading}
                      aria-label="wishlist"
                      color={wishlist?.filter((v) => v === cartItem.product?._id).length > 0 ? 'primary' : 'inherit'} // Use primary color for filled heart
                      size={isTablet ? 'small' : 'medium'}
                    >
                      {wishlist?.filter((v) => v === cartItem.product?._id).length > 0 ? (
                        <IoIosHeart />
                      ) : (
                        <IoIosHeartEmpty />
                      )}
                    </IconButton>
                    <Typography sx={{ fontSize: 14 }}>
                      {wishlist?.filter((v) => v === cartItem.product?._id).length > 0
                        ? 'Remove from wishlist'
                        : 'Save in wishlist'}
                    </Typography>
                  </div>

                  <Grid
                    className="delete-button-grid-desktop" // Added class for CSS targeting
                    style={{ display: 'flex', alignItems: 'center' }}
                    sx={{
                      display: 'inline-flex',
                      justifyContent: 'flex-end',
                      cursor: 'pointer',
                      padding: '3px'
                    }}
                    onClick={() => onDelete(cartItem.product.name, cartItem.product._id, cartItem.variation._id)}
                  >
                    <IconButton sx={{ ml: 2, color: '#CF4655' }}>
                      <RiDeleteBinLine />
                    </IconButton>
                    <Typography sx={{ fontSize: 14, color: '#CF4655' }}>Delete</Typography>
                  </Grid>
                </Box>
                <Box className="delivery-info-box-desktop" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  {' '}
                  {/* Added class for CSS targeting */}
                  <Typography sx={{ fontSize: 14, color: 'gray', mr: 0.5 }}>
                    {cartItem.variation.isFreeShipping
                      ? 'Free delivery available at checkout'
                      : 'Delivery options available at checkout'}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{ p: 0.5 }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <InfoOutlinedIcon fontSize="small" color="action" />
                  </IconButton>
                </Box>
              </CardContent>
            </Box>
          )}
          <Divider sx={{ my: 1 }} />
        </React.Fragment>
      ))}
      {/* Delivery Info Popover (Keep this outside the map) */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          onMouseEnter: handlePopoverEnter,
          onMouseLeave: handlePopoverLeave,
          sx: {
            mt: 1,
            px: 2,
            py: 1.5,
            borderRadius: 2,
            backgroundColor: '#f4f7fb',
            boxShadow: 3,
            maxWidth: 280,
            pointerEvents: 'auto',
            position: 'relative'
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -10,
            left: 30,
            width: 0,
            height: 0,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '10px solid #f4f7fb'
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
          <Typography sx={{ fontSize: 14 }}>Shipping options and costs would be available on checkout page.</Typography>
          <IconButton size="small" onClick={() => setAnchorEl(null)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Popover>
    </div>
  );
};

export default CartProductList;

CartProductList.propTypes = {
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  wishlist: PropTypes.arrayOf(PropTypes.string), // Changed to arrayOf(string) based on usage
  onIncreaseQuantity: PropTypes.func,
  isLoading: PropTypes.bool,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      sku: PropTypes.string,
      variationName: PropTypes.string,
      name: PropTypes.string,
      productId: PropTypes.string,
      variationId: PropTypes.string,
      brand: PropTypes.string,
      category: PropTypes.string,
      size: PropTypes.string,
      color: PropTypes.string,
      quantity: PropTypes.number.isRequired,
      stockQuantity: PropTypes.number, // Changed to not required
      price: PropTypes.number, // Changed to not required
      discountedPrice: PropTypes.number,
      subtotal: PropTypes.number, // Changed to not required
      image: PropTypes.string, // Changed to not required
      product: PropTypes.shape({
        // Added product structure based on usage
        _id: PropTypes.string,
        name: PropTypes.string,
        brand: PropTypes.shape({ name: PropTypes.string }),
        businessCertificate: PropTypes.bool,
        certificate: PropTypes.bool
      }),
      variation: PropTypes.shape({
        // Added variation structure based on usage
        _id: PropTypes.string,
        mainImage: PropTypes.shape({ url: PropTypes.string }),
        images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
        price: PropTypes.number,
        discountedPrice: PropTypes.number,
        stockQuantity: PropTypes.number,
        isFreeShipping: PropTypes.bool,
        flavour: PropTypes.string,
        count: PropTypes.number,
        size: PropTypes.string,
        colors: PropTypes.arrayOf(PropTypes.string)
      }),
      multipleValuesField: PropTypes.any // Added as it's passed in functions
    })
  ),
  buyNowClicked: PropTypes.func
};
