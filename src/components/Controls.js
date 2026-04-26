export default function Controls({ currentStyle, setStyle, playShot, resetGame, gameOver }) {
  return (
    <div className="controls">
      {/* Batting style toggles */}
      <button
        className={`btn btn-style ${currentStyle === "aggressive" ? "active" : ""}`}
        onClick={() => setStyle("aggressive")}
      >
        Aggressive
      </button>
      <button
        className={`btn btn-style ${currentStyle === "defensive" ? "active" : ""}`}
        onClick={() => setStyle("defensive")}
      >
        Defensive
      </button>
      <button
        className="btn btn-primary"
        onClick={playShot}
        disabled={gameOver}
      >
        {/* Lock the primary action when innings is complete */}
        {gameOver ? "Game Over" : "Play Shot"}
      </button>
      <button className="btn btn-ghost" onClick={resetGame}>Restart</button>
    </div>
  );
}