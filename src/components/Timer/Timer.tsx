import "./Timer.scss";
import React, { useState, useEffect } from "react";

interface Time {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
}

interface ITimerProps {
  setTimer: (timer: boolean) => void;
}

const Timer: React.FC<ITimerProps> = ({ setTimer }) => {
  const [time, setTime] = useState<Time>({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (time.seconds >= 60) {
      setTime((prevTime) => ({
        ...prevTime,
        seconds: 0,
        minutes: prevTime.minutes + 1,
      }));
    }
    if (time.minutes >= 60) {
      setTime((prevTime) => ({
        ...prevTime,
        minutes: 0,
        hours: prevTime.hours + 1,
      }));
    }
    if (time.hours >= 24) {
      setTime((prevTime) => ({
        ...prevTime,
        hours: 0,
        days: prevTime.days + 1,
      }));
    }
  }, [time]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => ({
          ...prevTime,
          seconds: prevTime.seconds + 1,
        }));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime({
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
    });
  };

  const formatTime = (num: number) => (num < 10 ? `0${num}` : num);

  return (
    <div className="Timer">
      <h2>Timer</h2>
      {time.days > 0 ? <p>{time.days} days</p> : null}
      <p>{`${formatTime(time.hours)}:${formatTime(time.minutes)}:${formatTime(
        time.seconds
      )}`}</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={() => setTimer(false)}>X</button>
    </div>
  );
};

export default Timer;
