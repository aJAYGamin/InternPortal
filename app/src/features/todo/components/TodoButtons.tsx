import type { FilterConfig, TodoFilter } from "../types";
import colors from "@styles/colors";

interface FilterButtonProps {
  filter: string;
  filterConfig: FilterConfig;
  setFilter: (id: TodoFilter) => void;
}

export function FilterButton({ filter, filterConfig, setFilter }: FilterButtonProps) {
  return (
    <button
      key={filterConfig.id}
      onClick={() => setFilter(filterConfig.id)}
      style={{
        padding: "5px 13px",
        borderRadius: 6,
        border: "1px solid",
        borderColor: filter === filterConfig.id ? colors.MAGENTA : "#C8DCF0", // colors change when filter is chosen
        background: filter === filterConfig.id ? colors.MAGENTA_LIGHT : "transparent",
        color: filter === filterConfig.id ? colors.MAGENTA : "#1A1A1A",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.15s",
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}>
      {filterConfig.label}
      {filterConfig.count !== undefined &&
        filterConfig.count > 0 && ( // If the filter includes statistics sumarries (like # of delegate task), displays it
          <span
            style={{
              background: filter === filterConfig.id ? colors.MAGENTA : "#C8DCF0",
              color: filter === filterConfig.id ? "#fff" : "#1A1A1A",
              borderRadius: 10,
              padding: "0 5px",
              fontSize: 12,
              fontFamily: "Helvetica, Arial, sans-serif",
            }}>
            {filterConfig.count}
          </span>
        )}
    </button>
  );
}

export function DismissCompleteButton({ dismiss }: { dismiss: () => void }) {
  return (
    <div
      style={{
        padding: "6px 20px",
        borderBottom: "1px solid #D4E6F5",
        display: "flex",
        justifyContent: "flex-end",
      }}>
      <button
        onClick={dismiss}
        style={{
          padding: "5px 13px",
          borderRadius: 6,
          border: "1px solid #C8DCF0",
          background: "transparent",
          cursor: "pointer",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: 12,
          fontWeight: 600,
          color: "#1A1A1A",
          letterSpacing: "0.04em",
          transition: "background 0.1s, color 0.1s, border-color 0.1s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#FFF0F0";
          e.currentTarget.style.color = "#C0392B";
          e.currentTarget.style.borderColor = "#FFCCCC";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#1A1A1A";
          e.currentTarget.style.borderColor = "#C8DCF0";
        }}>
        Dismiss completed
      </button>
    </div>
  );
}
