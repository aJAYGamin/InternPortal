import Card from "@components/Card";
import CardHeader from "@components/CardHeader";
import { QUICK_LINKS } from "../mockData";

interface QuickLinksWidgetProps {
  onClose?: () => void;
}

/**
 * Renders the expanded quick links view: the same shortcuts as the nav bar,
 * laid out as a grid of tiles with a colour-coded icon per link.
 */
export default function QuickLinksWidget({ onClose }: QuickLinksWidgetProps) {
  return (
    <Card>
      <CardHeader title="Quick Links" count={QUICK_LINKS.length} onClose={onClose} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, padding: "0 20px 20px" }}>
        {QUICK_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.url}
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              padding: "14px 6px",
              borderRadius: 10,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F9FF")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `${link.color}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}>
              {link.icon}
            </div>
            <span
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "#1A1A1A",
                textAlign: "center",
              }}>
              {link.label}
            </span>
          </a>
        ))}
      </div>
    </Card>
  );
}
