import React from 'react';
import { Box, Typography, Divider, Button, Paper, Popover, Link, styled, Chip } from '@mui/material';
import PropTypes from 'prop-types';
import SettingsIcon from '@mui/icons-material/Settings'; // Import the settings icon
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'; // Icon for Order/Refund
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'; // Icon for Product
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'; // Icon for Payout
import { useRouter, useSearchParams } from 'next/navigation';

// Styled component for the tip
const Tip = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 0,
  height: 0,
  borderLeft: '15px solid transparent', // Increased size
  borderRight: '15px solid transparent', // Increased size
  borderBottom: `15px solid ${theme.palette.background.paper}`, // Increased size
  zIndex: 1
}));

// Styled component for sticky footer
const StickyFooter = styled(Box)(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#E2E8F0', // Background as per image, confirmed this is the color
  paddingTop: theme.spacing(2.5), // Increased vertical padding
  paddingBottom: theme.spacing(2.5), // Increased vertical padding
  paddingLeft: 0, // No horizontal padding
  paddingRight: 0, // No horizontal padding
  textAlign: 'center',
  borderBottomLeftRadius: '12px',
  borderBottomRightRadius: '12px',
  zIndex: 10 // Ensure footer stays on top of scrolled content
}));



// Helper function to format relative time
const formatRelativeTime = (date) => {
  // Convert string to Date object if it's a string
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return `Now`;

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(diffInSeconds / 3600);
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;

  const days = Math.floor(diffInSeconds / 86400);
  if (days < 30) return `${days} ${days === 1 ? 'day' : 'days'} ago`;

  const months = Math.floor(days / 30);
  return `${months} ${months === 1 ? 'month' : 'months'} ago`;
};

