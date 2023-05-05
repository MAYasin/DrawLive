import { useState } from "react";

export const strokeOptions = [
  { thickness: "h-0", stroke: 5},
  { thickness: "h-1", stroke: 10},
  { thickness: "h-1.5", stroke: 15},
];

interface Props {
    onOptionChange: (stroke: number) => void;
}

function StrokeOptions({ onOptionChange }: Props) {
  const [activeOption, setActiveOption] = useState(strokeOptions[0].stroke);

  const handleClick = (stroke: number) => {
    setActiveOption(stroke);
    onOptionChange(stroke);
  };

  return (
    <div className="flex">
      {strokeOptions.map((option, index) => (
        <div key={index} onClick={() => handleClick(option.stroke)} className={`${
            activeOption === option.stroke
              ? "bg-gray-100 border-gray-800"
              : "bg-white border-gray-400"
            } border rounded-md w-10 h-10 flex justify-center items-center hover:bg-gray-100 hover:border-gray-800 cursor-pointer mr-2`}>
            <div className={`${option.thickness} w-4 border border-gray-900 rounded-md bg-gray-900`}></div>
        </div>
      ))}
    </div>
  );
}

export default StrokeOptions;
