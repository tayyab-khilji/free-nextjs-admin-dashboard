import React from 'react';


// Meta information
export const metadata = {
  title: 'Login or Sign In – AI Chat',
  description: 'Chatting',
  applicationName: 'AI-Chat',
  authors: ' AI- Chat',
  keywords:
    'AI, AI-Chat, Chat, chat'
};


// Login Component
import LoginPage from 'src/app/(user)/auth/login/page';

export default function Page() {
  return (
    <>
      <LoginPage />
    </>
  );
}
