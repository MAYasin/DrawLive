import { useState } from "react";
import { Pencil, Highlighter, Paintbrush, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const brushOptions = [
  "pencil",
  "marker",
  "brush",
] as const;

export type BrushType = (typeof brushOptions)[number];

const iconMap: Record<string, LucideIcon> = {
  pencil: Pencil,
  marker: Highlighter,
  brush: Paintbrush,
};

interface BrushProps {
  onOptionChange: (brush: BrushType) => void;
}

export default function BrushOptions({ onOptionChange }: BrushProps) {
  const [activeOption, setActiveOption] = useState<BrushType>(brushOptions[0]);
  const handleClick = (brush: BrushType) => {
    setActiveOption(brush);
    onOptionChange(brush);
  };

  return (
    <div className="flex space-x-2">
      {brushOptions.map((option) => {
        const Icon = iconMap[option] || Pencil;
        const isActive = activeOption === option;

        return (
          <Button
            size="icon"
            key={option}
            className="cursor-pointer"
            onClick={() => handleClick(option)}
            variant={isActive ? "default" : "outline"}
          >
            <Icon />
          </Button>
        );
      })}
    </div>
  );
}