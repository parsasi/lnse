"use client";
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@utils/index";

export type MovingBorderProps<T> = {
  borderRadius?: string;
  children: React.ReactNode;
  as: React.FC<T>;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
} & T;

export function MovingBorder<T>({
  borderRadius = "1.75rem",
  children,
  as: Component,
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: MovingBorderProps<T>) {
  return (
    //@ts-expect-error
    <Component
      className={cn(
        "bg-transparent relative text-xl p-[1px] overflow-hidden",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute -inset-3"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorderInternal duration={duration} rx="15%" ry="15%">
          <div
            className={cn(
              "h-32 w-32 opacity-[0.2] bg-[radial-gradient(var(--gray-50)_2%,transparent_40%)]",
              borderClassName
            )}
          />
        </MovingBorderInternal>
      </div>

      <div
        className={cn("relative", className)}
        style={{
          borderRadius: `calc(${borderRadius} *  0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorderInternal = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute w-full h-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
