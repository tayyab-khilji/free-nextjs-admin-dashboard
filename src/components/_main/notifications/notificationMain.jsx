'use-client'
import React, { useEffect, useState, useRef } from 'react';
import {
    Box,
    Typography,
    Divider,
    Chip,
    Stack,
    Paper,
    Tabs,
    Tab,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from 'react-query';
// api
import * as api from 'src/services';
import { useQuery } from 'react-query';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';


// dynamic components
const Pagination = dynamic(() => import('src/components/pagination'));


// Complete list of notification types from your enum
const NotificationTypes = {
    ORDER: {
        PLACED: "ORDER_PLACED",
        RECEIVED: "ORDER_RECEIVED",
        SHIPPED: "ORDER_SHIPPED",
        DELIVERED: "ORDER_DELIVERED",
        CANCELLED_BY_USER: "ORDER_CANCELLED_BY_USER",
        CANCELLED_BY_SELLER: "ORDER_CANCELLED_BY_SELLER",
    },
    REFUND: {
        PROCESSED: "REFUND_PROCESSED",
        PARTIAL: "REFUND_PARTIAL",
        FAILED: "REFUND_FAILED",
    },
    REVIEW: {
        ORDER_REVIEW_PROMPT: "REVIEW_REQUEST",
        PRODUCT_REVIEW_PROMPT: "PRODUCT_REVIEW_PROMPT",
    },
    CART: {
        ABANDONED: "CART_ABANDONED_REMINDER",
        FOLLOW_UP: "CART_PENDING_FOLLOWUP",
    },
    PRODUCT: {
        DETAIL: "PRODUCT_DETAIL",
    },
    PROMO: {
        RESTOCK_ALERT: "RESTOCK_ALERT",
        EVENT_PROMO: "EVENT_PROMOTION",
        WISHLIST_DISCOUNT: "WISHLIST_DISCOUNT",
        FLASH_SALE: "FLASH_SALE_ALERT",
        WISHLIST_BACK_IN_STOCK: "WISHLIST_BACK_IN_STOCK",
    },
    ACCOUNT: {
        LOGIN_ALERT: "LOGIN_ALERT",
        PASSWORD_CHANGED: "PASSWORD_CHANGE",
    },
    SYSTEM: {
        SECURITY_ALERT: "SECURITY_ALERT",
        PAYMENT_CONFIRMATION: "PAYMENT_CONFIRMATION",
        WELCOME: "WELCOME_ALERT"
    },
};



// Extended utility functions for notification handling
const getNotificationLabel = (type) => {
    switch (type) {
        case NotificationTypes.ORDER.CANCELLED_BY_SELLER:
        case NotificationTypes.ORDER.CANCELLED_BY_USER:
            return 'View Cancelled Order';
        case NotificationTypes.ORDER.PLACED:
        case NotificationTypes.ORDER.RECEIVED:
            return 'View Order';
        case NotificationTypes.ORDER.SHIPPED:
            return 'Track Shipment';
        case NotificationTypes.ORDER.DELIVERED:
            return 'Order Delivered';
        case NotificationTypes.REVIEW.ORDER_REVIEW_PROMPT:
        case NotificationTypes.REVIEW.PRODUCT_REVIEW_PROMPT:
            return 'View Review';
        case NotificationTypes.REFUND.PROCESSED:
            return 'Refund Processed';
        case NotificationTypes.REFUND.PARTIAL:
            return 'Partial Refund';
        case NotificationTypes.REFUND.FAILED:
            return 'Refund Failed';
        case NotificationTypes.PRODUCT.DETAIL:
            return 'Product Update';
        case NotificationTypes.ACCOUNT.LOGIN_ALERT:
            return 'Security Alert';
        case NotificationTypes.ACCOUNT.PASSWORD_CHANGED:
            return 'Account Update';
        case NotificationTypes.SYSTEM.SECURITY_ALERT:
            return 'Security Alert';
        case NotificationTypes.SYSTEM.WELCOME:
            return 'Explore Dashboard';
        case NotificationTypes.SYSTEM.PAYMENT_CONFIRMATION:
            return 'Payment Confirmed';
        default:
            return 'Notification';
    }
};


function formatDateGroup(date) {
    if (date) {
        // Convert string to Date object if it's a string
        const dateObj = typeof date === 'string' ? new Date(date) : date;

        const now = new Date();
        const diffTime = now - dateObj;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Recent';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (now.getMonth() === dateObj.getMonth() && now.getFullYear() === dateObj.getFullYear()) {
            return 'This Month';
        } else {
            return 'Older';
        }
    }
}

