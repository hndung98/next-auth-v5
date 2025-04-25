"use client";

import { useState } from "react";

const getRandomPosition = () => ({
  top: Math.floor(Math.random() * 160),
  left: Math.floor(Math.random() * 180 - 50),
});

export const FloatingBox = () => {
  const [inLeftPanel, setInLeftPanel] = useState(true);
  const [position, setPosition] = useState({ top: 20, left: 20 });

  const handleMouseEnter = () => {
    setInLeftPanel(!inLeftPanel);
    setPosition(getRandomPosition());
  };

  return (
    <div className="flex w-[600px] h-[400px]">
      {/* Panel 1 */}
      <div className="relative w-1/2 h-full">
        {inLeftPanel && (
          <div
            className="absolute p-4 bg-white border border-gray-400 rounded-lg shadow-md transition-all duration-300"
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
            onMouseEnter={handleMouseEnter}
          >
            <label className="block mb-2 font-medium">
              Catch me if you can, slowpoke! 😜
            </label>
            <button className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Click me!
            </button>
          </div>
        )}
      </div>

      {/* Panel 2 */}
      <div className="relative w-1/2 h-full">
        {!inLeftPanel && (
          <div
            className="absolute p-4 bg-white border border-gray-400 rounded-lg shadow-md transition-all duration-300"
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
            onMouseEnter={handleMouseEnter}
          >
            <label className="block mb-2 font-medium">
              Catch me if you can, slowpoke! 😜
            </label>
            <button className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Click me!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingBox;
