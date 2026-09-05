import colors from "@styles/colors";

export default function PriorityDot({ priority }: { priority: "low" | "medium" | "high" }) {
  const dotColors = { high: colors.MAGENTA, medium: colors.TERTIARY, low: colors.SECONDARY };

  return (
    <span
      style={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: dotColors[priority],
        flexShrink: 0,
        display: "inline-block",
      }}
    />
  );
}
