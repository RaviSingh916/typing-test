import React, { useRef, useEffect } from 'react';

interface TypingAreaProps {
  words: string[];
  userInput: string;
  currentWordIndex: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TypingArea: React.FC<TypingAreaProps> = ({
  words,
  userInput,
  currentWordIndex,
  onInputChange
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (inputRef.current && e.key !== 'Escape' && e.key !== 'Tab') {
        inputRef.current.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="typing-area" onClick={handleContainerClick}>
      <div className="words-container">
        {words.map((word, index) => (
          <span
            key={index}
            className={`word ${
              index === currentWordIndex ? 'current' : ''
            } ${
              index < currentWordIndex ? 'completed' : ''
            }`}
          >
            {word.split('').map((char, charIndex) => {
              let className = 'char';
              if (index === currentWordIndex && userInput.length > charIndex) {
                className += userInput[charIndex] === char ? ' correct' : ' incorrect';
              }
              return (
                <span key={charIndex} className={className}>
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={onInputChange}
        className="hidden-input"
        autoFocus
      />
    </div>
  );
};

export default TypingArea;