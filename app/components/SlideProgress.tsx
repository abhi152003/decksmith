"use client";

interface SlideProgressProps {
  current: number;
  total: number;
  onGoTo: (index: number) => void;
}

export default function SlideProgress({ current, total, onGoTo }: SlideProgressProps) {
  return (
    <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-3">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            className="rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              background:
                i === current
                  ? "#c9f135"
                  : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
      <span
        className="text-xs font-mono ml-2"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {current + 1}/{total}
      </span>
    </div>
  );
}
