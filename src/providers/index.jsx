'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

// mui
import { LinearProgress, Stack } from '@mui/material';
import ThemeRegistry from 'src/theme';
// import ThemeRegistry from 'src/components/ThemeRegistery';

// redux
import { Provider } from 'react-redux';
import { reduxStore, persistor } from 'src/redux';
import { PersistGate } from 'redux-persist/integration/react';

// react quert
import { QueryClient, QueryClientProvider } from 'react-query';

// toast
import { Toaster } from 'react-hot-toast';

// components
import GlobalStyles from 'src/theme/globalStyles';
import AuthProvider from './auth';
import { SessionProvider } from 'next-auth/react';
import '../styles/app.scss';

// dynamic import
const ProgressBar = dynamic(() => import('src/components/ProgressBar'), {
  ssr: false
});

export default function Providers(props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false // default: true
          }
        }
      })
  );

  return (
    <Provider store={reduxStore}>
      <AuthProvider isAuth={props.isAuth}>
        <ThemeRegistry>
          <GlobalStyles />
          <QueryClientProvider client={queryClient}>
            <SessionProvider session={props.session}>
              {/* <Component {...props} /> */}
              <Toaster position={'top-center'} />
              {/* <Toaster
                position={'top-center'}
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#333',
                    color: '#fff',
                    zIndex: 1600
                  }
                }}
                containerStyle={{
                  zIndex: 1600
                }}
              /> */}
              <PersistGate
                loading={
                  <Stack
                    sx={{
                      position: 'fixed',
                      top: 'calc(50vh - 2px)',
                      width: '300px',
                      left: 'calc(50vw - 150px)',
                      zIndex: 11
                    }}
                  >
                    <LinearProgress />
                  </Stack>
                }
                persistor={persistor}
              >
                {props.children}
              </PersistGate>
            </SessionProvider>
          </QueryClientProvider>
          <ProgressBar />
        </ThemeRegistry>
      </AuthProvider>
    </Provider>
  );
}

Providers.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};
