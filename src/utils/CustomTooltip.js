// components/CustomTooltip.js
import React, { useState } from 'react';
import { Tooltip, tooltipClasses, Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    arrow
    classes={{ popper: className }}
    placement="top"
    componentsProps={{
      tooltip: {
        sx: {
          p: 0,
          borderRadius: '12px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
          backgroundColor: '#ffffff',
        }
      },
      arrow: {
        sx: {
          color: '#ffffff',
        }
      }
    }}
  />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    color: '#000000',
    maxWidth: '300px',
    fontFamily: 'Inter, sans-serif',
  },
}));

export default function CustomTooltip({ title, message, children }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <StyledTooltip
      title={
        show && (
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {title && (
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {title}
                </Typography>
              )}
              <IconButton size="small" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            {message && (
              <Typography variant="body2">
                {message}
              </Typography>
            )}
          </Box>
        )
      }
    >
      {children}
    </StyledTooltip>
  );
}
