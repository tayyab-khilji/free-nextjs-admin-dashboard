'use server';

import { cookies } from 'next/headers';

export async function createCookies(name, token) {
  // Function to calculate the timestamp for the expiration date

  // Set the cookie with a maxAge of 2 day from now
  const OneDay = 48 * 60 * 60 * 1000;
  cookies().set(name, token, { maxAge: OneDay });
}

export async function deleteCookies(name) {
  cookies().delete(name);
}

// export async function getTokenFromCookies() {
//   const token = cookies().get('token')?.value || null;
//   console.log('Retrieved token from cookies:', token);
//   return token;
// }

// 'use server';

// import { cookies } from 'next/headers';

// export async function createCookies(name, token) {
//   const OneDay = 24 * 60 * 60; // maxAge is in seconds
//   cookies().set(name, token, {
//     maxAge: OneDay,
//     path: '/', // Ensures the cookie is accessible across the app
//     sameSite: 'lax', // Prevents browser restrictions
//     secure: process.env.NODE_ENV === 'production' // Secure in production
//   });
// }

// export async function deleteCookies(name) {
//   cookies().delete(name, { path: '/' }); // Specify path for consistency
// }
