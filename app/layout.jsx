"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderSM from "@/components/HeaderSM";
import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import HeaderLG from "@/components/HeaderLG";
import AOS from "aos";
import "aos/dist/aos.css";


export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  useEffect(() => {
    // const hasVisited = localStorage.getItem("hasVisited");
    // if (!hasVisited) {
    setShowSplash(true);
    // localStorage.setItem("hasVisited", "true");
    // } else {
    //   setIsLoading(false);
    // }
  }, []);

  const finishLoading = () => {
    setIsLoading(false);
    setShowSplash(false);
  };

  return (
    <html lang="en">
      <body
        className={`antialiased w-screen h-screen overflow-hidden relative`}
      >
        {/* Splash Screen */}
        {showSplash && <SplashScreen finishLoading={finishLoading} />}

        {/* Main Content */}
        <div className="relative z-10 w-full h-full flex flex-col">
          
          {isLoading ? (
            <div className="flex items-center justify-center h-full w-full">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              <HeaderSM />
              <HeaderLG />
              <main className="flex-1 overflow-auto">{children}</main>
            </>
          )}
        </div>
      </body>
    </html>
  );
}
