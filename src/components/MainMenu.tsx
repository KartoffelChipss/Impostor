import { useState } from 'preact/hooks';
import type { FC } from 'preact/compat';
import type { GameState } from '../App';
import { ChevronDown, User, UserPlus, X } from 'lucide-react';
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
    categoriesToUse: string[];
    setCategoriesToUse: (categories: string[]) => void;
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
    categoriesToUse,
    setCategoriesToUse,
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

        if (
            imposterAmount < 1 ||
            imposterAmount > Math.floor(players.length / 2)
        ) {
            alert('Ungültige Anzahl von Impostors.');
            return;
        }

        if (categoriesToUse.length === 0) {
            alert('Bitte wähle mindestens eine Kategorie aus.');
            return;
        }

        const impostors: string[] = shuffle(players).slice(0, imposterAmount);
        setImpostors(impostors);

        const randomWord = getRandomWord(categoriesToUse);
        setGoalWord(randomWord.goalWord);
        setImposterHint(randomWord.imposterHint);
        setGameState('revealWords');
    };

    return (
        <>
            <div className="flex flex-col gap-4 h-full">
                <h2 className="text-medium font-medium">Spieler</h2>

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
                        <h2 className="mt-4 text-medium font-medium">
                            Anzahl der Imposter
                        </h2>

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

                <details class="group">
                    <summary class="w-full focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-all outline-none rounded-md">
                        <h2 class="flex flex-1 items-start justify-between gap-4 py-4 text-left text-medium font-medium">
                            Kategorien
                            <ChevronDown className="text-muted-foreground h-5 w-5" />
                        </h2>
                    </summary>
                    <section class="pb-4">
                        {getWordCategories().map((category) => (
                            <label
                                htmlFor={'category-' + category}
                                key={category}
                                className="flex items-center justify-between gap-3 px-4 py-2 hover:bg-secondary rounded-md hover:cursor-pointer transition-colors"
                            >
                                <span className="text-medium">{category}</span>
                                <input
                                    type="checkbox"
                                    id={'category-' + category}
                                    className="input"
                                    role="switch"
                                    checked={categoriesToUse.includes(category)}
                                    onChange={(e) => {
                                        const newCategories = e.currentTarget
                                            .checked
                                            ? [...categoriesToUse, category]
                                            : categoriesToUse.filter(
                                                  (c) => c !== category
                                              );
                                        setCategoriesToUse(newCategories);
                                    }}
                                />
                            </label>
                        ))}
                    </section>
                </details>

                <button
                    onClick={handleGameStart}
                    className="btn mt-4"
                    disabled={
                        players.length < 3 || categoriesToUse.length === 0
                    }
                    title={
                        players.length < 3
                            ? 'Mindestens 3 Spieler benötigt'
                            : categoriesToUse.length === 0
                            ? 'Bitte wähle mindestens eine Kategorie aus'
                            : ''
                    }
                >
                    Spiel starten
                </button>
            </div>
        </>
    );
};

export default MainMenu;
