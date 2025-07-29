// 'use client';
// import React, { useState } from 'react';
// import dynamic from 'next/dynamic'; // Retained, though not used in the provided JSX directly
// import Link from 'next/link';
// import { useSelector } from 'react-redux';

// // mui
// import { Toolbar, Container, Stack, useTheme, Divider, Skeleton, Box, Typography, Menu, MenuItem } from '@mui/material'; // Retained all MUI imports

// // icons
// import { MdOutlinePhone } from 'react-icons/md'; // Retained
// import { MdOutlineMail } from 'react-icons/md'; // Retained
// import ROLES from 'src/utils/userRoles'; // Retained
// import { SlArrowDown } from 'react-icons/sl'; // Retained
// import { useRouter } from 'next-nprogress-bar';
// import { deleteCookies } from 'src/hooks/cookies';
// import { useDispatch } from 'react-redux';
// import { setLogout } from 'src/redux/slices/user';
// import { resetWishlist } from 'src/redux/slices/wishlist';

// export default function UserBottomBar() {
//   const theme = useTheme(); // Retained, even if not directly used in styling anymore
//   const { user, isAuthenticated } = useSelector(({ user }) => user);

//   const [anchorEl, setAnchorEl] = useState(null);

//   // Open dropdown
//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   // Close dropdown
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const router = useRouter();
//   const dispatch = useDispatch();

//   const onLogout = () => {
//     deleteCookies('token');
//     dispatch(setLogout());
//     dispatch(resetWishlist());
//     setTimeout(() => {
//       location.href = '/auth/login';
//     }, 1000);
//   };

//   return (
//     <Box className="usebottom_bar">
//       <Container maxWidth="xl">
//         <Toolbar className="MuiToolbar-root"> {/* Apply custom class here */}
//           <Box className="bottombar"> {/* Apply custom class here */}
//             {/* Navigation Links */}
//             <Link href="/info/comingsoon" className="link"> {/* Added 'link' class for general link styling */}
//               <Typography variant="body1">Daily Deals</Typography>
//             </Link>
//             <Link href="/stores" className="link">
//               <Typography variant="body1">Top Stores</Typography>
//             </Link>
//             <Link href="/settings/support" className="link">
//               <Typography variant="body1">Customer Support</Typography>
//             </Link>
//             <Link href="/info/sellingpage" className="link">
//               <Typography variant="body1">Sell on BuyHalalGoods!</Typography>
//             </Link>
//           </Box>
//         </Toolbar>
//       </Container>
//     </Box>
//   );
// }

'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSelector } from 'react-redux';

// mui
import {
  Toolbar,
  Container,
  Stack,
  useTheme,
  Divider,
  Skeleton,
  Box,
  Typography,
  Menu,
  MenuItem,
  // Imported all necessary components
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';

// icons
import { MdOutlinePhone, MdOutlineMail } from 'react-icons/md';
import ROLES from 'src/utils/userRoles';
import { SlArrowDown } from 'react-icons/sl';
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import { useRouter } from 'next-nprogress-bar';
import { deleteCookies } from 'src/hooks/cookies';
import { useDispatch } from 'react-redux';
import { setLogout } from 'src/redux/slices/user';
import { resetWishlist } from 'src/redux/slices/wishlist';

export default function UserBottomBar() {
  const theme = useTheme();
  const { user, isAuthenticated } = useSelector(({ user }) => user);

  const [anchorEl, setAnchorEl] = useState(null);
  // Add state for the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Open dropdown
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();
  const dispatch = useDispatch();

  // Add the search functionality
  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // You can add your search logic here, e.g., redirect to a search results page
    // router.push(`/search?q=${searchTerm}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const onLogout = () => {
    deleteCookies('token');
    dispatch(setLogout());
    dispatch(resetWishlist());
    setTimeout(() => {
      location.href = '/auth/login';
    }, 1000);
  };

  return (
    <Box className="usebottom_bar">
      {/* Mobile Search Bar - FIXED */}
      <Box
        className="mobile_textfield"
        display="flex"
        alignItems="center"
        sx={{
          width: '90%',
          margin: 'auto',
          paddingTop: '20px',
          // Hide the entire box on screens wider than 640px
          '@media (min-width:641px)': {
            display: 'none'
          },
          // Ensure it's visible on smaller screens
          '@media (max-width:640px)': {
            display: 'flex'
          }
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search Halal products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch style={{ fontSize: '17px' }} />
              </InputAdornment>
            ),
            sx: {
              backgroundColor: '#EAF7ED',
              borderRadius: '8px', // Rounded left, straight right
              '& fieldset': { border: 'none' }, // Remove default border
              '&:hover fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: 'none' },
              height: '40px', // Match button height
              paddingLeft: '10px', // Adjust padding to give space for icon
              // This is the key part to adjust the placeholder style
              '& input::placeholder': {
                fontSize: '14px', // Smaller font size
                color: '#A0A0A0', // Lighter gray color
                opacity: 1 // Ensure the color is not faded
              }
            }
          }}
          sx={{
            input: {
              padding: '10px 0', // Adjust padding inside input
              fontSize: '14px'
            }
          }}
        />
        <IconButton
          sx={{
            backgroundColor: '#65D235',
            color: '#fff',
            borderRadius: '0 8px 8px 0', // Straight left, rounded right
            height: '40px',
            width: '40px',
            minWidth: '40px', // Ensure consistent width
            '&:hover': { backgroundColor: '#5bb030' },
            ml: '-1px' // Overlap by 1px to prevent gap from border
          }}
          onClick={handleSearch}
          className="search_btn"
        >
          <FaSearch />
        </IconButton>
      </Box>
      <Container style={{marginTop:"-10px"}} maxWidth="xl">
        <Toolbar className="MuiToolbar-root">
          {' '}
          {/* Apply custom class here */}
          <Box className="bottombar">
            {' '}
            {/* Apply custom class here */}
            {/* Navigation Links */}
            <Link href="/info/comingsoon" className="link">
              {' '}
              {/* Added 'link' class for general link styling */}
              <Typography variant="body1">Daily Deals</Typography>
            </Link>
            <Link href="/stores" className="link">
              <Typography variant="body1">Top Stores</Typography>
            </Link>
            <Link href="/settings/support" className="link">
              <Typography variant="body1">Customer Support</Typography>
            </Link>
            <Link href="/info/sellingpage" className="link">
              <Typography variant="body1">Sell on BuyHalalGoods!</Typography>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
}
