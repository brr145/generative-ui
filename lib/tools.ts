import { z } from "zod";

// ── Image Tools ──────────────────────────────────────────────

export const imageDescriptionSchema = z.object({
  title: z.string().describe("Short descriptive title for the image"),
  description: z
    .string()
    .describe("Detailed description of what the image contains"),
  objects: z.array(z.string()).default([]).describe("Key objects detected in the image"),
  colors: z.array(z.string()).default([]).describe("Dominant colors in the image"),
  mood: z.string().describe("Overall mood or atmosphere of the image"),
});
export type ImageDescription = z.infer<typeof imageDescriptionSchema>;

export const carInfoSchema = z.object({
  make: z.string().describe("Car manufacturer"),
  model: z.string().describe("Car model name"),
  year: z.string().optional().describe("Estimated year or year range"),
  color: z.string().describe("Exterior color"),
  bodyType: z.string().describe("Body type (sedan, SUV, coupe, etc.)"),
  estimatedPrice: z.string().optional().describe("Estimated price range"),
  features: z.array(z.string()).default([]).describe("Notable visible features"),
  condition: z.string().optional().describe("Apparent condition"),
});
export type CarInfo = z.infer<typeof carInfoSchema>;

export const foodRecipeSchema = z.object({
  dishName: z.string().describe("Name of the dish"),
  cuisine: z.string().describe("Cuisine type"),
  description: z.string().describe("Brief description of the dish"),
  ingredients: z
    .array(
      z.object({
        name: z.string(),
        amount: z.string(),
      })
    )
    .default([])
    .describe("List of ingredients with amounts"),
  instructions: z.array(z.string()).default([]).describe("Step-by-step cooking instructions"),
  prepTime: z.string().describe("Preparation time"),
  cookTime: z.string().describe("Cooking time"),
  servings: z.number().describe("Number of servings"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).describe("Difficulty level"),
});
export type FoodRecipe = z.infer<typeof foodRecipeSchema>;

export const artworkInfoSchema = z.object({
  title: z.string().describe("Title of the artwork"),
  artist: z.string().optional().describe("Artist name if identifiable"),
  style: z.string().describe("Art style (impressionism, abstract, etc.)"),
  medium: z.string().optional().describe("Medium (oil, watercolor, digital, etc.)"),
  period: z.string().optional().describe("Time period or era"),
  description: z.string().describe("Detailed description of the artwork"),
  colors: z.array(z.string()).default([]).describe("Color palette used"),
  mood: z.string().describe("Emotional tone of the artwork"),
  techniques: z.array(z.string()).default([]).describe("Notable artistic techniques"),
});
export type ArtworkInfo = z.infer<typeof artworkInfoSchema>;

// ── Document Tools ───────────────────────────────────────────

export const documentSummarySchema = z.object({
  title: z.string().describe("Document title or generated title"),
  summary: z.string().describe("Comprehensive summary of the document"),
  wordCount: z.number().optional().describe("Approximate word count"),
  pageCount: z.number().optional().describe("Number of pages"),
  keyTopics: z.array(z.string()).default([]).describe("Main topics covered"),
  documentType: z.string().describe("Type of document (report, article, etc.)"),
});
export type DocumentSummary = z.infer<typeof documentSummarySchema>;

export const keyPointsSchema = z.object({
  title: z.string().describe("Title for the key points section"),
  points: z
    .array(
      z.object({
        heading: z.string().describe("Point heading"),
        detail: z.string().describe("Detailed explanation"),
        importance: z.enum(["high", "medium", "low"]).describe("Importance level"),
      })
    )
    .default([])
    .describe("List of key points extracted from the document"),
});
export type KeyPoints = z.infer<typeof keyPointsSchema>;

// ── Data Tools ───────────────────────────────────────────────

export const dataTableSchema = z.object({
  title: z.string().describe("Table title"),
  headers: z.array(z.string()).default([]).describe("Column headers"),
  rows: z.array(z.array(z.string())).default([]).describe("Table data rows"),
  caption: z.string().optional().describe("Table caption or description"),
});
export type DataTable = z.infer<typeof dataTableSchema>;

