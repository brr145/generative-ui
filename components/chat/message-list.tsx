"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";

export function MessageList({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const userScrolledUp = useRef(false);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    // Consider "near bottom" if within 120px of the end
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    userScrolledUp.current = !atBottom;
  }, []);

  useEffect(() => {
    if (!userScrolledUp.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto px-4 py-6"
    >
      <div className="mx-auto max-w-2xl space-y-6">
        {children}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
