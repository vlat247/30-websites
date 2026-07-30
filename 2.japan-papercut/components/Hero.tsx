"use client";

import React from 'react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full flex flex-col"
      style={{
        background: `
          linear-gradient(
            180deg,
            #87cefa 0%,
            #f9b68cff 100%
          )
        `,
      }}
    >
      {/* First Section (Hero) */}
      <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Clouds */}
        <img
          src="/paper-images/clouds/Gemini_Generated_Image_5xsn5f5xsn5f5xsn-removebg-preview.png"
          alt="Cloud Left"
          className="absolute -top-[5vh] -left-20 w-[50vw] max-w-[850px] h-auto z-10 opacity-80 pointer-events-none"
        />
        <img
          src="/paper-images/clouds/Gemini_Generated_Image_5xsn5f5xsn5f5xsn-removebg-preview-2.png"
          alt="Cloud Right 1"
          className="absolute top-[5vh] -right-[15vw] w-[100vw] max-w-[600px] h-auto z-10 opacity-80 pointer-events-none"
        />
        <img
          src="/paper-images/clouds/Gemini_Generated_Image_5xsn5f5xsn5f5xsn-removebg-preview-3.png"
          alt="Cloud Left 2"
          className="absolute top-[25vh] -left-[10vw] w-[45vw] max-w-[650px] h-auto z-10 opacity-70 pointer-events-none"
        />
        <img
          src="/paper-images/clouds/Gemini_Generated_Image_5xsn5f5xsn5f5xsn-removebg-preview-4.png"
          alt="Cloud Right 2"
          className="absolute top-[25vh] -right-[5vw] w-[50vw] max-w-[800px] h-auto z-10 opacity-75 pointer-events-none"
        />
        <img
          src="/paper-images/clouds/Gemini_Generated_Image_5xsn5f5xsn5f5xsn-removebg-preview.png"
          alt="Cloud Right 3"
          className="absolute top-[45vh] -right-[10vw] w-[60vw] max-w-[900px] h-auto z-10 opacity-60 pointer-events-none transform -scale-x-100"
        />
        <img
          src="/paper-images/clouds/Gemini_Generated_Image_5xsn5f5xsn5f5xsn-removebg-preview-3.png"
          alt="Cloud Right 4"
          className="absolute top-[65vh] right-[0vw] w-[45vw] max-w-[700px] h-auto z-10 opacity-65 pointer-events-none transform -scale-x-100"
        />
        <img
          src="/paper-images/clouds/Gemini_Generated_Image_5xsn5f5xsn5f5xsn-removebg-preview-2.png"
          alt="Cloud Right 5"
          className="absolute top-[75vh] -right-[5vw] w-[55vw] max-w-[850px] h-auto z-10 opacity-90 pointer-events-none transform -scale-x-100 rotate-12"
        />

        {/* Birds flying */}
        <img
          src="/paper-images/other/bird.png"
          alt="Bird"
          className="absolute top-32 left-1/4 w-32 md:w-48 h-auto z-20 pointer-events-none"
        />
        <img
          src="/paper-images/other/bird.png"
          alt="Bird 2"
          className="absolute top-24 left-1/3 w-20 md:w-32 h-auto z-20 pointer-events-none opacity-80 transform scale-75"
        />
        
        {/* Tiger sitting on the left */}
        <img
          src="/paper-images/other/tiger.png"
          alt="Tiger"
          className="absolute bottom-10 left-10 w-[30vw] max-w-[400px] h-auto z-20 pointer-events-none"
        />

        <div className="relative z-30 text-center px-6 select-none flex flex-col items-center justify-center w-full h-[50vh] min-h-[400px]">
          <h1 className="text-white text-[100px] md:text-[180px] font-black tracking-widest drop-shadow-2xl">
            日本尾
          </h1>
        </div>
      </div>

    </section>
  );
}
