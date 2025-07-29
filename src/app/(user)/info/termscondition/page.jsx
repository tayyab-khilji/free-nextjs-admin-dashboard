import React from 'react';
import Termsconditions from 'src/components/info/Termsconditions';

// Meta information
export const metadata = {
  title: 'Login or Sign In – AI Chat',
  description: 'Chatting',
  applicationName: 'AI-Chat',
  authors: ' AI- Chat',
  keywords:
    'AI, AI-Chat, Chat, chat'
};

const page = () => {
  return (
    <div>
      <Termsconditions />
    </div>
  );
};

export default page;
