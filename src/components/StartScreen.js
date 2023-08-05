import React from 'react';

const StartScreen = ({ handleStartGame, showLibraryComponent, showMenuOptions }) => {
    return (
        <section className='flex flex-col gap-4 text-center bg-sky-400 max-w-xs md:max-w-sm p-5 rounded-lg'>
            <h1 className='text-4xl font-bold px-4 mb-2'>¡Welcome to the Flag Quiz!</h1>
            <div className='border-2 rounded-lg bg-red-500 py-2 mt-1'>
                <p className='font-semibold px-3'>Guess the flags of 246 countries: from Afghanistan to Zimbabwe</p>
            </div>
            <button
                onClick={handleStartGame}
                className='rounded-lg shadow-md py-2 px-5 bg-yellow-400 hover:bg-yellow-500 font-semibold transition duration-300'
            >
                Start Game
            </button>
            <button
                onClick={showMenuOptions}
                className='rounded-lg shadow-md py-2 px-5 bg-yellow-400 hover:bg-yellow-500 font-semibold transition duration-300'
            >
                Options
            </button>
            <button
                onClick={showLibraryComponent}
                className='px-5 py-2 shadow-md rounded-lg bg-yellow-400 hover:bg-yellow-500 font-semibold transition duration-300'
            >
                Library
            </button>
        </section>
    );
};

export default StartScreen;
