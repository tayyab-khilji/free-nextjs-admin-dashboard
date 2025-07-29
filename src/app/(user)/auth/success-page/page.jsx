'use client';
import Image from 'next/image';
import basket from '../../../../../public/images/shopping.gif';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

const SuccessPage = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    localStorage.setItem('screen', 'SuccessPage');
    router.push('/');
  };

  return (
    <Container maxWidth="sm" sx={{ px: { xs: 3, lg: 5 }, textAlign: 'center', mx: 'auto' }}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        {/* Image */}
        <Box mb={4}>
          <Image src={basket} alt="basket" />
        </Box>

        {/* Title */}
        <Typography variant="h4" fontWeight="bold" mt={2} mb={4}>
          Enjoy Shopping
        </Typography>

        {/* Button */}
        <Button fullWidth variant="contained" color="primary" onClick={handleHomeClick} sx={{ maxWidth: '100%' }}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default SuccessPage;
