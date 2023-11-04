import React from 'react';

const OptionsList = ({ options, selectedOption, handleOptionClick, currentFlag }) => {

    return (
        <div className='flex flex-col justify-between gap-4 w-full'>
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleOptionClick(option.common)}
                    className={`rounded-lg py-2 shadow-md font-bold ${
                        selectedOption
                            ? option.common === currentFlag.name.common
                                ? 'bg-green-500 text-white'
                                : selectedOption === option.common
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300 text-black'
                            : 'bg-gray-200 hover:bg-gray-300 text-black'
                    } transition duration-300`}
                    disabled={!!selectedOption}
                >
                    {option.common}
                </button>
            ))}
        </div>
    );
};

export default OptionsList;
