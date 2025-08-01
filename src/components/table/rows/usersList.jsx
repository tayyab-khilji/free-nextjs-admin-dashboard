import PropTypes from 'prop-types';
import { enUS } from 'date-fns/locale';
import { useRouter } from 'next-nprogress-bar';

import {
  styled,
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Typography,
  Stack,
  IconButton,
  Avatar,
  Tooltip
} from '@mui/material';

import Label from 'src/components/label';
import { fDateShort } from 'src/utils/formatTime';

UserRow.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      url: PropTypes.string
    }),
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    totalOrders: PropTypes.number,
    role: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    plan: PropTypes.string,
    status: PropTypes.string
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

  return (
    <TableRow
      hover
      key={row._id}
      sx={{
        height: 64,
        borderBottom: '1.1px solid #E5E8EB'
      }}
    >
      {/* Name */}
      <TableCell component="th" scope="row">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
              {row?.name}
            </Typography>
          )}
        </Box>
      </TableCell>

      {/* Email */}
      <TableCell style={{ minWidth: 160 }}>
        {isLoading ? <Skeleton variant="text" /> : row?.email}
      </TableCell>

      {/* Plan */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant="filled"
            sx={{
              width: 100,
              minWidth: 100,
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {row?.plan || 'N/A'}
          </Label>
        )}
      </TableCell>

      {/* Created Date */}
      <TableCell style={{ minWidth: 40 }}>
        {isLoading ? <Skeleton variant="text" /> : fDateShort(row.createdAt, enUS)}
      </TableCell>

      {/* Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant="filled"
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

      {/* Actions */}
      <TableCell>
        <Stack direction="row" justifyContent="flex-end" gap={1}>
          {isLoading ? (
            <Skeleton variant="text" width={40} />
          ) : (
            <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize', cursor: 'pointer' }}>
              View
            </Typography>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}
