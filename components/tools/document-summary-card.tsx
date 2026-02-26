"use client";

import type { DocumentSummary } from "@/lib/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileTextIcon } from "lucide-react";

export function DocumentSummaryCard({ data }: { data: DocumentSummary }) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <FileTextIcon className="h-4 w-4 text-green-500" />
          {data.title}
        </CardTitle>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline">{data.documentType}</Badge>
          {data.wordCount && <span>{data.wordCount.toLocaleString()} words</span>}
          {data.pageCount && <span>&middot; {data.pageCount} pages</span>}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {data.summary}
        </p>
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Key Topics
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {data.keyTopics.map((topic) => (
              <Badge key={topic} variant="secondary" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
