"use client";
import React, { useEffect } from "react";

const Overlay = ({ setOpenCtg }) => {
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove = "no-scroll";
    };
  }, []);

  return (
    <div
      onClick={() => setOpenCtg(false)}
      className='h-full w-full  absolute  top-[65px] left-0 right-0 bottom-0 z-10 bg-black/50'
    ></div>
  );
};

export default Overlay;
