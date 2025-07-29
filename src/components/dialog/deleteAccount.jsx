import React, { useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  Typography,
  DialogActions,
  Button,
  alpha,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  FormControl
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { IoWarning } from 'react-icons/io5';
import * as api from 'src/services';
import { useMutation } from 'react-query';

DeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  apicall: PropTypes.func.isRequired,
  endPoint: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  deleteMessage: PropTypes.string.isRequired
};

const reasons = ['User wishes to take a break.', 'Account inactivity for a prolonged period.', 'Security concerns.'];

export default function DeleteDialog({ onClose, apicall, endPoint, type, deleteMessage }) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const { isLoading, mutate } = useMutation(api[endPoint], {
    onSuccess: () => {
      toast.success(type);
      apicall((prev) => ({ ...prev, apicall: !prev.apicall }));
      onClose();
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    }
  });

  const handleDelete = () => {
    if (!reason) {
      setError('Reason is required');
      return;
    }
    setError(''); // Clear error if selection is valid
    mutate({ deleteReason: reason });
  };

  const handleChangeReason = (event) => {
    setReason(event.target.value);
    setError(''); // Reset error when user selects a reason
  };

  return (
    <>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 1
        }}
      >
        <Box
          sx={{
            height: 40,
            width: 40,
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.2),
            borderRadius: '50px',
            color: (theme) => theme.palette.error.main,
            mr: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IoWarning size={24} />
        </Box>
        Deactivate Account
      </DialogTitle>

      <DialogContent sx={{ pb: '16px !important' }}>
        {/* <DialogContentText>{deleteMessage}</DialogContentText> */}

        <Stack spacing={1} width={1} mt={2}>
          <Typography variant="body" color="text.primary">
            Select Reason
          </Typography>

          <FormControl component="fieldset" error={!!error}>
            <RadioGroup value={reason} onChange={handleChangeReason}>
              {reasons.map((r, index) => (
                <FormControlLabel key={index} value={r} control={<Radio />} label={r} />
              ))}
            </RadioGroup>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ pt: '8px !important' }}>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton variant="contained" loading={isLoading} onClick={handleDelete} color="error">
          Deactivate
        </LoadingButton>
      </DialogActions>
    </>
  );
}
