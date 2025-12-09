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
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { MdOutlineDevices } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { GrAnnounce } from "react-icons/gr";
import { SiMaterialdesignicons } from "react-icons/si";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { AnimatedList } from "@/components/ui/animated-list";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { cn } from "@/lib/utils";

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
            <div className="flex flex-col gap-5 w-full items-center">
              <div className="w-full text-center orbitron-400 text-white tracking-[10] text-5xl">WHAT WE DO</div>
              <div className="text-center orbitron-400 text-white w-1/2 text-md">At <span className="text-[#AE00FF]">ZYNEX</span>, we specialize in turning ideas into reality. From designing intuitive interfaces to developing robust software, we handle every stage of the process. Our team also manages the deployment, ensuring your product is seamlessly launched and fully supported. We deliver tailored, high-quality solutions that help your business thrive.</div>
            </div>
            <div className="w-full flex flex-wrap justify-around gap-10">

              <CardSpotlight className="bg-white/20 rounded-2xl border-white/20 border flex flex-col w-1/4 backdrop-blur-[10px]">
                <div className="w-full z-2 orbitron-400 text-white tracking-[10] text-xl border-b border-white/20 py-5 px-5 flex gap-5 items-center"><MdOutlineDevices className="text-7xl text-[#AE00FF]" /> WEB DEVELOPMENT</div>
                <div className="p-5 z-2 text-center text-md"> Futuristic, responsive websites built with modern technologies.</div>
              </CardSpotlight>
              <CardSpotlight className="bg-white/20 rounded-2xl border-white/20 border flex flex-col w-1/4 backdrop-blur-[10px]">
                <div className="w-full z-2 orbitron-400 text-white tracking-[10] text-xl border-b border-white/20 py-2 px-5 flex gap-5 items-center"> <BiCategory className="text-8xl text-[#AE00FF]" /> System Development</div>
                <div className="p-5 z-2 text-center text-md">Custom systems for managing business operations efficiently.</div>
              </CardSpotlight>
              <CardSpotlight className="bg-white/20 rounded-2xl border-white/20 border flex flex-col w-1/4 backdrop-blur-[10px]">
                <div className="w-full z-2 orbitron-400 text-white tracking-[10] text-xl border-b border-white/20 py-5 px-5 flex gap-5 items-center"> <GrAnnounce className="text-6xl text-[#AE00FF]" /> Digital Marketing</div>
                <div className="p-5 z-2 text-center text-md">Reach more customers with smart online advertising. </div>
              </CardSpotlight>
              <CardSpotlight className="bg-white/20 rounded-2xl border-white/20 border flex flex-col w-1/4 backdrop-blur-[10px]">
                <div className="w-full z-2 orbitron-400 text-white tracking-[10] text-xl border-b border-white/20 py-5 px-8 flex gap-8 items-center"> <SiMaterialdesignicons className="text-6xl text-[#AE00FF]" /> Graphic Designing</div>
                <div className="p-5 z-2 text-center text-md">Logos, banners, and full brand identity for your business.</div>
              </CardSpotlight>
            </div>
          </div>

          <div className="w-full h-screen"></div>

        </div>
      </div>

      {/* Why Choose Us Section with Animated List */}
      <div className="w-full min-h-screen bg-black py-20 px-4 md:px-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="orbitron-400 text-white tracking-[10px] text-4xl md:text-5xl mb-4">WHY CHOOSE US</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">Discover what makes ZYNEX the perfect partner for your digital journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="relative h-[500px] w-full max-w-[400px] mx-auto">
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
              <div className="from-black pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h3 className="orbitron-400 text-white text-2xl mb-4">Expert Team</h3>
                <p className="text-white/70">Our team consists of seasoned professionals with years of experience in web development, mobile apps, and digital solutions. We bring your vision to life with precision and creativity.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h3 className="orbitron-400 text-white text-2xl mb-4">Modern Technologies</h3>
                <p className="text-white/70">We stay ahead of the curve by using the latest frameworks and tools including React, Next.js, Three.js, and more to deliver cutting-edge solutions.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h3 className="orbitron-400 text-white text-2xl mb-4">Results Driven</h3>
                <p className="text-white/70">Every project we undertake is focused on achieving measurable results that help your business grow and succeed in the digital landscape.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Process Section with Tracing Beam */}
      <div className="w-full min-h-screen bg-black py-20 px-4 md:px-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-transparent to-blue-900/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="orbitron-400 text-white tracking-[10px] text-4xl md:text-5xl mb-4">OUR PROCESS</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">From concept to launch, we follow a proven development process</p>
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
                  <p className="text-white/70 text-lg leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </TracingBeam>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full min-h-screen bg-black py-20 px-4 md:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-[#AE00FF]/20 to-[#4000FF]/20 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="orbitron-400 text-white tracking-[10px] text-4xl md:text-5xl mb-4">TESTIMONIALS</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">Hear what our clients have to say about working with us</p>
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
  );
}
