import React, { useState } from "react";

type DropdownProps = {
  options: string[];
  onSelect: (option: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative pt-4">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <span className="relative z-50">
        <button
          className="px-4 py-2 typography-body"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Collections <i className="fa-solid fa-angle-down fa-xs"></i>
        </button>

        {isOpen && (
          <ul className="absolute left-[-90px] bg-white border rounded-xl shadow-lg w-[320px] px-[26px]">
            {options.map((option, index) => (
              <li
                key={index}
                className={
                  "px-4 py-4 cursor-pointer text-center border-b-2 last:border-b-0 typography-body " +
                  (selectedOption === option ? "text-[#86868b]" : "")
                }
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </span>
    </div>
  );
};

export default Dropdown;
