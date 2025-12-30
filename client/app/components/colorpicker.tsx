'use client';

import { Button } from '@/components/ui/button';
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
            <div className='flex items-center gap-2'>
                <Button
                    size="icon-lg"
                    onClick={handleClick}
                    style={{ backgroundColor: localColor }}
                    className='rounded-full ring ring-offset-1 cursor-pointer'
                />

                <div className="h-8 border-l border-gray-300 mx-1" />

                <Button
                    size="icon"
                    onClick={() => handleQuickSelect('#EF4444')}
                    className='bg-red-500 hover:bg-red-500 rounded-full ring ring-offset-1 cursor-pointer'
                />
                <Button
                    size="icon"
                    onClick={() => handleQuickSelect('#22C55E')}
                    className='bg-green-500 hover:bg-green-500 rounded-full ring ring-offset-1 cursor-pointer'
                />
                <Button
                    size="icon"
                    onClick={() => handleQuickSelect('#3b82f6')}
                    className='bg-blue-500 hover:bg-blue-500 rounded-full ring ring-offset-1 cursor-pointer'
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