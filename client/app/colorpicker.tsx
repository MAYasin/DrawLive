import { SetStateAction, useState } from 'react';
import { ChromePicker } from 'react-color';

function ColorPicker() {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState('#000');

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  function handleChange(newColor: { hex: SetStateAction<string>; }) {
    setColor(newColor.hex);
  }

  return (
    <div>
      <div onClick={handleClick} style={{ backgroundColor: color }} className='border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center hover:border-gray-800 cursor-pointer mr-2'></div>
      {displayColorPicker && (
        <div
          style={{
            position: 'absolute',
            zIndex: '2',
          }}
        >
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }}
            onClick={handleClose}
          />
          <ChromePicker color={color} onChange={handleChange} />
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
