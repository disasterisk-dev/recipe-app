import type react from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

interface MenuSheetProps {}

const MenuSheet: react.FC<MenuSheetProps> = () => {
  const isMobile = useMediaQuery("(max-width: 480px)");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="absolute right-4 bottom-4">+ Add Recipe</Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className="data-[side=bottom]:max-h-[70svh]"
      >
        <SheetHeader>
          <h2>New Recipe</h2>
        </SheetHeader>

        <SheetFooter>
          <Button>Submit</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
