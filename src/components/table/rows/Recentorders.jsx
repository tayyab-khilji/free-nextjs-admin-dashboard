// 'use client';
// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Divider,
//   Box
// } from '@mui/material';

// import { fDate } from 'src/utils/formatTime';

// import { useMutation } from 'react-query';
// // api
// import * as api from 'src/services';
// import toast from 'react-hot-toast';

// const RecentOrders = () => {
//   const [allOrders, setAllOrders] = useState([]);

//   const { mutate, isLoading } = useMutation(api.getAllOrders, {
//     onSuccess: (data) => {
//       setAllOrders(data.data);
//     },
//     onError: (err) => {
//       toast.error(err.response.data.message || 'Something went wrong');
//     }
//   });

//   useEffect(() => {
//     mutate('?limit=3&page=1');
//   }, []);

//   // Sample data for recent orders with image URLs
//   // const orders = [
//   //   {
//   //     orderNumber: '1234567890',
//   //     placedOn: '02-4-2025',
//   //     items: 'Multivitamin Gummies For Adults',
//   //     total: '$31.00',
//   //     image: '/images/bottle.png' // Example image path
//   //   },
//   //   {
//   //     orderNumber: '1234567891',
//   //     placedOn: '02-4-2025',
//   //     items: 'Apple & Grape Juice (300ML)',
//   //     total: '$31.00',
//   //     image: '/images/bottle.png' // Example image path
//   //   }
//   // ];

//   return (
//     <div className='recent_order'
//       style={{
//         padding: '20px',
//         background: '#FFFFFF',
//         marginTop: '20px',
//         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Add box shadow here
//         borderRadius: '20px' // Optional, for rounded corners
//       }}
//     >
//       <h2 style={{ paddingLeft: '14px', paddingBottom: '15px' }}>Recent Orders</h2>
//       <TableContainer>
//         <Divider />
//         <Table>
//           <TableHead  sx={{
//           '@media (max-width:640px)': { display:"none"}
//         }}>
//             <TableRow>
//               <TableCell style={{ color: '#718096', fontSize: '14px' }}>Order#</TableCell>
//               <TableCell style={{ color: '#718096', fontSize: '14px' }}>Placed on</TableCell>
//               <TableCell style={{ color: '#718096', fontSize: '14px' }}>Items</TableCell>
//               <TableCell style={{ color: '#718096', fontSize: '14px' }}>Total</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {allOrders.map((order) => (
//               <TableRow key={order.orderNo}>
//                 <TableCell>{order.orderNo}</TableCell>
//                 <TableCell>{fDate(order.updatedAt)}</TableCell>
//                 <TableCell>
//                   {/* Display the image next to the item name */}
//                   <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <img
//                       src={
//                         order.subOrder?.[0]?.variation?.mainImage?.url ||
//                         order.subOrder?.[0]?.variation?.images?.[0]?.url
//                       }
//                       alt={order.subOrder?.[0]?.product?.name}
//                       style={{ width: '70px', height: '70px', marginRight: '10px', borderRadius: '5px',border:"1px solid #CBD5E0" }}
//                     />
//                     <div style={{width:"250px"}}>
//                     {order.subOrder?.[0]?.product?.name}

//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell>${order.subOrder?.[0]?.totalPrice}</TableCell>

//                 <TableCell>
//                   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                     <Button style={{ width: '100px', borderRadius: '50px' }} variant="contained" color="primary">
//                       Manage
//                     </Button>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <Divider />
//       </TableContainer>
//     </div>
//   );
// };

// export default RecentOrders;

// 'use client';
// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Divider,
//   Box,
//   Typography // Import Typography for text styling
// } from '@mui/material';

// import { fDate } from 'src/utils/formatTime';

// import { useMutation } from 'react-query';
// // api
// import * as api from 'src/services';
// import toast from 'react-hot-toast';

// const RecentOrders = () => {
//   const [allOrders, setAllOrders] = useState([]);

//   const { mutate, isLoading } = useMutation(api.getAllOrders, {
//     onSuccess: (data) => {
//       setAllOrders(data.data);
//     },
//     onError: (err) => {
//       toast.error(err.response.data.message || 'Something went wrong');
//     }
//   });

//   useEffect(() => {
//     mutate('?limit=3&page=1');
//   }, []);

