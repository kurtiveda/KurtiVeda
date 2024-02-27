"use client";
import React, { useState, useEffect } from "react";

// const COUNTDOWN_TARGET: any = new Date("2024-02-31T23:59:59");

const getTimeLeft = (expiration: any) => {
  const now: any = new Date();
  const totalTimeLeft = expiration - now;
  const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
  const hrs = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
  const secs = Math.floor((totalTimeLeft / 1000) % 60);
  return { days, hrs, mins, secs };
};

const Countdown = ({
  expiration,
  name,
  tagline,
}: {
  expiration: Date;
  name: string;
  tagline: string;
}) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(expiration));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(expiration));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [expiration]);

  if (expiration < new Date()) {
    return null;
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full flex justify-center items-center bg-[#F9F7F1] py-16 px-10">
      <div className="laptop:w-[90%] tablet:w-[95%] xsPhone:w-full flex tablet:flex-row xsPhone:flex-col gap-10 tablet:justify-between xsPhone:justify-center tablet:items-center xsPhone:items-start">
        <div className="laptop:text-4xl tablet:w-[50%] xsPhone:text-2xl flex flex-col justify-center items-start gap-4">
          <p className="font-lato  uppercase font-semibold tracking-widest text-[#A77737]">
            {name}
          </p>
          <div className="laptop:text-[18px] xsPhone:text-xs font-lato tracking-widest text-pretty text-[#91622585]">
            {tagline}
          </div>
        </div>
        <div className="flex w-[2/3] justify-start items-center text-center flex-wrap xsPhone:gap-2 laptop:gap-4">
          {Object.entries(timeLeft).map((el, index) => {
            const label = el[0];
            const value = el[1];
            return (
              value > 0 && (
                <>
                  <div
                    className="border-2 laptop:text-2xl xsPhone:text-xs laptop:p-6 xsPhone:p-4 border-[#A77737] text-[#A77737] font-semibold font-lato tracking-widest"
                    key={label}>
                    <div className="value">
                      <span>{value > 0 && value}</span>
                    </div>
                    <span className="label"> {label} </span>
                  </div>
                </>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Countdown;
