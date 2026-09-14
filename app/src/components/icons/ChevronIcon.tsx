export default function ChevronIcon({ size = 10, flipped = false }: { size?: number; flipped?: boolean }) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 10 6"
      fill="none"
      style={{ transition: "transform 0.15s", transform: flipped ? "rotate(180deg)" : "rotate(0deg)" }}>
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
