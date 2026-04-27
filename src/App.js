import React, { useState, useEffect } from "react";
import Scoreboard from "./components/Scoreboard";
import Ground from "./components/Ground";
import PowerBar from "./components/PowerBar";
import Controls from "./components/Controls";
import "./styles.css";

const stylesData = {
  aggressive: [
    { outcome: "W", prob: 0.40, color: "black" },
    { outcome: 0, prob: 0.10, color: "gray" },
    { outcome: 1, prob: 0.10, color: "blue" },
    { outcome: 2, prob: 0.10, color: "green" },
    { outcome: 3, prob: 0.05, color: "purple" },
    { outcome: 4, prob: 0.10, color: "orange" },
    { outcome: 6, prob: 0.15, color: "red" }
  ],
  defensive: [
    { outcome: "W", prob: 0.10, color: "black" },
    { outcome: 0, prob: 0.30, color: "gray" },
    { outcome: 1, prob: 0.30, color: "blue" },
    { outcome: 2, prob: 0.15, color: "green" },
    { outcome: 3, prob: 0.05, color: "purple" },
    { outcome: 4, prob: 0.08, color: "orange" },
    { outcome: 6, prob: 0.02, color: "red" }
  ]
};

export default function App() {
  const initialHighScore = Number(localStorage.getItem("cricketHighestScore") || 0);
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const [highestScore, setHighestScore] = useState(initialHighScore);
  const [style, setStyle] = useState("aggressive");
  const [slider, setSlider] = useState(0);
  const [direction, setDirection] = useState(1);
  const [result, setResult] = useState("");
  const [shotId, setShotId] = useState(0);

  const maxBalls = 12;
  const maxWickets = 2;
  const isGameOver = wickets >= maxWickets || balls >= maxBalls;

  // Move the timing slider back and forth between 0 and 1.
  useEffect(() => {
    const interval = setInterval(() => {
      setSlider(prev => {
        let next = prev + 0.005 * direction;

        if (next >= 1) {
          setDirection(-1);
          return 1;
        }

        if (next <= 0) {
          setDirection(1);
          return 0;
        }

        return next;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [direction]);

  useEffect(() => {
    if (runs > highestScore) {
      setHighestScore(runs);
      localStorage.setItem("cricketHighestScore", String(runs));
    }
  }, [runs, highestScore]);

  // Pick an outcome by matching slider position to cumulative probability.
  const getOutcome = () => {
    let cumulative = 0;
    for (let seg of stylesData[style]) {
      cumulative += seg.prob;
      if (slider <= cumulative) return seg.outcome;
    }
  };

  const playShot = () => {
    if (isGameOver) return;

    const outcome = getOutcome();

    if (outcome === "W") {
      setWickets(w => w + 1);
    } else {
      setRuns(r => r + outcome);
    }

    setBalls(b => b + 1);
    setResult(outcome);
    setShotId(id => id + 1);
  };

  const resetGame = () => {
    // Restore initial match state for a fresh round.
    setRuns(0);
    setWickets(0);
    setBalls(0);
    setStyle("aggressive");
    setResult("");
    setShotId(0);
  };

  const resultText = isGameOver
    ? wickets >= maxWickets
      ? "Game Over: 2 Wickets Down"
      : "Game Over: Over Limit Reached"
    : result === "W"
      ? "Wicket Down"
      : result !== ""
        ? `Scored ${result}`
        : "Awaiting Shot";

  const resultType = isGameOver ? "gameover" : result === "W" ? "wicket" : result !== "" ? "runs" : "idle";

  return (
    <div className="page-bg">
      <div className="container">
        <header className="hero">
          <p className="eyebrow">Street Cricket Simulator</p>
          <h1>Pick Your Shot Timing</h1>
          <p className="hero-copy">
            Bounce between aggressive and defensive modes, hit at the right time, and stack runs before wickets run out.
          </p>
        </header>

        <Scoreboard runs={runs} wickets={wickets} balls={balls} highestScore={highestScore} />

        <section className="play-zone">
          <Ground trigger={result} shotId={shotId} />

          <div className="action-panel">
            <div className={`result-chip ${resultType}`}>{resultText}</div>
            <Controls
              currentStyle={style}
              setStyle={setStyle}
              playShot={playShot}
              resetGame={resetGame}
              gameOver={isGameOver}
            />
          </div>
        </section>

        <section className="meter-card">
          <div className="meter-header">
            <h2>Power Meter</h2>
            <span className="meter-mode">Mode: {style}</span>
          </div>
          <PowerBar data={stylesData[style]} slider={slider} />
        </section>
      </div>
    </div>
  );
}