// function formatDateGroup(date) {
//     console.log("================", date)
//     if (date) {
//         const now = new Date();
//         const diffTime = now - date;
//         const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//         if (diffDays === 0) {
//             return 'Recent';
//         } else if (diffDays === 1) {
//             return 'Yesterday';
//         } else if (now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
//             return 'This Month';
//         } else {
//             return 'Previous';
//         }
//     }
// }

// // Helper function to format relative time
// const formatRelativeTime = (date) => {
//     const now = new Date();
//     const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

//     if (diffInSeconds < 60) return `Now`;
//     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
//     if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour ago`;
//     if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} day ago`;
//     return `${Math.floor(diffInSeconds / 2592000)} month ago`;
// };

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

function NotificationsView() {
    const [tab, setTab] = useState(0);
    const router = useRouter();
    const [notifications, setNotifications] = useState(null);
    const hasCalledMutate = useRef(false);

    const searchParams = useSearchParams();

    const { data, isLoading, refetch } = useQuery(
        ['notifications', searchParams.toString()],
        () => api['getAllNotifications'](searchParams.toString()), // getOrderByUser
        {
            onError: (err) => {
                toast.error(err.response.message || 'Something went wrong!');
            }
        }
    );


    useEffect(() => {
        if (data?.data && !hasCalledMutate.current) {

            mutate();
            hasCalledMutate.current = true;
        }
        if (data?.data) {
            setNotifications(data.data);
        }
    }, [data?.data?.length]);

    const { mutate } = useMutation(api.readAllNotifications, {
        onSuccess: async (response) => {
            // Handle success
        },
        onError: (err) => {
            // Handle error
        }
    });
    const handleTabChange = (e, newValue) => {
        setTab(newValue);
    };

    // Filter by tab
    const filteredNotifications = tab === 0
        ? notifications ? notifications : []
        : notifications?.filter(n => !n.opened);

    // Group notifications
    const grouped = notifications ? filteredNotifications?.reduce((acc, notif) => {
        const group = formatDateGroup(notif.createdAt);
        if (!acc[group]) acc[group] = [];
        acc[group].push(notif);
        return acc;
    }, {}) : [];



    // Alternative cleaner approach using a mapping object
    const notificationRoutes = {

        // ORDER notifications
        [NotificationTypes.ORDER.PLACED]: (notification) => `/account/order-detail/${notification?.subOrder?._id}`,
        [NotificationTypes.ORDER.RECEIVED]: (notification) => `/account/order-detail/${notification?.subOrder?._id}`,
        [NotificationTypes.ORDER.SHIPPED]: (notification) => `/account/track-order/${notification?.subOrder?._id}`,
        [NotificationTypes.ORDER.DELIVERED]: (notification) => `/account/order-detail/${notification?.subOrder?._id}`,
        [NotificationTypes.ORDER.CANCELLED_BY_USER]: (notification) => `/account/order-detail/${notification?.subOrder?._id}`,
        [NotificationTypes.ORDER.CANCELLED_BY_SELLER]: (notification) => `/account/order-detail/${notification?.subOrder?._id}`,

        // REFUND notifications
        [NotificationTypes.REFUND.PROCESSED]: (notification) => `/account/order-detail/${notification?._id}`,
        [NotificationTypes.REFUND.PARTIAL]: (notification) => `/account/order-detail/${notification?._id}`,
        [NotificationTypes.REFUND.FAILED]: (notification) => `/account/order-detail/${notification?._id}`,

        // REVIEW notifications
        [NotificationTypes.REVIEW.ORDER_REVIEW_PROMPT]: (notification) => `/account/order-detail/${notification?._id}`,

        // CART notifications
        [NotificationTypes.CART.ABANDONED]: '/cart',
        [NotificationTypes.CART.FOLLOW_UP]: '/cart',

        // PRODUCT notifications
        [NotificationTypes.PRODUCT.DETAIL]: (notification) => `/product/${notification?.productId || notification?._id}`,

        // PROMO notifications
        [NotificationTypes.PROMO.RESTOCK_ALERT]: (notification) => `/product/${notification?.productId || notification?._id}`,
        [NotificationTypes.PROMO.EVENT_PROMO]: '/promotions',
        [NotificationTypes.PROMO.WISHLIST_DISCOUNT]: '/account/wishlist',
        [NotificationTypes.PROMO.FLASH_SALE]: '/flash-sale',
        [NotificationTypes.PROMO.WISHLIST_BACK_IN_STOCK]: '/account/wishlist',

        // ACCOUNT notifications
        [NotificationTypes.ACCOUNT.LOGIN_ALERT]: '/account/security',
        [NotificationTypes.ACCOUNT.PASSWORD_CHANGED]: '/account/profile',

        // SYSTEM notifications
        [NotificationTypes.SYSTEM.SECURITY_ALERT]: '/account/security',
        [NotificationTypes.SYSTEM.WELCOME]: '/',

        [NotificationTypes.SYSTEM.PAYMENT_CONFIRMATION]: (notification) => `/account/order-detail/${notification?.subOrder?._id}`,
    };

    // Cleaner handler using the mapping object
    const handleClicked = (notification) => {
        const route = notificationRoutes[notification.type];

        if (route) {
            const path = typeof route === 'function' ? route(notification) : route;
            router.push(path);
        } else {
            // Default fallback
            router.push('/');
        }
    };


    return (
        <Paper elevation={0} sx={{ p: 3, maxWidth: '100%', borderRadius: 2, backgroundColor: '#FFFFFF' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold">Notifications</Typography>
                {/* <SettingsIcon /> */}
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center" borderBottom="1px solid #e0e0e0">
                <Tabs value={tab} onChange={handleTabChange}>
                    <Tab label="All" sx={{ textTransform: 'none', fontWeight: 'bold' }} />
                    <Tab label="Unread" sx={{ textTransform: 'none' }} />
                </Tabs>
                <Typography variant="body2" sx={{ cursor: 'pointer', pr: 2 }} onClick={() => refetch()}>
                    Mark all as read
                </Typography>
            </Stack>

            {Object.keys(grouped).map(group => (
                <Box key={group} mb={2}>
                    <Typography variant="subtitle2" color="grey.600" mt={2} mb={1}>{group}</Typography>

                    {grouped[group].map(notif => (
                        <React.Fragment key={notif.id}>
                            <Box
                                sx={{
                                    px: 2,
                                    py: 1.5,
                                    backgroundColor: notif.opened === true ? '#fff' : '#f1f7fd',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: notif.opened === true ? '#f8f9fa' : '#e3f2fd',
                                        transform: 'translateY(-1px)',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                    },
                                    '&:active': {
                                        transform: 'translateY(0px)',
                                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
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
                                        transition: 'transform 0.6s',
                                    },
                                    '&:hover::before': {
                                        transform: 'translateX(100%)',
                                    },
                                }}
                                onClick={() => handleClicked(notif)}
                            >
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold">{notif.title}</Typography>
                                        <Typography variant="body2" color="grey.700">{notif.message}</Typography>

                                        <Typography variant="caption" color="grey.500">
                                            {formatRelativeTime(notif.createdAt)}
                                        </Typography>
                                    </Box>
                                    {notif.type && (
                                        <Chip
                                            label={getNotificationLabel(notif.type)}
                                            size="small"
                                            sx={{
                                                borderRadius: '12px',
                                                backgroundColor: (notif.type === NotificationTypes.ORDER.CANCELLED_BY_SELLER || notif.type === NotificationTypes.ORDER.CANCELLED_BY_USER) ? '#FECDCA'
                                                    : notif.type === 'Chatpliance' ? '#65D235' :
                                                        (notif.type === NotificationTypes.REVIEW.ORDER_REVIEW_PROMPT || notif.type === NotificationTypes.REVIEW.PRODUCT_REVIEW_PROMPT ||
                                                            notif.type === NotificationTypes.ORDER.DELIVERED || notif.type === NotificationTypes.ORDER.PLACED ||
                                                            notif.type === NotificationTypes.ORDER.RECEIVED || notif.type === NotificationTypes.ORDER.SHIPPED ||
                                                            notif.type === NotificationTypes.CART.ABANDONED || notif.type === NotificationTypes.CART.FOLLOW_UP) ? '#17B26A' : '#e4f7ec',
                                                color: (notif.type === NotificationTypes.ORDER.CANCELLED_BY_SELLER || notif.type === NotificationTypes.ORDER.CANCELLED_BY_USER) ? '#000000' : '#FFFFFF',
                                                fontWeight: 500,
                                                padding: '2px 8px',
                                            }}
                                        />
                                    )}
                                </Stack>
                            </Box>
                            <Divider />
                        </React.Fragment>
                    ))}
                </Box>
            ))}

            <Pagination data={data} />

        </Paper>
    );
}

export default NotificationsView;
