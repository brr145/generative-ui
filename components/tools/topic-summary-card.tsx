"use client";

import type { TopicSummary } from "@/lib/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { BookOpenIcon } from "lucide-react";

export function TopicSummaryCard({ data }: { data: TopicSummary }) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <BookOpenIcon className="h-4 w-4 text-teal-500" />
          {data.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{data.overallTheme}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.topics.map((topic, i) => (
          <div key={i}>
            {i > 0 && <Separator className="mb-3" />}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{topic.name}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {topic.relevance}%
                </span>
              </div>
              <Progress value={topic.relevance} className="h-1.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                {topic.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
