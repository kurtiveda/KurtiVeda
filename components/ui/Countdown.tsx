"use client";
import React, { useState, useEffect } from "react";

// const COUNTDOWN_TARGET: any = new Date("2024-02-31T23:59:59");

const getTimeLeft = (expiration: any) => {
  const now: any = new Date();
  const totalTimeLeft = expiration - now;
  const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((totalTimeLeft / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const Countdown = ({ expiration }: { expiration: Date }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(expiration));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(expiration));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [expiration]);

  return (
    <div className="countdown">
      <h2>Countdown</h2>
      <div className="content">
        {Object.entries(timeLeft).map((el) => {
          const label = el[0];
          const value = el[1];
          return (
            <div className="box" key={label}>
              <div className="value">
                <span>{value}</span>
              </div>
              <span className="label"> {label} </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Countdown;
