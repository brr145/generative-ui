"use client";

import type { UIMessage } from "ai";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { ChartSkeleton } from "@/components/skeletons/chart-skeleton";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";

// Tool components
import { ImageDescriptionCard } from "@/components/tools/image-description-card";
import { CarInfoCard } from "@/components/tools/car-info-card";
import { FoodRecipeCard } from "@/components/tools/food-recipe-card";
import { ArtworkCard } from "@/components/tools/artwork-card";
import { DocumentSummaryCard } from "@/components/tools/document-summary-card";
import { KeyPointsCard } from "@/components/tools/key-points-card";
import { DataTableCard } from "@/components/tools/data-table-card";
import { BarChartCard } from "@/components/tools/bar-chart-card";
import { LineChartCard } from "@/components/tools/line-chart-card";
import { PieChartCard } from "@/components/tools/pie-chart-card";
import { StatisticsCard } from "@/components/tools/statistics-card";
import { SentimentCard } from "@/components/tools/sentiment-card";
import { EntityExtractionCard } from "@/components/tools/entity-extraction-card";
import { TopicSummaryCard } from "@/components/tools/topic-summary-card";
import { CustomRenderCard } from "@/components/tools/custom-render-card";

/* eslint-disable @typescript-eslint/no-explicit-any */
const toolComponentMap: Record<string, React.ComponentType<{ data: any }>> = {
  image_description: ImageDescriptionCard,
  car_info: CarInfoCard,
  food_recipe: FoodRecipeCard,
  artwork_info: ArtworkCard,
  document_summary: DocumentSummaryCard,
  key_points: KeyPointsCard,
  data_table: DataTableCard,
  bar_chart: BarChartCard,
  line_chart: LineChartCard,
  pie_chart: PieChartCard,
  statistics_summary: StatisticsCard,
  sentiment_analysis: SentimentCard,
  entity_extraction: EntityExtractionCard,
  topic_summary: TopicSummaryCard,
  render_custom: CustomRenderCard,
};

const chartTools = new Set(["bar_chart", "line_chart", "pie_chart"]);
const tableTools = new Set(["data_table"]);

function ToolSkeleton({ toolName }: { toolName: string }) {
  if (chartTools.has(toolName)) return <ChartSkeleton />;
  if (tableTools.has(toolName)) return <TableSkeleton />;
  return <CardSkeleton />;
}

function ToolPartRenderer({ part }: { part: any }) {
  // Extract tool name from part type: "tool-car_info" → "car_info"
  const toolName = part.type.replace(/^tool-/, "");

  if (part.state === "input-streaming" || part.state === "input-available") {
    return <ToolSkeleton toolName={toolName} />;
  }

  if (part.state === "output-available") {
    const Component = toolComponentMap[toolName];
    if (Component) {
      return <Component data={part.output} />;
    }
    // Fallback for unknown tools
    return (
      <CustomRenderCard
        data={{
          title: toolName,
          content: JSON.stringify(part.output, null, 2),
          format: "code" as const,
        }}
      />
    );
  }

  if (part.state === "output-error") {
    return (
      <CustomRenderCard
        data={{
          title: "Error",
          content: part.errorText || "Tool execution failed",
          format: "text" as const,
        }}
      />
    );
  }

  return null;
}

export function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";

  if (isUser) {
    // Extract text from user message parts
    const textParts = message.parts
      .filter((p) => p.type === "text")
      .map((p) => (p as { type: "text"; text: string }).text)
      .join("\n");

    const fileParts = message.parts.filter((p) => p.type === "file");

    if (!textParts && !fileParts.length) return null;

    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] space-y-2">
          {fileParts.length > 0 && (
            <div className="flex justify-end gap-1">
              {fileParts.map((file, i) => {
                const f = file as { type: "file"; mediaType: string; url: string; filename?: string };
                if (f.mediaType.startsWith("image/")) {
                  return (
                    <img
                      key={i}
                      src={f.url}
                      alt={f.filename || "uploaded image"}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  );
                }
                return (
                  <span
                    key={i}
                    className="rounded-lg bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {f.filename || f.mediaType}
                  </span>
                );
              })}
            </div>
          )}
          {textParts && (
            <div className="rounded-2xl bg-primary px-4 py-2.5 text-primary-foreground">
              <p className="text-sm whitespace-pre-wrap">{textParts}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Assistant message — render each part
  const hasContent = message.parts.some(
    (p) => p.type === "text" || p.type.startsWith("tool-")
  );
  if (!hasContent) return null;

  return (
    <div className="space-y-3">
      {message.parts.map((part, i) => {
        if (part.type === "text") {
          const text = (part as { type: "text"; text: string }).text.trim();
          if (!text) return null;
          return (
            <div key={i} className="max-w-[80%]">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {text}
              </p>
            </div>
          );
        }

        if (part.type.startsWith("tool-")) {
          return <ToolPartRenderer key={i} part={part} />;
        }

        return null;
      })}
    </div>
  );
}
