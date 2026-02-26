"use client";

import type { SentimentAnalysis } from "@/lib/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { SmilePlusIcon } from "lucide-react";

const sentimentColors: Record<string, string> = {
  positive: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  negative: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  neutral:
    "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  mixed:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
};

export function SentimentCard({ data }: { data: SentimentAnalysis }) {
  // Convert -1..1 score to 0..100 for the progress bar
  const progressValue = ((data.score + 1) / 2) * 100;

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <SmilePlusIcon className="h-4 w-4 text-pink-500" />
          Sentiment Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className={sentimentColors[data.overallSentiment] || ""}
          >
            {data.overallSentiment}
          </Badge>
          <span className="text-sm font-mono tabular-nums">
            {data.score > 0 ? "+" : ""}
            {data.score.toFixed(2)}
          </span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Negative</span>
            <span>Positive</span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>
        {data.breakdown.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Breakdown
              </span>
              {data.breakdown.map((item, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.aspect}</span>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] px-1.5 py-0 ${sentimentColors[item.sentiment] || ""}`}
                    >
                      {item.sentiment}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
