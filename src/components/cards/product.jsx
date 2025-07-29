'use client';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next-nprogress-bar';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';

import RootStyled from 'src/components/_main/product/summary/styled';

// mui
import {
  Box,
  Card,
  Typography,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  Tooltip,
  Skeleton,
  Zoom,
  Button
} from '@mui/material';

// components
import { useDispatch } from 'src/redux/store';
import { setWishlist } from 'src/redux/slices/wishlist';
import { addCompareProduct, removeCompareProduct } from '../../redux/slices/compare';
import ColorPreviewGroup from 'src/components/colorPreviewGroup';

import Label from 'src/components/label';
import BlurImage from 'src/components/blurImage';
// hooks
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';
// api
import * as api from 'src/services';
// icons
import { IoMdHeartEmpty } from 'react-icons/io';
import { GoEye } from 'react-icons/go';
import { GoGitCompare } from 'react-icons/go';
import { IoIosHeart } from 'react-icons/io';
import { FaRegStar } from 'react-icons/fa';
import Image from 'next/image';
import { IoIosHeartEmpty } from 'react-icons/io';
import { TbMessage } from 'react-icons/tb';

// dynamic
const ProductDetailsDialog = dynamic(() => import('../dialog/productDetails'));
export default function ShopProductCard({ ...props }) {
  const { product, loading } = props;
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();

  const [open, setOpen] = useState(false);
  const [openActions, setOpenActions] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  // type error
  const { wishlist } = useSelector(({ wishlist }) => wishlist);
  const { products: compareProducts } = useSelector(({ compare }) => compare);

  const { isAuthenticated } = useSelector(({ user }) => user);

  const isTablet = useMediaQuery('(max-width:900px)');
  const [isLoading, setLoading] = useState(false);

  const { mutate } = useMutation(api.updateWishlist, {
    onSuccess: (data, variables) => {
      toast.success(data.message);
      setLoading(false);

      const { productId, action } = variables;

      if (action === 'add') {
        dispatch(setWishlist([...wishlist, productId]));
      } else {
        dispatch(setWishlist(wishlist.filter((itemId) => itemId !== productId)));

        // dispatch(setWishlist(wishlist.filter((id) => id !== productId)));
      }
    },
    onError: (err) => {
      setLoading(false);
      const message = JSON.stringify(err.response.data.message);
      toast.error(t(message ? t('common:' + JSON.parse(message)) : t('common:something-wrong')));
    }
  });

  const { name, slug, image, variations, _id, averageRating } = !loading && product;

  const linkTo = `/product/${slug ? slug : ''}`;

  const onClickWishList = async (event, actionType) => {
    if (!isAuthenticated) {
      event.stopPropagation();
      router.push('/auth/login');
    } else {
      event.stopPropagation();
      setLoading(true);
      await mutate({ productId: _id, action: actionType });
    }
  };
  const onAddCompare = async (event) => {
    event.stopPropagation();
    toast.success('Added to compare list');
    dispatch(addCompareProduct(product));
  };

  const onRemoveCompare = async (event) => {
    event.stopPropagation();
    toast.success('Removed from compare list');
    dispatch(removeCompareProduct(_id));
  };


  return (
    <RootStyled>
      <Card
        onMouseEnter={() => !isLoading && setOpenActions(true)}
        onMouseLeave={() => setOpenActions(false)}
        sx={{
          display: 'block',
          boxShadow: 'none',
          border: 'none !important',
          borderRadius: 0,
          bgcolor: 'transparent',
          width: '200px'
        }}
      >
        <Box
          sx={{
            position: 'relative'
          }}
        >
          {!loading && product?.variations?.[0]?.stockQuantity < 1 && (
            <Label
              variant="filled"
              color={'error'}
              sx={{
                top: isTablet ? 8 : 12,
                left: isTablet ? 8 : 12,
                zIndex: 9,
                position: 'absolute',
                textTransform: 'uppercase',
                fontSize: isTablet ? 8 : 12
              }}
            >
              Out of Stock
            </Label>
          )}
          <Box
            {...(!(isLoading || loading) && {
              component: Link,
              href: linkTo
            })}
            sx={{
              bgcolor: isLoading || loading ? 'transparent' : 'common.white',
              position: 'relative',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            <Button className='heart_btn'
              sx={{
                fontSize: '35px',
                color: '#fff',
                position: 'absolute',
                right: '5px',
                top: '10px',
                zIndex: '10',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#65D235'
                }
              }}
            >

              {/* <IoIosHeartEmpty /> */}
              {wishlist?.filter((v) => v === _id).length > 0 ? (
                <Tooltip title="Remove from wishlist">
                  <IconButton
                    disabled={isLoading}
                    onClick={(event) => onClickWishList(event, 'remove')}
                    aria-label="Remove from wishlist"
                    color="primary"
                    size={isTablet ? 'small' : 'medium'}
                  >
                    <IoIosHeart />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Add to wishlist">
                  <IconButton
                    disabled={isLoading}
                    onClick={(event) => onClickWishList(event, 'add')}
                    aria-label="add to wishlist"
                    size={isTablet ? 'small' : 'medium'}
                  >
                    {/* <IoMdHeartEmpty /> */}
                    <IoIosHeartEmpty />
                  </IconButton>
                </Tooltip>
              )}
            </Button>



            <Box style={{ width: '200px' }} sx={{ position: 'relative', width: '100%', height: '196px' }} mb={2}>
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  sx={{
                    height: '100%',
                    position: 'absolute'
                  }}
                />
              ) : (
                <Image
                  className="prod_image"
                  alt={name}
                  src={variations?.[0]?.mainImage?.url || variations[0]?.images[0]?.url}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              )}
            </Box>
          </Box>
        </Box>

        <Stack className='nameprice'
          justifyContent="center"
          sx={{
            zIndex: 111,
            p: 1,
            width: '100%',

            a: {
              color: 'text.primary',
              textDecoration: 'none'
            }
          }}
        >
          {/* name and icon------ */}
          <Box className="imgcard_text" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              sx={{
                cursor: 'pointer',
                textTransform: 'capitalize'
                // fontWeight: 500,
              }}
              // {...(product?.available > 0 && {
              {...(!(isLoading || loading) && {
                component: Link,
                href: linkTo
              })}
              variant={'subtitle1'}
              noWrap
            >
              {loading ? <Skeleton variant="text" width={120} /> : name}
            </Typography>

            {/* <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#eeeeee',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                textAlign: 'center'
              }}
            >
              <Typography variant="" color="text.primary" sx={{ fontSize: '12px', fontWeight: '600' }}>
                {loading ? (
                  <Skeleton variant="text" width={72} />
                ) : (
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
                    <TbMessage size={18} /> &nbsp;{averageRating?.toFixed(1) || 0}
                  </Stack>
                )}
              </Typography>
            </Box> */}
          </Box>

          {/* <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          
          {loading ? (
            <Skeleton variant="text" width={72} />
          ) : (
            <ColorPreviewGroup limit={3} colors={product?.colors} sx={{ minWidth: 72 }} />
          )}
        </Stack> */}

          {/* <Stack spacing={0.5} direction="row" justifyContent={'space-between'} alignItems="center">
          {loading ? (
            <Skeleton variant="text" width={120} />
          ) : (
            <Typography
              component="p"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '10px',
                fontWeight: '600',
                color: '#6B6B6B'
              }}
            >
              <span>30 - 35 min.</span>
              &nbsp;
              <span className="discount">0.2 mi</span>
            </Typography>
          )}
        </Stack> */}

          {/* price and red text----- */}
          <Stack spacing={0.5} direction="row" justifyContent={'space-between'} alignItems="center">
            {loading ? (
              <Skeleton variant="text" width={120} />
            ) : (
              // <Typography
              //   component="p"
              //   sx={{
              //     display: 'flex',
              //     alignItems: 'center',
              //     fontSize: '14px', // Increased font size
              //     fontWeight: '600',
              //     color: '#00008B' // Dark blue color
              //   }}
              // >

              // red text------

              <Typography variant="h6" className="text-price">
                $
                {variations?.[0]?.discountedPrice
                  ? variations?.[0]?.discountedPrice.toFixed(2)
                  : variations?.[0]?.price.toFixed(2)}{' '}
                &nbsp;
                {variations?.[0]?.price === variations?.[0]?.discountedPrice ||
                  variations?.[0]?.discountedPrice === undefined ? null : (
                  <Typography component="span" className="old-price" color="red">
                    {'$' + variations?.[0]?.price.toFixed(2)}
                  </Typography>
                )}
              </Typography>

              // {`$${variations?.[0]?.discountedPrice}`}

              // </Typography>
            )}
          </Stack>
        </Stack>

        {open && <ProductDetailsDialog slug={product.slug} open={open} onClose={() => setOpen(false)} />}
      </Card>
    </RootStyled>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string,
    sku: PropTypes.string,
    status: PropTypes.string,
    image: PropTypes.object.isRequired,
    variations: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    priceSale: PropTypes.number,
    available: PropTypes.number,
    colors: PropTypes.array,
    averageRating: PropTypes.number
  }),
  loading: PropTypes.bool.isRequired
};
