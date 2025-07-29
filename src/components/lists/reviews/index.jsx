import Image from 'src/components/blurImage';
import PropTypes from 'prop-types';
// icons
import { MdVerified } from 'react-icons/md';
// mui
import { Box, List, ListItem, Typography, Divider, Grid, Avatar } from '@mui/material';
import Rating from '@mui/material/Rating';
// utils
import { fDate } from 'src/utils/formatTime';
// components
import BlurImage from 'src/components/blurImage';

ReviewItem.propTypes = {
  review: PropTypes.shape({
    user: PropTypes.shape({
      cover: PropTypes.shape({
        url: PropTypes.string
      }),
      // firstName: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string
    }),
    isPurchased: PropTypes.bool,
    createdAt: PropTypes.string,
    review: PropTypes.string,
    rating: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string
  }),
  isLoading: PropTypes.bool
};

ProductDetailsReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool
};

function ReviewItem({ ...props }) {
  const { review, isLoading } = props;

  const userInitials = review?.user?.name
    ? review?.user?.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'NA';

  return (
    <Box pt={2}>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          px: 2,
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <Box
          sx={{
            mr: 1,
            display: 'flex',
            alignItems: 'center',
            mb: { xs: 2, sm: 0 },
            textAlign: { sm: 'center' },
            flexDirection: { sm: 'column' }
          }}
        >
          {/* {review.user?.cover?.url ? (
            <Box
              sx={{
                mr: { xs: 2, sm: 0 },
                mb: { sm: 2 },
                width: 34,
                height: 34,
                position: 'relative',
                borderRadius: 50,
                overflow: 'hidden'
              }}
            >
              <BlurImage
                src={review.user?.cover?.url}
                alt={review.user?.name + ' review'}
                priority
                layout="fill"
                objectFit="cover"
              />
            </Box>
          ) : ( */}
          {/* <Avatar sx={{ height: 34, width: 34 }}>{userInitials}</Avatar> */}
          <Avatar
            alt="User Profile"
            sx={{
              width: 48,
              height: 48,
              backgroundColor: '#d1e9fc',
              color: '#1976d2',
              fontWeight: 'bold'
            }}
          >
            {userInitials}
          </Avatar>
          {/* )} */}
        </Box>

        <Box width={1}>
          <Box sx={{ float: 'right' }}>
            {review?.isPurchased && (
              <Typography
                variant="caption"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'primary.main'
                }}
              >
                <MdVerified size={16} />
                &nbsp;Verified Purchase
              </Typography>
            )}
            {<Rating size="small" value={review.rating} precision={0.1} readOnly sx={{ float: 'right' }} />}
          </Box>
          <Typography variant="subtitle1" noWrap sx={{ textTransform: 'capitalize' }}>
            {/* {review.user?.firstName} {review.user?.lastName} */}
            {review.user?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }} mt={-0.5} noWrap>
            {fDate(review.createdAt)}
          </Typography>
          <Typography variant="subtitle2" mb={1} fontWeight={400}>
            {review.review}
          </Typography>
        </Box>
      </ListItem>
      {!isLoading && Boolean(review.images.length) ? (
        <>
          <Box p={3}>
            <Grid container spacing={2} sx={{ img: { borderRadius: '8px' } }}>
              {review.images.map((image) => (
                <Grid item xs={6} md={3} lg={2} key={Math.random()}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 100
                    }}
                  >
                    {' '}
                    <Image
                      src={image.url}
                      alt={review.name + "'s review"}
                      layout="fill"
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      ) : null}
      <Divider />{' '}
    </Box>
  );
}

ProductDetailsReviewList.propTypes = {
  product: PropTypes.object
};

export default function ProductDetailsReviewList({ ...props }) {
  const { reviews, isLoading } = props;
  return (
    <Box>
      <List disablePadding>
        {reviews?.map((review) => (
          <ReviewItem key={Math.random()} review={review} isLoading={isLoading} />
        ))}
      </List>
    </Box>
  );
}
