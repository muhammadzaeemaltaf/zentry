"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedVideos, setLoadedVideos] = useState<number>(0);
  const [transformStyle, setTransformStyle] = useState<string>("");

  const videoSources: string[] = [
    "https://res.cloudinary.com/dvabwft9d/video/upload/v1736096077/hero-1_bcqzzg.mp4",
    "https://res.cloudinary.com/dvabwft9d/video/upload/hero-2_hlmg4k.mp4?_s=vp-2.1.0",
    "https://res.cloudinary.com/dvabwft9d/video/upload/v1736096023/hero-3_pdjwmw.mp4",
    "https://res.cloudinary.com/dvabwft9d/video/upload/v1736096062/hero-4_dqusbh.mp4",
  ];

  const totalVideos: number = 3;

  const nextVideoRef = useRef<null | HTMLVideoElement>(null);
  const maskClipPathRef = useRef<null | HTMLDivElement>(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcommingVideoIndex: number = (currentIndex % totalVideos) + 1;
  console.log(upcommingVideoIndex);

  useEffect(() => {
    if (loadedVideos <= totalVideos) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = (): void => {
    setHasClicked(true);
    setCurrentIndex(upcommingVideoIndex === totalVideos ? 0 : upcommingVideoIndex);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            nextVideoRef.current?.play();
          },
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSource = (index: number): string => videoSources[index];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!maskClipPathRef.current) return;

    const { left, top, width, height } =
      maskClipPathRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = Math.min(Math.max((relativeX - 0.5) * 15, -15), 15);
    const tiltY = Math.min(Math.max((relativeY - 0.5) * -15, -15), 15);

    const transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;

    setTransformStyle(transform);
    maskClipPathRef.current.classList.remove("scale-0");
    maskClipPathRef.current.classList.add("scale-100");
    maskClipPathRef.current.classList.remove("opacity-0");
    maskClipPathRef.current.classList.add("opacity-100");
  };

  const handleMouseLeave = () => {
    if (!maskClipPathRef.current) return;

    setTransformStyle("");
    maskClipPathRef.current.classList.remove("scale-100");
    maskClipPathRef.current.classList.add("scale-0");
    maskClipPathRef.current.classList.remove("opacity-0");
    maskClipPathRef.current.classList.add("opacity-100");
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseLeave}
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-0 opacity-0 transition-all duration-1000 ease-in"
              ref={maskClipPathRef}
            >
              <video
                ref={nextVideoRef}
                src={getVideoSource(upcommingVideoIndex)}
                id="current-video"
                loop
                autoPlay
                muted
                className="size-64 origin-center scale-150 object-cover object-center rounded-lg"
                onLoadedData={handleVideoLoad}
                style={{ transform: transformStyle }}
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSource(currentIndex)}
            autoPlay
            muted
            loop
            id="next-video"
            className="absolute-center invisible  absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          <video
            src={getVideoSource(
              currentIndex === totalVideos - 1 ? 0 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<strong>a</strong>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Redefi<strong>n</strong>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter to Metagame layer <br />
              Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<strong>a</strong>ming
      </h1>
    </div>
  );
};

export default Hero;
