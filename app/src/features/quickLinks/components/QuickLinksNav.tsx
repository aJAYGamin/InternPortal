import colors from "@styles/colors";
import ExpandIcon from "@icons/ExpandIcon";
import { QUICK_LINKS } from "../mockData";

interface QuickLinksNavProps {
  onExpand?: () => void;
}

/**
 * Renders the quick links nav bar that sits above the dashboard grid
 * - One shortcut per link, spread evenly across the bar
 * - Expands into the tile grid
 */
export default function QuickLinksNav({ onExpand }: QuickLinksNavProps) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #C8DCF0",
        borderRadius: 12,
        padding: "6px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        marginBottom: 20,
      }}>
      {QUICK_LINKS.map((link) => (
        <a
          key={link.id}
          href={link.url}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 7,
            flex: 1,
            minWidth: 0,
            justifyContent: "center",
            padding: "8px 6px",
            borderRadius: 8,
            transition: "background 0.15s",
            border: "1px solid transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.MAGENTA_LIGHT;
            e.currentTarget.style.borderColor = `${colors.MAGENTA}33`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "transparent";
          }}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>{link.icon}</span>
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "#1A1A1A",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
            {link.label}
          </span>
        </a>
      ))}

      {onExpand && (
        <button
          onClick={onExpand}
          title="Expand"
          style={{
            width: 26,
            height: 26,
            flexShrink: 0,
            marginLeft: 4,
            borderRadius: 7,
            border: "1px solid #C8DCF0",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1A1A1A",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.MAGENTA_LIGHT;
            e.currentTarget.style.color = colors.MAGENTA;
            e.currentTarget.style.borderColor = colors.MAGENTA;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#1A1A1A";
            e.currentTarget.style.borderColor = "#C8DCF0";
          }}>
          <ExpandIcon size={12} />
        </button>
      )}
    </div>
  );
}
