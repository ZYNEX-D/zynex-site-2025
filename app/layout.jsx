"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import HeaderSM from "@/components/HeaderSM";
import HeaderLG from "@/components/HeaderLG";
import SplashScreen from "@/components/SplashScreen";
import AOS from "aos";
import "aos/dist/aos.css";
import SmoothScroll from "@/components/SmoothScroll";
import Lenis from "@/components/Lenis";

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(false);

  Lenis();

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
        className={`antialiased w-full min-h-screen relative`}
      >
        {/* Splash Screen */}
        {showSplash && <SplashScreen finishLoading={finishLoading} />}

        {/* Main Content */}
        <div className="relative z-10 w-full min-h-screen flex flex-col">

          {isLoading ? (
            <div className="flex items-center justify-center h-screen w-full fixed top-0 left-0 bg-white z-50">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              <HeaderSM />
              <HeaderLG />
              <main className="flex-1 w-full">{children}</main>
            </>
          )}
        </div>
      </body>
    </html>
  );
}
