'use client'
import { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import firebaseApp from '../../../firebase';
// import { useCurrentUser } from '../auth/useCurrentUser';

const useFcmToken = () => {
	const [fcmToken, setToken] = useState('');
	const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');
	// const { user: currentUser } = useCurrentUser();

	useEffect(() => {
		const retrieveToken = async () => {
			try {
				if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
					const messaging = getMessaging(firebaseApp);

					// Request notification permission
					const permission = await Notification.requestPermission();
					setNotificationPermissionStatus(permission);


					console.log("Notification.permission:", Notification.permission);

					if (permission === 'granted') {
						const currentToken = await getToken(messaging, {
							vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY, // Replace with your Firebase project's VAPID key
						});
						if (currentToken) {
							setToken(currentToken);
							console.log("================FCM", currentToken);
						} else {
							console.log('=======FCM No registration token available. Request permission to generate one.');
						}
					}
					else {
						console.log('=======FCM');

					}
				}
			} catch (error) {
				console.log('=======FCM Error retrieving token:', error);
			}
		};

		retrieveToken();
	}, []); // currentUser?.authToken

	return { fcmToken, notificationPermissionStatus };
};

export default useFcmToken;
