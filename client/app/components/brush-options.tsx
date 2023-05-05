import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetStateAction, useState } from "react";


import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencil, faMarker, faBrush } from '@fortawesome/free-solid-svg-icons';

library.add(faPencil, faMarker, faBrush)

export const brushOptions = [
  "pencil",
  "marker",
  "brush",
];

interface Props {
    onOptionChange: (brush: string) => void;
}

const getIcon = (option: string) => {
    switch (option) {
    case "pencil":
        return faPencil;
    case "marker":
        return faMarker;
    case "brush":
        return faBrush;
    default:
        return faPencil;
    }
};


function BrushOptions({ onOptionChange }: Props) {
  const [activeOption, setActiveOption] = useState(brushOptions[0]);

  const handleClick = (brush: string) => {
    setActiveOption(brush);
    onOptionChange(brush);
  };

  return (
    <div className="flex">
      {brushOptions.map((option) => (
        <div onClick={() => handleClick(option)} className={`
            ${
                activeOption === option
                ? "bg-gray-100 border-gray-800"
                : "bg-white border-gray-400"
            } border rounded-md w-10 h-10 flex justify-center items-center hover:bg-gray-100 hover:border-gray-800 cursor-pointer mr-2`}>
            <FontAwesomeIcon icon={getIcon(option)} />
        </div>
      ))}
    </div>
  );
}

export default BrushOptions;