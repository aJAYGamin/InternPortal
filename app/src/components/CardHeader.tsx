import colors from "../styles/colors";
import ExpandIcon from "./icons/ExpandIcon";
import CloseIcon from "./icons/CloseIcon";

interface CardHeaderProps {
  title: string;
  count?: number;
  action?: React.ReactNode;
  onExpand?: () => void;
  onClose?: () => void;
}

{
  /* CardHeader contains following information:
  - title
  - count (number, for instance, the number of announcement)
  - action: child component
  - onExpand: expand the card
  */
}
export default function CardHeader({ title, count, action, onExpand, onClose }: CardHeaderProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 16, color: "#1A1A1A" }}>
          {title}
        </span>
        {count !== undefined && (
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 12,
              fontWeight: 500,
              background: colors.MAGENTA_LIGHT,
              color: colors.MAGENTA,
              padding: "1px 7px",
              borderRadius: 20,
            }}>
            {count}
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {action}
        {onExpand && (
          <button
            onClick={onExpand}
            title="Expand"
            style={{
              width: 26,
              height: 26,
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

        {onClose && (
          <button
            onClick={onClose}
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              border: "1px solid #C8DCF0",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1A1A1A",
              transition: "background 0.1s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#FFFFFF")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <CloseIcon size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
