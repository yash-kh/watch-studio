import React from "react";

interface ButtonListProps {
  items: string[];
}

const ButtonList: React.FC<ButtonListProps> = ({ items }) => {
  return (
    <span className="gap-2 bg-[#e8e8ed] p-4 rounded-md">
      {items.map((item, index) => (
        <button
          key={index}
          className="px-4 py-2 text-gray-800 hover:bg-gray-200 transition"
        >
          {item}
        </button>
      ))}
    </span>
  );
};

export default ButtonList;
