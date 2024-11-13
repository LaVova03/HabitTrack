import "./TimeClockAmPm.scss";
import React, { useState, useEffect } from "react";
import ReactClock from "react-clock";
import "react-clock/dist/Clock.css";

function TimeClockAmPm() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="TimeClockAmPm">
      <ReactClock value={time} />
    </div>
  );
}

export default TimeClockAmPm;
