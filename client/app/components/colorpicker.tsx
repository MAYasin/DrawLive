'use client';

import { useState, useEffect } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type ColorPickerProps = {
    onChange: (color: string) => void;
    color: string;
};

export default function ColorPicker({ onChange, color: externalColor }: ColorPickerProps) {
    const [localColor, setLocalColor] = useState(externalColor);

    useEffect(() => {
        setLocalColor(externalColor);
    }, [externalColor]);

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
        <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        style={{ backgroundColor: localColor }}
                        className="rounded-full ring ring-offset-1 ring-transparent hover:ring-gray-300 transition-all cursor-pointer"
                    />
                </PopoverTrigger>
                <PopoverContent
                    side="bottom"
                    align="start"
                    className="w-auto p-0 border-none shadow-2xl z-100"
                >
                    <ChromePicker
                        color={localColor}
                        onChange={handleChange}
                        disableAlpha={true}
                    />
                </PopoverContent>
            </Popover>

            <div className="h-6 border-l border-gray-300 mx-1" />

            <div className="flex gap-1.5">
                {[
                    { hex: '#EF4444', label: 'Red' },
                    { hex: '#22C55E', label: 'Green' },
                    { hex: '#3b82f6', label: 'Blue' }
                ].map((preset) => (
                    <Button
                        key={preset.hex}
                        size="icon-sm"
                        onClick={() => handleQuickSelect(preset.hex)}
                        style={{ backgroundColor: preset.hex }}
                        className={cn(
                            "rounded-full ring-1 ring-offset-1 cursor-pointer",
                        )}
                    />
                ))}
            </div>
        </div>
    );
}