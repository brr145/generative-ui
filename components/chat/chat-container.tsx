"use client";

import { ReactNode } from "react";

export function ChatContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh flex-col bg-background">
      <header className="flex items-center justify-center border-b px-4 py-3">
        <h1 className="text-sm font-semibold tracking-tight">
          Generative UI
        </h1>
      </header>
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
