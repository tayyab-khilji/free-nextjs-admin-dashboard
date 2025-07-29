import PropTypes from 'prop-types';
import { sum } from 'lodash';
import { useSelector } from 'react-redux';
import { useRouter } from 'next-nprogress-bar';

// mui
import { IconButton, Stack, Badge, Typography, alpha } from '@mui/material';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

import { BsCart2 } from 'react-icons/bs';

// custom hooks
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';
import { position } from 'stylis';
export default function CartWidget() {
  const {
    checkout: { cart, totalCartItems }
  } = useSelector(({ product }) => product);
  const router = useRouter();

  // const totalItems = totalCartItems.payload; // sum(cart?.map((item) => item.quantity));
  const totalItems = totalCartItems?.payload ?? 0;
  // const subtotal = sum(cart?.map((product) => (product.priceSale || product.price) * product.quantity));
  // const total = subtotal;
  // const cCurrency = useCurrencyConvert();
  return (
    <Stack
      onClick={() => router.push('/cart')}
      direction="row"
      spacing={1}
      alignItems="center"
      width="auto"
      sx={{
        cursor: 'pointer'
      }}
    >
      <Badge
        showZero={false}
        badgeContent={totalItems}
        color="error"
        max={99}
        sx={{ zIndex: 0, span: { top: '4px', right: '-2px' } }}
      >
        <IconButton
          name="cart"
          sx={{
            color: '#fff',
            fontSize: 35
          }}
        >
          <BsCart2 />
        </IconButton>
      </Badge>

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
CartWidget.propTypes = {
  checkout: PropTypes.object.isRequired
};
