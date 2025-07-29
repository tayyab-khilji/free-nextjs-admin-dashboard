'use client';

import { useFormik, Form, FormikProvider } from 'formik';
import { createCookies } from 'src/hooks/cookies';
import { useDispatch } from 'react-redux';
import { setWishlist } from 'src/redux/slices/wishlist';
import { setLogin } from 'src/redux/slices/user';
import * as api from 'src/services';
import toast from 'react-hot-toast';

const googleFacebookAuthApi = async (authToken, type) => {
  try {
    const response = await fetch('https://hilal.wooo.games/api/auth/auth-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: authToken + '',
        authType: type + ''
      })
    });

    console.log('TESTING:', authToken + '=' + type);

    console.log('GOOGLE SERVER RESPONSE:', JSON.stringify(response));

    if (!response.ok) {
      throw new Error('Failed to authenticate with server');
    }

    const data = await response.json();

    // Validate response data structure
    if (!data || !data.user) {
      throw new Error('Invalid response data');
    }

    // // Dispatch actions and set cookies
    // const dispatch = useDispatch();
    // dispatch(setLogin(data.user));
    // dispatch(setWishlist(data.user.wishlist));
    // await createCookies('token', data.token);
    // toast.success('Logged in successfully!');

    // push('/');

    return data;
  } catch (error) {
    console.error('Error during server authentication:', error);
    throw error;
  }
};

export default googleFacebookAuthApi;
