"use client";

import type { ProcessedFile } from "@/lib/file-processing";
import { formatFileSize } from "@/lib/file-processing";
import { Badge } from "@/components/ui/badge";
import {
  FileTextIcon,
  ImageIcon,
  FileSpreadsheetIcon,
  FileIcon,
  XIcon,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "image/": <ImageIcon className="h-4 w-4" />,
  "application/pdf": <FileTextIcon className="h-4 w-4" />,
  "text/csv": <FileSpreadsheetIcon className="h-4 w-4" />,
  "text/": <FileTextIcon className="h-4 w-4" />,
};

function getIcon(type: string) {
  for (const [prefix, icon] of Object.entries(iconMap)) {
    if (type.startsWith(prefix)) return icon;
  }
  return <FileIcon className="h-4 w-4" />;
}

export function FilePreview({
  files,
  onRemove,
}: {
  files: ProcessedFile[];
  onRemove: (index: number) => void;
}) {
  if (!files.length) return null;

  return (
    <div className="flex flex-wrap gap-2 px-1 pb-2">
      {files.map((file, i) => (
        <Badge
          key={`${file.name}-${i}`}
          variant="secondary"
          className="flex items-center gap-1.5 py-1 pl-2 pr-1"
        >
          {file.type.startsWith("image/") && file.dataUrl ? (
            <img
              src={file.dataUrl}
              alt={file.name}
              className="h-6 w-6 rounded object-cover"
            />
          ) : (
            getIcon(file.type)
          )}
          <span className="max-w-[120px] truncate text-xs">{file.name}</span>
          <span className="text-[10px] text-muted-foreground">
            {formatFileSize(file.size)}
          </span>
          <button
            type="button"
            onClick={() => onRemove(i)}
            className="ml-0.5 rounded-full p-0.5 hover:bg-muted"
          >
            <XIcon className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}
