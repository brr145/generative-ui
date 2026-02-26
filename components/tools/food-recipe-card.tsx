"use client";

import type { FoodRecipe } from "@/lib/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CookingPotIcon, Clock, Users, ChefHat } from "lucide-react";

export function FoodRecipeCard({ data }: { data: FoodRecipe }) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CookingPotIcon className="h-4 w-4 text-red-500" />
          {data.dishName}
        </CardTitle>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Badge variant="outline">{data.cuisine}</Badge>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {data.prepTime} prep + {data.cookTime}{" "}
            cook
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" /> {data.servings} servings
          </span>
          <span className="flex items-center gap-1">
            <ChefHat className="h-3 w-3" /> {data.difficulty}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{data.description}</p>
        <Separator />
        <div>
          <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
            Ingredients
          </h4>
          <ul className="grid grid-cols-2 gap-1 text-sm">
            {data.ingredients.map((ing) => (
              <li key={ing.name} className="flex justify-between gap-2">
                <span>{ing.name}</span>
                <span className="text-muted-foreground text-xs shrink-0">
                  {ing.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Separator />
        <div>
          <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
            Instructions
          </h4>
          <ol className="space-y-1.5 text-sm list-decimal list-inside">
            {data.instructions.map((step, i) => (
              <li key={i} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
