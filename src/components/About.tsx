"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React, { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const clipRef = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);
  const isFullWidth = useRef(false);

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          isFullWidth.current = self.progress === 1;
          if (isFullWidth.current) {
            gsap.to(clipRef.current, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.3,
            });
            gsap.to(image2Ref.current, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.3,
            });
          }
        },
      },
    });

    clipAnimation.set(".about-image", {
      width: "400px",
      perspective: "700px",
      rotateY: "45deg",
      rotateX: "5deg",
    });

    clipAnimation.to(".about-image", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      rotateY: "0deg",
      rotateX: "0deg",
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!clipRef.current || !image2Ref.current || isFullWidth.current) return;

      const { left, top, width, height } =
        clipRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 10;
      const y = ((e.clientY - top) / height - 0.5) * 10;

      gsap.to(clipRef.current, {
        rotateX: -y,
        rotateY: x,
        transformPerspective: 1000,
        ease: "power3.out",
        duration: 0.3,
      });

      gsap.to(image2Ref.current, {
        rotateX: -y,
        rotateY: x,
        transformPerspective: 1000,
        ease: "power3.out",
        duration: 0.3,
      });
    };

    const clipElement = clipRef.current;
    if (!clipElement) return;
    clipElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      clipElement.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zentry
        </h2>

        <AnimatedTitle
          title="Disc<strong>o</strong>ver the world's <br/> l<strong>a</strong>rgest shared adventure"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>The Game of Games begins-your life, now an epic MMORPG</p>
          <p>Zentry unites every players for countless games and platforms</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip" ref={clipRef}>
        <div className="mask-clip-path about-image">
          <Image
            src={"/img/about.webp"}
            alt="Background Image"
            height={1000}
            width={1000}
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
        <Image
          src={"/img/stones.webp"}
          alt="Image 2"
          height={1000}
          width={1000}
          className="absolute left-0 -top-24 h-full w-[200%] object-cover z-50"
          ref={image2Ref}
        />
      </div>
    </div>
  );
};

export default About;
