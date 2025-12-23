import React from 'react';

interface TimerProps {
  timeLeft: number;
  isRunning: boolean;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, isRunning }) => {
  return (
    <div className="timer">
      <div className="timer-display">
        {timeLeft}s
      </div>
      <div className="timer-status">
        {isRunning ? 'Timer running...' : 'Press any key to start'}
      </div>
    </div>
  );
};

export default Timer;