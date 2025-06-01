import { useState } from 'preact/hooks';
import type { FC } from 'preact/compat';
import type { GameState } from '../App';
import { CircleCheck, Hand, Skull, User } from 'lucide-react';

interface RevealWordsProps {
    goalWord: string;
    imposterHint: string;
    players: string[];
    impostors: string[];
    setGameState: (state: GameState) => void;
}

const RevealWords: FC<RevealWordsProps> = ({
    setGameState,
    goalWord,
    imposterHint,
    players,
    impostors,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const currentPlayer = players[currentIndex];
    const isLastPlayer = currentIndex === players.length - 1;

    const handleFlip = () => {
        setIsFlipped(true);
    };

    const handleNext = () => {
        if (!isLastPlayer) {
            setIsFlipped(false);
            setTimeout(() => {
                setCurrentIndex((prev) => prev + 1);
            }, 500);
        } else {
            setGameState('revealImposter');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center grow">
            <span className="text-xs mb-2">Gib das Gerät weiter an:</span>
            <span className="text-3xl text-primary font-bold mb-6 flex items-center gap-2">
                <User />
                {currentPlayer}
            </span>

            <button
                className="perspective mb-6 w-80 h-60 hover:cursor-pointer"
                onClick={handleFlip}
            >
                <div
                    className={`card p-0 flip-card relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                        isFlipped ? 'rotate-y-180' : ''
                    }`}
                >
                    {/* Front */}
                    <div className="absolute w-full h-full backface-hidden rounded-xl shadow-xl flex flex-col items-center gap-3 justify-center text-xl font-semibold">
                        <Hand />
                        Tippen um umzudrehen
                    </div>

                    {/* Back */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-xl flex flex-col justify-center gap-5 items-center text-2xl font-bold">
                        {impostors.includes(currentPlayer) ? (
                            <Skull className="text-primary h-8 w-8" />
                        ) : (
                            <CircleCheck
                                style={{ color: 'oklch(0.672 0.216 240)' }}
                                className="h-8 w-8"
                            />
                        )}
                        <span className="text-center text-xl">
                            {impostors.includes(currentPlayer)
                                ? 'Tipp: ' + imposterHint
                                : goalWord}
                        </span>
                    </div>
                </div>
            </button>

            {!isFlipped ? (
                <button
                    onClick={handleFlip}
                    className="btn-secondary w-full mt-auto"
                >
                    Karte umdrehen
                </button>
            ) : (
                <button
                    onClick={handleNext}
                    className={
                        'w-full mt-auto btn' +
                        (isLastPlayer ? '' : '-secondary')
                    }
                >
                    {isLastPlayer ? 'Spiel Starten' : 'Weitergeben'}
                </button>
            )}
        </div>
    );
};

export default RevealWords;
