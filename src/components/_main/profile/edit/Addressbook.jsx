// // 'use client';
// // // react
// // import React, { useEffect, useState } from 'react';
// // import { Box, Card, Grid } from '@mui/material';
// // import PropTypes from 'prop-types';

// // // mui
// // import { useMediaQuery } from '@mui/material';

// // // import AddressList from './AddressList';
// // import AddressList from 'src/components/_main/profile/edit/addressList';

// // import { useMutation } from 'react-query';
// // // api
// // import * as api from 'src/services';
// // import toast from 'react-hot-toast';
// // // redux
// // import { useDispatch } from 'react-redux';
// // import { saveAddress } from 'src/redux/slices/address';

// // // dynamic components

// // export default function Addressbook({ pageType }) {
// //   const dispatch = useDispatch();

// //   const isMobile = useMediaQuery('(max-width:900px)');
// //   const [addresses, setAddresses] = React.useState([]);

// //   const { mutate, isLoading } = useMutation(api.getAllAddresses, {
// //     onSuccess: (data) => {
// //       setAddresses(data.data);

// //       if (data?.data?.length > 0) {
// //         const defaultAdd = data?.data.find((address) => address.isDefault === true);
// //         dispatch(saveAddress(defaultAdd));
// //       }
// //     },
// //     onError: (err) => {
// //       toast.error(err.response.data.message || 'Something went wrong');
// //     }
// //   });

// //   const { mutate: mutateUpdateAddress } = useMutation(api.updateAddress, {
// //     onSuccess: (res) => {
// //       mutate();
// //     }
// //   });

// //   const handleSetDefault = (_id) => {
// //     mutateUpdateAddress({ _id, isDefault: true });
// //   };

// //   React.useEffect(() => {
// //     mutate();
// //   }, []);

// //   return (
// //     <div>
// //       <Card style={{marginTop:"45px"}}>
// //         <div >
// //           <AddressList
// //             address={addresses}
// //             isLoading={false}
// //             isMobile={isMobile}
// //             pageType={pageType}
// //             handleSetDefault={handleSetDefault}
// //           />
// //         </div>
// //       </Card>
// //     </div>
// //   );
// // }

// // Addressbook.propTypes = {
// //   pageType: PropTypes.string.isRequired
// // };

// 'use client';
// // react
// import React, { useEffect, useState } from 'react';
// import { Box, Card, Grid } from '@mui/material';
// import PropTypes from 'prop-types';

// // mui
// import { useMediaQuery } from '@mui/material';

// // import AddressList from './AddressList';
// import AddressList from 'src/components/_main/profile/edit/addressList';

// import { useMutation } from 'react-query';
// // api
// import * as api from 'src/services';
// import toast from 'react-hot-toast';
// // redux
// import { useDispatch } from 'react-redux';
// import { saveAddress } from 'src/redux/slices/address';

// // dynamic components

// export default function Addressbook({ pageType }) {
//   const dispatch = useDispatch();

//   // This useMediaQuery here is specific to the Addressbook component's internal rendering,
//   // and does not affect the main page's sidebar overlay behavior.
//   const isMobile = useMediaQuery('(max-width:900px)');
//   const [addresses, setAddresses] = React.useState([]);

//   const { mutate, isLoading } = useMutation(api.getAllAddresses, {
//     onSuccess: (data) => {
//       setAddresses(data.data);

//       if (data?.data?.length > 0) {
//         const defaultAdd = data?.data.find((address) => address.isDefault === true);
//         dispatch(saveAddress(defaultAdd));
//       }
//     },
//     onError: (err) => {
//       toast.error(err.response.data.message || 'Something went wrong');
//     }
//   });

//   const { mutate: mutateUpdateAddress } = useMutation(api.updateAddress, {
//     onSuccess: (res) => {
//       mutate();
//     }
//   });

//   const handleSetDefault = (_id) => {
//     mutateUpdateAddress({ _id, isDefault: true });
//   };

//   React.useEffect(() => {
//     mutate();
//   }, []);

//   return (
//     <div>
//       <Card style={{marginTop:"45px"}}>
//         <div >
//           <AddressList
//             address={addresses}
//             isLoading={false}
//             isMobile={isMobile}
//             pageType={pageType}
//             handleSetDefault={handleSetDefault}
//           />
//         </div>
//       </Card>
//     </div>
//   );
// }

// Addressbook.propTypes = {
//   pageType: PropTypes.string.isRequired
// };




'use client';
// react
import React, { useEffect, useState } from 'react';
import { Box, Card, Grid } from '@mui/material';
import PropTypes from 'prop-types';

// mui
import { useMediaQuery } from '@mui/material';

// import AddressList from './AddressList';
import AddressList from 'src/components/_main/profile/edit/addressList';

import { useMutation } from 'react-query';
// api
import * as api from 'src/services';
import toast from 'react-hot-toast';
// redux
import { useDispatch } from 'react-redux';
import { saveAddress } from 'src/redux/slices/address';

// dynamic components

export default function Addressbook({ pageType }) {
  const dispatch = useDispatch();

  // This useMediaQuery here is specific to the Addressbook component's internal rendering,
  // and does not affect the main page's sidebar overlay behavior.
  // We can refine this to target max-width: 640px specifically for the "View All" logic if needed.
  const isMobile = useMediaQuery('(max-width:640px)'); // Changed to 640px for specific mobile view

  const [addresses, setAddresses] = React.useState([]);

  const { mutate, isLoading } = useMutation(api.getAllAddresses, {
    onSuccess: (data) => {
      setAddresses(data.data);

      if (data?.data?.length > 0) {
        const defaultAdd = data?.data.find((address) => address.isDefault === true);
        dispatch(saveAddress(defaultAdd));
      }
    },
    onError: (err) => {
      toast.error(err.response.data.message || 'Something went wrong');
    }
  });

  const { mutate: mutateUpdateAddress } = useMutation(api.updateAddress, {
    onSuccess: (res) => {
      mutate();
    }
  });

  const handleSetDefault = (_id) => {
    mutateUpdateAddress({ _id, isDefault: true });
  };

  React.useEffect(() => {
    mutate();
  }, []);

  return (
    <div>
      <Card
        sx={{
          '@media (max-width:640px)': { border: '0px  !important' ,boxShadow:"none !important"}
        }}
        style={{ marginTop: '45px' }}
      >
        <div>
          <AddressList
            address={addresses}
            isLoading={false}
            isMobile={isMobile} // This prop is crucial for conditional rendering in AddressList
            pageType={pageType}
            handleSetDefault={handleSetDefault}
          />
        </div>
      </Card>
    </div>
  );
}

Addressbook.propTypes = {
  pageType: PropTypes.string.isRequired
};
