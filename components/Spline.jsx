"use client";

import Spline from "@splinetool/react-spline";

export default function SplineScene({ onLoad }) {
  return (
    <div className="w-full h-full">
      <Spline
        scene="https://prod.spline.design/JgBbZB5iZ4n17ePP/scene.splinecode"
        onLoad={onLoad}
      />
    </div>
  );
}
