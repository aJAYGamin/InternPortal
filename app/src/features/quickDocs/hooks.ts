import { useState } from "react";
import type { Doc, DocStore } from "./types";
import { DOC_TYPES } from "./mockData";

/**
 * `useDocs` controls the document list, including:
 * - `docs`: the saved documents
 * - `addDoc()`: add a new document, stamped with today's date
 */
export function useDocs(initial: Doc[]): DocStore {
  const [docs, setDocs] = useState<Doc[]>(initial);

  function addDoc(title: string, url: string, type: string): boolean {
    if (!title.trim()) return false;

    const updatedAt = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });

    setDocs((ds) => [...ds, { id: Date.now(), title: title.trim(), url: url.trim() || "#", updatedAt, type }]);

    return true;
  }

  return { docs, addDoc };
}

/**
 * `usePostDoc` manages the input for a new document, including:
 * - `title`: the document's name
 * - `url`: where it lives (optional)
 * - `type`: one of `DOC_TYPES`
 * - `reset()`: clear the input
 */
export function usePostDoc() {
  const [composing, setComposing] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState(DOC_TYPES[0]);

  function reset() {
    setTitle("");
    setUrl("");
    setType(DOC_TYPES[0]);
    setComposing(false);
  }

  return {
    composing, setComposing,
    title, setTitle,
    url, setUrl,
    type, setType,
    reset
  }
}
