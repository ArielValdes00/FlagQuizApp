import { useState, useEffect } from 'react';
import axios from 'axios';

export const Quiz = () => {
    const [flags, setFlags] = useState([]);
    const [currentFlag, setCurrentFlag] = useState(null);
    const [userGuess, setUserGuess] = useState('');
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const getFlags = async () => {
            const res = await axios.get('https://flagcdn.com/es/codes.json');
            const flagsData = Object.keys(res.data).map((code) => ({
                code,
                name: res.data[code],
            }));
            setFlags(flagsData);
            setCurrentFlag(randomFlag(flagsData));
        };
        getFlags();
    }, []);

    const randomFlag = (flagsData) => {
        const randomIndex = Math.floor(Math.random() * flagsData.length);
        return flagsData[randomIndex];
    };

    const handleNextFlag = () => {
        const remainingFlags = flags.filter((flag) => flag !== currentFlag);
        if (remainingFlags.length === 0) {
            setGameOver(true);
        } else {
            setCurrentFlag(randomFlag(remainingFlags));
            setUserGuess('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userGuess === currentFlag?.name) {
            setScore(score + 1);
        }
        handleNextFlag();
    };
    return (
        <div>
            {gameOver ? (
                <div>
                    <h1>¡Game Over!</h1>
                    <p>Your final score is: {score}</p>
                </div>
            ) : (
                <div>
                    <h1>¿Qué bandera es esta?</h1>
                    <img src={`https://flagcdn.com/w320/${currentFlag?.code}.png`} alt={currentFlag?.name} />
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={userGuess}
                            onChange={(e) => setUserGuess(e.target.value)}
                            placeholder="Guess the name of the flag"
                        />
                        <button type="submit">Send reply</button>
                    </form>
                    <p>Score: {score}</p>
                </div>
            )}
        </div>
    );
};


export default Quiz;