"use client";
import useFcmToken from "src/hooks/notifications/useFCMToken";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "../../../firebase";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function FcmTokenComp() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  const [notification, setNotification] = useState({
    open: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (notificationPermissionStatus === "granted") {
        const messaging = getMessaging(firebaseApp);

        const unsubscribe = onMessage(messaging, (payload) => {
          console.log("Foreground push notification received:", payload);
          setNotification({
            open: true,
            title: payload?.notification?.title || payload?.data?.title || "Notification",
            message: payload?.notification?.body || payload?.data?.message || "New update",
          });
        });

        return () => {
          unsubscribe();
        };
      }
    }
  }, [notificationPermissionStatus]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{
        bottom: { xs: 16, sm: 24 },
        right: { xs: 16, sm: 24 },
      }}
    >
      <Alert
        onClose={handleClose}
        severity="info"
        //         sx={{
        //   width: "300px",
        //   minHeight: "80px",
        //   boxShadow: 3,
        //   borderRadius: 2,
        //   borderColor: "#65D235",
        //   bgcolor: "#EEFFE7",
        //   p: 0,
        //   display: "flex",
        //   flexDirection: "column",
        // }}

        sx={{
          width: 300,
          alignItems: 'flex-start',
          // backgroundColor: 'background.paper',
          backgroundColor: '#EEFFE7',
          borderColor: "#65D235",

          boxShadow: 3,
          '& .MuiAlert-message': {
            width: '100%',
            py: 1,
          },
          '& .MuiAlert-action': {
            pt: 0.5,
          }
        }}
      >
        <Box>
          {notification.title && (
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
              {notification.title}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            {notification.message}
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
}


// "use client";
// import useFcmToken from "src/hooks/notifications/useFCMToken";
// import { getMessaging, onMessage } from "firebase/messaging";
// import firebaseApp from "../../../firebase";
// import { useEffect, useState } from "react";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import CloseIcon from "@mui/icons-material/Close";

// export default function FcmTokenComp() {
//   const { fcmToken, notificationPermissionStatus } = useFcmToken();
//   const [notification, setNotification] = useState({
//     open: false,
//     title: "",
//     message: "",
//   });

//   useEffect(() => {
//     if (typeof window !== "undefined" && "serviceWorker" in navigator) {
//       if (notificationPermissionStatus === "granted") {
//         const messaging = getMessaging(firebaseApp);

//         const unsubscribe = onMessage(messaging, (payload) => {
//           console.log("Foreground push notification received:", payload);
//           setNotification({
//             open: true,
//             title: payload?.notification?.title || "New Notification",
//             message: payload?.notification?.body || "",
//           });
//         });

//         return () => {
//           unsubscribe(); // Cleanup listener
//         };
//       }
//     }
//   }, [notificationPermissionStatus]);

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setNotification({ ...notification, open: false });
//   };

//   return (
//     <Snackbar
//       open={notification.open}
//       autoHideDuration={3000}
//       onClose={handleClose}
//       anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       sx={{
//         mb: 2,
//         mr: 2,
//       }}
//     >
//       <Alert
//         icon={false} // removes the default blue icon
//         severity="info"
//         variant="outlined"
//         sx={{
//           width: "300px",
//           minHeight: "80px",
//           boxShadow: 3,
//           borderRadius: 2,
//           borderColor: "#65D235",
//           bgcolor: "#EEFFE7",
//           p: 0,
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             px: 1,
//             pt: 1,
//           }}
//         >
//           <InfoOutlinedIcon sx={{ color: "#65D235" }} />
//           <IconButton size="small" onClick={handleClose}>
//             <CloseIcon fontSize="small" />
//           </IconButton>
//         </Box>
//         <Box sx={{ px: 2, pb: 2 }}>
//           <Typography
//             variant="subtitle1"
//             sx={{ color: "#65D235", fontWeight: 600, mb: 0.5 }}
//           >
//             {notification.title}
//           </Typography>
//           <Typography variant="body2" sx={{ color: "#000" }}>
//             {notification.message}
//           </Typography>
//         </Box>
//       </Alert>
//     </Snackbar>
//   );
// }
