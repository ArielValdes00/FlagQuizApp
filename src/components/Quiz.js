import { useState, useEffect } from 'react';
import { getFlags } from '@/utils/flagsApi';
import StartScreen from './StartScreen';
import FlagDisplay from './FlagDisplay';
import OptionsList from './OptionList';
import LeftArrow from '../../public/left-arrow.png'
import Image from 'next/image';
import Library from './Library';

export const Quiz = () => {
    const [flags, setFlags] = useState([]);
    const [options, setOptions] = useState([]);
    const [currentFlag, setCurrentFlag] = useState(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(10);
    const [timerRunning, setTimerRunning] = useState(true);
    const [leftFlags, setLeftFlags] = useState(1);
    const [showLibrary, setShowlibrary] = useState(false);

    const calculateProgressBarColor = (percentage) => {
        if (percentage >= 60) {
            return 'bg-green-500';
        } else if (percentage >= 30) {
            return 'bg-yellow-500';
        } else {
            return 'bg-red-500';
        }
    };

    const progressBarWidth = (timeRemaining / 10) * 100;
    const progressBarColor = calculateProgressBarColor(progressBarWidth);

    useEffect(() => {
        const getData = async () => {
            const res = await getFlags();
            setFlags(res);
            setOptions(getRandomOptions(res));
        };
        getData();
    }, []);

    useEffect(() => {
        let timer;
        if (gameStarted && !gameOver && timerRunning) {
            timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timerRunning]);

    useEffect(() => {
        if (timeRemaining === 0 && !selectedOption) {
            setSelectedOption(currentFlag.name);
            setTimerRunning(false);
        }
    }, [timeRemaining]);

    const getRandomOptions = (flagsData) => {
        const randomIndexes = [];
        while (randomIndexes.length < 4) {
            const randomIndex = Math.floor(Math.random() * flagsData.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }
        const options = randomIndexes.map((index) => flagsData[index].name);
        const randomAnswerIndex = Math.floor(Math.random() * options.length);
        setCurrentFlag(flagsData[randomIndexes[randomAnswerIndex]]);
        return options;
    };

    const handleOptionClick = (option) => {
        setLeftFlags(leftFlags + 1);
        if (!selectedOption) {
            setSelectedOption(option);
            setTimerRunning(false);
            if (option === currentFlag.name.common) {
                setScore(score + 1);
            }
        }
    };

    const handleNextFlag = () => {
        setSelectedOption(null);
        setTimerRunning(true);
        if (options.length === 0) {
            setGameOver(true);
        } else {
            setCurrentFlag(getRandomOptions(flags));
            setOptions(getRandomOptions(flags));
            setTimeRemaining(10);
        }
    };

    const handleStartGame = () => {
        setGameStarted(true);
        setTimeRemaining(10);
        setOptions(getRandomOptions(flags));
        setSelectedOption(null)
        setTimerRunning(true)
        setScore(0);
        setLeftFlags(1);
    };

    const showLibraryComponent = () => {
        setShowlibrary(true);
    }

    const showOptions = () => {
        setShowMenuOptions(true);
    }

    return (
        <div className='h-screen grid items-center justify-center fondo'>
            {gameStarted ? (
                <div className='rounded-lg px-9 py-4 bg-sky-400 shadow-lg'>
                    <div className='grid grid-cols-3 items-center text-center font-bold'>
                        <Image
                            src={LeftArrow}
                            height={20}
                            width={20}
                            alt='Return'
                            onClick={() => setGameStarted(false)}
                            className='cursor-pointer'
                        />
                        <p>Score: {score}</p>
                        <p className='ml-auto'>{leftFlags}/{flags.length}</p>
                    </div>
                    <div className='border-2 border-gray-100 bg-gray-100 rounded-full my-4 relative'>
                        <div
                            className={`h-6 ${progressBarColor} rounded-full`}
                            style={{ width: `${progressBarWidth}%` }}
                        >
                        </div>
                        {timeRemaining === 0 && (
                            <p className="text-sm font-semibold text-black absolute top-[2px] left-1/2 transform -translate-x-1/2">
                                Time's Up!
                            </p>
                        )}
                    </div>
                    <div className='flex flex-col gap-4 items-center'>
                        <FlagDisplay
                            currentFlag={currentFlag}
                        />
                        <OptionsList
                            options={options}
                            selectedOption={selectedOption}
                            handleOptionClick={handleOptionClick}
                            currentFlag={currentFlag}
                        />
                    </div>
                    <div className='flex justify-center mt-4'>
                        {selectedOption && (
                            <button
                                onClick={handleNextFlag}
                                className='rounded-lg shadow-md w-[50%] font-bold py-2 px-5 bg-yellow-500 hover:bg-yellow-600 transition duration-300'
                            >
                                Continue
                            </button>
                        )}
                    </div>
                </div>
            ) : showLibrary ? (
                <Library flags={flags} onClick={() => setShowlibrary(false)} />
            ) : gameOver ? (
                <div className='text-center'>
                    <h1 className='text-4xl font-bold mb-4'>¡Game Over!</h1>
                    <p className='text-xl'>Your final score is: {score}</p>
                </div>
            ) : (
                <StartScreen handleStartGame={handleStartGame} showLibraryComponent={showLibraryComponent} showMenuOptions={showOptions} />
            )}
        </div>
    );
};

export default Quiz;

