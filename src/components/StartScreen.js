import React from 'react';

const StartScreen = ({ handleStartGame, showLibraryComponent }) => {
    return (
        <div className='flex flex-col gap-3 text-center bg-sky-400 max-w-xs md:max-w-sm p-4 rounded-lg'>
            <h1 className='text-4xl font-bold mb-12 px-4'>Welcome to the Flag Quiz!</h1>
            <button
                onClick={handleStartGame}
                className='rounded-lg shadow-md py-2 px-5 bg-yellow-400 hover:bg-yellow-500 font-semibold transition duration-300'
            >
                Start Game
            </button>
            <button
                onClick={showLibraryComponent}
                className='px-5 py-2 shadow-md rounded-lg bg-yellow-400 hover:bg-yellow-500 font-semibold transition duration-300'
            >
                Library
            </button>
        </div>
    );
};

export default StartScreen;
