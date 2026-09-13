import colors from "@styles/colors";

interface PostDocButtonProps {
  isFormOpen: boolean;
  setFormOpen: (open: boolean) => void;
}

/** Toggles the new document form open and closed */
export default function PostDocButton({ isFormOpen, setFormOpen }: PostDocButtonProps) {
  return (
    <button
      onClick={() => setFormOpen(!isFormOpen)}
      style={{
        padding: "4px 10px",
        borderRadius: 7,
        border: `1px solid ${isFormOpen ? colors.MAGENTA : "#C8DCF0"}`,
        background: isFormOpen ? colors.MAGENTA_LIGHT : "transparent",
        color: isFormOpen ? colors.MAGENTA : "#1A1A1A",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.15s",
      }}>
      + Add
    </button>
  );
}
