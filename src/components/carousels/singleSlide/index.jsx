'use client';
// react
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

// mui
import { Box, Paper, Typography, Card, Stack } from '@mui/material';
// framer motion
import { motion, AnimatePresence } from 'framer-motion';
// components
import Actions from './actions';

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

// ----------------------------------------------------------------------
CarouselItem.propTypes = {
  item: PropTypes.shape({
    cover: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    btnPrimary: PropTypes.shape({
      url: PropTypes.string.isRequired,
      btnText: PropTypes.string.isRequired
    }).isRequired,
    btnSecondary: PropTypes.shape({
      url: PropTypes.string.isRequired,
      btnText: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
};

function CarouselItem({ ...props }) {
  const { item } = props;

  return (
    <Paper
      sx={{
        position: 'relative',
        borderBottom: (theme) => '1px solid ' + theme.palette.divider,
        zIndex: 11,
        height: { xs: 125, sm: 225, md: 270, lg: 370 },
        borderRadius: 0,
        img: {
          borderRadius: 0,
          objectPosition: { md: 'center', xs: 'left' }
        }
      }}
    >
      <Image
        priority
        src={item?.webImage?.url || item?.photo?.url}
        alt="centered-banner"
        layout="fill"
        placeholder="blur"
        blurDataURL={item?.webImage?.blurDataURL || item?.photo?.blurDataURL || 'data:image/jpeg;base64'}
        objectFit="cover"
        static
        draggable="false"
        sizes="700px"
      />
      <Box
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
      />
    </Paper>
  );
}

export default function SingleSlideCarousel({ ...props }) {
  const { data, isLoading } = props;
  const { themeMode } = useSelector(({ settings }) => settings);
  const [[page, direction], setPage] = useState([0, 0]);

  const response = data?.data;
  const imageIndex = Math.abs(page % response?.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPage(([prevPage, prevDirection]) => [prevPage + 1, 1]);
    }, 6000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const isEmpty = !Boolean(response?.length);

  return (
    <Card
      sx={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        height: { xs: 120, sm: 220, md: 250, lg: 343 },
        borderRadius: '12px',
        overflow: 'hidden'
      }}
    >
      {isEmpty && !isLoading ? (
        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Typography variant="h4" color="text.secondary">
            Slides are not uploaded yet!
          </Typography>
        </Stack>
      ) : (
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              top: 0
            }}
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <CarouselItem
              themeMode={themeMode}
              item={response ? response[imageIndex] : null}
              index={response ? response[imageIndex] : null}
              activeStep={imageIndex}
              isActive={imageIndex}
              key={Math.random()}
            />
          </motion.div>
        </AnimatePresence>
      )}
      {!isEmpty && response?.length && (
        <Actions active={imageIndex} themeMode={themeMode} setPage={setPage} paginate={paginate} data={response} />
      )}
    </Card>
  );
}

SingleSlideCarousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      cover: PropTypes.string.isRequired,
      heading: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      btnPrimary: PropTypes.shape({
        url: PropTypes.string.isRequired,
        btnText: PropTypes.string.isRequired
      }).isRequired,
      btnSecondary: PropTypes.shape({
        url: PropTypes.string.isRequired,
        btnText: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  isLoading: PropTypes.bool
};
