import BrushOptions, { BrushType } from "./brush-options";
import ColorPicker from "./colorpicker";
import { ModeToggle } from "./mode-toggle";
import StrokeOptions from "./stoke-options";
import { Button } from "@/components/ui/button";
import { Save, Trash } from "lucide-react";

interface NavbarProps {
  color: string;
  setColor: (color: string) => void;
  onStrokeChange: (option: number) => void;
  onBrushChange: (option: BrushType) => void;
  onClear: () => void;
  onSave: () => void;
}

export default function Navbar({
  color,
  setColor,
  onStrokeChange,
  onBrushChange,
  onClear,
  onSave
}: NavbarProps) {
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-8">
        <span className="text-xl font-bold hidden md:block">DrawLive</span>

        <div className='flex items-center gap-2 overflow-x-auto py-2'>
          <BrushOptions onOptionChange={onBrushChange} />
          <div className="h-6 border-l border-gray-300 mx-1" />
          <StrokeOptions onOptionChange={onStrokeChange} />
          <div className="h-6 border-l border-gray-300 mx-1" />
          <ColorPicker color={color} onChange={setColor} />
          <div className="h-6 border-l border-gray-300 mx-1" />

          <Button
            onClick={onClear}
            variant="destructive"
            className="cursor-pointer"
          >
            <Trash />
            Clear
          </Button>
          <Button
            onClick={onSave}
            variant="secondary"
            className="bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            <Save />
            Save
          </Button>
        </div>

        <ModeToggle />
      </div>
    </header>
  );
}