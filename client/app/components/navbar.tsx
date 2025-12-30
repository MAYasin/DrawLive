import BrushOptions from "./brush-options";
import ColorPicker from "./colorpicker";
import { ModeToggle } from "./mode-toggle";
import StrokeOptions from "./stoke-options";

interface NavbarProps {
  color: string;
  setColor: (color: string) => void;
  onStrokeChange: (option: number) => void;
  onBrushChange: (option: string) => void;
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
        
        {/* Toolbar items centered in Navbar */}
        <div className='flex items-center gap-2 overflow-x-auto py-2'>
          <BrushOptions onOptionChange={onBrushChange} />
          <div className="h-6 border-l border-gray-300 mx-1" />
          <StrokeOptions onOptionChange={onStrokeChange} />
          <div className="h-6 border-l border-gray-300 mx-1" />
          <ColorPicker color={color} onChange={setColor} />
          <div className="h-6 border-l border-gray-300 mx-1" />
          
          <button 
            onClick={onClear}
            className='bg-red-500 text-white text-sm whitespace-nowrap rounded-md h-9 px-3 hover:bg-red-600 transition-colors'
          >
            Clear
          </button>
          <button 
            onClick={onSave}
            className='bg-purple-500 text-white text-sm whitespace-nowrap rounded-md h-9 px-3 hover:bg-purple-600 transition-colors'
          >
            Save
          </button>
        </div>

        <ModeToggle />
      </div>
    </header>
  );
}