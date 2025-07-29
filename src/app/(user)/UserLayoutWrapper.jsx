'use client'; // Enable client-side functionality

import React from 'react';
import { useSelector } from 'react-redux';

// Components (e.g., Navbar, Footer, etc.)
import Navbar from 'src/layout/_main/navbar';
import Footer from 'src/layout/_main/footer';
import Topbar from 'src/layout/_main/topbar';
import ActionBar from 'src/layout/_main/actionbar';
import { Toolbar } from '@mui/material';
import UserBottomBar from 'src/layout/_main/userBottomBar';

export default function UserLayoutWrapper({ children }) {
  // Fetch the user state from Redux
  const user = useSelector((state) => state.user);

  console.log('Fetched User:', user);
  if (!user) {
  }

  return (
    <>
      {children}
      {/* <Topbar /> */}
      {/* <Navbar />
      <ActionBar />
      <UserBottomBar />
      {children}
      <Toolbar sx={{ display: { xs: 'none', md: 'block' } }} />
      <Footer /> */}
    </>
  );
}



