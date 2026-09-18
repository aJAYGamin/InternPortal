import colors from "@styles/colors";

export default function GroupAvatar({ size = 36 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: colors.MAGENTA_LIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
      }}>
      👥
    </div>
  );
}
