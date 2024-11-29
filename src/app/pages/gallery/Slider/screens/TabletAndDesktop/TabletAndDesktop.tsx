"use client";

import Image from "next/image";

import { useCallback, useMemo, useState } from "react";

import type { MotionProps } from "framer-motion";

import { Button } from "@/app/components/Button/Button";

import { useText } from "@/app/context/TextDataContext";

import { useScreenQuery } from "@/app/hooks/useScreenQuery";

import { images } from "../../data/images";

import { CardData, Carousel3d } from "./Carousel3d/Carousel3d";


const animationDuration = 0.5;

const getCenterXPosition = (
  slidePosition: string,
  isScreenTabletXl: boolean
) => {
  switch (slidePosition) {
    case "left":
      return {
        x: 0,
        y: isScreenTabletXl ? 150 : 120,
        scale: 1,
        opacity: 0.4,
        width: isScreenTabletXl ? 312 : 120,
        height: isScreenTabletXl ? 225 : 86,
        overflow: "hidden",
        zIndex: 1,
      };
    case "right":
      return {
        x: 0,
        y: isScreenTabletXl ? 150 : 120,
        scale: 1,
        opacity: 0.4,
        width: isScreenTabletXl ? 312 : 120,
        height: isScreenTabletXl ? 225 : 86,
        overflow: "hidden",
        zIndex: 1,
      };
    case "center":
      return {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        width: isScreenTabletXl ? 606 : 415,
        height: isScreenTabletXl ? 492 : 294,
        overflow: "hidden",
        zIndex: 2,
      };
    default:
      return {
        x: 0,
        zIndex: 1,
      };
  }
};

const animation: MotionProps = {
  variants: {
    enter: ({ direction }) => {
      return { scale: 0.2, x: direction < 1 ? 20 : -20, opacity: 0 };
    },
    center: ({ slidePosition, isScreenTabletXl }) => {
      return {
        ...getCenterXPosition(slidePosition, isScreenTabletXl),
      };
    },
    exit: ({ direction }) => {
      return { scale: 0.2, x: direction < 1 ? 20 : -20, opacity: 0 };
    },
  },
  transition: { duration: animationDuration },
  initial: "enter",
  animate: "center",
  exit: "exit",
  drag: "x",
  dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
  dragElastic: 0,
};

export function TabletAndDesktop() {
  const textData = useText();

  const text = textData.gallery.buttons;

  const [[activeIndex, direction], setActiveIndex] = useState([
    Math.floor(images.length / 2),
    -1,
  ]);

  const [isAnimating, setIsAnimating] = useState(false);

  const { isScreenTabletXl } = useScreenQuery();

  const bufferLength = images.length;
  const bufferSize = 3;
  const halfBufferSize = Math.floor(bufferSize / 2);

  const buffer = useMemo(() => {
    const start = (activeIndex - halfBufferSize + bufferLength) % bufferLength;
    const end = (activeIndex + halfBufferSize) % bufferLength;
    if (start <= end) {
      return [...images.slice(start, end + 1)];
    } else {
      return [...images.slice(start), ...images.slice(0, end + 1)];
    }
  }, [activeIndex, bufferLength]);

  const paginate = useCallback(
    (dir: number) => {
      if (!isAnimating) {
        setIsAnimating(true);
        const index = (activeIndex + dir + bufferLength) % bufferLength;
        setActiveIndex([index, dir]);
        setTimeout(() => {
          setIsAnimating(false);
        }, animationDuration * 1000);
      }
    },
    [activeIndex, isAnimating, bufferLength]
  );

  return (
    <div className="flex relative flex-col items-center w-full md:h-[318px] xl:h-[492px] overflow-hidden">
      <Carousel3d
        className="flex gap-[24px] h-full"
        renderContent={(card: CardData) => (
          <div
            className={`flex items-center justify-center h-full w-full cursor-grab ${
              typeof card.id === "number" && card.id !== activeIndex
                ? "bg-unActiveImage"
                : ""
            }`}
          >
            <Image
              className="w-full h-full"
              src={card.src}
              alt={card.alt}
              width={1200}
              height={346}
              style={{ objectFit: "cover" }}
              draggable="false"
              onMouseDown={(e) => e.preventDefault()}
            />
          </div>
        )}
        animate={animation}
        screens={{ isScreenTabletXl }}
        paginate={paginate}
        direction={direction}
        visibleIndices={buffer}
      />

      <div className="flex justify-between md:w-[90%] xl:w-[67%] absolute bottom-[15px] xl:bottom-[-12px]">
        <Button
          className="text-33 font-100 leading-normal"
          onClick={() => paginate(-1)}
        >
          {text.back}
        </Button>
        <Button
          className="text-33 font-100 leading-normal"
          onClick={() => paginate(1)}
        >
          {text.next}
        </Button>
      </div>
    </div>
  );
}
