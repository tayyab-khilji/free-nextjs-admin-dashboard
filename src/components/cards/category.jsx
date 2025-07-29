


'use client';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Typography, Card, Box, Skeleton, Stack } from '@mui/material';
import Image from 'src/components/blurImage';

export default function CategoriesCard({ category, isLoading }) {
  const baseUrl = '/all-categories/';

  return (
    <Stack spacing={2} alignItems="center">
      {isLoading ? (
        <Card 
          sx={{
            transform: 'scale(1.0)',
            transition: 'all 0.2s ease-in-out',
            height: { xs: 135, md: 155 },
            border: 'none !important',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '10px'
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              height: '70%',
              width: '70%',
              mx: 'auto',
              mb: 1
            }}
          />
          <Typography>
            <Skeleton variant="text" width={100} />
          </Typography>
        </Card>
      ) : (
        <Link href={`${baseUrl}${category?.slug}`} passHref legacyBehavior>
          <a style={{ textDecoration: 'none' }}>
            <Card  
              sx={{
                transform: 'scale(1.0)',
                transition: 'all 0.2s ease-in-out',
                width: { xs: 78, md: 120 },
                height: { xs: 86, md: 140 },
              
                border: 'none !important',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                '&:hover': {
                  transform: 'scale(1.05)',
                  color: '#000'
                },
                margin: '5px'
              }}
            >
              {/* Image Box */}
              <Box
                className="image-wrapper"
                sx={{
                  position: 'relative',
                  width: '70%',
                  '&:after': {
                    content: `""`,
                    display: 'block',
                    paddingBottom: '100%'
                  }
                }}
              >
                <Image
                  alt="category"
                  src={category?.cover?.url || 'https://buyhalalgoods.com/wp-content/uploads/2024/06/Halal-01.png'}
                  placeholder="blur"
                  blurDataURL={category?.cover?.blurDataURL}
                  layout="fill"
                  static
                  draggable="false"
                  quality={5}
                  sizes={'50vw'}
                />
              </Box>

              {/* Category Name */}
              <Typography
                textAlign="center"
                sx={{
                  textTransform: 'capitalize',
                  maxWidth: '90%',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize:"11px",
                  width:"61px",
                  height:"34px"
                }}
              >
                {category?.name}
              </Typography>
            </Card>
          </a>
        </Link>
      )}
    </Stack>
  );
}

CategoriesCard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      url: PropTypes.string,
      blurDataURL: PropTypes.string
    }),
    name: PropTypes.string.isRequired
  }).isRequired
};
