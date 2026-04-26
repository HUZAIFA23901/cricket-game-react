import { useEffect, useMemo, useRef, useState } from "react";

export default function Ground({ trigger, shotId }) {
  const groundRef = useRef(null);
  const timersRef = useRef([]);
  const [phase, setPhase] = useState("idle");
  const [ballLeft, setBallLeft] = useState(0);
  const [ballDuration, setBallDuration] = useState(0);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const schedule = (fn, delay) => {
    const timerId = setTimeout(fn, delay);
    timersRef.current.push(timerId);
  };

  useEffect(() => {
    if (shotId === 0) return;

    clearTimers();

    const groundWidth = groundRef.current?.clientWidth || 800;
    const start = groundWidth - 100;
    const mid = Math.max(0, groundWidth / 2);
    const boundary = 0;

    const isBoundary = trigger === 4 || trigger === 6;
    const isShot = trigger === 1 || trigger === 2 || trigger === 3;
    const target = isBoundary ? boundary : isShot ? mid : start;

    setPhase("idle");
    setBallDuration(0);
    setBallLeft(start);

    requestAnimationFrame(() => {
      setPhase("out");
      setBallDuration(1600);
      setBallLeft(target);

      schedule(() => {
        setPhase("back");
        setBallDuration(1500);
        setBallLeft(start);

        schedule(() => {
          setPhase("idle");
        }, 1550);
      }, 1650);
    });

    return clearTimers;
  }, [trigger, shotId]);

  const ballStyle = useMemo(() => {
    return {
      left: `${ballLeft}px`,
      right: "auto",
      transition: `left ${ballDuration}ms linear`,
      opacity: 1,
      transform: phase === "back" ? "translateY(-1px) scale(0.96)" : "none"
    };
  }, [ballLeft, ballDuration, phase]);

  return (
    <div className="ground" ref={groundRef}>
      <div className="ball" style={ballStyle} />
      <div className="bat"></div>
    </div>
  );
}