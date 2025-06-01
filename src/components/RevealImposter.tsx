import { useState, type FC } from 'preact/compat';
import type { GameState } from '../App';
import { MessageCircleQuestion, Skull } from 'lucide-react';

interface RevealImposterProps {
    setGameState: (state: GameState) => void;
    imposter: string;
    players: string[];
}

const revealImposter: FC<RevealImposterProps> = ({
    setGameState,
    imposter,
    players,
}) => {
    const [revealImposter, setRevealImposter] = useState(false);
    const randomPlayer = players[Math.floor(Math.random() * players.length)];

    return (
        <div className="flex flex-col grow">
            {revealImposter ? (
                <div className="flex flex-col gap-3 justify-center py-20 text-center grow">
                    <span className="text-2xl text-primary font-semibold flex items-center justify-center gap-2 max-w-full">
                        <Skull className="h-7 w-7" />
                        {imposter}
                    </span>
                    <span className="text-sm text-secondary-foreground">
                        war der Imposter!
                    </span>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 grow">
                    <span className="text-2xl font-medium">
                        {randomPlayer} beginnt!
                    </span>
                    <MessageCircleQuestion className="h-20 w-20 mt-5" />
                </div>
            )}

            {revealImposter ? (
                <button
                    onClick={() => setGameState('mainMenu')}
                    className="btn-secondary w-full"
                >
                    Zurück zum Menü
                </button>
            ) : (
                <button
                    onClick={() => setRevealImposter(true)}
                    className="btn w-full"
                >
                    Imposter aufdecken
                </button>
            )}
        </div>
    );
};

export default revealImposter;
