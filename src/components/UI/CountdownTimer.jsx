import React, { useState, useEffect, useCallback } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +targetDate - Date.now();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup interval on unmount to prevent memory leaks
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="de_countdown">
      {timeLeft.hours || 0}h {timeLeft.minutes || 0}m {timeLeft.seconds || 0}s
    </div>
  );
};

export default CountdownTimer;
