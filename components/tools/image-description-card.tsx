"use client";

import type { ImageDescription } from "@/lib/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageIcon } from "lucide-react";

export function ImageDescriptionCard({ data }: { data: ImageDescription }) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <ImageIcon className="h-4 w-4 text-blue-500" />
          {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {data.description}
        </p>
        <div className="space-y-2">
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Objects
            </span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {data.objects.map((obj) => (
                <Badge key={obj} variant="secondary" className="text-xs">
                  {obj}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Colors
            </span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {data.colors.map((color) => (
                <Badge key={color} variant="outline" className="text-xs">
                  {color}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Mood
            </span>
            <p className="mt-0.5 text-sm">{data.mood}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
