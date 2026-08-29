import { useState } from "react";
import type { Announcement } from "./types";
import { ANNOUNCEMENTS } from "./mockData";

{/** useAnnouncements controls announcement list and current expanded announcements */ }
export function useAnnouncements() {
  const [anns, setAnns] = useState<Announcement[]>(ANNOUNCEMENTS);
  const [openIds, setOpenIds] = useState<Set<number>>(new Set([1]));

  /**
   * - create new announcement
   * - add it to announcement list
   */
  function pushAnn(title: string, body: string, tag: string): Announcement | null {
    if (!title.trim()) return null;

    const now = new Date();
    const date = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const id = Date.now();
    const ann: Announcement = { id: id, title: title.trim(), body: body.trim(), date, tag: tag };

    setAnns(a => [ann, ...a]);
    setOpenIds(s => new Set([...s, ann.id]));

    return ann;
  }

  {/** Toggle the display of announcement's body */ }
  function toggleBody(id: number) {
    setOpenIds((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    })
  }

  {/** Remove the announcement from the list */ }
  function deleteAnn(id: number) {
    setAnns((a) => a.filter((x) => x.id !== id));
    setOpenIds((s) => {
      const n = new Set(s);
      n.delete(id);
      return n;
    });
  }

  return { anns, openIds, pushAnn, toggleBody, deleteAnn }
}

{/* usePostAnnouncements controls the form's input */ }
export function usePostAnnouncements() {
  const [composing, setComposing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("General");

  function reset() {
    setTitle("");
    setBody("");
    setTag("General");
    setComposing(false);
  }

  return {
    composing, setComposing,
    title, setTitle,
    body, setBody,
    tag, setTag,
    reset
  }
}