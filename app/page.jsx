"use client";

import { useState, useLayoutEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import Link from "next/link";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  useLayoutEffect(() => {
    // Set initial camera position BEFORE GSAP animation
      camera.position.set(0, 2, 4);
      camera.lookAt(0, 0, 0);

      // Create scroll animation
      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: "#sec-welcome",
          start: "top center",
          end: "bottom 20%",
          scrub: true,
        }
      });

      t1.to(camera.position, {
        x: 0,
        y: -1,
        duration: 1,
      });

      return () => t1.kill();
    }, [camera]);

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


  return (
    <div>
      <div className="max-w-screen overflow-hidden flex flex-col items-center justify-center orbitron-400 min-h-screen w-full relative">
        {/* Spline Background */}
        {/* <div className="absolute inset-0 z-0">
          <Spline
            scene="https://prod.spline.design/JgBbZB5iZ4n17ePP/scene.splinecode"
            onLoad={() => setIsLoading(false)}
          />
        </div> */}

        {/* Overlay gradient */}
        <div className="absolute bottom-0 inset-x-0 z-10 h-80 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        <div data-aos="fade-in" data-aos-duration="1000" data-aos-delay="" className="absolute orbitron-400 w-full   items-center  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col justify-center mt-20">
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
        </div>
      </div>


      {/* 3D Model Section with Scrollytelling */}
      <div id="section" className="relative w-full bg-black">

        {/* Sticky Canvas Container */}
        <div id="model-container" className="sticky top-0 h-screen w-full overflow-hidden z-0">
          <div className="absolute inset-0 z-3">
            <Canvas camera={{ position: [0, 0, 0], fov: 30 }}>
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

          <div id="sec-welcome" className="w-full h-full absolute  left-0 flex flex-col gap-5 items-center justify-center z-4 backdrop-blur-sm pointer-events-auto">
            <div ref={welcomeTextRef} className="w-full flex -top-50 flex-col justify-center items-center relative">
              <div className="w-full text-center orbitron-400 text-white tracking-[10] text-5xl">WELCOME TO</div>
              <div className="w-full text-center orbitron-400 text-white tracking-[10] text-7xl">ZYNEX DEVELOPMENTS</div>
            </div>
          </div>

          <div id="model-background" className="absolute top-0 left-0 w-full h-full backdrop-blur-[200px] z-2 pointer-events-none"></div>
          <div id="background-gradient" className="w-100 h-50 bg-gradient-to-br from-[#AE00FF] to-[#4000FF] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full z-1 pointer-events-none"></div>
        </div>

        {/* Scrollable Content */}
        <div id="content" className="relative z-10 flex flex-col w-full max-w-[2000px] mx-auto pointer-events-none">
          {/* Section 1: Welcome */}


          {/* Section 2: What We Do */}
          <div id="section-2" className="w-full min-h-screen flex flex-col gap-20 items-center justify-center py-30 px-20 pointer-events-auto">
            <div className="flex flex-col w-full items-center">
              <div className="w-full text-center orbitron-400 text-white tracking-[10] text-5xl">WHAT WE DO</div>
              <div className="text-center orbitron-400 text-white w-1/2 text-md">At ZYNEX, we specialize in turning ideas into reality. From designing intuitive interfaces to developing robust software, we handle every stage of the process. Our team also manages the deployment, ensuring your product is seamlessly launched and fully supported. We deliver tailored, high-quality solutions that help your business thrive.</div>
            </div>
            <div className="w-full flex flex-wrap justify-around gap-10">

              <div className="bg-white/20 rounded-2xl border-white/20 border flex flex-col w-1/4 backdrop-blur-[10px]">
                <div className="w-full text-center orbitron-400 text-white tracking-[10] text-xl border-b border-white/20 p-5">WEB DEVELOPMENT</div>
                <div className="p-5 text-center text-md">We create custom websites that are not only visually stunning but also provide a seamless user experience. Our team of developers uses the latest technologies to build responsive and scalable websites that meet your business needs.</div>
              </div>
              <div className="bg-white/20 rounded-2xl border-white/20 border flex flex-col w-1/4 backdrop-blur-[10px]">
                <div className="w-full text-center orbitron-400 text-white tracking-[10] text-xl border-b border-white/20 p-5">WEB DEVELOPMENT</div>
                <div className="p-5 text-center text-md">We create custom websites that are not only visually stunning but also provide a seamless user experience. Our team of developers uses the latest technologies to build responsive and scalable websites that meet your business needs.</div>
              </div>
              <div className="bg-white/20 rounded-2xl border-white/20 border flex flex-col w-1/4 backdrop-blur-[10px]">
                <div className="w-full text-center orbitron-400 text-white tracking-[10] text-xl border-b border-white/20 p-5">WEB DEVELOPMENT</div>
                <div className="p-5 text-center text-md">We create custom websites that are not only visually stunning but also provide a seamless user experience. Our team of developers uses the latest technologies to build responsive and scalable websites that meet your business needs.</div>
              </div>
              <div className="bg-white/20 rounded-2xl border-white/20 border flex flex-col w-1/4 backdrop-blur-[10px]">
                <div className="w-full text-center orbitron-400 text-white tracking-[10] text-xl border-b border-white/20 p-5">WEB DEVELOPMENT</div>
                <div className="p-5 text-center text-md">We create custom websites that are not only visually stunning but also provide a seamless user experience. Our team of developers uses the latest technologies to build responsive and scalable websites that meet your business needs.</div>
              </div>
            </div>
          </div>

          <id className="w-full h-screen"></id>

        </div>
      </div>


    </div>
  );
}
