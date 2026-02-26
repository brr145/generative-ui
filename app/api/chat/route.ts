import { anthropic } from "@ai-sdk/anthropic";
import { streamText, tool, stepCountIs } from "ai";
import {
  imageDescriptionSchema,
  carInfoSchema,
  foodRecipeSchema,
  artworkInfoSchema,
  documentSummarySchema,
  keyPointsSchema,
  dataTableSchema,
  barChartSchema,
  lineChartSchema,
  pieChartSchema,
  statisticsSummarySchema,
  sentimentAnalysisSchema,
  entityExtractionSchema,
  topicSummarySchema,
  customRenderSchema,
} from "@/lib/tools";

export const maxDuration = 60;

const SYSTEM_PROMPT = `You are an AI assistant that analyzes content and ALWAYS responds by calling one or more tools. Never respond with plain text — always use tools to structure your output.

## Tool Selection Guide

### For images:
- **Car photo** → use \`car_info\` (identify make, model, year, features)
- **Food/dish photo** → use \`food_recipe\` (identify dish, create recipe)
- **Artwork/painting** → use \`artwork_info\` (analyze style, medium, techniques)
- **Any other image** → use \`image_description\` (general description)

### For documents (PDF, long text):
- Use \`document_summary\` for overall summary
- Use \`key_points\` to extract key takeaways
- You may call BOTH tools for thorough analysis

### For CSV/tabular data:
- Use \`data_table\` to display the data in a table
- Use \`statistics_summary\` for statistical analysis (mean, median, min, max, etc.)
- Use an appropriate chart tool (\`bar_chart\`, \`line_chart\`, or \`pie_chart\`) for visualization
- You may call MULTIPLE tools — e.g., statistics + chart + table

### For text analysis requests:
- "Analyze sentiment" → use \`sentiment_analysis\`
- "Extract entities" → use \`entity_extraction\`
- "Summarize topics" → use \`topic_summary\`

### Catch-all:
- If no specific tool fits, use \`render_custom\` with markdown content

## Rules:
1. ALWAYS call at least one tool. Never respond with only text.
2. You may call multiple tools in a single response for richer output.
3. Fill in all required fields with accurate, detailed information.
4. For charts, pick the most appropriate chart type for the data.
5. Be generous with details — users want rich, informative cards.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: SYSTEM_PROMPT,
    messages,
    toolChoice: "required",
    stopWhen: stepCountIs(3),
    tools: {
      // ── Image Tools ──
      image_description: tool({
        description:
          "Describe an image with details about objects, colors, and mood. Use for general images that aren't cars, food, or artwork.",
        inputSchema: imageDescriptionSchema,
        execute: async (input) => input,
      }),
      car_info: tool({
        description:
          "Identify a car from an image — make, model, year, features, estimated price. Use when the image contains a vehicle.",
        inputSchema: carInfoSchema,
        execute: async (input) => input,
      }),
      food_recipe: tool({
        description:
          "Identify a dish from a food image and generate a recipe with ingredients and instructions.",
        inputSchema: foodRecipeSchema,
        execute: async (input) => input,
      }),
      artwork_info: tool({
        description:
          "Analyze artwork or paintings — identify style, medium, techniques, artist if known.",
        inputSchema: artworkInfoSchema,
        execute: async (input) => input,
      }),

      // ── Document Tools ──
      document_summary: tool({
        description:
          "Summarize a document or PDF — title, summary, key topics, word count.",
        inputSchema: documentSummarySchema,
        execute: async (input) => input,
      }),
      key_points: tool({
        description:
          "Extract key points from a document with importance levels.",
        inputSchema: keyPointsSchema,
        execute: async (input) => input,
      }),

      // ── Data Tools ──
      data_table: tool({
        description:
          "Display data in a structured table with headers and rows.",
        inputSchema: dataTableSchema,
        execute: async (input) => input,
      }),
      bar_chart: tool({
        description:
          "Render a bar chart for comparing discrete categories. Best for categorical comparisons.",
        inputSchema: barChartSchema,
        execute: async (input) => input,
      }),
      line_chart: tool({
        description:
          "Render a line chart for showing trends over time or continuous data.",
        inputSchema: lineChartSchema,
        execute: async (input) => input,
      }),
      pie_chart: tool({
        description:
          "Render a pie chart for showing proportions or percentage breakdowns.",
        inputSchema: pieChartSchema,
        execute: async (input) => input,
      }),
      statistics_summary: tool({
        description:
          "Display statistical summary (mean, median, min, max, etc.) for numeric data.",
        inputSchema: statisticsSummarySchema,
        execute: async (input) => input,
      }),

      // ── Text Analysis Tools ──
      sentiment_analysis: tool({
        description:
          "Analyze sentiment of text — overall sentiment, score, and aspect-level breakdown.",
        inputSchema: sentimentAnalysisSchema,
        execute: async (input) => input,
      }),
      entity_extraction: tool({
        description:
          "Extract named entities (people, organizations, locations, dates, etc.) from text.",
        inputSchema: entityExtractionSchema,
        execute: async (input) => input,
      }),
      topic_summary: tool({
        description:
          "Identify and summarize topics in text with relevance scores.",
        inputSchema: topicSummarySchema,
        execute: async (input) => input,
      }),

      // ── Catch-all ──
      render_custom: tool({
        description:
          "Render custom content (markdown, text, or code) when no other tool is a better fit.",
        inputSchema: customRenderSchema,
        execute: async (input) => input,
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
