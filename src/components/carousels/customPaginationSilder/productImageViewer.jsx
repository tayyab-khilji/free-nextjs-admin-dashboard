

// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import {
//   Box,
//   IconButton,
//   Tooltip,
//   Stack,
//   Button,
//   Typography,
//   Dialog,
//   DialogContent,
//   useMediaQuery
// } from '@mui/material';

// import { FavoriteBorder, Share, ZoomIn, ChevronLeft, ChevronRight, Close } from '@mui/icons-material';
// import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image';
// import { useTheme } from '@mui/material/styles';
// import { GoArrowLeft } from 'react-icons/go';
// import { GoArrowRight } from 'react-icons/go';

// import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
// import { toast } from 'react-hot-toast';
// import { useSelector } from 'react-redux';

// const variants = {
//   enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
//   center: { x: 0, opacity: 1 },
//   exit: (direction) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 })
// };

// const swipeConfidenceThreshold = 10000;
// const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

// const ProductImageViewer = ({ images, _id, item, clickedIndex, updateWishList, clickedPage, paginateSlide }) => {
//   const [imageIndex, setImageIndex] = useState(clickedIndex || 0);
//   const [magnify, setMagnify] = useState(false);
//   const [origin, setOrigin] = useState({ x: '50%', y: '50%' });
//   const [openFullScreen, setOpenFullScreen] = useState(false);

//   const containerRef = useRef(null);
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

//   const { wishlist } = useSelector(({ wishlist }) => wishlist);
//   const { isAuthenticated } = useSelector(({ user }) => user);

//   const paginate = (newDirection) => {
//     paginateSlide(newDirection);
//     setImageIndex((prev) => (prev + newDirection + images.length) % images.length);
//   };

//   useEffect(() => {
//     if (clickedIndex) setImageIndex(clickedIndex);
//   }, [clickedIndex]);

//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = containerRef.current.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setOrigin({ x: `${x}%`, y: `${y}%` });
//   };

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href);
//     toast.success('Product link copied to clipboard!');
//   };

//   const onWishListClicked = async (event, actionType) => {
//     event.stopPropagation();
//     updateWishList(event, actionType);
//   };

//   return (
//     <>
//       {/* Main Viewer */}
//       <Box
//         ref={containerRef}
//         onMouseMove={handleMouseMove}
//         onMouseEnter={() => setMagnify(true)}
//         onMouseLeave={() => setMagnify(false)}
//         sx={{
//           position: 'relative',
//           width: 450,
//           height: 400,
//           overflow: 'hidden',
//           borderRadius: 2,
//           border: '1px solid #ddd'
//         }}
//       >
//         {/* Top-right icons */}
//         <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, display: 'flex', gap: 0 }}>
//           <Tooltip title="View Fullscreen">
//             <IconButton onClick={() => setOpenFullScreen(true)}>
//               <ZoomIn />
//             </IconButton>
//           </Tooltip>

//           <Button>
//             {_id && wishlist?.includes(_id) ? (
//               <Tooltip title="Remove from wishlist">
//                 <IconButton onClick={(event) => onWishListClicked(event, 'remove')} color="primary">
//                   <IoIosHeart />
//                 </IconButton>
//               </Tooltip>
//             ) : (
//               <Tooltip title="Add to wishlist">
//                 <IconButton onClick={(event) => onWishListClicked(event, 'add')}>
//                   <FavoriteBorder />
//                 </IconButton>
//               </Tooltip>
//             )}
//           </Button>

//           <Tooltip title="Copy Product Link">
//             <IconButton onClick={handleShare}>
//               <Share />
//             </IconButton>
//           </Tooltip>
//         </Box>

//         {/* Arrows */}
//         <IconButton
//           onClick={() => paginate(-1)}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: 8,
//             zIndex: 2,
//             transform: 'translateY(-50%)',
//             border: '1px solid #1C1B1F',
//             width: '30px',
//             height: '30px',
//             color: 'black'
//           }}
//         >
//           <GoArrowLeft />
//         </IconButton>
//         <IconButton
//           onClick={() => paginate(1)}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             right: 8,
//             zIndex: 2,
//             transform: 'translateY(-50%)',
//             border: '1px solid #1C1B1F',
//             width: '30px',
//             height: '30px',
//             color: 'black'
//           }}
//         >
//           <GoArrowRight />
//         </IconButton>

