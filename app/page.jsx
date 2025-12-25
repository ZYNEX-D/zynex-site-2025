"use client";

import { useState, useLayoutEffect, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { MdOutlineDevices } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { GrAnnounce } from "react-icons/gr";
import { SiMaterialdesignicons } from "react-icons/si";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { AnimatedList } from "@/components/ui/animated-list";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { cn } from "@/lib/utils";
import { TbBrandThreejs } from "react-icons/tb";
import { SiBlender } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";
import { motion, useMotionValue, useTransform } from "framer-motion";
import GradientBg from "@/components/GradientBg";
import FloatingLines from "@/components/ui/FloatingLines";

gsap.registerPlugin(ScrollTrigger);

import ModelLogo from "@/components/ModelLogo";
import DarkVeil from "@/components/ui/DarkVeil";
import LightRays from "@/components/ui/LightRays";

function Model() {
  const gltf = useGLTF("/f1.glb");
  const modelRef = useRef();

  useLayoutEffect(() => {
    if (!modelRef.current) return;

    // Initial state
    modelRef.current.position.set(0, 0, 0);
    modelRef.current.rotation.set(0, 0, 0);
    modelRef.current.scale.set(1, 1, 1);

    const t1 = gsap.timeline({
      scrollTrigger: {
        ease: "power4.inOut",
        trigger: "#section-2",
        start: "top bottom",
        end: "bottom-=10% bottom",
        scrub: true,
        duration: 4,
      }
    })

    t1.to(modelRef.current.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      duration: 4,
    }).to(modelRef.current.position, {
      x: 1,
      z: 2,
      y: -0.7,
      duration: 4,
    }, "<").to(modelRef.current.rotation, {
      y: -1,
      duration: 4,
    }, "<");




    // const t2 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: "#model-container",
    //     start: "top center",
    //     end: "bottom center",
    //     scrub: true,
    //     markers: true,
    //   }
    // })

    // t2.to(modelRef.current.scale, {
    //   x: 1.5,
    //   y: 1.5,
    //   z: 1.5,
    //   duration: 1,
    // }).to(modelRef.current.position, {
    //   x: 2,
    //   z: 2,
    //   y: 2,
    //   duration: 1,
    // }).to(modelRef.current.rotation, {
    //   y: Math.PI / 2,
    //   duration: 1,
    // }, "0");

    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: "#section-2", // Start animating when section 2 comes into view
    //     start: "top bottom",
    //     end: "center center",
    //     scrub: true,
    //     // markers: true, // Uncomment for debugging
    //   },
    // });

    // tl.to(modelRef.current.rotation, {
    //   y: Math.PI, // Rotate 360 degrees
    //   duration: 1,
    // })
    //   .to(modelRef.current.position, {
    //     x: 2,
    //     z: 1,
    //     duration: 1,
    //   }, "<"); // Run simultaneously

  }, []);

  return (
    <primitive object={gltf.scene} ref={modelRef} />
  );
}

