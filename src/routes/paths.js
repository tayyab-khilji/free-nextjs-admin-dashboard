function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_PAGE = '/';

export const PATH_PAGE = {
  root: ROOTS_PAGE,
  auth: {
    login: path(ROOTS_PAGE, 'auth/login'),
    register: path(ROOTS_PAGE, 'auth/register'),
    forgetPassword: path(ROOTS_PAGE, 'auth/forget-password'),
    verifyOTP: path(ROOTS_PAGE, 'auth/verify-otp'),
    resetPassword: path(ROOTS_PAGE, 'auth/reset-password'),
    registerEnterInfo: path(ROOTS_PAGE, 'auth/register-info-email'),
    registerEnterInfo: path(ROOTS_PAGE, 'auth/register-info-phone')
  },
  general: {
    userProfile: path(ROOTS_PAGE, 'profile')
  }
};
