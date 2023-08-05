import React from 'react'

const GameOverModal = ({ score, filteredFlags, playAgain, leave }) => {
    return (
        <div className='text-center flex flex-col gap-3 items-center bg-sky-400 py-5 px-3 rounded-lg shadow-lg w-[290px]'>
            <h1 className='text-4xl font-bold mb-2'>¡Game Over!</h1>
            <div className='font-semibold text-xl'>
                <p>Score:</p>
                <p className='flex justify-center items-center gap-4 mt-4'>
                    <span className='w-12 h-12 flex items-center justify-center rounded-full bg-green-600'>{score}</span>
                    to
                    <span className='w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400'>{filteredFlags?.length + 1}</span>
                </p>
            </div>
            <div className='mt-4'>
                <button onClick={playAgain} className='bg-yellow-400 rounded-lg py-2 px-5 font-semibold w-full hover:bg-yellow-500 mb-3'>Play Again</button>
                <button onClick={leave} className='bg-yellow-400 rounded-lg py-2 px-5 font-semibold w-full hover:bg-yellow-500'>Leave</button>
            </div>
        </div>
    )

}

export default GameOverModal