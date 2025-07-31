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
      {/* <Image src={logo} alt="logo" height={200} width={300} /> */}
      <svg xmlns="http://www.w3.org/2000/svg" width="462" height="196" viewBox="0 0 462 196" fill="none">
        <g clip-path="url(#clip0_116_12524)">



          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M372.684 84.2353C359.688 88.3376 348.764 100.295 347.703 112.11C341.544 95.552 355.481 78.3686 382.84 78.2532C379.693 86.6141 380.465 94.6436 374.995 102.137C369.526 109.627 360.935 114.276 351.633 114.749C352.435 102.763 360.868 90.2324 372.68 84.2353H372.684Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_116_12524">
            <rect width="460.661" height="195.513" fill="white" transform="translate(0.443359 0.469727)" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

Logo.propTypes = {
  sx: PropTypes.object,
  isMobile: PropTypes.bool
};
export default Logo;
