"use client";

import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import type { ProcessedFile } from "@/lib/file-processing";
import { ChatContainer } from "@/components/chat/chat-container";
import { MessageList } from "@/components/chat/message-list";
import { MessageBubble } from "@/components/chat/message-bubble";
import { InputArea } from "@/components/chat/input-area";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import {
  CarIcon,
  SmilePlusIcon,
  FileTextIcon,
  BarChart3Icon,
} from "lucide-react";

const EXAMPLES = [
  {
    icon: <SmilePlusIcon className="h-4 w-4" />,
    label: "Sentiment analysis",
    prompt:
      "Analyze the sentiment of: I love this product but the shipping was terrible and customer service was unhelpful",
  },
  {
    icon: <CarIcon className="h-4 w-4" />,
    label: "Try with a car image",
    prompt: null, // Upload-only prompt
  },
  {
    icon: <FileTextIcon className="h-4 w-4" />,
    label: "Extract entities",
    prompt:
      "Extract entities from: Apple CEO Tim Cook announced a new partnership with Microsoft at their Cupertino headquarters on January 15, 2025, worth $2 billion",
  },
  {
    icon: <BarChart3Icon className="h-4 w-4" />,
    label: "Visualize data",
    prompt:
      "Create a bar chart and statistics for this sales data: Q1: $45,000, Q2: $62,000, Q3: $58,000, Q4: $71,000",
  },
];

export default function Home() {
  const { messages, sendMessage, status } = useChat({
    experimental_throttle: 50,
  });

  const isLoading = status === "streaming" || status === "submitted";

  const handleSubmit = async (text: string, files: ProcessedFile[]) => {
    const parts: Array<
      | { type: "text"; text: string }
      | { type: "file"; mediaType: string; url: string; filename?: string }
    > = [];

    // Add text if present
    if (text) {
      parts.push({ type: "text", text });
    }

    // Add files
    for (const file of files) {
      if (file.type.startsWith("image/") && file.dataUrl) {
        parts.push({
          type: "file",
          mediaType: file.type,
          url: file.dataUrl,
          filename: file.name,
        });
      } else if (file.type === "application/pdf" && file.dataUrl) {
        parts.push({
          type: "file",
          mediaType: "application/pdf",
          url: file.dataUrl,
          filename: file.name,
        });
      } else if (file.textContent) {
        // For CSV/text/JSON — send as text with filename context
        parts.push({
          type: "text",
          text: `[File: ${file.name}]\n${file.textContent}`,
        });
      }
    }

    if (!parts.length) return;

    // If only text (no files), use simple text form
    if (parts.length === 1 && parts[0].type === "text") {
      await sendMessage({ text: parts[0].text });
    } else {
      await sendMessage({ parts } as unknown as Parameters<typeof sendMessage>[0]);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <ChatContainer>
      <MessageList>
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center py-20">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold tracking-tight">
                Generative UI
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                Upload files or type a prompt. Claude analyzes content and
                renders rich, interactive UI components.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {EXAMPLES.map((example) => (
                <button
                  key={example.label}
                  onClick={() => {
                    if (example.prompt) {
                      sendMessage({ text: example.prompt });
                    }
                  }}
                  disabled={!example.prompt || isLoading}
                  className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted disabled:opacity-50"
                >
                  <span className="text-muted-foreground">{example.icon}</span>
                  <span>{example.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message: UIMessage) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading &&
              messages.length > 0 &&
              messages[messages.length - 1]?.role === "user" && (
                <CardSkeleton />
              )}
          </>
        )}
      </MessageList>
      <InputArea onSubmit={handleSubmit} isLoading={isLoading} />
    </ChatContainer>
  );
}
