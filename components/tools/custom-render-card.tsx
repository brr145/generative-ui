"use client";

import type { CustomRender } from "@/lib/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SparklesIcon } from "lucide-react";

export function CustomRenderCard({ data }: { data: CustomRender }) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <SparklesIcon className="h-4 w-4 text-amber-500" />
          {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.format === "code" ? (
          <pre className="rounded-md bg-muted p-3 text-sm overflow-auto">
            <code>{data.content}</code>
          </pre>
        ) : (
          <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {data.content}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