//   return (
//     <div
//       className="recent_order"
//       style={{
//         padding: '20px',
//         background: '#FFFFFF',
//         marginTop: '20px',
//         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
//         borderRadius: '20px'
//       }}
//     >
//       <h2 style={{ paddingLeft: '14px', paddingBottom: '15px' }}>Recent Orders</h2>
//       <TableContainer>
//         <Divider />
//         {/* Desktop Table View */}
//         <Table
//           sx={{
//             display: { xs: 'none', sm: 'table' } // Hide table on extra-small screens (mobile)
//           }}
//         >
//           <TableHead>
//             <TableRow>
//               <TableCell style={{ color: '#718096', fontSize: '14px' }}>Order#</TableCell>
//               <TableCell style={{ color: '#718096', fontSize: '14px' }}>Placed on</TableCell>
//               <TableCell style={{ color: '#718096', fontSize: '14px' }}>Items</TableCell>
//               <TableCell style={{ color: '#718096', fontSize: '14px' }}>Total</TableCell>
//               <TableCell></TableCell> {/* Empty cell for Manage button column */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {allOrders.map((order) => (
//               <TableRow key={order.orderNo}>
//                 <TableCell>{order.orderNo}</TableCell>
//                 <TableCell>{fDate(order.updatedAt)}</TableCell>
//                 <TableCell>
//                   <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <img
//                       src={
//                         order.subOrder?.[0]?.variation?.mainImage?.url ||
//                         order.subOrder?.[0]?.variation?.images?.[0]?.url
//                       }
//                       alt={order.subOrder?.[0]?.product?.name}
//                       style={{
//                         width: '70px',
//                         height: '70px',
//                         marginRight: '10px',
//                         borderRadius: '5px',
//                         border: '1px solid #CBD5E0'
//                       }}
//                     />
//                     <div style={{ width: '250px' }}>{order.subOrder?.[0]?.product?.name}</div>
//                   </div>
//                 </TableCell>
//                 <TableCell>${order.subOrder?.[0]?.totalPrice}</TableCell>
//                 <TableCell>
//                   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                     <Button style={{ width: '100px', borderRadius: '50px' }} variant="contained" color="primary">
//                       Manage
//                     </Button>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {/* Mobile View (Cards) */}
//         <Box  sx={{ display: { xs: 'block', sm: 'none' } }}>
//           {/* Show this on extra-small screens */}
//           {allOrders.map((order) => (
//             <Box
//               key={order.orderNo}
//               sx={{
//                 display: 'flex',
//                 padding: '15px 15px',
//                 borderBottom: '1px solid #E2E8F0', // Light border between cards
//                 '&:last-child': { borderBottom: 'none' } // No border for the last item
//               }}
//             >
//               <img
//                 src={order.subOrder?.[0]?.variation?.mainImage?.url || order.subOrder?.[0]?.variation?.images?.[0]?.url}
//                 alt={order.subOrder?.[0]?.product?.name}
//                 style={{
//                   width: '60px',
//                   height: '60px',
//                   marginRight: '15px',
//                   borderRadius: '10px',
//                   border: '1px solid #CBD5E0'
//                 }}
//               />
//               <Box sx={{ flexGrow: 1 }}>
//                 <Typography
//                   sx={{
//                     fontSize: '11px',
//                     whiteSpace: 'nowrap', // Prevent text from wrapping
//                     overflow: 'hidden', // Hide overflowing content
//                     textOverflow: 'ellipsis', // Show ellipsis for overflow
//                     maxWidth: '130px' // Adjust this value as needed for truncation point
//                   }}
//                 >
//                   {order.subOrder?.[0]?.product?.name}
//                 </Typography>
//                 <Typography variant="body2" sx={{  fontSize: '11px' }}>
//                   For Adults...
//                 </Typography>
//                 <Typography variant="body2" sx={{ fontSize: '11px' }}>
//                   Order Date: {fDate(order.updatedAt, 'MM-dd-yyyy')}
//                 </Typography>
//                 <Typography variant="body1" sx={{ fontSize: '11px'}}>
//                   Price: ${order.subOrder?.[0]?.totalPrice}
//                 </Typography>
//               </Box>
//               <Button className='managebtn'
//                 variant="contained"
//                 sx={{
//                   padding: '0px 20px',
//                   borderRadius: '50px',
//                   fontSize:"10px"

//                 }}
//               >
//                 Manage
//               </Button>
//             </Box>
//           ))}
//             {allOrders.map((order) => (
//             <Box
//               key={order.orderNo}
//               sx={{
//                 display: 'flex',
//                 padding: '15px 15px',
//                 borderBottom: '1px solid #E2E8F0', // Light border between cards
//                 '&:last-child': { borderBottom: 'none' } // No border for the last item
//               }}
//             >
//               <img
//                 src={order.subOrder?.[0]?.variation?.mainImage?.url || order.subOrder?.[0]?.variation?.images?.[0]?.url}
//                 alt={order.subOrder?.[0]?.product?.name}
//                 style={{
//                   width: '60px',
//                   height: '60px',
//                   marginRight: '15px',
//                   borderRadius: '10px',
//                   border: '1px solid #CBD5E0'
//                 }}
//               />
//               <Box sx={{ flexGrow: 1 }}>
//                 <Typography
//                   sx={{
//                     fontSize: '11px',
//                     whiteSpace: 'nowrap', // Prevent text from wrapping
//                     overflow: 'hidden', // Hide overflowing content
//                     textOverflow: 'ellipsis', // Show ellipsis for overflow
//                     maxWidth: '130px' // Adjust this value as needed for truncation point
//                   }}
//                 >
//                   {order.subOrder?.[0]?.product?.name}
//                 </Typography>
//                 <Typography variant="body2" sx={{  fontSize: '11px' }}>
//                   For Adults...
//                 </Typography>
//                 <Typography variant="body2" sx={{ fontSize: '11px' }}>
//                   Order Date: {fDate(order.updatedAt, 'MM-dd-yyyy')}
//                 </Typography>
//                 <Typography variant="body1" sx={{ fontSize: '11px'}}>
//                   Price: ${order.subOrder?.[0]?.totalPrice}
//                 </Typography>
//               </Box>
//               <Button className='managebtn'
//                 variant="contained"
//                 sx={{
//                   padding: '0px 20px',
//                   borderRadius: '50px',
//                   fontSize:"10px"

