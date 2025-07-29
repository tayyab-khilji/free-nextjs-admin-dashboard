// 'use client';
// import React from 'react';
// import { uniqueId } from 'lodash';
// import { capitalize } from 'lodash';
// import NextLink from 'next/link';

// // next
// import Link from 'next/link';
// import PropTypes from 'prop-types';
// // mui
// import { Card, Typography, Skeleton, CardContent, CardMedia, Box } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// // components
// import BlurImage from 'src/components/blurImage';
// import Image from 'next/image';

// export default function UserBrandsCard({ item, isLoading }) {
//   const theme = useTheme();
//   const linkTo = `/stores/${item?._id ? item?._id : ''}`;

//   return (
//     <Card key={uniqueId()} sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }} >
//       <CardContent>
//         {isLoading ? (
//           <Skeleton variant="rectangular" width="100%" height={160} />
//         ) : (
//           <Box sx={{ position: 'relative', width: '100%', height: 160 }}>
//             {/* <BlurImage priority fill alt={item?.name} src={item?.logo?.url} objectFit="cover" /> */}
//             <Image
//               priority
//               fill
//               alt={item?.name}
//               src={item?.logo?.url}
//               objectFit="contain"
//               style={{
//                 position: 'absolute', // Ensures fill works correctly
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: '100%',
//               }}
//             />
//           </Box>
//         )}

//         <CardContent sx={{ textAlign: 'left', backgroundColor: '#f8f9fa' }}>
//           <Typography
//             variant="h6"
//             fontWeight="bold"
//             noWrap
//             color="text.primary"
//             component={NextLink}
//             href={`/stores/${item?._id}`}

//           >
//             {isLoading ? <Skeleton variant="text" /> : item?.name}
//           </Typography>

//         </CardContent>
//       </CardContent>
//     </Card>
//   );
// }
// UserBrandsCard.propTypes = {
//   item: PropTypes.shape({
//     name: PropTypes.string,
//     _id: PropTypes.string,
//     logo: PropTypes.shape({
//       url: PropTypes.string
//     }),
//     createdAt: PropTypes.string,
//     status: PropTypes.string,
//     slug: PropTypes.string
//   }),
//   isLoading: PropTypes.bool,
//   handleClickOpen: PropTypes.func
// };

'use client';
import React from 'react';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';

// next
import Link from 'next/link';

// mui
import { Card, Typography, Skeleton, CardContent, Box } from '@mui/material';
import Image from 'next/image';

export default function UserBrandsCard({ item, isLoading }) {
  const linkTo = `/stores/${item?.slug || ''}`;

  if (isLoading) {
    return (
      <Card sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
        <CardContent>
          <Skeleton variant="rectangular" width="100%" height={160} />
          <CardContent sx={{ textAlign: 'left', backgroundColor: '#f8f9fa' }}>
            <Typography variant="h6" fontWeight="bold" noWrap color="text.primary">
              <Skeleton variant="text" />
            </Typography>
          </CardContent>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link href={linkTo} passHref legacyBehavior>
      <a style={{ textDecoration: 'none' }}>
        <Card sx={{ width: '100%', borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}>
          <CardContent>
            <Box sx={{ position: 'relative', width: '100%', height: 160 }}>
              <Image
                priority
                fill
                alt={item?.name}
                src={item?.logo?.url}
                objectFit="contain"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
              />
            </Box>

            <CardContent sx={{ textAlign: 'left', backgroundColor: '#f8f9fa' }}>
              <Typography variant="h6" fontWeight="bold" noWrap color="text.primary">
                {item?.name}
              </Typography>
            </CardContent>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}

UserBrandsCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    logo: PropTypes.shape({
      url: PropTypes.string
    }),
    createdAt: PropTypes.string,
    status: PropTypes.string,
    slug: PropTypes.string
  }),
  isLoading: PropTypes.bool,
  handleClickOpen: PropTypes.func
};
