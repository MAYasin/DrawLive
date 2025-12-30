'use client';

import { useState, useEffect } from 'react';
import { ChromePicker, ColorResult } from 'react-color';

type ColorPickerProps = {
    onChange: (color: string) => void;
    color: string;
};

export default function ColorPicker({ onChange, color: externalColor }: ColorPickerProps) {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [localColor, setLocalColor] = useState(externalColor);

    useEffect(() => {
        setLocalColor(externalColor);
    }, [externalColor]);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleChange = (colorResult: ColorResult) => {
        const newHex = colorResult.hex;
        setLocalColor(newHex);
        onChange(newHex);
    };

    const handleQuickSelect = (hex: string) => {
        setLocalColor(hex);
        onChange(hex);
    };

    return (
        <div className="relative">
            <div className='flex items-center'>
                <div
                    onClick={handleClick}
                    style={{ backgroundColor: localColor }}
                    className='border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer mr-2 shadow-sm hover:scale-105 transition-transform'
                />

                <div className="w-px h-8 bg-gray-300 mr-2"></div>

                <div
                    onClick={() => handleQuickSelect('#EF4444')}
                    className='bg-red-500 border border-gray-400 rounded-full w-8 h-8 hover:border-gray-800 cursor-pointer mr-2 transition-all'
                />
                <div
                    onClick={() => handleQuickSelect('#22C55E')}
                    className='bg-green-500 border border-gray-400 rounded-full w-8 h-8 hover:border-gray-800 cursor-pointer mr-2 transition-all'
                />
                <div
                    onClick={() => handleQuickSelect('#3b82f6')}
                    className='bg-blue-500 border border-gray-400 rounded-full w-8 h-8 hover:border-gray-800 cursor-pointer mr-2 transition-all'
                />
            </div>

            {displayColorPicker && (
                <div className='absolute z-50 mt-2 left-0'>
                    <div className='fixed inset-0' onClick={handleClose} />
                    <div className="relative shadow-xl">
                        <ChromePicker color={localColor} onChange={handleChange} />
                    </div>
                </div>
            )}
        </div>
    );
}