"use client";

import type { CarInfo } from "@/lib/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CarIcon } from "lucide-react";

export function CarInfoCard({ data }: { data: CarInfo }) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CarIcon className="h-4 w-4 text-orange-500" />
          {data.year ? `${data.year} ` : ""}
          {data.make} {data.model}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground text-xs">Body Type</span>
            <p className="font-medium">{data.bodyType}</p>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">Color</span>
            <p className="font-medium">{data.color}</p>
          </div>
          {data.estimatedPrice && (
            <div>
              <span className="text-muted-foreground text-xs">Est. Price</span>
              <p className="font-medium">{data.estimatedPrice}</p>
            </div>
          )}
          {data.condition && (
            <div>
              <span className="text-muted-foreground text-xs">Condition</span>
              <p className="font-medium">{data.condition}</p>
            </div>
          )}
        </div>
        {data.features.length > 0 && (
          <>
            <Separator />
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Features
              </span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {data.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
