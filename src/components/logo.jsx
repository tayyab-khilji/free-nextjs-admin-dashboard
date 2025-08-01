import PropTypes from 'prop-types';
import { useRouter } from 'next-nprogress-bar';

// mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Image from 'next/image';
import logo from '../../public/images/logo.png';

export const Logo = () => {
  const theme = useTheme();
  const { push } = useRouter();
  return (
    <Box
      sx={{
        cursor: 'pointer',

        svg: {
          width: 150,
          height: 'auto'
        }
      }}
      onClick={() => push('/')}
    >
      <Image src={logo} alt="logo" height={200} width={300} />

    </Box>
  );
};

Logo.propTypes = {
  sx: PropTypes.object,
  isMobile: PropTypes.bool
};
export default Logo;
