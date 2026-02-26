import { anthropic } from "@ai-sdk/anthropic";
import { streamText, tool, stepCountIs, convertToModelMessages } from "ai";
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

## IMPORTANT: Prefer Visual & Structured Output

Your UI renders beautiful cards, charts, tables, and badges. ALWAYS prefer these visual tools over long text blocks:
- Instead of writing paragraphs of text → use \`key_points\` to break info into scannable bullet points with importance levels
- Instead of listing numbers in text → use \`statistics_summary\` cards, \`bar_chart\`, \`pie_chart\`, or \`data_table\`
- Instead of writing a long explanation → use \`topic_summary\` with relevance scores or \`key_points\` with headings
- When using \`render_custom\`, keep the markdown SHORT and well-structured (use bullet points, bold, headers). Never write walls of text.

ALWAYS call MULTIPLE tools to create a rich visual response. For example:
- "Tell me about cheese" → call \`key_points\` (core facts) + \`topic_summary\` (types/categories) + \`render_custom\` (brief fun facts as short markdown)
- "Analyze this CSV" → call \`statistics_summary\` + \`bar_chart\` or \`pie_chart\` + \`data_table\`
- "Summarize this PDF" → call \`document_summary\` + \`key_points\`

## Tool Selection Guide

### For images:
- **Car photo** → use \`car_info\`
- **Food/dish photo** → use \`food_recipe\`
- **Artwork/painting** → use \`artwork_info\`
- **Any other image** → use \`image_description\`

### For documents (PDF, long text):
- Use \`document_summary\` + \`key_points\` together

### For CSV/tabular data:
- Use \`data_table\` + \`statistics_summary\` + a chart tool (\`bar_chart\`, \`line_chart\`, or \`pie_chart\`)

### For text analysis:
- Sentiment → \`sentiment_analysis\`
- Entities → \`entity_extraction\`
- Topics → \`topic_summary\`

### For general knowledge questions:
- Combine \`key_points\` + \`topic_summary\` and/or short \`render_custom\` markdown
- NEVER use \`render_custom\` with content longer than ~150 words. Break into multiple tools instead.

## CRITICAL — How Tools Work:
These tools are DISPLAY-ONLY. They render UI from the data YOU provide. There is no backend processing.
YOU must populate ALL fields yourself, including arrays. For example:
- \`entity_extraction\`: YOU must identify the entities and fill in the \`entities\` array yourself.
- \`sentiment_analysis\`: YOU must determine the sentiment, score, and fill in the \`breakdown\` array yourself.
- \`key_points\`: YOU must write the key points and fill in the \`points\` array yourself.
- \`bar_chart\`: YOU must compute/provide the data values for the \`data\` array yourself.
Never call a tool with empty arrays — always fill in the data.

## Rules:
1. ALWAYS call at least one tool. Never respond with only text.
2. Call MULTIPLE tools (2-4) per response for richer, more visual output.
3. Keep text content concise — use bullet points, not paragraphs.
4. For \`render_custom\`, always use markdown format and keep it brief.
5. Prefer charts + stats + tables over describing numbers in text.
6. ALWAYS populate every array field with real data — never leave arrays empty.`;

export async function POST(req: Request) {
  try {
  const { messages } = await req.json();
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: SYSTEM_PROMPT,
    messages: modelMessages,
    toolChoice: "required",
    stopWhen: stepCountIs(3),
    tools: {
      // ── Image Tools ──
      image_description: tool({
        description:
          "Render an image description card. YOU must fill in all fields: title, description, objects array, colors array, and mood.",
        inputSchema: imageDescriptionSchema,
        execute: async (input) => input,
      }),
      car_info: tool({
        description:
          "Render a car info card. YOU must fill in all fields: make, model, year, color, bodyType, features array, etc.",
        inputSchema: carInfoSchema,
        execute: async (input) => input,
      }),
      food_recipe: tool({
        description:
          "Render a recipe card. YOU must fill in all fields: dishName, cuisine, ingredients array, instructions array, times, servings, difficulty.",
        inputSchema: foodRecipeSchema,
        execute: async (input) => input,
      }),
      artwork_info: tool({
        description:
          "Render an artwork analysis card. YOU must fill in all fields: title, style, description, colors array, techniques array, mood.",
        inputSchema: artworkInfoSchema,
        execute: async (input) => input,
      }),

      // ── Document Tools ──
      document_summary: tool({
        description:
          "Render a document summary card. YOU must fill in all fields: title, summary, keyTopics array, documentType.",
        inputSchema: documentSummarySchema,
        execute: async (input) => input,
      }),
      key_points: tool({
        description:
          "Render a key points card. YOU must fill in the points array with heading, detail, and importance for each point.",
        inputSchema: keyPointsSchema,
        execute: async (input) => input,
      }),

      // ── Data Tools ──
      data_table: tool({
        description:
          "Render a data table. YOU must fill in headers array and rows array (array of string arrays).",
        inputSchema: dataTableSchema,
        execute: async (input) => input,
      }),
      bar_chart: tool({
        description:
          "Render a bar chart. YOU must fill in the data array with {label, value} objects.",
        inputSchema: barChartSchema,
        execute: async (input) => input,
      }),
      line_chart: tool({
        description:
          "Render a line chart. YOU must fill in the data array with {label, value} objects.",
        inputSchema: lineChartSchema,
        execute: async (input) => input,
      }),
      pie_chart: tool({
        description:
          "Render a pie chart. YOU must fill in the data array with {label, value} objects.",
        inputSchema: pieChartSchema,
        execute: async (input) => input,
      }),
      statistics_summary: tool({
        description:
          "Render a statistics card. YOU must compute the stats and fill in the stats array with {label, value, trend} objects.",
        inputSchema: statisticsSummarySchema,
        execute: async (input) => input,
      }),

      // ── Text Analysis Tools ──
      sentiment_analysis: tool({
        description:
          "Render a sentiment analysis card. YOU must analyze the text and fill in ALL fields: text, overallSentiment, score, and the breakdown array with {aspect, sentiment, text} objects.",
        inputSchema: sentimentAnalysisSchema,
        execute: async (input) => input,
      }),
      entity_extraction: tool({
        description:
          "Render an entity extraction card. YOU must identify all entities in the text and fill in the entities array with {name, type, context} objects. Never leave entities empty.",
        inputSchema: entityExtractionSchema,
        execute: async (input) => input,
      }),
      topic_summary: tool({
        description:
          "Render a topic summary card. YOU must identify topics and fill in the topics array with {name, description, relevance} objects, plus overallTheme.",
        inputSchema: topicSummarySchema,
        execute: async (input) => input,
      }),

      // ── Catch-all ──
      render_custom: tool({
        description:
          "Render a custom content card with markdown. YOU must fill in title, content (as markdown), and format. Keep content under 150 words.",
        inputSchema: customRenderSchema,
        execute: async (input) => input,
      }),
    },
  });

  return result.toUIMessageStreamResponse();
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    const isRateLimit =
      message.includes("rate_limit") ||
      message.includes("budget") ||
      message.includes("billing") ||
      message.includes("credit") ||
      message.includes("429") ||
      message.includes("insufficient");

    return new Response(
      JSON.stringify({
        error: isRateLimit ? "BUDGET_EXCEEDED" : "API_ERROR",
        message: isRateLimit
          ? "API budget limit reached"
          : message,
      }),
      {
        status: isRateLimit ? 429 : 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
