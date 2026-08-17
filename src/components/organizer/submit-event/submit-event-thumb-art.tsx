type OrganizerThumbArtProps = {
  imageId: "e1" | "e2" | "e3" | "e4" | "e5" | "e6";
};

export function OrganizerThumbArt({ imageId }: OrganizerThumbArtProps) {
  if (imageId === "e1") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#1d94ba]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b81a9] via-[#1598bd] to-[#77c0d3]" />
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={`wave-${index}`}
            className="absolute left-[-6%] right-[-6%] rounded-[999px] border-[3px] border-[#dceef0]"
            style={{
              bottom: `${-44 + index * 9}px`,
              height: `${98 + index * 8}px`,
              transform: "rotate(-10deg)",
              opacity: 0.96,
            }}
          />
        ))}
      </div>
    );
  }

  if (imageId === "e3") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#14121b]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#18141d] via-[#0f1118] to-[#251534]" />
        {Array.from({ length: 42 }).map((_, index) => (
          <span
            key={`light-${index}`}
            className="absolute rounded-full bg-[#d7d5c8]"
            style={{
              left: `${(index * 11) % 100}%`,
              top: `${(index * 7) % 34}%`,
              width: `${4 + (index % 3)}px`,
              height: `${4 + (index % 3)}px`,
              opacity: 0.35 + (index % 4) * 0.12,
            }}
          />
        ))}
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={`audience-${index}`}
            className="absolute bottom-0 rounded-t-full"
            style={{
              left: `${index * 5.7}%`,
              width: `${18 + (index % 4) * 4}px`,
              height: `${32 + (index % 6) * 6}px`,
              background:
                index % 3 === 0
                  ? "#3f6fa2"
                  : index % 3 === 1
                  ? "#62487b"
                  : "#24262d",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#dde9f3]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#cddceb] via-[#edf4fa] to-[#f6f8fa]" />
      <div className="absolute bottom-0 left-[18%] h-[72%] w-[34%] origin-bottom-left skew-x-[-34deg] bg-[#d7e0ea] shadow-[0_0_0_1px_rgba(120,140,160,0.18)]" />
      <div className="absolute bottom-0 left-[36%] h-[56%] w-[25%] origin-bottom-left skew-x-[-34deg] bg-[#f7fafc] shadow-[0_0_0_1px_rgba(120,140,160,0.12)]" />
      <div className="absolute bottom-0 left-[46%] h-[78%] w-[17%] origin-bottom-left skew-x-[-34deg] bg-[#d9e2ea]" />
      <div className="absolute bottom-0 left-[53%] h-[28%] w-[16%] origin-bottom-left skew-x-[28deg] bg-[#edf3f8]" />
      <div className="absolute bottom-[20%] left-[45%] h-[11%] w-[4%] bg-[#7d8a98]" />
      <div className="absolute bottom-0 left-0 h-[12%] w-full bg-white/55" />
    </div>
  );
}

