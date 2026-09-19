import { useEffect, useRef } from "react";

export function useAutoScrollBottom<T>(dep: T) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [dep]);

  return bottomRef;
}