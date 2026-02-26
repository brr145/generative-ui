"use client";

import type { ArtworkInfo } from "@/lib/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PaletteIcon } from "lucide-react";

export function ArtworkCard({ data }: { data: ArtworkInfo }) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <PaletteIcon className="h-4 w-4 text-purple-500" />
          {data.title}
        </CardTitle>
        {data.artist && (
          <p className="text-sm text-muted-foreground">by {data.artist}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {data.description}
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground text-xs">Style</span>
            <p className="font-medium">{data.style}</p>
          </div>
          {data.medium && (
            <div>
              <span className="text-muted-foreground text-xs">Medium</span>
              <p className="font-medium">{data.medium}</p>
            </div>
          )}
          {data.period && (
            <div>
              <span className="text-muted-foreground text-xs">Period</span>
              <p className="font-medium">{data.period}</p>
            </div>
          )}
          <div>
            <span className="text-muted-foreground text-xs">Mood</span>
            <p className="font-medium">{data.mood}</p>
          </div>
        </div>
        <Separator />
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Color Palette
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {data.colors.map((color) => (
              <Badge key={color} variant="outline" className="text-xs">
                {color}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Techniques
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {data.techniques.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
