'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// mui
import {
  Toolbar,
  AppBar,
  Container,
  TextField,
  InputAdornment,
  Box,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';

// components
import MenuDesktop from './menuDesktop';
import config from 'src/layout/_main/config.json';
import { FaSearch } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
// import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next-nprogress-bar';

// ----------------------------------------------------------------------
function Navbar() {
  const router = useRouter();

  const { menu } = config;
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // router.push(`${pathname}?${createQueryString('search', search)}`);

      router.push(`/products/search?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <AppBar 
        sx={{
          boxShadow: 'none',
          position: 'sticky !important',
          // top: 79,
          zIndex: 999,
          borderRadius: 0,
          display: { md: 'flex', xs: 'block' },
          pr: '0px !important',
          py: '15px',
          backgroundColor: '#D8F2E7'
        }}
      >
        <Container  maxWidth="xl">
          <Box className='actionbar' 
            display="flex"
            alignItems="center"
            sx={{
              backgroundColor: '#EAF7ED',
              borderRadius: '25px',
              overflow: 'hidden',
              width: '100%'
            }}
          >
            

            {/* Search Input */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search Halal Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown} // Add onKeyDown handler
              sx={{
                '& .MuiOutlinedInput-root': {
                  border: 'none',
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' }
                },
                input: {
                  padding: '10px',
                  fontSize: '14px'
                }
              }}
            />

            {/* Search Button */}
            <IconButton
              sx={{
                backgroundColor: '#65D235',
                color: '#fff',
                borderRadius: '0 25px 25px 0',
                height: '40px',
                width: '40px',
                '&:hover': { backgroundColor: '#5bb030' }
              }}
              onClick={handleSearch} // Add onClick handler
            >
              <FaSearch />
            </IconButton>
          </Box>

       
        </Container>
      </AppBar>
    </>
  );
}
Navbar.propTypes = {
  isAuth: PropTypes.bool.isRequired
};
'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// mui
import {
  Toolbar,
  AppBar,
  Container,
  TextField,
  InputAdornment,
  Box,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';

// components
import MenuDesktop from './menuDesktop';
import config from 'src/layout/_main/config.json';
import { FaSearch } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
// import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next-nprogress-bar';

// ----------------------------------------------------------------------
export default function Navbar() {
  const router = useRouter();

  const { menu } = config;
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // router.push(`${pathname}?${createQueryString('search', search)}`);

      router.push(`/products/search?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <AppBar 
        sx={{
          boxShadow: 'none',
          position: 'sticky !important',
          // top: 79,
          zIndex: 999,
          borderRadius: 0,
          display: { md: 'flex', xs: 'block' },
          pr: '0px !important',
          py: '15px',
          backgroundColor: '#D8F2E7'
        }}
      >
        <Container  maxWidth="xl">
          <Box className='actionbar' 
            display="flex"
            alignItems="center"
            sx={{
              backgroundColor: '#EAF7ED',
              borderRadius: '25px',
              overflow: 'hidden',
              width: '100%'
            }}
          >
            

            {/* Search Input */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search Halal Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown} // Add onKeyDown handler
              sx={{
                '& .MuiOutlinedInput-root': {
                  border: 'none',
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' }
                },
                input: {
                  padding: '10px',
                  fontSize: '14px'
                }
              }}
            />

            {/* Search Button */}
            <IconButton
              sx={{
                backgroundColor: '#65D235',
                color: '#fff',
                borderRadius: '0 25px 25px 0',
                height: '40px',
                width: '40px',
                '&:hover': { backgroundColor: '#5bb030' }
              }}
              onClick={handleSearch} // Add onClick handler
            >
              <FaSearch />
            </IconButton>
          </Box>

       
        </Container>
      </AppBar>
    </>
  );
}
Navbar.propTypes = {
  isAuth: PropTypes.bool.isRequired
};
