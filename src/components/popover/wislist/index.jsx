// react
import React from 'react';
import { useRouter } from 'next-nprogress-bar';
import PropTypes from 'prop-types';

// mui
import { IconButton, Stack, Typography, alpha } from '@mui/material';
import { IoMdHeartEmpty } from 'react-icons/io';
import { useSelector } from 'react-redux';

WishlistPopover.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

// ----------------------------------------------------------------------
export default function WishlistPopover() {
  const router = useRouter();

  const { wishlist } = useSelector(({ wishlist }) => wishlist);
  const { isAuthenticated } = useSelector(({ user }) => user);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        width="auto"
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          if (!isAuthenticated) {
            router.push('/auth/login');
          } else {
            router.push('/account/wishlist');
          }
        }}
        spacing={1}
      >
        <IconButton
          name="wishlist"
          sx={{
            ml: 1,
            fontSize: 32,
            color: '#fff'
          }}
          onClick={() => {
            if (!isAuthenticated) {
              router.push('/auth/login');
            } else {
              router.push('/account/wishlist');
            }
          }}
        >
          <IoMdHeartEmpty />
        </IconButton>
      </Stack>
    </>
  );
}
