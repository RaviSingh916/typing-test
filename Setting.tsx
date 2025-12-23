import React from 'react';

interface SettingsProps {
  timeSetting: number;
  onTimeChange: (time: number) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  onRestart: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  timeSetting,
  onTimeChange,
  language,
  onLanguageChange,
  onRestart
}) => {
  const timeOptions = [15, 30, 60, 120];
  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' }
  ];

  return (
    <div className="settings">
      <div className="setting-group">
        <label>Time:</label>
        <div className="time-options">
          {timeOptions.map(time => (
            <button
              key={time}
              className={`time-option ${timeSetting === time ? 'active' : ''}`}
              onClick={() => onTimeChange(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      
      <div className="setting-group">
        <label>Language:</label>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="language-select"
        >
          {languageOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <button className="restart-button" onClick={onRestart}>
        Restart Test
      </button>
    </div>
  );
};

export default Settings;