function MoveCamera() {
  const { camera } = useThree();

  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  // GSAP-controlled camera base position
  const base = useRef({ x: 0, y: 2, z: 4 });

  // Track mouse
  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Mouse parallax only adds a small offset
  useFrame(() => {
    target.current.x = mouse.current.x * 0.3;
    target.current.y = mouse.current.y * 0.3;

    // Final camera position = GSAP base + mouse offset
    camera.position.x += ((base.current.x + target.current.x) - camera.position.x) * 0.05;
    camera.position.y += ((base.current.y + target.current.y) - camera.position.y) * 0.05;
    camera.position.z += (base.current.z - camera.position.z) * 0.05;
  });

  useLayoutEffect(() => {
    // Initial base camera position
    base.current = { x: 0, y: 2, z: 4 };

    camera.position.set(base.current.x, base.current.y, base.current.z);
    camera.lookAt(0, 0, 0);

    // GSAP controls ONLY base position
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#sec-welcome",
        start: "top center",
        end: "bottom 20%",
        scrub: true,
      },
      defaults: { ease: "none" },
    });

    t1.to(base.current, {
      x: 0,
      y: -1,
      z: 4,
      duration: 1,
      onUpdate: () => {
        // GSAP updates base position, R3F updates camera smoothly
      },
    });

    return () => t1.kill();
  }, []);

  return null;
}


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const welcomeTextRef = useRef(null);

  useLayoutEffect(() => {
    if (!welcomeTextRef.current) return;

    const welcomeTimeline1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#sec-welcome",
        start: "top center",
        end: "bottom bottom",
        scrub: true,
        markers: false,
      }
    });

    ScrollTrigger.create({
      trigger: "#sec-welcome",
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
      onLeave: () => gsap.set("#sec-welcome", { display: "none" }),
      onEnterBack: () => gsap.set("#sec-welcome", { display: "flex" }),
    });


    welcomeTimeline1.to(welcomeTextRef.current, {
      opacity: 0,
      top: "0%",
      scale: 0.9,
      duration: 1,
    });

    return () => {
      welcomeTimeline1.kill();
    };
  }, []);


  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // smooth movement based on mouse pos
  const translateX = useTransform(mouseX, [0, window.innerWidth], [-50, 50]);
  const translateY = useTransform(mouseY, [0, window.innerHeight], [-50, 50]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);



  return (
    <div>
      <div className="max-w-screen overflow-hidden flex flex-col items-center justify-center orbitron-400 min-h-screen w-full relative">
        <LightRays
          raysOrigin="top-center"
          raysColor="#AE00FF"
          raysSpeed={1.5}
          lightSpread={2}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="h-screen w-full"

        />
        {/* <DarkVeil/> */}
        {/* <FloatingLines
          className="z-0"
          linesGradient={[
            '#AE00FF',
            '#4000FF',
            '#AE00FF',
            '#4000FF',
            '#AE00FF',
            '#4000FF',
            '#AE00FF',
            '#4000FF',
          ]}
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[2, 5, 2]}
          lineDistance={[5, 5, 5]}
          topWavePosition={{ x: 10.0, y: 0.5, rotate: -0.4 }}
          middleWavePosition={{ x: 5.0, y: 0.0, rotate: 0.2 }}
          bottomWavePosition={{ x: 2.0, y: -0.7, rotate: 0.4 }}
          animationSpeed={1}
          interactive={true}
          bendRadius={5.0}
          bendStrength={-0.5}
          mouseDamping={0.05}
          parallax={true}
          parallaxStrength={0.2}
          mixBlendMode='screen'
        /> */}
        {/* <Canvas dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} camera={{ position: [0, 0, 0], fov: 20 }}>
          <directionalLight position={[1.61, -1.15, 0.7]} intensity={0.1} />


          <ModelLogo />
          <OrbitControls enableZoom={true} enablePan={false} enableRotate={false} />
        </Canvas> */}
        {/* Spline Background */}
        {/* <div className="absolute inset-0 z-0">
          <Spline
            scene="https://prod.spline.design/JgBbZB5iZ4n17ePP/scene.splinecode"
            onLoad={() => setIsLoading(false)}
          />
        </div> */}

        {/* Overlay gradient */}
        <div className="absolute bottom-0 inset-x-0 z-10 h-80 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        {/* <div data-aos="fade-in" data-aos-duration="1000" data-aos-delay="" className="absolute orbitron-400 w-full   items-center  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col justify-center mt-20">
          <Image src="/zynex-text.svg" alt="Zynex Text" width={579} height={133} className="w-1/2" />
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
        </div> */}
        <Canvas className="hidden md:block" dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} camera={{ position: [0, 0, 0], fov: 10 }}>
          <directionalLight position={[1.61, -1.15, 0.7]} intensity={0.1} />
          <ModelLogo />
          <OrbitControls enableZoom={true} enablePan={false} enableRotate={false} />
        </Canvas>
        <Canvas className="md:hidden" dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} camera={{ position: [0, 0, 0], fov: 20 }}>
          <directionalLight position={[1.61, -1.15, 0.7]} intensity={0.1} />
          <ModelLogo />
          <OrbitControls enableZoom={true} enablePan={false} enableRotate={false} />
        </Canvas>
        <div className="w-full h-full md:py-40 md:px-60 flex absolute top-0 left-0 p-5 md:p-0">
          <div className="w-1/3 aspect-square relative hidden md:block">
          </div>
          <div className="w-full md:w-2/3 flex flex-col justify-end mb-5 md:mb-0 md:justify-center gap-5 md:gap-10 md:pl-20">
            <div className="w-full flex justify-center items-center ">
              <Image src="/zynex-text.svg" alt="Zynex Text" width={579} height={133} className="w-full" />
            </div>
            <div className="w-full text-white/70 font-orbitron-400 tracking-widest text-sm md:text-xl"> Merge Your Ideas With Our Digital Creativity</div>
            <div className="w-full flex  gap-5 md:gap-20">
              <Link href='/Contact' className="w-fit border overflow-hidden duration-300 hover:text-black flex justify-center items-center group border-white px-10 py-2 text-white rounded-full relative font-orbitron-400 tracking-widest text-xl">
                <span className="w-0 h-0 bg-white absolute duration-300 z-0 group-hover:w-full group-hover:h-full rounded-full flex"></span>
                <div className="z-10 text-sm md:text-base">
                  Contact Us
                </div>
              </Link>
              <div className="flex gap-5 text-sm md:text-3xl h-full">
                <Link href="https://wa.me/94783458889" target="_blank">
                  <FaWhatsapp className="h-full hover:text-[#AE00FF] duration-300" />
                </Link>
                <Link href="https://facebook.com/zynexdev" target="_blank">
                  <FaFacebook className="h-full hover:text-[#AE00FF] duration-300" />
                </Link>
                <Link href="mailto:hello@zynexdev.com" target="_blank">
                  <AiOutlineMail className="h-full hover:text-[#AE00FF] duration-300" />
                </Link>
              </div>
            </div>
            <div className="text-xs z-10 md:text-sm py-10 w-full text-justify tracking-widest text-white/50">ZYNEX Developments is a boutique web development and digital solutions agency founded by Gen-Z. We believe in delivering high-quality services at affordable prices. Our team combines creativity, technical expertise, and a client-focused approach to build products that stand out.</div>
          </div>
        </div>

      </div>


      {/* 3D Model Section with Scrollytelling */}
      <div id="section" className="relative w-full bg-black">

        {/* Sticky Canvas Container */}
        <div id="model-container" className="sticky top-0 h-screen w-full overflow-hidden z-0">
          <div className="absolute inset-0 z-3 pointer-events-none">
            <Canvas className="hidden md:block" dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }} camera={{ position: [0, 0, 0], fov: 30 }}>
              <directionalLight position={[1.61, -1.15, 0.7]} intensity={0.1} />
              <pointLight
                color="#AE00FF"
                intensity={5}
                position={[0, 0, 0]}
                distance={10}
                decay={2}
                castShadow={true}
              />
              <pointLight
                color="#4000FF"
                intensity={5}
                position={[5, 5, 5]}
                distance={100}
                decay={2}
                castShadow={true}
              />

              <Model />
              <MoveCamera />
              <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            </Canvas>
            <Canvas className="md:hidden" dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }} camera={{ position: [0, 0, 0], fov: 50 }}>
              <directionalLight position={[1.61, -1.15, 0.7]} intensity={0.1} />
              <pointLight
                color="#AE00FF"
                intensity={5}
                position={[0, 0, 0]}
                distance={10}
                decay={2}
                castShadow={true}
              />
              <pointLight
                color="#4000FF"
                intensity={5}
                position={[5, 5, 5]}
                distance={100}
                decay={2}
                castShadow={true}
              />

              <Model />
              <MoveCamera />
              <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            </Canvas>
          </div>

          <div id="sec-welcome" className="w-full h-full absolute p-5 left-0 flex flex-col gap-5 items-center justify-center z-4 backdrop-blur-xs md:backdrop-blur-sm pointer-events-none">
            <div ref={welcomeTextRef} className="w-full flex gap-5 -top-50 flex-col justify-center items-center relative">
              <div className="w-full text-center orbitron-400 text-white tracking-[10] text-base md:text-5xl">WELCOME TO</div>
              <div className="w-full text-center orbitron-400 text-white tracking-[10] hidden md:block text-7xl">ZYNEX DEVELOPMENTS</div>
              <Image src="/zynex-text.svg" alt="Zynex Text" width={579} height={133} className="md:hidden " />
            </div>
          </div>

          <GradientBg />

        </div>

        {/* Scrollable Content */}
        <div id="content" className="relative z-10 flex flex-col w-full max-w-[2000px] mx-auto ">
          {/* Section 1: Welcome */}


          {/* Section 2: What We Do */}
          <div id="section-2" className="w-full min-h-screen flex flex-col gap-20 items-center justify-center p-5 md:py-30 md:px-20 ">
            <div className="flex flex-col gap-5 w-full items-center">
              <div className="w-full md:text-center orbitron-400 text-white tracking-[10] text-3xl md:text-5xl">WHAT WE DO</div>
              <div className="text-justify md:text-center orbitron-400 text-white md:w-1/2 w-full text-xs md:text-sm text-white/70">At <span className="text-[#AE00FF]">ZYNEX</span>, we specialize in turning ideas into reality. From designing intuitive interfaces to developing robust software, we handle every stage of the process. Our team also manages the deployment, ensuring your product is seamlessly launched and fully supported. We deliver tailored, high-quality solutions that help your business thrive.</div>
            </div>
            <div className="min-w-[screen] overflow-auto w-full relative flex flex-col md:flex-row justify-around">

              <Link href="/web-development" className="w-full border-t border-b border-white/40 py-10 text-center text-xl md:backdrop-blur-xs flex flex-col">
                <div className="w-full text-center orbitron-400 text-white tracking-[3] text-xl md:text-xl">Web Development</div>
              </Link>
              <Link href="/system-development" className="w-full border-t border-b border-white/40 py-10 text-center text-xl md:backdrop-blur-xs flex flex-col">
                <div className="w-full text-center orbitron-400 text-white tracking-[3] text-xl md:text-xl">System Development</div>
              </Link>
              <Link href="/digital-marketing" className="w-full border-t border-b border-white/40 py-10 text-center text-xl md:backdrop-blur-xs flex flex-col">
                <div className="w-full text-center orbitron-400 text-white tracking-[3] text-xl md:text-xl">Digital Marketing</div>
              </Link>
              <Link href="/graphic-designing" className="w-full border-t border-b border-white/40 py-10 text-center text-xl md:backdrop-blur-xs flex flex-col">
                <div className="w-full text-center orbitron-400 text-white tracking-[3] text-xl md:text-xl">Graphic Designing</div>
              </Link>

              {/* <CardSpotlight className="bg-white/20 rounded-2xl border-white/20 border flex flex-col w-full md:w-1/4 backdrop-blur-[10px]">
                <div className="w-full z-2 orbitron-400 text-white tracking-widest md:tracking-[10] text-base md:text-xl border-b border-white/20 py-2 px-5 flex gap-5 md:gap-5 items-center">
                  <MdOutlineDevices className="text-3xl md:text-7xl text-[#AE00FF]" /> 
                  <div className=" overflow-hidden">
                    Web Development
                  </div>
                </div>
                <div className="p-5 z-2 text-center text-sm md:text-base text-white/70"> Futuristic, responsive websites built with modern technologies.</div>
              </CardSpotlight>
              <CardSpotlight className="bg-white/20 rounded-2xl border-white/20 border flex flex-col w-full md:w-1/4 backdrop-blur-[10px]">
                <div className="w-full z-2 orbitron-400 text-white tracking-widest md:tracking-[10] text-base md:text-xl border-b border-white/20 py-2 px-5 flex gap-5 md:gap-5 items-center">
                  <BiCategory className="text-4xl md:text-8xl text-[#AE00FF]" /> 
                  <div className=" overflow-hidden">
                    System Development
                  </div>
                </div>
                <div className="p-5 z-2 text-center text-sm md:text-base text-white/70">Custom systems for managing business operations efficiently.</div>
              </CardSpotlight>
              <CardSpotlight className="bg-white/20 rounded-2xl border-white/20 border flex flex-col w-full md:w-1/4 backdrop-blur-[10px]">
                <div className="w-full z-2 orbitron-400 text-white tracking-widest md:tracking-[10] text-base md:text-xl border-b border-white/20 py-2 px-5 flex gap-5 md:gap-5 items-center">
                  <GrAnnounce className="text-3xl md:text-6xl text-[#AE00FF]" /> 
                  <div className=" overflow-hidden">
                    Digital Marketing
                  </div>
                </div>
                <div className="p-5 z-2 text-center text-sm md:text-base text-white/70">Reach more customers with smart online advertising. </div>
              </CardSpotlight>
              <CardSpotlight className="bg-white/20 rounded-2xl border-white/20 border flex flex-col w-full md:w-1/4 backdrop-blur-[10px]">
                <div className="w-full z-2 orbitron-400 text-white tracking-widest md:tracking-[10] text-base md:text-xl border-b border-white/20 py-2 px-8 flex gap-5 md:gap-8 items-center">
                  <SiMaterialdesignicons className="text-3xl md:text-6xl text-[#AE00FF]" /> 
                  <div className=" overflow-hidden">
                    Graphic Designing
                  </div>
                 </div>
                <div className="p-5 z-2 text-center text-sm md:text-base text-white/70">Logos, banners, and full brand identity for your business.</div>
              </CardSpotlight> */}
            </div>
          </div>

          {/* Why Choose Us Section with Animated List */}
          <div className="w-full min-h-screen py-20 px-4 md:px-20 relative">
            <div className="absolute inset-0  to-transparent" />
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="md:text-center mb-16">
                <h2 className="orbitron-400 text-white tracking-[10px] text-3xl md:text-5xl mb-4">WHY CHOOSE US</h2>
                <p className="text-white/60 text-xs md:text-sm max-w-2xl mx-auto">Discover what makes ZYNEX the perfect partner for your digital journey</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="relative  min-h-[80vh] w-full max-w-[400px] mx-auto ">
                  <AnimatedList delay={2000}>
                    {[
                      { name: "Innovative Solutions", description: "Cutting-edge technology stack", icon: "🚀", color: "#AE00FF", time: "Always" },
                      { name: "24/7 Support", description: "Round-the-clock assistance", icon: "💬", color: "#4000FF", time: "Anytime" },
                      { name: "Fast Delivery", description: "Quick turnaround times", icon: "⚡", color: "#00C9A7", time: "On-time" },
                      { name: "Quality Assured", description: "Rigorous testing processes", icon: "✅", color: "#FFB800", time: "Guaranteed" },
                      { name: "Scalable Design", description: "Future-proof architecture", icon: "📈", color: "#FF3D71", time: "Built-in" },
                      { name: "Cost Effective", description: "Best value for money", icon: "💎", color: "#1E86FF", time: "Always" },
                    ].map((item, idx) => (
                      <figure
                        key={idx}
                        className={cn(
                          "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
                          "transition-all duration-200 ease-in-out hover:scale-[103%]",
                          "bg-white/5 backdrop-blur-md border border-white/10"
                        )}
                      >
                        <div className="flex flex-row items-center gap-3">
                          <div
                            className="flex size-10 items-center justify-center rounded-2xl"
                            style={{ backgroundColor: item.color }}
                          >
                            <span className="text-lg">{item.icon}</span>
                          </div>
                          <div className="flex flex-col overflow-hidden">
                            <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre text-white">
                              <span className="text-sm sm:text-lg">{item.name}</span>
                              <span className="mx-1">·</span>
                              <span className="text-xs text-white/50">{item.time}</span>
                            </figcaption>
                            <p className="text-sm font-normal text-white/60">{item.description}</p>
                          </div>
                        </div>
                      </figure>
                    ))}
                  </AnimatedList>
                  {/* <div className="from-black pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div> */}
                </div>
                <div className="flex flex-col gap-8">
                  <CardSpotlight className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                    <h3 className="orbitron-400 z-2 relative text-white text-2xl mb-4">Expert Team</h3>
                    <p className="text-white/70 text-sm md:text-base z-2 relative">Our team consists of seasoned professionals with years of experience in web development, mobile apps, and digital solutions. We bring your vision to life with precision and creativity.</p>
                  </CardSpotlight>
                  <CardSpotlight className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                    <h3 className="orbitron-400 z-2 relative text-white text-2xl mb-4">Modern Technologies</h3>
                    <p className="text-white/70 text-sm md:text-base z-2 relative">We stay ahead of the curve by using the latest frameworks and tools including React, Next.js, Three.js, and more to deliver cutting-edge solutions.</p>
                  </CardSpotlight>
                  <CardSpotlight className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                    <h3 className="orbitron-400 z-2 relative text-white text-2xl mb-4">Results Driven</h3>
                    <p className="text-white/70 text-sm md:text-base z-2 relative">Every project we undertake is focused on achieving measurable results that help your business grow and succeed in the digital landscape.</p>
                  </CardSpotlight>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full min-h-screen py-20 px-4 md:px-30 relative">
            <div className="md:text-center md:mb-30 mb-10">
              <h2 className="orbitron-400 text-white tracking-[10px] text-3xl md:text-5xl mb-4">OUR ICONIC TECHNOLOGY</h2>
              <p className="text-white/60 text-xs md:text-sm max-w-2xl mx-auto">Bringing Next Level Futuristic Experiences to the Web – A First in Sri Lanka</p>
            </div>
            <div className="w-full flex-col flex sm:flex-row text-base text-white/70 h-full items-center">
              <div className="w-full sm:w-1/2 flex flex-col gap-10 items-center">
                <div className="text-justify  text-sm md:text-base">
                  At ZYNEX Developments, we are pioneers in implementing interactive 3D models on websites using Three.js. This technology allows your visitors to engage with products, designs, or concepts in an immersive way that is rarely offered in Sri Lanka. Few companies can deliver this level of innovation, and we take pride in being one of the leaders.
                </div>
                <div className="text-justify text-sm md:text-base">
                  Coupled with sleek, cutting-edge UI designs, this creates a digital experience that is rare in Sri Lanka and sets your brand apart.
                </div>
                <div className="flex gap-20 text-7xl md:py-20 py-10 w-full justify-center">
                  <SiNextdotjs className="text-5xl" />
                  <TbBrandThreejs className="text-5xl" />
                  <SiBlender className="text-5xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Our Process Section with Tracing Beam */}
          <div className="w-full min-h-screen py-20 px-4 md:px-20 relative">
            <div className="absolute inset-0  " />
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="md:text-center mb-16">
                <h2 className="orbitron-400 text-white tracking-[10px] text-3xl md:text-5xl mb-4">OUR PROCESS</h2>
                <p className="text-white/60 text-xs md:text-base max-w-2xl mx-auto">From concept to launch, we follow a proven development process</p>
              </div>
              <TracingBeam className="px-6">
                <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                  {[
                    {
                      title: "Discovery & Planning",
                      description: "We begin by understanding your vision, goals, and requirements. Through detailed discussions and research, we create a comprehensive project roadmap that outlines every phase of development.",
                      badge: "Phase 1",
                    },
                    {
                      title: "Design & Prototyping",
                      description: "Our design team creates stunning visual mockups and interactive prototypes. We focus on user experience, ensuring every element serves a purpose and contributes to your brand identity.",
                      badge: "Phase 2",
                    },
                    {
                      title: "Development",
                      description: "Using cutting-edge technologies, our developers bring the designs to life. We write clean, scalable code following industry best practices and maintain constant communication throughout.",
                      badge: "Phase 3",
                    },
                    {
                      title: "Testing & QA",
                      description: "Rigorous testing ensures your product works flawlessly across all devices and browsers. We identify and fix any issues before launch, guaranteeing a polished final product.",
                      badge: "Phase 4",
                    },
                    {
                      title: "Launch & Support",
                      description: "We handle the deployment process seamlessly and provide ongoing support. Our team remains available for updates, maintenance, and any future enhancements you may need.",
                      badge: "Phase 5",
                    },
                  ].map((item, index) => (
                    <div key={`content-${index}`} className="mb-16">
                      <span className="bg-gradient-to-r from-[#AE00FF] to-[#4000FF] text-white rounded-full text-sm px-4 py-1 mb-4 inline-block">
                        {item.badge}
                      </span>
                      <h3 className="orbitron-400 text-2xl text-white mb-4">{item.title}</h3>
                      <p className="text-white/70 text-base md:text-base leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </TracingBeam>
            </div>
          </div>

          {/* Recent Projects Section */}
          <div className="w-full min-h-screen py-20 px-4 md:px-20 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" />
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="md:text-center mb-16">
                <h2 className="orbitron-400 text-white tracking-[10px] text-3xl md:text-5xl mb-4">RECENT PROJECTS</h2>
                <p className="text-white/60 text-xs md:text-base max-w-2xl mx-auto">Take a look at some of the projects we've brought to life. Our portfolio showcases websites, systems, and digital campaigns designed for real results.</p>
              </div>

              <div className="flex flex-col lg:flex-row gap-10 items-center justify-center mt-10">
                {/* Left Side - Project Filters */}
                <div className="flex flex-col gap-4 w-full lg:w-1/4">
                  {[
                    { name: "THARUUX", active: true },
                    { name: "VIVANTE", active: false },
                    { name: "SFT WITH DILSHAN PERERA", active: false },
                  ].map((project, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-6 py-3 text-left orbitron-400 tracking-wider text-sm transition-all duration-300 rounded-lg border ${project.active
                        ? "bg-gradient-to-r from-[#AE00FF] to-[#4000FF] border-transparent text-white shadow-lg shadow-[#AE00FF]/30"
                        : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:border-[#AE00FF]/50"
                        }`}
                    >
                      {project.name}
                    </motion.button>
                  ))}
                </div>

                {/* Right Side - Project Showcase */}
                <div className="flex-1 relative">
                  {/* Project Name Large Text */}
                  <div className="absolute left-0 bottom-1/4 z-10 pointer-events-none">
                    <motion.h3
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="designer hidden md:block text-[8vw] lg:text-[6vw] font-bold text-white/10 leading-none"
                      style={{ fontFamily: "'Designer', sans-serif" }}
                    >
                      THARUUX
                    </motion.h3>
                  </div>

                  {/* Project Showcase Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative ml-auto w-full lg:w-3/4 md:aspect-video bg-gradient-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 backdrop-blur-md overflow-hidden shadow-2xl shadow-[#AE00FF]/10"
                  >
                    {/* Laptop Mockup */}
                    <div className="md:absolute inset-0 flex items-center justify-center pt-12 pb-20  p-8">
                      <div className="relative w-full max-w-md">
                        {/* Laptop Screen */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-lg p-1">
                          <div className="bg-black rounded-t-md aspect-video overflow-hidden">
                            <Image
                              src="/tharuxx.png"
                              alt="THARUUX Portfolio"
                              width={800}
                              height={450}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                        </div>
                        {/* Laptop Base */}
                        <div className="bg-gradient-to-b from-gray-700 to-gray-800 h-3 rounded-b-lg relative">
                          <div className="absolute inset-x-0 -bottom-1 h-1 bg-gray-900 rounded-full mx-auto w-1/4" />
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
                      <span className="text-white/30 text-xs orbitron-400">01</span>
                      <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#AE00FF]/50" />
                    </div>

                    {/* Technologies Used - Inside Glossy Box */}
                    <div className="absolute bottom-8 left-4 flex items-center gap-3">
                      <span className="text-white/40 text-xs orbitron-400 tracking-wider">BUILT WITH</span>
                      <div className="flex items-center gap-2">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center gap-1.5 px-2 py-1 bg-white/10 border border-white/20 rounded-md hover:border-[#AE00FF]/50 transition-all duration-300 cursor-pointer"
                        >
                          <SiNextdotjs className="text-sm text-white" />
                          <span className="text-white/70 text-[10px] orbitron-400">Next.js</span>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center gap-1.5 px-2 py-1 bg-white/10 border border-white/20 rounded-md hover:border-[#AE00FF]/50 transition-all duration-300 cursor-pointer"
                        >
                          <TbBrandThreejs className="text-sm text-white" />
                          <span className="text-white/70 text-[10px] orbitron-400">Three.js</span>
                        </motion.div>

                      </div>
                    </div>

                    {/* View Project Link */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="absolute bottom-4 right-4 text-[#AE00FF]/70 text-sm orbitron-400 cursor-pointer hover:text-[#AE00FF] transition-colors flex items-center gap-2"
                    >
                      View Project <span>→</span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="w-full min-h-screen py-20 px-4 md:px-20 relative overflow-hidden">
            <div className="absolute inset-0  pointer-events-none" />
            <div className="absolute w-[500px] h-[500px] rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="md:text-center  md:mb-16">
                <h2 className="orbitron-400 text-white tracking-[10px] text-3xl md:text-5xl mb-4">TESTIMONIALS</h2>
                <p className="text-white/60 text-xs md:text-sm max-w-2xl mx-auto">Hear what our clients have to say about working with us</p>
              </div>
              <AnimatedTestimonials
                testimonials={[
                  {
                    quote: "ZYNEX transformed our vision into reality. Their attention to detail and innovative approach exceeded all our expectations. The final product was nothing short of exceptional.",
                    name: "Alex Johnson",
                    designation: "CEO, TechVentures",
                    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&crop=face",
                  },
                  {
                    quote: "Working with ZYNEX was an absolute pleasure. They delivered a stunning website that perfectly captures our brand essence. Highly recommend their services!",
                    name: "Sarah Chen",
                    designation: "Marketing Director, Innovate Co",
                    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop&crop=face",
                  },
                  {
                    quote: "The team at ZYNEX is incredibly talented and professional. They took our complex requirements and delivered a seamless, beautiful solution on time.",
                    name: "Michael Roberts",
                    designation: "Founder, StartupHub",
                    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face",
                  },
                  {
                    quote: "Outstanding work from start to finish. ZYNEX's expertise in modern web technologies helped us achieve a competitive edge in our market.",
                    name: "Emily Davis",
                    designation: "CTO, Digital First",
                    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop&crop=face",
                  },
                ]}
                autoplay={true}
              />
            </div>
          </div>


        </div>
      </div>



    </div>
  );
}