// Function to format content and bold the ID number
const formatContentWithBoldId = (content) => {
  const parts = content.split(/(#\d+)/g); // Split by patterns like #12345678901234
  return parts.map((part, index) => {
    if (part.match(/^#\d+$/)) {
      return (
        <Typography key={index} component="span" fontWeight="bold" sx={{ fontSize: 'inherit', color: 'inherit' }}>
          {part}
        </Typography>
      );
    }
    return part;
  });
};


// Complete list of notification types from your enum
const NotificationTypes = {
  ORDER: {
    PLACED: 'ORDER_PLACED',
    RECEIVED: 'ORDER_RECEIVED',
    SHIPPED: 'ORDER_SHIPPED',
    DELIVERED: 'ORDER_DELIVERED',
    CANCELLED_BY_USER: 'ORDER_CANCELLED_BY_USER',
    CANCELLED_BY_SELLER: 'ORDER_CANCELLED_BY_SELLER'
  },
  REFUND: {
    PROCESSED: 'REFUND_PROCESSED',
    PARTIAL: 'REFUND_PARTIAL',
    FAILED: 'REFUND_FAILED'
  },
  PRODUCT: {
    APPROVED: 'PRODUCT_ADDED',
    BLOCKED: 'PRODUCT_BLOCKED'
  },
  REVIEW: {
    ORDER_REVIEW_PROMPT: 'REVIEW_REQUEST',
    PRODUCT_REVIEW_PROMPT: 'PRODUCT_REVIEW_PROMPT'
  },
  ACCOUNT: {
    LOGIN_ALERT: "LOGIN_ALERT",
    UNDER_REVIEW: 'UNDER_REVIEW',
    PASSWORD_CHANGED: 'PASSWORD_CHANGE'
  },
  SYSTEM: {
    SECURITY_ALERT: 'SECURITY_ALERT',
    PAYMENT_CONFIRMATION: 'PAYMENT_CONFIRMATION',
    WELCOME: 'WELCOME_ALERT'
  }
};



// Status chip component
const StatusChip = ({ type }) => { // Prop is now 'type'
  const getStatusStyles = () => {
    switch (type) {
      case NotificationTypes.ORDER.PLACED:
      case NotificationTypes.PRODUCT.APPROVED:
        return { backgroundColor: '#10B981', color: '#FFFFFF', label: 'View Order' };
      case NotificationTypes.ORDER.RECEIVED:
        return { backgroundColor: '#3B82F6', color: '#FFFFFF', label: 'View Order' };
      case NotificationTypes.ORDER.SHIPPED:
        return { backgroundColor: '#3B82F6', color: '#FFFFFF', label: 'Track Shipment' };
      case NotificationTypes.ORDER.DELIVERED:
        return { backgroundColor: '#10B981', color: '#FFFFFF', label: 'Order Delivered' };
      case NotificationTypes.ORDER.CANCELLED_BY_USER:
      case NotificationTypes.ORDER.CANCELLED_BY_SELLER:
        return { backgroundColor: '#EF4444', color: '#FFFFFF', label: 'View Cancelled Order' }; // Red for cancellation
      case NotificationTypes.REFUND.PROCESSED:
      case NotificationTypes.REFUND.PARTIAL:
        return { backgroundColor: '#10B981', color: '#FFFFFF', label: 'Refund Processed' };
      case NotificationTypes.PRODUCT.APPROVED:
        return { backgroundColor: '#10B981', color: '#FFFFFF', label: 'View Product Status' };
      case NotificationTypes.REFUND.FAILED:
        return { backgroundColor: '#EF4444', color: '#FFFFFF', label: 'Refund Failed' };
      case NotificationTypes.PRODUCT.BLOCKED:
        return { backgroundColor: '#EF4444', color: '#FFFFFF', label: 'View Product Status' };
      case NotificationTypes.REVIEW.ORDER_REVIEW_PROMPT:
      case NotificationTypes.REVIEW.PRODUCT_REVIEW_PROMPT:
        return { backgroundColor: '#6B7280', color: '#FFFFFF', label: 'View Review' }; // Grey for prompts
      case NotificationTypes.SYSTEM.WELCOME:
        return { backgroundColor: '#6B7280', color: '#FFFFFF', label: 'Explore Dashboard' }; // Grey for prompts
      case NotificationTypes.ACCOUNT.LOGIN_ALERT:
      case NotificationTypes.ACCOUNT.PASSWORD_CHANGED:
      case NotificationTypes.SYSTEM.SECURITY_ALERT:
        return { backgroundColor: '#3B82F6', color: '#FFFFFF', label: 'Security Alert' }; // Blue for security/account
      case NotificationTypes.SYSTEM.PAYMENT_CONFIRMATION:
        return { backgroundColor: '#10B981', color: '#FFFFFF', label: 'Payment Confirmed' };
      default:
        return { backgroundColor: '#4B5563', color: '#FFFFFF', label: type }; // Fallback to grey and display the raw type
    }
  };


  const { backgroundColor, color, label } = getStatusStyles();

  // Consistent styles for chips like 'Refund Dispute', 'Product Approved', 'Payout Rejected'
  const commonChipStyles = {
    fontSize: '11px',
    fontWeight: 600,
    height: '25px',
    borderRadius: '9999px', // Ensure border radius is applied
    minWidth: '120px', // Adjusted min-width based on the image provided
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    px: 1.5, // Reduced horizontal padding slightly to help with minWidth
    py: 0.5, // Reduced vertical padding slightly
    '& .MuiChip-label': {
      padding: 0, // Remove default chip label padding
      whiteSpace: 'nowrap'
    }
  };

  // Styles for 'New Order' chip (if it needs to be different)
  const newOrderChipStyles = {
    textTransform: 'none',
    fontSize: '11px',
    fontWeight: 600,
    height: '26px',
    borderRadius: '9999px',
    px: '16px',
    py: '8px',
    '& .MuiChip-label': {
      paddingLeft: 0,
      paddingRight: 0,
      whiteSpace: 'nowrap'
    }
  };

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        ml: 'auto',
        backgroundColor,
        color,
        ...(status === 'dispute' || status === 'approved' || status === 'rejected'
          ? commonChipStyles
          : newOrderChipStyles)
      }}
    />
  );
};


