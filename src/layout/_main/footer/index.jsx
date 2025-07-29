'use client';
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import NextLink from 'next/link';

// mui
import { alpha, useTheme } from '@mui/material/styles';
import { Typography, Container, Stack, Box, IconButton, Grid, Link, Fab, Divider } from '@mui/material';

// components
import NewsLetter from './newsletter';
import Logo from 'src/components/logo';

// icons
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdOutlineLocationOn } from 'react-icons/md';
import { FiMail } from 'react-icons/fi';
import { MdOutlineCall } from 'react-icons/md';
import { FaSnapchatGhost } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaPinterestP } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa';
import { FaGooglePlay } from 'react-icons/fa';
import { TiVendorApple } from 'react-icons/ti';
import { IoIosArrowUp } from 'react-icons/io'; // Import the up arrow icon
import { HelpOutline } from '@mui/icons-material'; // Import HelpOutline icon

const SOCIAL_MEDIA_LINK = [
  {
    linkPath: 'https://www.facebook.com/profile.php?id=61561771925330',
    name: 'Facebook',
    icon: <FaFacebookF size={15} />
  },
  { linkPath: 'https://www.instagram.com/buyhalalgoods/', name: 'Instagram', icon: <FaInstagram size={15} /> },
  {
    linkPath: 'https://www.youtube.com/@BuyHalalGoods',
    name: 'YouTube',
    icon: <FaYoutube size={15} />
  },
  {
    linkPath: 'https://www.pinterest.com/buyhalalgoods/',
    name: 'Pinterest',
    icon: <FaPinterestP size={15} />
  },
  {
    linkPath: 'https://www.tiktok.com/@buyhalalgoods',
    name: 'Tiktok',
    icon: <FaTiktok size={15} />
  },
  {
    linkPath: 'https://www.linkedin.com/company/buyhalalgoods',
    name: 'Linkedin',
    icon: <FaLinkedinIn size={15} />
  }
];

const DOWNLOAD_MEDIA_LINK = [
  {
    linkPath: 'https://www.facebook.com/profile.php?id=61561771925330',
    // linkPath: 'https://www.facebook.com/techgater',
    name: 'Google Play Store',
    icon: <FaGooglePlay size={15} />
  },
  { linkPath: 'https://www.instagram.com/buyhalalgoods/', name: 'Instagram', icon: <TiVendorApple size={15} /> }
];

const MAIN_LINKS = [
  {
    heading: 'About us',
    listText1: 'Company info',
    listLink1: '/info/company',
    listText2: 'News',
    listLink2: '/info/comingsoon',
    listText3: 'Careers',
    listLink3: '/info/comingsoon',
    listText4: 'Policies',
    listLink4: '/info/rules-policies'
  },
  {
    heading: 'Help & Contact',
    listText1: 'Seller Space',
    listLink1: '/info/sellingpage',
    listText2: 'Contact Us',
    listLink2: '/settings/support',
    listText3: 'Returns',
    listLink3: '/info/refund-policy'
  }
];

const BUY_LINKS = [
  { name: 'Registration', link: '/auth/register' },
  { name: 'Stores', link: '/stores' },
  { name: 'Deals', link: '/info/comingsoon' },
  { name: 'Featured Products', link: '/info/comingsoon' },
  { name: 'Restaurants', link: '/info/comingsoon' }
];

const Sell = [
  { name: 'Start Selling', link: '/info/sellingpage' },
  { name: 'How to sell', link: '/info/stepbystep' },
  { name: 'Halal Sellers', link: '/stores' }
];

const TOOLS = [
  { name: 'Developers', link: '/' },
  { name: 'Security center', link: '/' },
  { name: 'Site map', link: '/' }
];