//                 }}
//               >
//                 Manage
//               </Button>
//             </Box>
//           ))}
//         </Box>
//         <Divider />
//       </TableContainer>
//     </div>
//   );
// };

// export default RecentOrders;





'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Button,
  Box,
  Typography
} from '@mui/material';

import { fDate } from 'src/utils/formatTime';
import { useMutation } from 'react-query';
import * as api from 'src/services';
import toast from 'react-hot-toast';

const RecentOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [showAllMobileOrders, setShowAllMobileOrders] = useState(false);

  const { mutate, isLoading } = useMutation(api.getAllRecentOrders, {
    onSuccess: (data) => {
      setAllOrders(data.data);
    },
    onError: (err) => {
      toast.error(err.response.data.message || 'Something went wrong');
    }
  });

  useEffect(() => {
    mutate('?limit=3&page=1');
  }, []);

  // For mobile: flatten subOrders with parent order reference
  const mobileOrderCards = allOrders.flatMap((order) =>
    order.subOrder?.map((sub, i) => ({
      order,
      sub,
      key: `${order.orderNo}-mobile-${i}`
    }))
  );

  return (
    <div
      className="recent_order"
      style={{
        padding: '20px',
        background: '#FFFFFF',
        marginTop: '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '20px'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingX: '14px',
          paddingBottom: '15px',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Recent Orders
        </Typography>

        {/* View All toggle for mobile */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          {mobileOrderCards.length > 1 && (
            <Button
              onClick={() => setShowAllMobileOrders((prev) => !prev)}
              sx={{ fontSize: '14px', textTransform: 'none' }}
            >
              {showAllMobileOrders ? 'View Less' : 'View All >'}
            </Button>
          )}
        </Box>
      </Box>

      <TableContainer>
        <Divider />

        {/* ================= DESKTOP TABLE ================= */}
        <Table sx={{ display: { xs: 'none', sm: 'table' } }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: '#718096', fontSize: '14px' }}>Order#</TableCell>
              <TableCell style={{ color: '#718096', fontSize: '14px' }}>Placed on</TableCell>
              <TableCell style={{ color: '#718096', fontSize: '14px' }}>Items</TableCell>
              <TableCell style={{ color: '#718096', fontSize: '14px' }}>Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allOrders.map((order) =>
              order.subOrder?.map((sub, i) => (
                <TableRow key={`${order.orderNo}-${i}`}>
                  <TableCell>{order.orderNo}</TableCell>
                  <TableCell>{fDate(order.updatedAt)}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <img
                        src={sub.variation?.mainImage?.url || sub.variation?.images?.[0]?.url}
                        alt={sub.product?.name}
                        style={{
                          width: '70px',
                          height: '70px',
                          marginRight: '10px',
                          borderRadius: '5px',
                          border: '1px solid #CBD5E0'
                        }}
                      />
                      <Box sx={{ width: '250px' }}>{sub.product?.name}</Box>
                    </Box>
                  </TableCell>
                  <TableCell>${sub.totalPrice}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button style={{ width: '100px', borderRadius: '50px' }} variant="contained" color="primary">
                        Manage
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* ================= MOBILE CARDS ================= */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          {(showAllMobileOrders ? mobileOrderCards : mobileOrderCards.slice(0, 1)).map(({ order, sub, key }) => (
            <Box
              key={key}
              sx={{
                display: 'flex',
                padding: '15px 15px',
                borderBottom: '1px solid #E2E8F0',
                '&:last-child': { borderBottom: 'none' }
              }}
            >
              <img
                src={sub.variation?.mainImage?.url || sub.variation?.images?.[0]?.url}
                alt={sub.product?.name}
                style={{
                  width: '60px',
                  height: '60px',
                  marginRight: '15px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E0'
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  sx={{
                    fontSize: '11px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '130px'
                  }}
                >
                  {sub.product?.name}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '11px' }}>
                  For Adults...
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '11px' }}>
                  Order Date: {fDate(order.updatedAt, 'MM-dd-yyyy')}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '11px' }}>
                  Price: ${sub.totalPrice}
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  padding: '0px 20px',
                  borderRadius: '50px',
                  fontSize: '10px',
                  height: "25px !important"
                }}
              >
                Manage
              </Button>
            </Box>
          ))}
        </Box>

        <Divider />
      </TableContainer>
    </div>
  );
};

export default RecentOrders;
