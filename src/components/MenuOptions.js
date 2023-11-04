import React, {useEffect}  from 'react';
import LeftArrow from '../../public/left-arrow.png';
import Image from 'next/image';

const MenuOptions = ({ selectedContinents, setSelectedContinents, continents, setTextError, textError, handleSectionChange }) => {

    const textErrorMessage = "Change your choice...";

    useEffect(() => {
        if (selectedContinents.length === 0) {
            setTextError(true);
        } else {
            setTextError(false);
        }
    }, [selectedContinents, setTextError]);

    const handleContinentClick = (continent) => {
        if (selectedContinents.includes(continent)) {
            setSelectedContinents((prev) => prev.filter((c) => c !== continent));
        } else {
            setSelectedContinents((prev) => [...prev, continent]);
        }
    };

    return (
        <section className='h-screen grid items-center justify-center'>
            <div className='bg-sky-400 shadow-lg max-w-xs md:max-w-sm px-5 py-5 rounded-lg shadow-md w-[380px]'>
                <div className='flex justify-between items-center mb-5' >
                    <Image
                        src={LeftArrow}
                        height={25}
                        width={25}
                        alt='Return'
                        onClick={!textError ? () => handleSectionChange('start') : null}
                        loading="eager"
                        className={`${textError && "opacity-[.3]"} cursor-pointer`}
                    />
                    <p className='text-3xl font-bold'>Options</p>
                </div>
                <div>
                    <p className='text-red-600 text-center font-bold text-xl mb-4'>{textError && textErrorMessage}</p>
                    <p className='font-bold text-2xl mb-5'>BANDERAS</p>
                    {continents.map((continent, index) => (
                        <div key={index} className='flex items-center justify-center'>
                            <p className='flex-grow font-semibold text-lg'>{continent}</p>
                            <label
                                key={continent}
                                htmlFor={`check-${index}`}
                                className={`my-2 cursor-pointer relative mb-3 w-14 h-7 rounded-full flex items-center border-white border gap-2 ${selectedContinents.includes(continent) ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                <input
                                    type="checkbox"
                                    id={`check-${index}`}
                                    checked={selectedContinents.includes(continent)}
                                    onChange={() => handleContinentClick(continent)}
                                    className='sr-only peer'
                                />
                                <span className='w-5 h-5 bg-white absolute rounded-full left-[3px] top-[3px] peer-checked:left-[32px] transition-all duration-500'></span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MenuOptions;
