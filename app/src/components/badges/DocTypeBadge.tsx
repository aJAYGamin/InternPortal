import colors from "../../styles/colors";

const colorsBadge: Record<string, string> = {
  PDF: colors.MAGENTA,
  Doc: colors.TERTIARY,
  Form: colors.SECONDARY,
  Sheet: colors.SECONDARY,
  Slide: colors.TERTIARY,
};

export default function DocTypeBadge({ type }: { type: string }) {
  const c = colorsBadge[type] || "#6B7280";

  return (
    <span
      style={{
        fontSize: 12,
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 500,
        letterSpacing: "0.05em",
        padding: "2px 6px",
        borderRadius: 3,
        background: `${c}22`,
        color: c,
      }}>
      {type}
    </span>
  );
}
