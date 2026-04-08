"use client";

interface NavArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

export default function NavArrows({ onPrev, onNext, canPrev, canNext }: NavArrowsProps) {
  return (
    <>
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-200 disabled:pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4L7 10L13 16" stroke="#f5f0eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        onClick={onNext}
        disabled={!canNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-200 disabled:pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4L13 10L7 16" stroke="#f5f0eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