const NotificationIcon = ({ type, opened }) => {
  const getImageSrc = () => {
    if (
      type === NotificationTypes.ORDER.PLACED ||
      type === NotificationTypes.ORDER.RECEIVED ||
      type === NotificationTypes.ORDER.SHIPPED ||
      type === NotificationTypes.ORDER.DELIVERED ||
      type === NotificationTypes.ORDER.CANCELLED_BY_SELLER ||
      type === NotificationTypes.ORDER.CANCELLED_BY_USER ||
      type === NotificationTypes.REFUND.PROCESSED ||
      type === NotificationTypes.REFUND.PARTIAL ||
      type === NotificationTypes.REFUND.FAILED
    ) {
      return '/images/notification_payout.png';
    } else if (type === NotificationTypes.PRODUCT.APPROVED || type === NotificationTypes.PRODUCT.BLOCKED || type === NotificationTypes.REVIEW.ORDER_REVIEW_PROMPT || type === NotificationTypes.REVIEW.PRODUCT_REVIEW_PROMPT) {
      return '/images/notification_product.png';
    } else if (type === 'payout') {
      return '/images/notification_payout.png';
    } else {
      return '/images/notification_app.png'; // fallback image
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: 52,
        height: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: opened ? '#FAFAFA' : '#ffffff',
        flexShrink: 0,
        marginTop: '5px !important',
        borderRadius: '100px !important',
        // Add the border property here
        // border: '1px solid #E2E8F0',
        border: type === NotificationTypes.PRODUCT.APPROVED || type === NotificationTypes.REVIEW.ORDER_REVIEW_PROMPT || type === NotificationTypes.REVIEW.PRODUCT_REVIEW_PROMPT ||
          type === NotificationTypes.ORDER.PLACED ||
          type === NotificationTypes.ORDER.RECEIVED ||
          type === NotificationTypes.ORDER.SHIPPED ||
          type === NotificationTypes.ORDER.DELIVERED ||
          type === NotificationTypes.ORDER.CANCELLED_BY_SELLER ||
          type === NotificationTypes.ORDER.CANCELLED_BY_USER ||
          type === NotificationTypes.REFUND.PROCESSED ||
          type === NotificationTypes.REFUND.PARTIAL ||
          type === NotificationTypes.REFUND.FAILED
          ? '1px solid #E2E8F0' : '1px solid #65D235'
      }}
    >
      <Box
        component="img"
        src={getImageSrc()}
        alt="Notification Icon"
        sx={{ width: 24, height: 24 }}
      />
    </Paper>
  );
};

// // Component to render the icon based on notification type
// const NotificationIcon = ({ type, opened }) => {
//   const iconProps = { sx: { fontSize: 24, color: '#718096' } }; // Default color

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         width: 52,
//         height: 52,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: opened ? '#F3F4F6' : '#ffffff', // Background changes if unread
//         flexShrink: 0,
//         marginTop: '5px !important',
//         borderRadius: '100px !important'
//       }}
//     >
//       {type === NotificationTypes.ORDER.PLACED || type === NotificationTypes.ORDER.RECEIVED || type === NotificationTypes.ORDER.SHIPPED || type === NotificationTypes.ORDER.DELIVERED
//         || type === NotificationTypes.ORDER.CANCELLED_BY_SELLER || type === NotificationTypes.ORDER.CANCELLED_BY_USER
//         || type === NotificationTypes.REFUND.PROCESSED || type === NotificationTypes.REFUND.PARTIAL || type === NotificationTypes.REFUND.FAILED ? (
//         <DescriptionOutlinedIcon {...iconProps} />
//       ) : type === 'product' ? (
//         <Inventory2OutlinedIcon {...iconProps} />
//       ) : type === 'payout' ? (
//         <AttachMoneyOutlinedIcon {...iconProps} />
//       ) : (
//         <Box sx={{ width: 24, height: 24 }} />
//       )}
//     </Paper>
//   );
// };


// // Group notifications by date (No "yesterday" group)
// const groupNotificationsByDate = (notifications) => {
//   const now = new Date();
//   const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//   const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

//   const groups = {
//     recent: [],
//     thisMonth: [], // Absorbs 'yesterday' and other 'this month' notifications
//     older: []
//   };

//   notifications.forEach((notification) => {
//     const notifDate = new Date(notification.createdAt);

//     if (notifDate >= todayStart) {
//       groups.recent.push(notification);
//     } else if (notifDate >= thisMonthStart) {
//       groups.thisMonth.push(notification);
//     } else {
//       groups.older.push(notification);
//     }
//   });