//         {/* Image Viewer */}
//         <AnimatePresence initial={false} custom={imageIndex}>
//           <motion.div
//             key={imageIndex}
//             custom={imageIndex}
//             variants={variants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
//             drag="x"
//             dragConstraints={{ left: 0, right: 0 }}
//             dragElastic={1}
//             onDragEnd={(e, { offset, velocity }) => {
//               const swipe = swipePower(offset.x, velocity.x);
//               if (swipe < -swipeConfidenceThreshold) paginate(1);
//               else if (swipe > swipeConfidenceThreshold) paginate(-1);
//             }}
//             style={{ position: 'absolute', width: '100%', height: '100%' }}
//           >
//             <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
//               <Image
//                 src={images?.[imageIndex]?.url}
//                 alt={`Product Image ${imageIndex + 1}`}
//                 fill
//                 style={{
//                   objectFit: 'contain',
//                   transform: magnify ? 'scale(3)' : 'scale(1)',
//                   transformOrigin: `${origin.x} ${origin.y}`,
//                   transition: 'transform 0.2s ease'
//                 }}
//               />
//             </Box>
//           </motion.div>
//         </AnimatePresence>

//         {/* Magnify Tooltip */}
//         <Stack  
//           direction="row"
//           spacing={1}
//           alignItems="center"
//           justifyContent="center"
//           sx={{
//             position: 'absolute',
//             bottom: 12,
//             left: '50%',
//             transform: 'translateX(-50%)',
//             bgcolor: '#fff',
//             px: 1.5,
//             py: 0.5,
//             borderRadius: 2,
//             boxShadow: 1
//           }}
//         >
//           <ZoomIn fontSize="small" />
//           <Typography variant="caption" color="text.secondary">
//             Roll over to magnify
//           </Typography>
//         </Stack>

        
//       </Box>

//       {/* Fullscreen Dialog */}
//       <Dialog
//         fullScreen={fullScreen}
//         open={openFullScreen}
//         onClose={() => setOpenFullScreen(false)}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogContent
//           sx={{
//             position: 'relative',
//             p: 0,
//             overflow: 'hidden', // fix scroll
//             height: '100vh', // full viewport height
//             maxHeight: '100vh' // prevent overflow
//           }}
//         >
//           <IconButton
//             onClick={() => setOpenFullScreen(false)}
//             sx={{ position: 'absolute', top: 10, right: 10, color: '#000', zIndex: 2 }}
//           >
//             <Close />
//           </IconButton>

//           {/* Arrows inside dialog */}
//           <IconButton
//             onClick={() => paginate(-1)}
//             sx={{ position: 'absolute', top: '50%', left: 16, color: '#000', zIndex: 2 }}
//           >
//             <ChevronLeft />
//           </IconButton>
//           <IconButton
//             onClick={() => paginate(1)}
//             sx={{ position: 'absolute', top: '50%', right: 16, color: '#000', zIndex: 2 }}
//           >
//             <ChevronRight />
//           </IconButton>

//           {/* Fullscreen Image Viewer */}
//           <AnimatePresence initial={false} custom={imageIndex}>
//             <motion.div
//               key={imageIndex}
//               custom={imageIndex}
//               variants={variants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{
//                 type: 'spring',
//                 stiffness: 300,
//                 damping: 30
//               }}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: '100%',
//                 height: '100%',
//                 overflow: 'hidden', // hide scrollbars
//                 position: 'relative'
//               }}
//             >
//               <Box
//                 sx={{
//                   position: 'relative',
//                   width: '100%',
//                   height: '100%',
//                   maxHeight: '80vh',
//                   aspectRatio: '1 / 1',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   overflow: 'hidden' // hide scrollbars inside box
//                 }}
//               >
//                 <Image
//                   src={images?.[imageIndex]?.url}
//                   alt={`Product Image ${imageIndex + 1}`}
//                   fill
//                   priority
//                   style={{ objectFit: 'contain' }}
//                 />
//               </Box>
//             </motion.div>
//           </AnimatePresence>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default ProductImageViewer;





'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Stack,
  Button,
  Typography,
  Dialog,
  DialogContent,
  useMediaQuery
} from '@mui/material';

