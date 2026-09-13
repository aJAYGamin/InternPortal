import colors from "@styles/colors";
import { DOC_TYPES } from "../mockData";

interface PostDocFormProps {
  title: string;
  setTitle: (title: string) => void;
  url: string;
  setUrl: (url: string) => void;
  type: string;
  setType: (type: string) => void;
  post: () => void;
}

const INPUT: React.CSSProperties = {
  padding: "7px 10px",
  borderRadius: 7,
  border: "1px solid #C8DCF0",
  fontFamily: "Helvetica, Arial, sans-serif",
  fontSize: 14,
  color: "#1A1A1A",
  outline: "none",
  background: "#fff",
};

/** Renders the input form for a new document: title, url and type */
export default function PostDocForm({ title, setTitle, url, setUrl, type, setType, post }: PostDocFormProps) {
  return (
    <div
      style={{
        margin: "0 16px 12px",
        padding: 12,
        borderRadius: 10,
        background: colors.MAGENTA_LIGHT,
        border: `1px solid ${colors.MAGENTA}33`,
        display: "flex",
        flexDirection: "column",
        gap: 7,
      }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Document title…" style={INPUT} />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL (optional)"
        style={{ ...INPUT, fontSize: 12 }}
      />

      <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ ...INPUT, padding: "5px 8px", fontSize: 13, cursor: "pointer" }}>
          {DOC_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 12, color: "#1A1A1A" }}>
          Private to you
        </span>

        <button
          onClick={post}
          style={{
            marginLeft: "auto",
            padding: "5px 14px",
            borderRadius: 7,
            border: "none",
            background: colors.MAGENTA,
            color: "#fff",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}>
          Save
        </button>
      </div>
    </div>
  );
}