//   return groups;
// };

const groupNotificationsByDate = (notifications) => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const groups = {
    recent: [],
    yesterday: [], // New group for yesterday's notifications
    thisMonth: [],
    older: []
  };

  notifications.forEach((notification) => {
    const notifDate = new Date(notification.createdAt);

    if (notifDate >= todayStart) {
      groups.recent.push(notification);
    } else if (notifDate >= yesterdayStart) {
      groups.yesterday.push(notification);
    } else if (notifDate >= thisMonthStart) {
      groups.thisMonth.push(notification);
    } else {
      groups.older.push(notification);
    }
  });

  return groups;
};


const NotificationScreen = ({ isOpen, anchorEl, onClose, notifications, markAllAsRead }) => {
  const [tabValue, setTabValue] = React.useState(0);
  const router = useRouter();

  // const filteredNotifications = notifications ?
  //   notifications.filter((notification) => (tabValue === 0 ? true : !notification.isRead))
  //     .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) : [];

  const filteredNotifications = notifications ?
    notifications.filter((notification) => (tabValue === 0 ? true : !notification.opened))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : [];

  const groupedNotifications = groupNotificationsByDate(filteredNotifications);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderNotificationGroup = (groupKey, notificationsArray) => {
    if (notificationsArray.length === 0) return null;

    let title = '';
    if (groupKey === 'recent') {
      title = 'Recent';
    } else if (groupKey === 'yesterday') {
      title = 'Yesterday';
    } else if (groupKey === 'thisMonth') {
      title = 'This Month';
    } else if (groupKey === 'older') {
      title = 'Older';
    }



    return (
      <Box key={groupKey}>
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          color="#718096"
          sx={{ pt: 2, pb: 1, textTransform: 'uppercase', fontSize: '0.75rem' }}
        >
          {title}
        </Typography>
        {notificationsArray.map((notification, index) => (
          <React.Fragment key={notification.id}>
            {/* <Box
              sx={{
                mb: '8px', // Reduced margin-bottom to make space tighter
                backgroundColor: notification.opened ? 'transparent' : '#EDF2F7', // Background for unread
                borderRadius: '8px', // Rounded corners for notification item
                border: notification.opened ? 'none' : '1px solid #E2E8F0', // Border for unread
                paddingLeft: '10px',
                paddingRight: '10px',
                paddingTop: '5px',
                paddingBottom: '8px',

              }}
            > */}


            <Box
              sx={{
                px: 2,
                py: 1.5,
                backgroundColor: notification.opened === true ? '#fff' : '#f1f7fd',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: notification.opened === true ? '#f8f9fa' : '#e3f2fd',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                },
                '&:active': {
                  transform: 'translateY(0px)',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)'
                },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.6s'
                },
                '&:hover::before': {
                  transform: 'translateX(100%)'
                },
                display: 'flex', // Add flex display
                alignItems: 'flex-start', // Align items to the start for icon and text
                gap: 2 // Space between icon and content
              }}
            // onClick={() => handleClicked(notif)}
            >

              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <NotificationIcon type={notification.type} opened={notification.opened} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ width: `100%`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{
                        fontSize: '13px',
                        color: '#1F2937'
                      }}
                    >
                      {notification.title}
                    </Typography>
                    {notification.type && (
                      <StatusChip type={notification.type} />
                    )}
                  </Box>
                  <Typography color="#000000" sx={{ fontSize: '12px' }}>
                    {notification.message ? formatContentWithBoldId(notification.message) : notification.title}
                  </Typography>
                  <Typography variant="caption" color="#718096" sx={{ fontSize: '0.75rem' }}>
                    {formatRelativeTime(notification.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* Add divider only if it's not the last notification IN THE GROUP and NOT in the 'recent' group */}
            {groupKey !== 'recent' && index < notificationsArray.length - 1 && (
              <Divider sx={{ my: 1, borderColor: '#E5E7EB', width: '100%', border: '1px solid #CBD5E0' }} /> // Adjusted margin and full width
            )}
          </React.Fragment>
        ))}
      </Box>
    );
  };

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '12px',
          overflow: 'visible',
          marginTop: '16px'
        }
      }}
    >
      <Tip />
      <Paper
        elevation={0}
        sx={{
          p: 0,
          width: 400,
          borderRadius: '12px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '500px',
          backgroundColor: '#FFFFFF'
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            paddingTop: '0px !important',
            paddingBottom: '0px !important',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
            // borderBottom: '1px solid #E5E7EB' // Border below Notifications header
          }}
        >
          <Typography variant="h6" component="h2" fontWeight="bold" sx={{ color: '#1F2937' }}>
            Notifications
          </Typography>
          {/* Settings icon added here */}
          {/* <SettingsIcon sx={{ color: '#718096', cursor: 'pointer' }} /> */}
          {/* <img style={{ width: "20px", height: "20px" }} src="/images/seticon.png" alt="" /> */}
        </Box>
        <Divider sx={{ width: '95%', mx: 'auto', borderBottomWidth: '2px', borderColor: '#CBD5E0', my: 1 }} />


        {/* Tabs / Filters */}
        <Box
          sx={{
            // px: 1,
            paddingLeft: "3px",
            paddingRight: "10px",
            pt: 0, // Adjusted padding top
            pb: 0, // Adjusted padding bottom
            display: 'flex',
            gap: 0,
            alignItems: 'center'
          }}
        >
          <Button
            variant="text"
            onClick={() => handleTabChange(null, 0)}
            sx={{
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: tabValue === 0 ? 'bold' : 'normal',
              color: tabValue === 0 ? '#1F2937' : '#6B7280',
              // backgroundColor: tabValue === 0 ? '#F3F4F6' : 'transparent',
              borderRadius: '8px',
              px: 1.5,
              py: 0.5,
              minWidth: 'auto'
            }}
          >
            All
          </Button>
          <Button
            variant="text"
            onClick={() => handleTabChange(null, 1)}
            sx={{
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: tabValue === 1 ? 'bold' : 'normal',
              color: tabValue === 1 ? '#1F2937' : '#6B7280',
              backgroundColor: tabValue === 1 ? '#F3F4F6' : 'transparent',
              borderRadius: '8px',
              px: 1.5,
              py: 0.5,
              minWidth: 'auto'
            }}
          >
            Unread
          </Button>
          {/* "Mark all as read" button moved to the right using ml: 'auto' */}
          <Box sx={{ ml: 'auto' }}>
            <Button
              size="small"
              sx={{
                textTransform: 'none',
                color: '#1A202C', // Adjusted color to match image
                fontSize: '1rem',
                borderRadius: '8px',
                px: 1,
                py: 0.5,
                backgroundColor: '#FFFFFF', // Explicit white background
                fontWeight: "normal"
              }}
              onClick={() => markAllAsRead}
            >
              Mark all as read
            </Button>
          </Box>
        </Box>
        {/* ADDED: Divider below the tabs, 80% width and centered */}
        <Divider sx={{ width: '95%', mx: 'auto', borderBottomWidth: '2px', borderColor: '#CBD5E0', my: 1 }} />


        {/* Notification List with Scroll */}
        <Box
          sx={{
            overflowY: 'auto',
            flex: 1,
            px: 2,
            pb: 2
          }}
        >
          {renderNotificationGroup('recent', groupedNotifications.recent)}
          {renderNotificationGroup('yesterday', groupedNotifications.yesterday)}
          {renderNotificationGroup('thisMonth', groupedNotifications.thisMonth)}
          {renderNotificationGroup('older', groupedNotifications.older)}

          {filteredNotifications.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
              No notifications to display.
            </Typography>
          )}
        </Box>

        {/* Updated Sticky Footer */}
        <StickyFooter>
          <Link
            href="#"
            underline="none"
            sx={{
              color: 'inherit',
              fontWeight: 'bold',
              fontSize: '17px',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
            onClick={() => router.push('/notifications')}
          >
            View all notifications
          </Link>
        </StickyFooter>

      </Paper>
    </Popover>
  );
};

NotificationScreen.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
  markAllAsRead: PropTypes.func.isRequired
};

export default NotificationScreen;
