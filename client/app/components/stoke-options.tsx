import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import { useState } from "react";

export const strokeOptions = [
  { label: "Thin", strokeWidth: 1.5, value: 5 },
  { label: "Medium", strokeWidth: 4, value: 10 },
  { label: "Thick", strokeWidth: 7, value: 15 },
];
interface StrokeProps {
  onOptionChange: (stroke: number) => void;
}

export default function StrokeOptions({ onOptionChange }: StrokeProps) {
  const [activeOption, setActiveOption] = useState(strokeOptions[0].value);

  const handleClick = (stroke: number) => {
    setActiveOption(stroke);
    onOptionChange(stroke);
  };

  return (
    <div className="flex space-x-2">
      {strokeOptions.map((option) => {
        const isActive = activeOption === option.value;

        return (
          <Button
            size="icon"
            key={option.value}
            className="cursor-pointer"
            onClick={() => handleClick(option.value)}
            variant={isActive ? "default" : "outline"}>
            <Minus strokeWidth={option.strokeWidth} />
          </Button>);
      })}
    </div>
  );
}
