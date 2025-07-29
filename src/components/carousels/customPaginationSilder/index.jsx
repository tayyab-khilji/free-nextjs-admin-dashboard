  'use client';
  import PropTypes from 'prop-types';
  import { useEffect, useState } from 'react';
  import BlurImage from 'src/components/blurImage';
  import {
    Box,
    Stack,
    Typography,
    Divider,
    useMediaQuery,
    useTheme,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton
  } from '@mui/material';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
  import NavigateNextIcon from '@mui/icons-material/NavigateNext';
  import RootStyled from './styled';
  import ProductImageViewer from './productImageViewer';

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  ProductDetailsCarousel.propTypes = {
    item: PropTypes.object.isRequired
  };

  function ProductDetailsCarousel({ item }) {
    return (
      <div className="slide-wrapper">
        {item && (
          <BlurImage
            priority
            fill
            objectFit="cover"
            sizes="50%"
            src={item?.url || item?.src}
            alt="hero-carousel"
            placeholder="blur"
            blurDataURL={item.blurDataURL}
          />
        )}
        <Box className="bg-overlay" />
      </div>
    );
  }

  export default function CarouselAnimation({ product, images: propImages, selectedVariation, onWishListClicked }) {
    const images = propImages || [];
    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = images.length > 0 ? Math.abs(page % images.length) : 0;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    const paginate = (newDirection) => {
      if (images.length > 0) {
        setPage([page + newDirection, newDirection]);
      }
    };

    return (
      <RootStyled>
        <div className="carousel-wrap">
          {images.length > 0 ? (
            <Box sx={{ position: 'relative' }}>
              <ProductImageViewer
                images={images}
                _id={product?._id}
                updateWishList={onWishListClicked}
                clickedIndex={imageIndex}
                item={images?.[imageIndex]}
                clickedPage={page}
                paginateSlide={paginate}
                isMobile={isMobile}
              />

              {isMobile && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 1,
                    transform: 'translateY(-50%)'
                  }}
                ></Box>
              )}

              {isMobile && (
                <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 1 }}>
                  {images.map((_, i) => (
                    <Box
                      key={i}
                      onClick={() => setPage([i, i])}
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: i === imageIndex ? 'primary.main' : 'grey.400',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </Stack>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                width: '100%',
                height: isMobile ? 320 : 450,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #ddd',
                borderRadius: 2,
                [theme.breakpoints.down('sm')]: {
                  borderRadius: 0,
                  border: 'none'
                }
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No images available
              </Typography>
            </Box>
          )}

          {!isMobile && (
            <Stack
              direction="row"
              justifyContent={images.length < 6 ? 'center' : 'left'}
              spacing={1}
              className="controls-wrapper"
              sx={{ mt: 2, overflowX: 'auto', pb: 1 }}
            >
              {images?.map((item, i) => (
                <Box
                  key={`thumbnail-${i}`}
                  className={`controls-button ${imageIndex === i ? 'active' : ''}`}
                  onClick={() => setPage([i, i])}
                >
                  <BlurImage
                    priority
                    fill
                    objectFit="cover"
                    sizes="(max-width: 600px) 15vw, 10vw"
                    src={item?.src || item?.url}
                    alt={`Product T  humbnail ${i + 1}`}
                    placeholder="blur"
                    blurDataURL={item.blurDataURL}
                  />
                </Box>
              ))}
            </Stack>
          )}

          <Divider sx={{ mt: 3 }} />

          {isClient ? (
            isMobile ? (
              <Accordion
                style={{ display: 'none' }}
                disableGutters
                elevation={0}
                sx={{ bgcolor: 'transparent', '&:before': { display: 'none' }, mt: 2 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="product-information-content"
                  id="product-information-header"
                  sx={{
                    bgcolor: '#f8f9fa',
                    borderRadius: 2,
                    minHeight: '48px !important',
                    '& .MuiAccordionSummary-content': { my: '12px !important' }
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Product Information
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <Typography variant="body1" sx={{ mt: 0 }}>
                    <strong>Product Dimensions:</strong> {selectedVariation?.productLength} x{' '}
                    {selectedVariation?.productWidth} x {selectedVariation?.productHeight}{' '}
                    {selectedVariation?.productDimensionUnit}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Product Weight:</strong> {selectedVariation?.productWeight}{' '}
                    {selectedVariation?.productWeightUnit}
                  </Typography>
                  {product?.dataField?.map((field, index) => {
                    if (
                      field.fieldValue &&
                      field.productField?.variationType !== 'CERTIFICATION' &&
                      field.productField?.fieldType !== 'TEXTBOX' &&
                      field.productField?.fieldType !== 'NUMERIC_TEXTBOX'
                    ) {
                      return (
                        <Typography variant="body1" key={index} sx={{ mt: 1 }}>
                          <strong>{field.productField?.title}:</strong>{' '}
                          {field.productField?.fieldType === 'switch'
                            ? field.fieldValue === 1
                              ? 'Enabled'
                              : 'Disabled'
                            : field.fieldValue}
                        </Typography>
                      );
                    }
                    return null;
                  })}
                </AccordionDetails>
              </Accordion>
            ) : (
              <Box sx={{ bgcolor: '#f8f9fa', p: 3, borderRadius: 2, mt: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Product Information
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  <strong>Product Dimensions:</strong> {selectedVariation?.productLength} x{' '}
                  {selectedVariation?.productWidth} x {selectedVariation?.productHeight}{' '}
                  {selectedVariation?.productDimensionUnit}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Product Weight:</strong> {selectedVariation?.productWeight}{' '}
                  {selectedVariation?.productWeightUnit}
                </Typography>
                {product?.dataField?.map((field, index) => {
                  if (
                    field.fieldValue &&
                    field.productField?.variationType !== 'CERTIFICATION' &&
                    field.productField?.fieldType !== 'TEXTBOX' &&
                    field.productField?.fieldType !== 'NUMERIC_TEXTBOX'
                  ) {
                    return (
                      <Typography variant="body1" key={index} sx={{ mt: 1 }}>
                        <strong>{field.productField?.title}:</strong>{' '}
                        {field.productField?.fieldType === 'switch'
                          ? field.fieldValue === 1
                            ? 'Enabled'
                            : 'Disabled'
                          : field.fieldValue}
                      </Typography>
                    );
                  }
                  return null;
                })}
              </Box>
            )
          ) : (
            <Box sx={{ bgcolor: '#f8f9fa', p: 3, borderRadius: 2, mt: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Product Information
              </Typography>
              <Typography variant="body1">Loading product information...</Typography>
            </Box>
          )}
        </div>
      </RootStyled>
    );
  }

  CarouselAnimation.propTypes = {
    product: PropTypes.object,
    images: PropTypes.array,
    selectedVariation: PropTypes.object,
    onWishListClicked: PropTypes.func
  };
