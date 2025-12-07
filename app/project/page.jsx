
'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPage() {
  const animatedBoxRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: animatedBoxRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        markers: true, // Set to true for debugging scroll positions
      },
    });

    tl.to(animatedBoxRef.current, {
      x: 500,   
      rotation: 360,
      duration: 1,
      ease: 'none',
    });

    // Cleanup function for ScrollTrigger
    return () => {
      tl.kill(); // Kill the timeline and its associated ScrollTrigger
    };
  }, []);

  return (
    <div style={{ height: '200vh', padding: '100px 0' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '400px' }}>Scroll down to see the animation!</h1>
      <div
        ref={animatedBoxRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'blue',
          margin: '0 auto',
          borderRadius: '10px',
        }}
      ></div>
      <div style={{ height: '100vh', marginTop: '200px', textAlign: 'center' }}>
        <h2>More content below</h2>
      </div>
    </div>
  );
}
