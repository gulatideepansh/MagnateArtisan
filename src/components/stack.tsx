"use client";

import { motion, type PanInfo, useMotionValue, useTransform } from "motion/react";
import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./stack.module.css";

type StackProps = {
  randomRotation?: boolean;
  sensitivity?: number;
  cards?: ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
  ariaLabel?: string;
};

function rotationFor(index: number) {
  return ((index * 37) % 10) - 5;
}

function CardRotate({
  children,
  onSendToBack,
  sensitivity,
  disableDrag = false,
}: {
  children: ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [42, -42]);
  const rotateY = useTransform(x, [-100, 100], [-42, 42]);

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
      return;
    }

    x.set(0);
    y.set(0);
  }

  if (disableDrag) {
    return (
      <motion.div className={styles.cardRotateDisabled} style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.cardRotate}
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.52}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  ariaLabel = "Cycle stack cards",
}: StackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [order, setOrder] = useState(() => cards.map((_, index) => cards.length - 1 - index));

  const rotations = useMemo(() => cards.map((_, index) => rotationFor(index)), [cards]);
  const activeOrder = order.length === cards.length ? order : cards.map((_, index) => cards.length - 1 - index);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < mobileBreakpoint);

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);

  const sendToBack = useCallback((cardIndex: number) => {
    setOrder((previous) => {
      const next = [...previous];
      const index = next.findIndex((item) => item === cardIndex);
      if (index < 0) return previous;
      const [card] = next.splice(index, 1);
      next.unshift(card);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!autoplay || activeOrder.length <= 1 || isPaused) return;

    const interval = window.setInterval(() => {
      const topCardIndex = activeOrder[activeOrder.length - 1];
      if (typeof topCardIndex === "number") sendToBack(topCardIndex);
    }, autoplayDelay);

    return () => window.clearInterval(interval);
  }, [activeOrder, autoplay, autoplayDelay, isPaused, sendToBack]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  return (
    <div
      className={styles.stackContainer}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {activeOrder.map((cardIndex, index) => {
        const randomRotate = randomRotation ? rotations[cardIndex] || 0 : 0;
        const topCard = index === activeOrder.length - 1;

        return (
          <CardRotate
            key={cardIndex}
            onSendToBack={() => sendToBack(cardIndex)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className={styles.card}
              role={shouldEnableClick ? "button" : undefined}
              tabIndex={shouldEnableClick && topCard ? 0 : -1}
              aria-label={shouldEnableClick && topCard ? ariaLabel : undefined}
              onClick={() => shouldEnableClick && sendToBack(cardIndex)}
              onKeyDown={(event) => {
                if (!shouldEnableClick || !topCard) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  sendToBack(cardIndex);
                }
              }}
              animate={{
                rotateZ: (activeOrder.length - index - 1) * 3.8 + randomRotate,
                scale: 1 + index * 0.055 - activeOrder.length * 0.055,
                x: (index - activeOrder.length + 1) * 16,
                transformOrigin: "88% 92%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
            >
              {cards[cardIndex]}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
