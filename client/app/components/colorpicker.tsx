import { SetStateAction, useState } from 'react';
import { ChromePicker } from 'react-color';

type ColorPickerProps = {
    onChange: (color: SetStateAction<string>) => void;
    color: string;
};

export default function ColorPicker({ onChange, color: defaultColor }: ColorPickerProps) {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState(defaultColor);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    function handleChange(newColor: { hex: SetStateAction<string> }) {
        const newColorHex = newColor.hex;
        setColor(newColorHex);
        onChange(newColorHex);
    }

    return (
        <div>
            <div className='flex'>
                <div onClick={handleClick} style={{ backgroundColor: color }} className='border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer mr-2'></div>
                <div className="w-1 border rounded-md bg-gray-400 mr-2 my-2"></div>
                <div onClick={() => handleChange({ hex: '#EF4444' })} className='bg-red-500 border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center hover:border-gray-800 cursor-pointer mr-2'></div>
                <div onClick={() => handleChange({ hex: '#22C55E' })} className='bg-green-500 border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center hover:border-gray-800 cursor-pointer mr-2'></div>
                <div onClick={() => handleChange({ hex: '#3b82f6' })} className='bg-blue-500 border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center hover:border-gray-800 cursor-pointer mr-2'></div>
            </div>
            {displayColorPicker && (
                <div className='absolute z-10'>
                    <div className='fixed inset-0' onClick={handleClose} />
                    <ChromePicker className='mt-1' color={color} onChange={handleChange} />
                </div>
            )}
        </div>
    );
}
