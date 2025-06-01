import { useState } from 'preact/hooks';
import type { FC } from 'preact/compat';
import type { GameState } from '../App';
import { User, UserPlus, X } from 'lucide-react';
import { getRandomWord, getWordCategories } from '../data';
import RangeSlider from './common/RangeSlider';
import { shuffle } from '../util/shuffle';

interface MainMenuProps {
    setGameState: (state: GameState) => void;
    setPlayers: (players: string[]) => void;
    setImpostors: (imposters: string[]) => void;
    setGoalWord: (goalWord: string) => void;
    setImposterHint: (imposterHint: string) => void;
    imposterAmount: number;
    setImposterAmount: (amount: number) => void;
    players: string[];
}

const MainMenu: FC<MainMenuProps> = ({
    setGameState,
    setPlayers,
    players,
    setGoalWord,
    setImpostors,
    setImposterHint,
    imposterAmount,
    setImposterAmount,
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

        const impostors: string[] = shuffle(players).slice(0, imposterAmount);
        setImpostors(impostors);

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

                    {players.length === 0 && (
                        <div className="text-muted-foreground text-sm">
                            Noch keine Spieler hinzugefügt.
                        </div>
                    )}
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

                {players.length > 3 && (
                    <>
                        <h2 className="mt-4">Anzahl der Imposter</h2>

                        <RangeSlider
                            min="1"
                            max={Math.max(1, Math.floor(players.length / 2))
                                .toFixed(0)
                                .toString()}
                            value={imposterAmount}
                            onChange={(value) => setImposterAmount(value)}
                        />
                    </>
                )}

                <button
                    onClick={handleGameStart}
                    className="btn mt-4"
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
