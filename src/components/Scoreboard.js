export default function Scoreboard({ runs, wickets, balls }) {
  const overs = `${Math.floor(balls / 6)}.${balls % 6}`;

  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <div className="score-grid">
        <article className="score-card">
          <p>Runs</p>
          <strong>{runs}</strong>
        </article>
        <article className="score-card">
          <p>Wickets</p>
          <strong>{wickets}</strong>
        </article>
        <article className="score-card">
          <p>Overs</p>
          <strong>{overs}</strong>
        </article>
      </div>
    </div>
  );
}