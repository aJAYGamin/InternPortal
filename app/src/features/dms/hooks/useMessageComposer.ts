import { useCallback, useEffect, useRef, useState } from "react";
import type { DmMessage } from "../types";

/**
 * Owns the "compose a message" UI state — draft text, an optional reply
 * target, and focusing the input — decoupled from where messages actually
 * get stored. Pass in a `send` callback (e.g. useDmConversations().sendMessage)
 * so this hook has no idea how or where messages live.
 */
export function useMessageComposer(
  onSend: (text: string, opts?: { replyToMessageId?: string }) => unknown,
  resetKey?: string | null,
) {
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<DmMessage | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft("");
    setReplyTo(null);
  }, [resetKey])

  /** Sends the current draft (if non-empty) as a reply to `replyTo`, if set, then clears both. */
  const send = useCallback(() => {
    if (!draft.trim()) return;

    onSend(draft, { replyToMessageId: replyTo?.id });
    setDraft("");
    setReplyTo(null);
  }, [draft, replyTo, onSend])

  /** Sets the message being replied to and focuses the input so the user can start typing immediately. */
  const startReply = useCallback((msg: DmMessage) => {
    setReplyTo(msg);
    inputRef.current?.focus();
  }, [])

  const cancelReply = useCallback(() => { setReplyTo(null) }, []);

  return { draft, setDraft, replyTo, startReply, cancelReply, send, inputRef };
} 