'use client';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next-nprogress-bar';
import { useSelector } from 'src/redux';

// components
import Loading from 'src/components/loading';
import ROLES from 'src/utils/userRoles';

Guest.propTypes = {
  children: PropTypes.node.isRequired
};
export default function Guest({ children }) {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(({ user }) => user);
  const [isAuth, setAuth] = useState(true);
  useEffect(() => {
    // if (isAuthenticated) {
    if (isAuthenticated && user && user?.role) {
      setAuth(false);

      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isAuth) {
    return <Loading />;
  }
  return children;
}
