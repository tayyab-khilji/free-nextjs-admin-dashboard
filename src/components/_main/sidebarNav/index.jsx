'use client';
import React from 'react';
import { Box, IconButton, List, ListItem, ListItemIcon, Divider } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { FiUser, FiLogOut, FiHome, FiPackage, FiBarChart, FiDatabase, FiMessageCircle } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { setLogout } from 'src/redux/slices/user';
import { deleteCookies } from 'src/hooks/cookies';
import useFcmToken from 'src/hooks/notifications/useFCMToken';
import { usePathname } from 'next/navigation'; // Add this import


const menuItems = [
  {
    icon: <FiHome />,
    name: 'Dashboard',
    link: '/dashboard'
  },
  {
    icon: <FiMessageCircle />,
    name: 'Chat',
    link: '/chat'
  },
  {
    icon: <FiDatabase />,
    name: 'Other 1',
    link: '/other1'
  },
  {
    icon: <FiBarChart />,
    name: 'Other 2',
    link: '/'
  },

];

const SidebarNav = ({ onClose }) => {
  const dispatch = useDispatch();
  const pathname = usePathname(); // Get current route path


  const onLogout = async () => {
    deleteCookies('token');
    dispatch(setLogout());
    window.location.replace('/');
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'relative', // To position the close button
        backgroundColor: '#fff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Close Button (only visible on mobile drawer) */}
      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1400, // Ensure it's above the sidebar content
            color: 'grey'
          }}
        >
          <CloseIcon />
        </IconButton>
      )}

      {/* Logo */}
      <Box sx={{ textAlign: 'center' }}>
        <Link href="/dashboard" onClick={onClose}>
          <Image
            className="sidebarlogo"
            src="/images/logo_dashboard.png"
            alt="Logo"
            width={150}
            height={50}
            style={{ objectFit: 'contain' }}
          />
        </Link>
        {/* Removed Divider */}
      </Box>

      {/* Navigation Menu */}
      <List className="sidebar_width" sx={{ flexGrow: 1, paddingTop: onClose ? '40px' : '16px' }}>
        {/* Adjust paddingTop if close button is present */}
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            component={Link}
            href={item.link}
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              mb: '8px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '600',
              textTransform: 'capitalize',
              color: '#718096',
              backgroundColor: pathname === item.link ? '#f3f3ff' : 'transparent', // Light gray when active
              '&:hover': {
                backgroundColor: (theme) => theme.palette.action.hover
              }
            }}
          >
            <ListItemIcon
              className="dashboard_heading"
              sx={{
                minWidth: '36px',
                color: pathname === item.link ? '#000' : '#718096' // Optional: Change icon color when active
              }}
            >
              {item.icon}
            </ListItemIcon>
            {item.name}
          </ListItem>
        ))}
      </List>

      {/* Footer Links */}
      <Box sx={{ padding: '16px' }}>
        <Divider sx={{ mb: 1 }} />
        <Link
          href="/profile"
          onClick={onClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '600',
            textTransform: 'capitalize',
            color: '#718096',
            marginBottom: '10px'
          }}
        >
          <FiUser />
          Profile
        </Link>

        <button
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '600',
            textTransform: 'capitalize',
            color: '#718096',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <FiLogOut />
          Log Out
        </button>
      </Box>
    </Box>
  );
};

export default SidebarNav;
