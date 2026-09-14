import DocIcon from "@icons/DocIcon";
import DocTypeBadge from "@components/badges/DocTypeBadge";
import type { Doc } from "../types";

/** Renders one document row: icon, title, last updated date and type badge */
export default function DocEntry({ doc }: { doc: Doc }) {
  return (
    <a
      href={doc.url}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 10px",
        borderRadius: 8,
        textDecoration: "none",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F9FF")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: "#D4E6F5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: "#1A1A1A",
        }}>
        <DocIcon />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "#1A1A1A",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
          {doc.title}
        </div>
        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 12, color: "#1A1A1A", marginTop: 1 }}>
          Updated {doc.updatedAt}
        </div>
      </div>

      <DocTypeBadge type={doc.type} />
    </a>
  );
}
