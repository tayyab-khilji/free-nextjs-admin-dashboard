'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, Typography, Avatar, IconButton, Badge } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import NotificationScreen from './headerNotifications';
import { useMutation } from 'react-query';
// api
import * as api from 'src/services';

const HeaderMain = ({ title, isMobile, handleDrawerToggle }) => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const anchorEl = useRef(null);

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleNotificationClose = () => {
    setIsNotificationOpen(false);
  };

  const userInitials = user?.name
    ? user?.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
    : 'NA';

  const [notifications, setNotifications] = useState(null);
  const [notificationBadge, setNotificationBadge] = useState(0);

  const { mutate: mutateReadAllNotifications } = useMutation(api.readAllNotifications, {
    onSuccess: async (response) => {
      // Handle success
      mutate();
      console.log("===SUCCESS", response)

    },
    onError: (err) => {
      // Handle error
      console.log("===ERROR", err)
    }
  });


  const { mutate } = useMutation(api.getAllNotifications, {
    onSuccess: async (response) => {
      // Handle success
      setNotifications(response?.data);

      const unOpenedCount = response?.data.filter(notification => !notification.opened).length;
      setNotificationBadge(unOpenedCount);
    },
    onError: (err) => {
      // Handle error
    }
  });

  useEffect(() => {
    mutate(); // Call mutate only once when the component mounts
  }, [mutate]);

  const handleMarkReadAll = () => {
    mutateReadAllNotifications();
  }


  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderRadius: '12px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        marginBottom: '12px',
        marginTop: '12px'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        {/* Hamburger Menu (only visible on mobile) */}
        {isMobile && handleDrawerToggle && (
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}
        {/* Header Title */}
        <Typography variant={isMobile ? 'h6' : 'h4'} component="div" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Box>

      {/* User Info and Notifications */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Notification Bell (only visible on mobile) */}
        {/* {isMobile && ( */}
        {/* <IconButton color="inherit" sx={{ mr: 1 }}>
          <NotificationsIcon />
        </IconButton> */}
        {/* )} */}

        <div>
          <IconButton
            ref={anchorEl}
            color="inherit"
            onClick={handleNotificationToggle}
            sx={{
              mr: 1, // Apply conditional styles to the IconButton when isNotificationOpen is true
              ...(isNotificationOpen && {
                backgroundColor: '#e8f5e9', // Light green background
                borderRadius: '50%', // Make it circular
                border: '1px solid #4caf50', // Green border
                color: '#4caf50', // Set the icon color to green (this cascades to NotificationsIcon)
                padding: '8px', // Adjust padding to make the circle fit the icon snugly
                '&:hover': {
                  backgroundColor: '#dcedc8' // Slightly darker green on hover
                }
              })
            }}
          >
            <Badge badgeContent={notificationBadge} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <NotificationScreen
            isOpen={isNotificationOpen}
            anchorEl={anchorEl.current}
            onClose={handleNotificationClose}
            notifications={notifications}
            markAllAsRead={handleMarkReadAll}
          />
        </div>
        {/* User Avatar */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => {
            router.push(`/settings/profile`);
          }}
        >
          <Avatar
            alt="User Profile"
            sx={{
              width: isMobile ? 32 : 48,
              height: isMobile ? 32 : 48,
              backgroundColor: '#d1e9fc',
              color: '#1976d2',
              fontWeight: 'bold'
            }}
          >
            {userInitials}
          </Avatar>
          {!isMobile && (
            <Box sx={{ textAlign: 'left', minWidth: 0 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                {user?.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                {user?.email}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default HeaderMain;
