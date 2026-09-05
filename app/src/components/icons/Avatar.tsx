const AVATAR_COLORS = [
  "#C66EC2",
  "#A050A0",
  "#A8C7A1",
  "#49BDB8",
  "#3AADA8",
  "#7BA875",
  "#D49BD0",
  "#6EC4BF",
  "#8FB88A",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function avatarColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

export default function Avatar({ name, size = 22 }: { name: string; size?: number }) {
  const bg = avatarColor(name);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}>
      <span
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 700,
          fontSize: size * 0.38,
          color: "#fff",
          lineHeight: 1,
        }}>
        {initials(name)}
      </span>
    </div>
  );
}
