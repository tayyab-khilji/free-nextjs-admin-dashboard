import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
//import FacebookProvider from 'next-auth/providers/facebook';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    })
    // ,
    // FacebookProvider({
    //   clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID,
    //   clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET
    // })
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET, // Required for both localhost and production
  pages: {
    signIn: `${process.env.NEXTAUTH_URL}/auth/login`
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.googleAccessToken = account.access_token;
        token.id_token = account.id_token;
        token.provider = account.provider;
        token.callAPI = true;

        // if (account && !token.apiCallMade) {
        //   token.apiCallMade = true; // Set flag to true to prevent future calls

        //   try {
        //     // Call the server-side function to authenticate
        //     const serverResponse = await googleFacebookAuthApi(account.id_token, account.provider);
        //     console.log('Server authentication response:', JSON.stringify(serverResponse));

        //     // Optionally, you can store additional data in the token
        //     // token.serverAuthStatus = serverResponse.status; // Example: store custom data from server response
        //   } catch (error) {
        //     console.error('Failed to authenticate to server during JWT callback:', error);
        //   }

        console.log(
          'Google Login 1',
          JSON.stringify(user) + '=' + JSON.stringify(account) + '=' + JSON.stringify(token)
        );
        // }
      }
      return token;
    },
    async session({ session, token }) {
      session.googleAccessToken = token.googleAccessToken;
      session.token = token.id_token;
      session.callAPI = token.callAPI;
      session.provider = token.provider;

      console.log('Google Login 2', JSON.stringify(session) + '=' + JSON.stringify(token));
      return session;
    }
  }
  // // Specify callback URLs
  // callbacks: {
  //   async jwt({ token, user, profile }) {
  //     // Persist user ID to session
  //     token.id = user.id;
  //     console.log('Google Login', 'jwt=' + user.id);
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // Set session user ID
  //     session.user.id = token.id;
  //     console.log('Google Login', 'session=' + token.id);

  //     return session;
  //   }
  // },
  // Set session max age (optional)
  // session: {
  //   maxAge: 10 * 60 // 10 minutes
  //   // maxAge: 1 * 24 * 60 * 60 // 1 days
  // }
});

export { handler as GET, handler as POST };
