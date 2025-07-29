// import { firebaseConfig } from "../firebaseConfig";

importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyBcBa-jbRj3UjsGyO2Sk25bFNiwnwDPcVk",
  authDomain: "buy-halal-goods-29d.firebaseapp.com",
  projectId: "buy-halal-goods-29d",
  storageBucket: "buy-halal-goods-29d.firebasestorage.app",
  messagingSenderId: "916705209269",
  appId: "1:916705209269:web:8c5c9e6b947423d46ec7fc",
  measurementId: "G-WGWC2RL7F0",
});


class CustomPushEvent extends Event {
  constructor(data) {
    super("push");

    Object.assign(this, data);
    this.custom = true;
  }
}

self.addEventListener("push", (e) => {
  if (e.custom) return;

  const oldData = e.data;

  //   console.log("Push event:", JSON.stringify(oldData));

  const newEvent = new CustomPushEvent({
    data: {
      event: parseJSONSafely(oldData),
      json() {
        const newData = parseJSONSafely(oldData);
        newData.data = {
          ...newData.data,
          ...newData.notification,
        };
        delete newData.notification;
        return newData;
      },
    },
    waitUntil: e.waitUntil.bind(e),
  });

  e.stopImmediatePropagation();
  dispatchEvent(newEvent);
});

self.addEventListener("notification", (e) => {
  console.log("Notification event:", e);
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const { title, body, image, icon, ...restPayload } = payload.data;
  const notificationOptions = {
    body,
    icon: image || "/icons/firebase-logo.png", // path to your "fallback" firebase notification logo
    data: restPayload,
  };
  return self.registration.showNotification(title, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  if (event?.notification?.data && event?.notification?.data?.link) {
    self.clients.openWindow(event.notification.data.link);
  }

  // close notification after click
  event.notification.close();
});

function parseJSONSafely(data) {
  try {
    return data ? data.json() : {};
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return {};
  }
}
