export default function PowerBar({ data, slider }) {
  return (
    <div className="power-container">
      <div className="power-bar">
        {/* Segment widths represent outcome probabilities for the selected style */}
        {data.map((seg, i) => (
          <div
            key={i}
            className="segment"
            style={{
              width: `${seg.prob * 100}%`,
              background: seg.color
            }}
          />
        ))}
      </div>

      {/* Marker position is driven by a normalized value from 0 to 1 */}
      <div
        className="slider"
        style={{
          left: `${slider * 100}%`,
          transform: "translateX(-50%)"
        }}
      />
    </div>
  );
}