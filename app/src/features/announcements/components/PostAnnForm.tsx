import colors from "@styles/colors";

interface PostAnnFormProps {
  title: string;
  body: string;
  tag: string;
  setTitle: (s: string) => void;
  setBody: (s: string) => void;
  setTag: (s: string) => void;
  post: () => void;
}

{
  /** Renderes the form for creating new announcement, include:
  - Input: title, body, tag
  - post function
*/
}

export default function PostAnnForm(props: PostAnnFormProps) {
  const { title, setTitle, body, setBody, tag, setTag, post } = props;

  return (
    <div
      style={{
        margin: "0 20px 14px",
        padding: 14,
        borderRadius: 10,
        background: colors.MAGENTA_LIGHT,
        border: `1px solid ${colors.MAGENTA}33`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Announcement title"
        style={{
          padding: "8px 10px",
          borderRadius: 7,
          border: "1px solid #C8DCF0",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: "#1A1A1A",
          outline: "none",
          background: "#fff",
        }}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body (optional)"
        rows={2}
        style={{
          padding: "8px 10px",
          borderRadius: 7,
          border: "1px solid #C8DCF0",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: 14,
          color: "#1A1A1A",
          outline: "none",
          resize: "none",
          background: "#fff",
        }}
      />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: 7,
            border: "1px solid #C8DCF0",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14,
            color: "#1A1A1A",
            outline: "none",
            background: "#fff",
            cursor: "pointer",
          }}>
          {["General", "Welcome", "HR", "Events", "Operations"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <button
          onClick={post}
          style={{
            marginLeft: "auto",
            padding: "6px 16px",
            borderRadius: 7,
            border: "none",
            background: colors.MAGENTA,
            color: "#fff",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}>
          Post to team
        </button>
      </div>
    </div>
  );
}
