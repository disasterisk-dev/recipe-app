export interface Recipe {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner";
  source: string | null;
  ingredients: string[];
  method: string[];
  tags: string[];
  prepTime: string | null; // ISO 8601 duration, e.g. "PT30M"
  cookTime: string | null; // ISO 8601 duration, e.g. "PT1H30M"
  servings: number | null;
}
