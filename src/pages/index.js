import Quiz from "@/components/Quiz";
import Library from '@/components/Library';
import MenuOptions from '@/components/MenuOptions';
import GameOverModal from '@/components/GameOverModal';
import StartScreen from '@/components/StartScreen';
import { useEffect, useState } from "react";
import useBooleanState from "@/hooks/useBooleanState";
import { getFlags } from "@/utils/flagsApi";

export default function Home() {
    const [flags, setFlags] = useState([]);
    const [currentFlag, setCurrentFlag] = useState(null);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [leftFlags, setLeftFlags] = useState(1);
    const [timeRemaining, setTimeRemaining] = useState(10);
    const [timerRunning, setTimerRunning] = useState(false);
    const continents = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    const [selectedContinents, setSelectedContinents] = useState(continents);
    const [shownFlags, setShownFlags] = useState([]);
    const [filteredFlags, setFilteredFlags] = useState([]);
    const [textError, setTextError] = useState(false);
    const [gameStarted, toggleGameStarted] = useBooleanState(false);
    const [gameOver, toggleGameOver] = useBooleanState(false);
    const [selectedSection, setSelectedSection] = useState('start');

    const handleStartGame = () => {
        setSelectedSection('quiz');
        if (gameOver) {
            toggleGameOver();
        }
        toggleGameStarted();
        setTimeRemaining(10);
        setShownFlags([]);
        if (selectedContinents.length > 0) {
            const filteredFlags = flags.filter(flag => selectedContinents.includes(flag.region))
            setFilteredFlags(filteredFlags);
        }
        setSelectedOption(null);
        setTimerRunning(true);
        setScore(0);
        setLeftFlags(1);
    };

    const leaveToStartScreen = () => {
        setSelectedSection('start');
        toggleGameOver();
        setCurrentFlag(null);
    }

    useEffect(() => {
        const getData = async () => {
            const res = await getFlags();
            setFlags(res);
        };
        getData();
    }, []);

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };

    const renderSelectedSection = () => {
        switch (selectedSection) {
            case 'start':
                return <StartScreen handleStartGame={handleStartGame} handleSectionChange={handleSectionChange} />
            case 'quiz':
                return (
                    <Quiz
                        flags={flags}
                        shownFlags={shownFlags}
                        setShownFlags={setShownFlags}
                        filteredFlags={filteredFlags}
                        timeRemaining={timeRemaining}
                        setTimeRemaining={setTimeRemaining}
                        timerRunning={timerRunning}
                        setTimerRunning={setTimerRunning}
                        setSelectedOption={setSelectedOption}
                        selectedOption={selectedOption}
                        leftFlags={leftFlags}
                        setLeftFlags={setLeftFlags}
                        setSelectedSection={setSelectedSection}
                        score={score}
                        setScore={setScore}
                        gameOver={gameOver}
                        currentFlag={currentFlag}
                        setCurrentFlag={setCurrentFlag}
                        gameStarted={gameStarted}
                        toggleGameStarted={toggleGameStarted}
                    />
                );
            case 'library':
                return <Library
                    flags={flags}
                    handleSectionChange={handleSectionChange}
                />;
            case 'menuOptions':
                return (
                    <MenuOptions
                        selectedContinents={selectedContinents}
                        setSelectedContinents={setSelectedContinents}
                        continents={continents}
                        handleSectionChange={handleSectionChange}
                        setTextError={setTextError}
                        textError={textError}
                    />
                );
            case 'gameOver':
                return (
                    <GameOverModal
                        score={score}
                        filteredFlags={filteredFlags}
                        onPlayAgain={handleStartGame}
                        leaveToStartScreen={leaveToStartScreen}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className='h-screen grid items-center justify-center background'>
            {renderSelectedSection()}
        </div>
    );
}
