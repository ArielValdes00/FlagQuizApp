import { useState, useEffect } from 'react';
import { getFlags } from '@/utils/flagsApi';
import StartScreen from './StartScreen';
import FlagDisplay from './FlagDisplay';
import OptionsList from './OptionList';
import LeftArrow from '../../public/left-arrow.png'
import Image from 'next/image';
import Library from './Library';
import MenuOptions from './MenuOptions';

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
    const continents = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    const [selectedContinents, setSelectedContinents] = useState(continents);
    const [showMenuOptions, setShowMenuOptions] = useState(false);
    const [shownFlags, setShownFlags] = useState([]);
    const [filteredFlags, setFilteredFlags] = useState([]); 
    const [textError, setTextError] = useState(false);

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
    }, [gameStarted, gameOver, timerRunning]);
    

    useEffect(() => {
        if (timeRemaining === 0 && !selectedOption) {
            setSelectedOption(currentFlag.name);
            setTimerRunning(false);
        }
    }, [timeRemaining]);

    const getRandomOptions = (flagsData) => {
        const availableFlags = flagsData.filter((flag) => !shownFlags.includes(flag.name.common));
    
        if (availableFlags.length < 4) {
            setShownFlags([]);
        }
    
        const randomIndexes = [];
        while (randomIndexes.length < 3) { 
            const randomIndex = Math.floor(Math.random() * availableFlags.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }
    
        let correctFlagIndex;
        do {
            correctFlagIndex = Math.floor(Math.random() * availableFlags.length);
        } while (randomIndexes.includes(correctFlagIndex));
    
        const correctFlagPosition = Math.floor(Math.random() * 4); 
        randomIndexes.splice(correctFlagPosition, 0, correctFlagIndex);
    
        const options = randomIndexes.map((index) => availableFlags[index].name);
        setCurrentFlag(availableFlags[correctFlagIndex]);
        setShownFlags((prevShownFlags) => [...prevShownFlags, availableFlags[correctFlagIndex]?.name.common]);
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
        const availableFlags = filteredFlags.filter((flag) => !shownFlags.includes(flag.name.common));
        if (availableFlags.length === 0) {
            setGameOver(true);
        } else {
            const newOptions = getRandomOptions(availableFlags);
            setOptions(newOptions);
            setTimeRemaining(10);
        }
    };

    const handleStartGame = () => {
        setGameStarted(true);
        setTimeRemaining(10);
        if (selectedContinents.length > 0) {
            const filteredFlags = flags.filter(flag => selectedContinents.includes(flag.region))
            setFilteredFlags(filteredFlags)
            setOptions(getRandomOptions(filteredFlags));
        } 
        setSelectedOption(null);
        setTimerRunning(true);
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
                        <p className='ml-auto'>{leftFlags}/{filteredFlags.length || flags.length}</p>
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
                    <section className='flex flex-col gap-4 items-center'>
                        <FlagDisplay
                            currentFlag={currentFlag}
                        />
                        <OptionsList
                            options={options}
                            selectedOption={selectedOption}
                            handleOptionClick={handleOptionClick}
                            currentFlag={currentFlag}
                        />
                    </section>
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
            ) : showMenuOptions ? (
                <MenuOptions
                    selectedContinents={selectedContinents}
                    setSelectedContinents={setSelectedContinents}
                    onClick={() => setShowMenuOptions(false)}
                    continents={continents}
                    setTextError={setTextError}
                    textError={textError}
                />
            ) : gameOver ? (
                <div className='text-center'>
                    <h1 className='text-4xl font-bold mb-4'>¡Game Over!</h1>
                    <p className='text-xl'>Your final score is: {score}</p>
                </div>
            ) : (
                <StartScreen
                    handleStartGame={handleStartGame}
                    showLibraryComponent={showLibraryComponent}
                    showMenuOptions={showOptions} />
            )}
        </div>
    );
};

export default Quiz;

