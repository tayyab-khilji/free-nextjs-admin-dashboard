
'use client';
import React, { useState } from 'react';
import VerifyOTPForm from 'src/components/forms/otp';

import PropTypes from 'prop-types';

OTPMain.propTypes = {
  user: PropTypes.object.isRequired
};
export default function OTPMain() {
  const [countdownDate, setCountdownDate] = useState(Date.now() + 60000); // Initialize to 60 seconds in the future

  const onResetCountdown = () => {
    setCountdownDate(Date.now() + 60000); // Reset to 60 seconds from now
  };

  return <VerifyOTPForm countdownDate={countdownDate} onResetCountdown={onResetCountdown} />;
}
