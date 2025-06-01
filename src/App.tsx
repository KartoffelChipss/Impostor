import { useState } from 'preact/hooks';
import MainMenu from './components/MainMenu';
import RevealWords from './components/RevealWords';
import RevealImpostor from './components/RevealImpostor';
import Header from './components/Header';

export type GameState = 'mainMenu' | 'revealWords' | 'revealImposter';

const App = () => {
    const [gameState, setGameState] = useState<GameState>('mainMenu');
    const [players, setPlayers] = useState<string[]>([]);
    const [impostors, setImpostors] = useState<string[]>([]);
    const [goalWord, setGoalWord] = useState<string>('');
    const [impostorHint, setImpostorHint] = useState<string>('');
    const [imposterAmount, setImposterAmount] = useState<number>(1);

    return (
        <>
            <Header />
            {gameState === 'mainMenu' && (
                <MainMenu
                    setGameState={setGameState}
                    players={players}
                    setPlayers={setPlayers}
                    setImpostors={setImpostors}
                    setGoalWord={setGoalWord}
                    setImposterHint={setImpostorHint}
                    imposterAmount={imposterAmount}
                    setImposterAmount={setImposterAmount}
                />
            )}
            {gameState === 'revealWords' && (
                <RevealWords
                    setGameState={setGameState}
                    players={players}
                    goalWord={goalWord}
                    imposterHint={impostorHint}
                    impostors={impostors}
                />
            )}
            {gameState === 'revealImposter' && (
                <RevealImpostor
                    setGameState={setGameState}
                    impostors={impostors}
                    players={players}
                />
            )}
        </>
    );
};

export default App;
