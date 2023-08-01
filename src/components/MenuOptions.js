import React from 'react'
import LeftArrow from '../../public/left-arrow.png'
import Image from 'next/image';

const MenuOptions = ({ selectedContinents, setSelectedContinents, onClick }) => {
    const continents = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    const handleContinentClick = (continent) => {
        if (selectedContinents.includes(continent)) {
            setSelectedContinents((prev) =>
                prev.filter((c) => c !== continent)
            );
        } else {
            setSelectedContinents((prev) => [...prev, continent]);
        }
    };

    return (
        <div>
            <Image
                src={LeftArrow}
                height={25}
                width={25}
                alt='Return'
                onClick={onClick}
                className='cursor-pointer'
            />
            {continents.map((continent) => (
                <button
                    key={continent}
                    onClick={() => handleContinentClick(continent)}
                    className={`${selectedContinents.includes(continent)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-black'
                        }`}
                >
                    {continent}
                </button>
            ))}
        </div>
    );
};

export default MenuOptions;