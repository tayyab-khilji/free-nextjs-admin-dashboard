import PropTypes from 'prop-types';
import { sum } from 'lodash';
import { useSelector } from 'react-redux';
import { useRouter } from 'next-nprogress-bar';

// mui
import { IconButton, Stack, Badge, Typography, alpha } from '@mui/material';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

import { IoPersonCircleOutline } from 'react-icons/io5';

// custom hooks
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';
import { position } from 'stylis';
import { useEffect, useState } from 'react';
export default function LogInWidget() {
  const {
    checkout: { cart }
  } = useSelector(({ product }) => product);
  const router = useRouter();

  const [link, setLink] = useState(null);
  const totalItems = sum(cart?.map((item) => item.quantity));
  const subtotal = sum(cart?.map((product) => (product.priceSale || product.price) * product.quantity));
  const total = subtotal;
  const cCurrency = useCurrencyConvert();
  const { user, isAuthenticated } = useSelector(({ user }) => user);

  useEffect(() => {
    if (!isAuthenticated) setLink('/auth/login');
    else setLink(null);
  }, [isAuthenticated]);

  const handleNavigation = () => {
    if (link) {
      router.push(link);
    } else {
      console.log('Navigation prevented (user is authenticated or link is explicitly null).');
      // Optionally, you can perform other actions when authenticated
    }
  };
  return (
    <Stack
      onClick={handleNavigation}
      direction="row"
      spacing={1}
      alignItems="center"
      width="auto"
      sx={{ cursor: 'pointer' }}
    >
      {/* <Badge
        showZero={false}
        badgeContent={totalItems}
        color="error"
        max={99}
        sx={{ zIndex: 0, span: { top: '4px', right: '-2px' } }}
      > */}
      <IconButton name="cart" sx={{ color: '#fff', fontSize: 35 }}>
        <IoPersonCircleOutline />
      </IconButton>
      {/* </Badge> */}

      {/* <IconButton
        name="cart"
        sx={{
          color: '#fff',
          fontSize: 35
        }}
      >
        <BsCart2 />
      </IconButton> */}
    </Stack>
  );
}
LogInWidget.propTypes = { checkout: PropTypes.object.isRequired };