export const barChartSchema = z.object({
  title: z.string().describe("Chart title"),
  data: z
    .array(
      z.object({
        label: z.string(),
        value: z.number(),
      })
    )
    .default([])
    .describe("Data points for the bar chart"),
  xAxisLabel: z.string().optional().describe("X-axis label"),
  yAxisLabel: z.string().optional().describe("Y-axis label"),
});
export type BarChartData = z.infer<typeof barChartSchema>;

export const lineChartSchema = z.object({
  title: z.string().describe("Chart title"),
  data: z
    .array(
      z.object({
        label: z.string(),
        value: z.number(),
      })
    )
    .default([])
    .describe("Data points for the line chart"),
  xAxisLabel: z.string().optional().describe("X-axis label"),
  yAxisLabel: z.string().optional().describe("Y-axis label"),
});
export type LineChartData = z.infer<typeof lineChartSchema>;

export const pieChartSchema = z.object({
  title: z.string().describe("Chart title"),
  data: z
    .array(
      z.object({
        label: z.string(),
        value: z.number(),
      })
    )
    .default([])
    .describe("Data slices for the pie chart"),
});
export type PieChartData = z.infer<typeof pieChartSchema>;

export const statisticsSummarySchema = z.object({
  title: z.string().describe("Title for the statistics summary"),
  stats: z
    .array(
      z.object({
        label: z.string().describe("Statistic name"),
        value: z.string().describe("Statistic value"),
        change: z.string().optional().describe("Change from previous"),
        trend: z
          .enum(["up", "down", "neutral"])
          .optional()
          .describe("Trend direction"),
      })
    )
    .default([])
    .describe("List of statistics"),
  description: z.string().optional().describe("Overall description"),
});
export type StatisticsSummary = z.infer<typeof statisticsSummarySchema>;

// ── Text Analysis Tools ──────────────────────────────────────

export const sentimentAnalysisSchema = z.object({
  text: z.string().describe("The analyzed text"),
  overallSentiment: z
    .enum(["positive", "negative", "neutral", "mixed"])
    .describe("Overall sentiment"),
  score: z.number().describe("Sentiment score from -1 (negative) to 1 (positive)"),
  breakdown: z
    .array(
      z.object({
        aspect: z.string().describe("Aspect being analyzed"),
        sentiment: z.enum(["positive", "negative", "neutral"]),
        text: z.string().describe("Relevant text excerpt"),
      })
    )
    .default([])
    .describe("Sentiment breakdown by aspect"),
});
export type SentimentAnalysis = z.infer<typeof sentimentAnalysisSchema>;

export const entityExtractionSchema = z.object({
  text: z.string().describe("The analyzed text"),
  entities: z
    .array(
      z.object({
        name: z.string().describe("Entity name"),
        type: z
          .enum([
            "person",
            "organization",
            "location",
            "date",
            "money",
            "product",
            "event",
            "other",
          ])
          .describe("Entity type"),
        context: z.string().describe("Context in which the entity appears"),
      })
    )
    .default([])
    .describe("Extracted entities"),
});
export type EntityExtraction = z.infer<typeof entityExtractionSchema>;

export const topicSummarySchema = z.object({
  title: z.string().describe("Title for the topic analysis"),
  topics: z
    .array(
      z.object({
        name: z.string().describe("Topic name"),
        description: z.string().describe("Topic description"),
        relevance: z.number().describe("Relevance score 0-100"),
      })
    )
    .default([])
    .describe("Identified topics"),
  overallTheme: z.string().describe("Overall theme of the content"),
});
export type TopicSummary = z.infer<typeof topicSummarySchema>;

// ── Catch-all Tool ───────────────────────────────────────────

export const customRenderSchema = z.object({
  title: z.string().describe("Content title"),
  content: z.string().describe("The content to render"),
  format: z
    .enum(["markdown", "text", "code"])
    .optional()
    .describe("Content format"),
});
export type CustomRender = z.infer<typeof customRenderSchema>;
