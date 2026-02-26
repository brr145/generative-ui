"use client";

import type { StatisticsSummary } from "@/lib/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculatorIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

const trendIcons = {
  up: <TrendingUp className="h-3.5 w-3.5 text-green-500" />,
  down: <TrendingDown className="h-3.5 w-3.5 text-red-500" />,
  neutral: <Minus className="h-3.5 w-3.5 text-muted-foreground" />,
};

export function StatisticsCard({ data }: { data: StatisticsSummary }) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CalculatorIcon className="h-4 w-4 text-amber-500" />
          {data.title}
        </CardTitle>
        {data.description && (
          <p className="text-xs text-muted-foreground">{data.description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {data.stats.map((stat) => (
            <div key={stat.label} className="space-y-0.5">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-semibold tabular-nums">
                  {stat.value}
                </span>
                {stat.trend && trendIcons[stat.trend]}
              </div>
              {stat.change && (
                <span className="text-xs text-muted-foreground">
                  {stat.change}
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
