import React, { useState } from 'react';

// Button Component
const Button = ({ variant = 'outline', size = 'sm', children, ...props }) => {
  const baseStyles = 'px-4 py-2 font-semibold rounded focus:outline-none';
  const variantStyles = variant === 'outline' ? 'border border-gray-300 text-gray-700' : 'bg-blue-500 text-white';
  const sizeStyles = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} hover:bg-gray-200 focus:ring-2 focus:ring-blue-500`}
      {...props}
    >
      {children}
    </button>
  );
};

// DropdownMenu Component
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option]
    );
  };

  return (
    <div className="relative">
      <Button onClick={toggleDropdown} variant="outline" size="sm">
        Filter by Status
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
          <div className="p-2">
            {['Pending', 'Confirmed', 'Cancelled', 'Completed'].map((status) => (
              <label key={status} className="block">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(status)}
                  onChange={() => handleCheckboxChange(status)}
                  className="mr-2"
                />
                {status}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main Component
const FilterHeader = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">Archived</Button>
          <Button variant="outline" size="sm">By Day</Button>
          <DropdownMenu />
        </div>
      </header>
    </div>
  );
};

export default FilterHeader;