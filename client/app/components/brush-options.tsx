import { useState } from "react";
// 1. Import the equivalent Lucide icons
import { Pencil, Highlighter, Paintbrush, LucideIcon } from "lucide-react";

export const brushOptions = [
  "pencil",
  "marker",
  "brush",
] as const;

// 2. Create a clean mapping object
const iconMap: Record<string, LucideIcon> = {
  pencil: Pencil,
  marker: Highlighter, // Lucide's equivalent for "marker"
  brush: Paintbrush,
};

interface Props {
  onOptionChange: (brush: string) => void;
}

function BrushOptions({ onOptionChange }: Props) {
  const [activeOption, setActiveOption] = useState<string>(brushOptions[0]);

  const handleClick = (brush: string) => {
    setActiveOption(brush);
    onOptionChange(brush);
  };

  return (
    <div className="flex">
      {brushOptions.map((option) => {
        // 3. Get the component from the map
        const Icon = iconMap[option] || Pencil;

        return (
          <div
            key={option}
            onClick={() => handleClick(option)}
            className={`
              ${
                activeOption === option
                  ? "bg-gray-100 border-gray-800 text-gray-900"
                  : "bg-white border-gray-400 text-gray-500"
              } border rounded-md w-10 h-10 flex justify-center items-center hover:bg-gray-100 hover:border-gray-800 cursor-pointer mr-2 transition-colors`}
          >
            <Icon size={18} strokeWidth={2} />
          </div>
        );
      })}
    </div>
  );
}

export default BrushOptions;