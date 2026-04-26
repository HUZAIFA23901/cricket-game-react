export default function PowerBar({ data, slider }) {
  return (
    <div className="power-container">
      <div className="power-bar">
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

      {/* ✅ slider always stays inside */}
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