export default function DocIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2.5 1.5h6l3 3v8a.5.5 0 01-.5.5h-8.5a.5.5 0 01-.5-.5v-10.5a.5.5 0 01.5-.5z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8.5 1.5v3h3M4.5 7h5M4.5 9.5h3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
