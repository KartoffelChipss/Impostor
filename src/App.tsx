import { useState } from 'preact/hooks';
import MainMenu from './components/MainMenu';
import RevealWords from './components/RevealWords';
import RevealImpostor from './components/RevealImpostor';
import Header from './components/Header';

export type GameState = 'mainMenu' | 'revealWords' | 'revealImposter';

const App = () => {
    const [gameState, setGameState] = useState<GameState>('mainMenu');
    const [players, setPlayers] = useState<string[]>([]);
    const [impostor, setImpostor] = useState<string>('');
    const [goalWord, setGoalWord] = useState<string>('');
    const [impostorHint, setImpostorHint] = useState<string>('');

    return (
        <>
            <Header />
            {gameState === 'mainMenu' && (
                <MainMenu
                    setGameState={setGameState}
                    players={players}
                    setPlayers={setPlayers}
                    setImposter={setImpostor}
                    setGoalWord={setGoalWord}
                    setImposterHint={setImpostorHint}
                />
            )}
            {gameState === 'revealWords' && (
                <RevealWords
                    setGameState={setGameState}
                    players={players}
                    goalWord={goalWord}
                    imposterHint={impostorHint}
                    imposter={impostor}
                />
            )}
            {gameState === 'revealImposter' && (
                <RevealImpostor
                    setGameState={setGameState}
                    impostor={impostor}
                    players={players}
                />
            )}
        </>
    );
};

export default App;