export default function Footer() {
  const theme = useTheme();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box
      sx={{
        bgcolor: (theme) => alpha(theme.palette.info.light, 0.1),
        py: 4,
        mt: 7,
        overflow: 'hidden',
        position: 'relative',
        display: { md: 'block', xs: 'block' }
      }}
    >
      <Container className="footerpace" maxWidth="xl">
        <Grid container spacing={4}>
          <div
            className="footerparent"
            style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '30px', width: '50%' }}
          >
            {/* Buy Links */}
            <Grid item xs={12} sm={6} md={2}>
              <Stack spacing={3}>
                <Typography variant="h6" color="text.primary">
                  Buy
                </Typography>
                <Stack className="footertext" gap={1}>
                  {BUY_LINKS.map((item, index) => (
                    <Link
                      href={`${item.link}`}
                      component={NextLink}
                      underline="none"
                      key={index}
                      sx={{
                        color: 'text.secondary',
                        transition: '0.3s ease-in-out',
                        ':hover': { color: theme.palette.primary.main, transform: 'translateX(10px)' },
                        whiteSpace: { sm: 'nowrap', xs: 'normal' } // Prevent wrap on sm and up
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </Stack>
              </Stack>
            </Grid>

            {/* Sell Links */}
            <Grid item xs={12} sm={6} md={2}>
              <Stack spacing={3}>
                <Typography variant="h6" color="text.primary">
                  Sell
                </Typography>
                <Stack className="footertext" gap={1}>
                  {Sell.map((item, index) => (
                    <Link
                      href={`${item.link}`}
                      component={NextLink}
                      underline="none"
                      key={index}
                      sx={{
                        color: 'text.secondary',
                        transition: '0.3s ease-in-out',
                        ':hover': { color: theme.palette.primary.main, transform: 'translateX(10px)' }
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </Stack>
              </Stack>
            </Grid>

            {/* Stay Connected (Social Media) */}
            <Grid item xs={12} sm={6} md={2}>
              <Stack style={{ width: '140px' }} spacing={3}>
                <Typography variant="h6" color="text.primary">
                  Stay Connected
                </Typography>
                <Stack className="footertext" direction="column" alignItems="start" spacing={2}>
                  {SOCIAL_MEDIA_LINK.map((item, idx) => (
                    <Link
                      href={`${item.linkPath}`}
                      component={NextLink}
                      underline="none"
                      key={idx}
                      sx={{
                        color: 'text.secondary',
                        transition: '0.3s ease-in-out',
                        ':hover': { color: theme.palette.primary.main, transform: 'translateX(10px)' },
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Fab
                        sx={{
                          zIndex: 1,
                          marginRight: '8px',
                          backgroundColor: '#003C26',
                          color: '#fff',
                          width: { xs: 30, sm: 40 },
                          height: { xs: 30, sm: 40 },
                          minWidth: { xs: 30, sm: 40 },
                          minHeight: { xs: 30, sm: 40 },
                          '& svg': {
                            fontSize: { xs: '1rem', sm: '1.25rem' }
                          }
                        }}
                      >
                        {item.icon}
                      </Fab>
                      {item.name}
                    </Link>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          </div>

          {/* About Us & Help & Contact Links */}
          {MAIN_LINKS.map((item, idx) => (
            <Grid
              className="footerparent footertext"
              item
              xs={5}
              sm={6}
              md={2}
              key={idx}
              // Conditional styling for the "Help & Contact" column
              sx={{
                ...(item.heading === 'Help & Contact' && {
                  '@media (max-width: 640px)': {
                    marginLeft: '-61px'
                  }
                })
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h6" color="text.primary">
                  {item.heading}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {item.listText1 && (
                    <Link
                      href={`${item.listLink1}`}
                      component={NextLink}
                      underline="none"
                      sx={{
                        color: 'text.secondary',
                        transition: '0.3s ease-in-out',
                        ':hover': { color: theme.palette.primary.main, transform: 'translateX(10px)' }
                      }}
                    >
                      {item.listText1}
                    </Link>
                  )}

                  {item.listText2 && (
                    <Link
                      href={`${item.listLink2}`}
                      component={NextLink}
                      underline="none"
                      sx={{
                        color: 'text.secondary',
                        transition: '0.3s ease-in-out',
                        ':hover': { color: theme.palette.primary.main, transform: 'translateX(10px)' }
                      }}
                    >
                      {item.listText2}
                    </Link>
                  )}

                  {item.listText3 && (
                    <Link
                      href={`${item.listLink3}`}
                      component={NextLink}
                      underline="none"
                      sx={{
                        color: 'text.secondary',
                        transition: '0.3s ease-in-out',
                        ':hover': { color: theme.palette.primary.main, transform: 'translateX(10px)' }
                      }}
                    >
                      {item.listText3}
                    </Link>
                  )}
                  {item.listText4 && (
                    <Link
                      href={`${item.listLink4}`}
                      component={NextLink}
                      underline="none"
                      sx={{
                        color: 'text.secondary',
                        transition: '0.3s ease-in-out',
                        ':hover': { color: theme.palette.primary.main, transform: 'translateX(10px)' }
                      }}
                    >
                      {item.listText4}
                    </Link>
                  )}
                </Box>
              </Stack>
            </Grid>
          ))}

          <Box className="footerlogos" sx={{ display: { sm: 'block', md: 'none' } }}>
            <img src="/images/lg.png" alt="" />
          </Box>
          {/* google and play store button---- */}

          <div className="appleplaystore_column" style={{ paddingTop: '30px' }}>
            <h3 className="download_ourapp">Download Our App!</h3>

            <div className="playgoogle_btn">
              {/* Google Play Store Button */}
              <a
                href="https://play.google.com/store/apps/details?id=com.halalgoods.userapp"
                style={{
                  background: 'black',
                  width: '175.65px', // Set a consistent width
                  height: '58.55px', // Set a consistent height
                  borderRadius: '8px',
                  padding: '10px',
                  display: 'flex',
                  color: 'white',
                  justifyContent: 'space-around',
                  alignItems: 'center', // Center vertically
                  marginTop: '20px',
                  textDecoration: 'none' // Remove underline from link
                }}
              >
                <img src="/images/pl.png" style={{ width: '30.74px', height: '35.13px' }} />
                <div>
                  <h5 style={{ fontWeight: 'normal', lineHeight: '15px', margin: 0 }}>GET IT ON</h5>
                  <h3 style={{ margin: 0 }}>Google Play</h3>
                </div>
              </a>

              {/* Apple App Store Button */}
              <a
                href="https://apps.apple.com/us/app/buy-halal-goods/id6739214437"
                style={{
                  background: 'black',
                  width: '175.65px', // Set a consistent width
                  height: '58.55px', // Set a consistent height
                  borderRadius: '8px',
                  padding: '10px',
                  display: 'flex',
                  color: 'white',
                  justifyContent: 'space-around',
                  alignItems: 'center', // Center vertically
                  marginTop: '20px',
                  textDecoration: 'none' // Remove underline from link
                }}
              >
                <img src="/images/ap.png" style={{ width: '30.74px', height: '35.13px' }} />
                <div>
                  <h5 style={{ fontWeight: 'normal', lineHeight: '15px', margin: 0 }}>Download on the</h5>
                  <h3 style={{ margin: 0 }}>App Store</h3>
                </div>
              </a>
            </div>
          </div>
        </Grid>

        <Box
          sx={{
            position: 'fixed',
            bottom: 20, // Adjusted position to keep button on screen for mobile
            right: 20,
            display: 'flex',
            flexDirection: 'column', // Stacks icons vertically
            gap: 1, // Space between buttons
            zIndex: 1000, // Ensure it's above other content
            // Adding responsive adjustments for mobile view
            '@media (max-width: 600px)': {
              bottom: 20, // Ensure it's not hidden under other elements in mobile view
              right: 10 // Adjust the right margin for mobile view
            }
          }}
        >
          {/* Scroll to Top Button */}
          <Fab
            color="primary"
            aria-label="scroll to top"
            onClick={scrollToTop} // Ensure it scrolls on click
            sx={{
              backgroundColor: '#65D235', // Green color
              '&:hover': { backgroundColor: '#218838' },
              boxShadow: 'none',
              // Ensure it's clickable and visible on mobile
              zIndex: 1500
            }}
          >
            <IoIosArrowUp sx={{ color: 'white' }} />
          </Fab>

          {/* Help Button */}
          <Fab
            color="secondary"
            aria-label="help"
            sx={{
              backgroundColor: '#65D235',
              '&:hover': { backgroundColor: '#218838' },
              boxShadow: 'none',
              zIndex: 1500
            }}
          >
            <HelpOutline sx={{ color: 'white' }} />
          </Fab>
        </Box>

        <Divider sx={{ my: 3 }} />
        <div className="footerlinks">
          <Typography variant="body1" color="text.primary" textAlign="center">
            Copyright © 2024 - 2025 | All Rights Reserved. | <a href="/info/termscondition"> Terms and Conditions</a> |{' '}
            <a href="/info/privacy-policy"> Privacy Policy</a> |{' '}
            <a href="/info/guidelines-policy">Communication Policy</a> | <a href="/info/CA-notice">CA Privacy Notice</a>{' '}
            | <a href="/info/cookies">Cookies Policy</a>
          </Typography>
        </div>
      </Container>
    </Box>
  );
}
