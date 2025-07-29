import PropTypes from 'prop-types';
// mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  Skeleton,
  Stack
} from '@mui/material';
import { IoClose } from 'react-icons/io5';

//components
import RootStyled from './styled';
import Incrementer from 'src/components/incrementer';
// hooks
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';
import BlurImage from 'src/components/blurImage';

const ThumbImgStyle = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  marginRight: theme.spacing(2),
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  overflow: 'hidden'
}));

// ----------------------------------------------------------------------

export default function CartProductList({ ...props }) {
  const { onDelete, onIncreaseQuantity, onDecreaseQuantity, isLoading, cart } = props;

  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  return (
    <RootStyled>
      <Table>
        <TableHead>
          <TableRow className="table-head-row">
            <TableCell>{isLoading ? <Skeleton variant="text" width={100} /> : 'Product'}</TableCell>
            <TableCell align="center">
              {isLoading ? <Skeleton variant="text" width={80} sx={{ mx: 'auto' }} /> : 'Price'}
            </TableCell>
            <TableCell align="center">
              {isLoading ? <Skeleton variant="text" width={80} sx={{ mx: 'auto' }} /> : 'Quantity'}
            </TableCell>

            <TableCell align="center">
              {isLoading ? <Skeleton variant="text" width={63} sx={{ mx: 'auto' }} /> : 'Total Price'}
            </TableCell>
            <TableCell align="right">
              {isLoading ? <Skeleton variant="text" width={44} sx={{ ml: 'auto' }} /> : 'Action'}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {cart.map((product) => {
            // const { sku, name, size, color, category, brand, quantity, available, price, priceSale, image } = product;
            const {
              sku,
              productId,
              variationId,
              variationName,
              productName,
              stockQuantity,
              size,
              color,
              category,
              brand,
              quantity,
              available,
              price,
              multipleValuesField,
              discountedPrice,
              subtotal,
              image
            } = product;

            // const {
            //   product: { _id: productId, name: productName },
            //   variation: {
            //     _id: variationId,
            //     name: variationName,
            //     stockQuantity,
            //     price: variationPrice,
            //     images,
            //     discountedPrice
            //   },
            //   quantity,
            //   multipleValuesField,
            //   price,
            //   vendor,
            //   totalPrice,
            //   status,
            //   _id: itemId // Unique ID for the cart item
            // } = item;

            // // const sku = productName + '-' + variationName;
            // const sku = `${variationName} - ${productName}`;

            return (
              <TableRow key={Math.random()}>
                <TableCell>
                  <Box className="product-sec">
                    {isLoading ? (
                      <Skeleton variant="rounded" width={56} height={56} sx={{ mr: 2 }} />
                    ) : (
                      <ThumbImgStyle>
                        <BlurImage priority fill alt="product image" src={image} />
                      </ThumbImgStyle>
                    )}
                    <Box>
                      <Typography
                        noWrap
                        variant="subtitle1"
                        className="subtitle"
                        lineHeight={1}
                        mb={0 + '!important'}
                        paddingY={0.7}
                      >
                        {isLoading ? <Skeleton variant="text" width={150} /> : `${variationName} - ${productName}`}
                      </Typography>

                      {/* <Stack>
                        <Stack direction="row" gap={2}>
                          {isLoading ? (
                            <Skeleton variant="text" width={60} />
                          ) : (
                            <Typography variant="body2" sx={{ span: { textTransform: 'uppercase' } }}>
                              <b>Brand:</b> <span>{brand}</span>
                            </Typography>
                          )}
                          {isLoading ? (
                            <Skeleton variant="text" width={60} />
                          ) : (
                            <Typography variant="body2" sx={{ span: { textTransform: 'uppercase' } }}>
                              <b>Category:</b> <span>{category}</span>
                            </Typography>
                          )}
                        </Stack>
                      </Stack> */}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  {isLoading ? (
                    <Skeleton variant="text" width={52} sx={{ mx: 'auto' }} />
                  ) : (
                    <Typography variant="body1" color="text.primary" fontWeight={600}>
                      ${discountedPrice.toFixed(2) || price.toFixed(2)}
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    '& > div': {
                      mx: 'auto'
                    }
                  }}
                >
                  {isLoading ? (
                    <Stack width={96} sx={{ mx: 'auto' }}>
                      <Skeleton variant="rounded" width={96} height={36} />
                      <Skeleton variant="rounded" width={40} height={12} sx={{ ml: 'auto', mt: 0.5 }} />
                    </Stack>
                  ) : (
                    <Incrementer
                      quantity={quantity}
                      available={stockQuantity}
                      onDecrease={() =>
                        onDecreaseQuantity(sku, productId, variationId, multipleValuesField, quantity - 1)
                      }
                      onIncrease={() =>
                        onIncreaseQuantity(sku, productId, variationId, multipleValuesField, quantity + 1)
                      }
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  {isLoading ? (
                    <Skeleton variant="text" width={52} sx={{ mx: 'auto' }} />
                  ) : (
                    <Typography variant="subtitle2">${((discountedPrice || price) * quantity).toFixed(2)}</Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  {isLoading ? (
                    <Skeleton variant="circular" width={40} height={40} sx={{ ml: 'auto' }} />
                  ) : (
                    <IconButton
                      aria-label="delete"
                      color="inherit"
                      onClick={() => onDelete(sku, productId, variationId)}
                      size="small"
                    >
                      <IoClose size={24} />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </RootStyled>
  );
}

CartProductList.propTypes = {
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
  isLoading: PropTypes.bool,
  // cart: PropTypes.arrayOf(PropTypes.object).isRequired
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      sku: PropTypes.string.isRequired,
      variationName: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      productId: PropTypes.string.isRequired,
      variationId: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      stockQuantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      discountedPrice: PropTypes.number,
      subtotal: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired
    })
  )
};
