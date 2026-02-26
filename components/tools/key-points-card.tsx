"use client";

import type { KeyPoints } from "@/lib/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListChecksIcon } from "lucide-react";

const importanceColors: Record<string, string> = {
  high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
};

export function KeyPointsCard({ data }: { data: KeyPoints }) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <ListChecksIcon className="h-4 w-4 text-emerald-500" />
          {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {data.points.map((point, i) => (
            <li key={i} className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{point.heading}</span>
                <Badge
                  variant="secondary"
                  className={`text-[10px] px-1.5 py-0 ${importanceColors[point.importance] || ""}`}
                >
                  {point.importance}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {point.detail}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
