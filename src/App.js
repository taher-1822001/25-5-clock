import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isActive, setIsActive] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      audioRef.current.play();
      setIsSession(!isSession);
      setTimerLabel(isSession ? 'Break' : 'Session');
      setTimeLeft((isSession ? breakLength : sessionLength) * 60);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isSession, breakLength, sessionLength]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel('Session');
    setTimeLeft(25 * 60);
    setIsActive(false);
    setIsSession(true);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const decrementBreak = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementBreak = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const decrementSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };

  const incrementSession = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-header">
              <h2 className="card-title mb-0">25 + 5 Clock</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div id="break-label">Break Length</div>
                  <button
                    id="break-decrement"
                    className="btn btn-info btn-sm"
                    onClick={decrementBreak}
                  >
                    -
                  </button>
                  <div id="break-length">{breakLength}</div>
                  <button
                    id="break-increment"
                    className="btn btn-info btn-sm"
                    onClick={incrementBreak}
                  >
                    +
                  </button>
                </div>
                <div className="col">
                  <div id="session-label">Session Length</div>
                  <button
                    id="session-decrement"
                    className="btn btn-info btn-sm"
                    onClick={decrementSession}
                  >
                    -
                  </button>
                  <div id="session-length">{sessionLength}</div>
                  <button
                    id="session-increment"
                    className="btn btn-info btn-sm"
                    onClick={incrementSession}
                  >
                    +
                  </button>
                </div>
              </div>
              <div id="timer" className="mt-4">
                <div id="timer-label">{timerLabel}</div>
                <div id="time-left" className="display-4">
                  {formatTime(timeLeft)}
                </div>
                <button
                  id="start_stop"
                  className="btn btn-primary m2-2"
                  onClick={handleStartStop}
                >
                  Start/Stop
                </button>
                <button
                  id="reset"
                  className="btn btn-danger m-2"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio
        id="beep"
        ref={audioRef}
        src="https://www.soundjay.com/button/beep-07.wav"
      />
    </div>
  );
};

export default App;
