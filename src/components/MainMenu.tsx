import { useState } from 'preact/hooks';
import type { FC } from 'preact/compat';
import type { GameState } from '../App';
import { User, UserPlus, X } from 'lucide-react';
import { getRandomWord, getWordCategories } from '../data';

interface MainMenuProps {
    setGameState: (state: GameState) => void;
    setPlayers: (players: string[]) => void;
    setImposter: (imposter: string) => void;
    setGoalWord: (goalWord: string) => void;
    setImposterHint: (imposterHint: string) => void;
    players: string[];
}

const MainMenu: FC<MainMenuProps> = ({
    setGameState,
    setPlayers,
    players,
    setGoalWord,
    setImposter,
    setImposterHint,
}) => {
    const [newPlayerName, setNewPlayerName] = useState('');
    const MAX_NAME_LENGTH = 20;

    const handleAddPlayer = () => {
        if (newPlayerName.trim()) {
            if (players.includes(newPlayerName.trim())) {
                alert('Dieser Spielername ist bereits vergeben.');
                return;
            }
            setPlayers([...players, newPlayerName.trim()]);
            setNewPlayerName('');
        }
    };

    const handleGameStart = () => {
        if (players.length < 3) {
            alert('Mindestens 3 Spieler benötigt, um das Spiel zu starten.');
            return;
        }

        const imposterIndex = Math.floor(Math.random() * players.length);
        setPlayers(players);
        setImposter(players[imposterIndex]);
        const randomWord = getRandomWord(getWordCategories());
        setGoalWord(randomWord.goalWord);
        setImposterHint(randomWord.imposterHint);
        setGameState('revealWords');
    };

    return (
        <>
            <div className="flex flex-col gap-4 h-full">
                <h2>Spieler</h2>

                <div className="flex flex-col gap-5">
                    {players.map((player, index) => (
                        <div className="flex justify-between">
                            <div
                                key={index}
                                className="flex items-center gap-3"
                            >
                                <User />
                                <span>{player}</span>
                            </div>
                            <button
                                className="btn-sm-icon-ghost"
                                onClick={() => {
                                    setPlayers(
                                        players.filter((_, i) => i !== index)
                                    );
                                }}
                            >
                                <X />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        maxLength={MAX_NAME_LENGTH}
                        placeholder="Neuer Spielername"
                        value={newPlayerName}
                        onChange={(e) =>
                            setNewPlayerName(e.currentTarget.value)
                        }
                        className="input"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleAddPlayer();
                            }
                        }}
                    />

                    <button
                        className="btn-secondary"
                        onClick={() => {
                            if (newPlayerName.trim()) {
                                handleAddPlayer();
                            }
                        }}
                        disabled={!newPlayerName.trim()}
                    >
                        <UserPlus />
                    </button>
                </div>

                <button
                    onClick={handleGameStart}
                    className="btn mt-auto"
                    disabled={players.length < 3}
                    title={
                        players.length < 3
                            ? 'Mindestens 3 Spieler benötigt'
                            : undefined
                    }
                >
                    Spiel starten
                </button>
            </div>
        </>
    );
};

export default MainMenu;
