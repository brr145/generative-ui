"use client";

import type { EntityExtraction } from "@/lib/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TagsIcon } from "lucide-react";

const typeColors: Record<string, string> = {
  person: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  organization:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  location:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  date: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  money: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  product: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
  event: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
};

export function EntityExtractionCard({ data }: { data: EntityExtraction }) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <TagsIcon className="h-4 w-4 text-cyan-500" />
          Entity Extraction
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          {data.entities.length} entities found
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          {data.entities.map((entity, i) => (
            <div key={i} className="flex items-start gap-2">
              <Badge
                variant="secondary"
                className={`text-[10px] px-1.5 py-0 shrink-0 mt-0.5 ${typeColors[entity.type] || ""}`}
              >
                {entity.type}
              </Badge>
              <div className="min-w-0">
                <span className="text-sm font-medium">{entity.name}</span>
                <p className="text-xs text-muted-foreground truncate">
                  {entity.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