import {
  FavoriteBorder,
  Share,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Close
} from '@mui/icons-material';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { IoIosHeart } from 'react-icons/io';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const variants = {
  enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const ProductImageViewer = ({
  images,
  _id,
  item,
  clickedIndex,
  updateWishList,
  clickedPage,
  paginateSlide
}) => {
  const [imageIndex, setImageIndex] = useState(clickedIndex || 0);
  const [magnify, setMagnify] = useState(false);
  const [origin, setOrigin] = useState({ x: '50%', y: '50%' });
  const [openFullScreen, setOpenFullScreen] = useState(false);

  const containerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { wishlist } = useSelector(({ wishlist }) => wishlist);
  const { isAuthenticated } = useSelector(({ user }) => user);

  const paginate = (newDirection) => {
    paginateSlide(newDirection);
    setImageIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  useEffect(() => {
    if (clickedIndex !== undefined) setImageIndex(clickedIndex);
  }, [clickedIndex]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setOrigin({ x: `${x}%`, y: `${y}%` });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Product link copied to clipboard!');
  };

  const onWishListClicked = async (event, actionType) => {
    event.stopPropagation();
    updateWishList(event, actionType);
  };

  return (
    <>
      {/* Main Viewer */}
      <Box
        ref={containerRef}
        onMouseMove={isMobile ? undefined : handleMouseMove}
        onMouseEnter={isMobile ? undefined : () => setMagnify(true)}
        onMouseLeave={isMobile ? undefined : () => setMagnify(false)}
        sx={{
          position: 'relative',
          width: 450,
          height: 400,
          overflow: 'hidden',
          borderRadius: 2,
          border: '1px solid #ddd'
        }}
      >
        {/* Top-right icons */}
        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, display: 'flex', gap: 0 }}>
          <Tooltip title="View Fullscreen">
            <IconButton onClick={() => setOpenFullScreen(true)}>
              <ZoomIn />
            </IconButton>
          </Tooltip>

          <Button>
            {_id && wishlist?.includes(_id) ? (
              <Tooltip title="Remove from wishlist">
                <IconButton onClick={(event) => onWishListClicked(event, 'remove')} color="primary">
                  <IoIosHeart />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Add to wishlist">
                <IconButton onClick={(event) => onWishListClicked(event, 'add')}>
                  <FavoriteBorder />
                </IconButton>
              </Tooltip>
            )}
          </Button>

          <Tooltip title="Copy Product Link">
            <IconButton onClick={handleShare}>
              <Share />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Arrows */}
        <IconButton
          onClick={() => paginate(-1)}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 8,
            zIndex: 2,
            transform: 'translateY(-50%)',
            border: '1px solid #1C1B1F',
            width: '30px',
            height: '30px',
            color: 'black'
          }}
        >
          <GoArrowLeft />
        </IconButton>
        <IconButton
          onClick={() => paginate(1)}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 8,
            zIndex: 2,
            transform: 'translateY(-50%)',
            border: '1px solid #1C1B1F',
            width: '30px',
            height: '30px',
            color: 'black'
          }}
        >
          <GoArrowRight />
        </IconButton>

        {/* Image Viewer */}
        <AnimatePresence initial={false} custom={imageIndex}>
          <motion.div
            key={imageIndex}
            custom={imageIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) paginate(1);
              else if (swipe > swipeConfidenceThreshold) paginate(-1);
            }}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image
                src={images?.[imageIndex]?.url}
                alt={`Product Image ${imageIndex + 1}`}
                fill
                style={{
                  objectFit: 'contain',
                  transform: isMobile ? 'scale(1)' : magnify ? 'scale(3)' : 'scale(1)',
                  transformOrigin: `${origin.x} ${origin.y}`,
                  transition: 'transform 0.2s ease'
                }}
              />
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* Magnify Tooltip */}
        {!isMobile && (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{
              position: 'absolute',
              bottom: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: '#fff',
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              boxShadow: 1
            }}
          >
            <ZoomIn fontSize="small" />
            <Typography variant="caption" color="text.secondary">
              Roll over to magnify
            </Typography>
          </Stack>
        )}
      </Box>

      {/* Fullscreen Dialog */}
      <Dialog
        fullScreen={isMobile}
        open={openFullScreen}
        onClose={() => setOpenFullScreen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent
          sx={{
            position: 'relative',
            p: 0,
            overflow: 'hidden',
            height: '100vh',
            maxHeight: '100vh'
          }}
        >
          <IconButton
            onClick={() => setOpenFullScreen(false)}
            sx={{ position: 'absolute', top: 10, right: 10, color: '#000', zIndex: 2 }}
          >
            <Close />
          </IconButton>

          <IconButton
            onClick={() => paginate(-1)}
            sx={{ position: 'absolute', top: '50%', left: 16, color: '#000', zIndex: 2 }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={() => paginate(1)}
            sx={{ position: 'absolute', top: '50%', right: 16, color: '#000', zIndex: 2 }}
          >
            <ChevronRight />
          </IconButton>

          <AnimatePresence initial={false} custom={imageIndex}>
            <motion.div
              key={imageIndex}
              custom={imageIndex}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  maxHeight: '80vh',
                  aspectRatio: '1 / 1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <Image
                  src={images?.[imageIndex]?.url}
                  alt={`Product Image ${imageIndex + 1}`}
                  fill
                  priority
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductImageViewer;
