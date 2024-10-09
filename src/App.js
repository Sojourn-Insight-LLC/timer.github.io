import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

const Timer = () => {
  const [totalTime, setTotalTime] = useState(60);
  const [focusTime, setFocusTime] = useState(48);
  const [rdTime, setRdTime] = useState(12);
  const [currentTimer, setCurrentTimer] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(focusTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerComplete, setTimerComplete] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playChime();
      setTimerComplete(true);
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const playChime = () => {
    const audio = new Audio('/chime.mp3');
    audio.play();
  };

  const handleStart = () => {
    setIsRunning(true);
    setCurrentTimer('focus');
    setTimeLeft(focusTime * 60);
    setTimerComplete(false);
  };

  const handleNextTimer = () => {
    if (currentTimer === 'focus') {
      setCurrentTimer('rd');
      setTimeLeft(rdTime * 60);
      setIsRunning(true);
      setTimerComplete(false);
    } else {
      setTimerComplete(false);
    }
  };

  const handleTotalTimeChange = (e) => {
    const newTotalTime = parseInt(e.target.value);
    setTotalTime(newTotalTime);
    setFocusTime(Math.floor(newTotalTime * 0.8));
    setRdTime(Math.ceil(newTotalTime * 0.2));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const inputStyle = {
    width: '80px',
    backgroundColor: '#1f2937',
    color: 'white',
    border: '1px solid #4b5563',
    borderRadius: '4px',
    padding: '2px 0',  // Removed horizontal padding
    textAlign: 'center',  // Center the text
  };

  const buttonStyle = {
    backgroundColor: '#f97316',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '9999px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'black', color: 'white', padding: '1rem' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>Sojourn Insight</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'semibold', marginBottom: '1.5rem', textAlign: 'center' }}>Creativity Constraint Timer</h2>
      
      <div style={{ width: '100%', maxWidth: '20rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '1.125rem', fontWeight: 'semibold', marginBottom: '0.5rem', textAlign: 'center' }}>1. Enter time</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <label style={{ marginRight: '0.5rem' }}>Total Time:</label>
          <input
            type="number"
            value={totalTime}
            onChange={handleTotalTimeChange}
            style={inputStyle}
          />
          <span style={{ marginLeft: '0.5rem' }}>minutes</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 'semibold' }}>80% Time</p>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Focus</p>
            <input
              type="number"
              value={focusTime}
              onChange={(e) => setFocusTime(parseInt(e.target.value))}
              style={inputStyle}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 'semibold' }}>20% Time</p>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>R&D</p>
            <input
              type="number"
              value={rdTime}
              onChange={(e) => setRdTime(parseInt(e.target.value))}
              style={inputStyle}
            />
          </div>
        </div>
      </div>
      
      <p style={{ fontSize: '1.125rem', fontWeight: 'semibold', marginBottom: '0.5rem', textAlign: 'center' }}>2. Press Start</p>
      <button 
        onClick={isRunning ? handleNextTimer : handleStart} 
        style={buttonStyle}
      >
        {isRunning ? 'Next' : 'Start'}
      </button>
      
      {(isRunning || timerComplete) && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <div style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {currentTimer === 'focus' ? 'Focus Work' : 'R&D'}
          </div>
          <div style={{ fontSize: '3.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>{formatTime(timeLeft)}</div>
          <div style={{ width: '16rem', height: '0.5rem', backgroundColor: '#4b5563', borderRadius: '9999px', overflow: 'hidden', marginBottom: '1rem' }}>
            <div 
              style={{
                width: `${(timeLeft / (currentTimer === 'focus' ? focusTime * 60 : rdTime * 60)) * 100}%`,
                height: '100%',
                backgroundColor: '#10b981',
                transition: 'width 1s linear'
              }}
            />
          </div>
          <Bell color="#fbbf24" size={32} />
        </div>
      )}
    </div>
  );
};

export default Timer;