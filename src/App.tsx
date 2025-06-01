import { useState } from 'preact/hooks';
import MainMenu from './components/MainMenu';
import RevealWords from './components/RevealWords';
import RevealImposter from './components/RevealImposter';
import Header from './components/Header';

export type GameState = 'mainMenu' | 'revealWords' | 'revealImposter';

const App = () => {
    const [gameState, setGameState] = useState<GameState>('mainMenu');
    const [players, setPlayers] = useState<string[]>([]);
    const [imposter, setImposter] = useState<string>('');
    const [goalWord, setGoalWord] = useState<string>('');
    const [imposterHint, setImposterHint] = useState<string>('');

    return (
        <>
            <Header />
            {gameState === 'mainMenu' && (
                <MainMenu
                    setGameState={setGameState}
                    players={players}
                    setPlayers={setPlayers}
                    setImposter={setImposter}
                    setGoalWord={setGoalWord}
                    setImposterHint={setImposterHint}
                />
            )}
            {gameState === 'revealWords' && (
                <RevealWords
                    setGameState={setGameState}
                    players={players}
                    goalWord={goalWord}
                    imposterHint={imposterHint}
                    imposter={imposter}
                />
            )}
            {gameState === 'revealImposter' && (
                <RevealImposter
                    setGameState={setGameState}
                    imposter={imposter}
                    players={players}
                />
            )}
        </>
    );
};

export default App;
