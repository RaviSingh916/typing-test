import React, { useState, useEffect, useCallback } from "react";
import "./style/Main.scss";
import TypingArea from "./components/TypingArea";
import Timer from "./components/Timer";
import Results from "./components/Results";
import Settings from "./components/Setting";
import Header from "./components/Header";
import Authpage from "./components/Authpage";
import ThemePage from "./components/ThemePage";

import { ThemeProvider } from "./Theme/ThemeContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { generateWords } from "./utils/words";
import { calculateWPM, calculateAccuracy } from "./utils/calculations";

function App() {
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [words, setWords] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [correctChars, setCorrectChars] = useState<number>(0);
  const [totalChars, setTotalChars] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("english");
  const [timeSetting, setTimeSetting] = useState<number>(30);

  /* Initialize words */
  useEffect(() => {
    setWords(generateWords(50, language));
  }, [language]);

  /* Timer logic */
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setShowResults(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isRunning) setIsRunning(true);

      const value = e.target.value;
      setUserInput(value);
      setTotalChars((prev) => prev + 1);

      const currentWord = words[currentWordIndex];

      if (currentWord && value.endsWith(" ")) {
        if (value.trim() === currentWord) {
          setCorrectChars((prev) => prev + currentWord.length);
        }
        setUserInput("");
        setCurrentWordIndex((prev) => prev + 1);

        if (currentWordIndex >= words.length - 10) {
          setWords((prev) => [...prev, ...generateWords(20, language)]);
        }
      }
    },
    [isRunning, words, currentWordIndex, language]
  );

  const restartTest = () => {
    setTimeLeft(timeSetting);
    setIsRunning(false);
    setUserInput("");
    setCurrentWordIndex(0);
    setCorrectChars(0);
    setTotalChars(0);
    setShowResults(false);
    setWords(generateWords(50, language));
  };

  const handleTimeChange = (time: number) => {
    setTimeSetting(time);
    setTimeLeft(time);
  };

  return (
    
    <ThemeProvider>
      <div className="app">
        <Header />
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <main className="main-content">
                <Settings
                  timeSetting={timeSetting}
                  onTimeChange={handleTimeChange}
                  language={language}
                  onLanguageChange={setLanguage}
                  onRestart={restartTest}
                />

                <Timer timeLeft={timeLeft} isRunning={isRunning} />

                {!showResults ? (
                  <>
                    <TypingArea
                      words={words}
                      userInput={userInput}
                      currentWordIndex={currentWordIndex}
                      onInputChange={handleInputChange}
                    />
                    <div className="instruction">
                      Click here or press any key to focus
                    </div>
                  </>
                ) : (
                  <Results
                    wpm={calculateWPM(
                      correctChars,
                      timeSetting - timeLeft
                    )}
                    accuracy={calculateAccuracy(correctChars, totalChars)}
                    timeTaken={timeSetting - timeLeft}
                    onRestart={restartTest}
                  />
                )}
              </main>
            }
          />

          {/* AUTH */}
          <Route path="/login" element={<Authpage />} />
          <Route path="/register" element={<Authpage />} />
          <Route path="/reset" element={<Authpage />} />

          {/* THEMES */}
          <Route path="/themes" element={<ThemePage />} />
          
        </Routes>
      </div>
    </ThemeProvider>
    
  );
}

export default App;
