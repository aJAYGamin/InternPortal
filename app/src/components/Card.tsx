interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Card({ children, style = {} }: CardProps) {
  return (
    <div style={{ background: "#fff", border: "1px solid #C8DCF0", borderRadius: 12, overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}
