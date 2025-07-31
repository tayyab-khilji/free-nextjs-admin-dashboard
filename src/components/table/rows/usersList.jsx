import PropTypes from 'prop-types';
import { enUS } from 'date-fns/locale';
import { useRouter } from 'next-nprogress-bar';

// mui
import { styled } from '@mui/material/styles';
import { Box, TableRow, Skeleton, TableCell, Typography, Stack, IconButton, Avatar, Tooltip } from '@mui/material';

import Label from 'src/components/label';

// utils
import { fDateShort } from 'src/utils/formatTime';

// icons
import { FiEye } from 'react-icons/fi';
import { LuUser2 } from 'react-icons/lu';
import { FaUserCheck } from 'react-icons/fa6';

// component
import Image from 'next/image';

import BlurImage from 'src/components/blurImage';
import ROLES from 'src/utils/userRoles';

UserRow.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired
    }),
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    totalOrders: PropTypes.number.isRequired,
    role: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired
  }).isRequired,
  setId: PropTypes.func.isRequired
};

const ThumbImgStyle = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm,
  position: 'relative',
  overflow: 'hidden'
}));
export default function UserRow({ isLoading, row, setId }) {
  const router = useRouter();
  console.log(row, 'row data');
  return (
    <TableRow hover key={Math.random()}>
      <TableCell component="th" scope="row">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
              {isLoading ? <Skeleton variant="text" width={120} sx={{ ml: 1 }} /> : row?.name}
            </Typography>
          )}

        </Box>
      </TableCell>
      <TableCell style={{ minWidth: 160 }}>{isLoading ? <Skeleton variant="text" /> : row?.email}</TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label variant={'filled'} sx={{
            width: 100, // or '100px'
            minWidth: 100, // prevents shrinking
            textAlign: 'center', // optional: centers the text
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }} >
            {row?.plan || 'N/A'}
          </Label>

        )}
      </TableCell>

      <TableCell style={{ minWidth: 40 }}>
        {isLoading ? <Skeleton variant="text" /> : fDateShort(row.createdAt, enUS)}
      </TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant={'filled'}
            color={
              (row?.status === 'rejected' && 'error') ||
              (row?.status === 'pending' && 'warning') ||
              (row?.status === 'active' && 'success') ||
              'error'
            }
          >
            {(row?.status === 'rejected' && 'Rejected') ||
              (row?.status === 'pending' && 'Pending') ||
              (row?.status === 'active' && 'Active') ||
              row?.status}
          </Label>
        )}
      </TableCell>

      <TableCell>
        <Stack direction="row" justifyContent="flex-end" gap={1}>
          {isLoading ? (
            <Skeleton variant="text" />

          ) : (
            <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
              View
            </Typography>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}
