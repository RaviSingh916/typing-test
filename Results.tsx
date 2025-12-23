import React from 'react';

interface ResultsProps {
  wpm: number;
  accuracy: number;
  timeTaken: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ wpm, accuracy, timeTaken, onRestart }) => {
  return (
    <div className="results">
      <h2>Test Complete!</h2>
      <div className="stats">
        <div className="stat">
          <div className="stat-value">{wpm.toFixed(0)}</div>
          <div className="stat-label">WPM</div>
        </div>
        <div className="stat">
          <div className="stat-value">{accuracy.toFixed(1)}%</div>
          <div className="stat-label">Accuracy</div>
        </div>
        <div className="stat">
          <div className="stat-value">{timeTaken}s</div>
          <div className="stat-label">Time</div>
        </div>
      </div>
      <button className="restart-button" onClick={onRestart}>
        Try Again
      </button>
    </div>
  );
};

export default Results;