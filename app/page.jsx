"use client";

import { useState } from "react";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import Link from "next/link";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="max-w-[2000px] flex flex-col items-center justify-center orbitron-400 h-screen w-screen relative">
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        <Spline
          scene="https://prod.spline.design/JgBbZB5iZ4n17ePP/scene.splinecode"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute bottom-0 inset-x-0 z-10 h-80 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <div data-aos="fade-in" data-aos-duration="1000" data-aos-delay="" className="absolute orbitron-400 w-full   items-center  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col justify-center mt-20">
        <Image src="/zynex-text.svg" alt="Zynex Text" width={579} height={133} className="w-1/2"/>
      </div>
      <div className="absolute orbitron-400 w-full text-white/50   items-center  bottom-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col justify-center mt-20">
        <div className="flex flex-col items-center justify-center top-10 relative gap-5">
          <div className="flex gap-5 text-xl">
            <Link href="https://wa.me/94783458889" target="_blank">
              <FaWhatsapp />
            </Link>
            <Link href="https://facebook.com/zynexdev" target="_blank">
              <FaFacebook />
            </Link>
            <Link href="mailto:hello@zynexdev.com" target="_blank">
              <AiOutlineMail />
            </Link>
          </div>
          <div className="tracking-widest"  >Merge Your Ideas With Our Digital Creativity</div>
        </div>
      </div>


    </div>
  );
}
