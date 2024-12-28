"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import Button from "./Button";
import gsap from "gsap";

interface ImageClipBoxProps {
  src: string;
  clipClass: string;
}

const ImageClipBox: React.FC<ImageClipBoxProps> = ({ src, clipClass }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 20;
    const tiltY = (relativeX - 0.5) * -20;
    gsap.to(itemRef.current, {
      rotateX: -tiltX,
      rotateY: tiltY,
      transformPerspective: 1000,
      ease: "power3.out",
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(itemRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 0.3,
    });
  };

  return (
    <div
      className={`${clipClass} tilt-effect`}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image src={src} alt="contact-1-img" height={1000} width={1000} />
    </div>
  );
};

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 lg:overflow-hidden">
        <div className="absolute -left-10 top-0 hidden h-full w-72 overflow-hidden md:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 w-60  left-1/2 -translate-x-1/2 lg:-translate-x-0 lg:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center relative pointer-events-none">
          <p className="font-general text-[10px] uppercase">Join Zentry</p>
          <p className="special-font mt-10 w-full font-zentry text-6xl leading-[0.9] md:text-[6rem]">
            Let's b<strong>u</strong>ilt the <br /> new era of{" "}
            <br className="hidden lg:block" /> g<strong>a</strong>ming t
            <strong>o</strong>gether
          </p>
          <Button
            id="contact-btn"
            title="contact us"
            containerClass="mt-10 cursur-pointer pointer-events-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
