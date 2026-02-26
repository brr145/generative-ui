"use client";

import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { processFile, type ProcessedFile } from "@/lib/file-processing";
import { FilePreview } from "./file-preview";
import { Button } from "@/components/ui/button";
import { SendIcon, PaperclipIcon, Loader2Icon } from "lucide-react";

type InputAreaProps = {
  onSubmit: (text: string, files: ProcessedFile[]) => void;
  isLoading: boolean;
};

export function InputArea({ onSubmit, isLoading }: InputAreaProps) {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    const processed: ProcessedFile[] = [];
    for (const file of acceptedFiles) {
      try {
        const result = await processFile(file);
        processed.push(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to process file");
      }
    }
    setFiles((prev) => [...prev, ...processed]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
      "application/pdf": [".pdf"],
      "text/csv": [".csv"],
      "text/plain": [".txt"],
      "application/json": [".json"],
    },
  });

  const handleSubmit = () => {
    if ((!input.trim() && !files.length) || isLoading) return;
    onSubmit(input.trim(), files);
    setInput("");
    setFiles([]);
    setError(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.accept = "image/*,.pdf,.csv,.txt,.json";
    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        onDrop(Array.from(target.files));
      }
    };
    fileInput.click();
  };

  return (
    <div className="border-t bg-background px-4 py-3">
      <div className="mx-auto max-w-2xl">
        {error && <p className="mb-2 text-xs text-destructive">{error}</p>}
        <div
          {...getRootProps()}
          className={`relative rounded-xl border transition-colors ${
            isDragActive ? "border-primary bg-primary/5" : "border-border"
          }`}
        >
          <input {...getInputProps()} />
          <FilePreview
            files={files}
            onRemove={(i) => setFiles((prev) => prev.filter((_, j) => j !== i))}
          />
          {isDragActive && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-primary/10 backdrop-blur-sm">
              <p className="text-sm font-medium text-primary">
                Drop files here
              </p>
            </div>
          )}
          <div className="flex items-end gap-2 p-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={handleFileClick}
              disabled={isLoading}
            >
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message or drop a file..."
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground min-h-[36px] max-h-[120px] py-2"
              style={{
                height: "auto",
                overflowY: input.split("\n").length > 4 ? "auto" : "hidden",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
              }}
              disabled={isLoading}
            />
            <Button
              type="button"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={handleSubmit}
              disabled={isLoading || (!input.trim() && !files.length)}
            >
              {isLoading ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                <SendIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
          Drop images, PDFs, CSVs, or text files to analyze them
        </p>
      </div>
    </div>
  );
}
