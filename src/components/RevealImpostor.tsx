import { useState, type FC } from 'preact/compat';
import type { GameState } from '../App';
import { MessageCircleQuestion, Skull } from 'lucide-react';

interface RevealImpostorProps {
    setGameState: (state: GameState) => void;
    impostors: string[];
    players: string[];
}

const revealImpostor: FC<RevealImpostorProps> = ({
    setGameState,
    impostors,
    players,
}) => {
    const [revealImpostor, setRevealImpostor] = useState(false);
    const randomPlayer = players[Math.floor(Math.random() * players.length)];

    return (
        <div className="flex flex-col grow">
            {revealImpostor ? (
                <>
                    {impostors.length <= 1 ? (
                        <div className="flex flex-col gap-3 justify-center py-20 text-center grow">
                            <span className="text-2xl text-primary font-semibold flex items-center justify-center gap-2 max-w-full">
                                <Skull className="h-7 w-7" />
                                {impostors[0]}
                            </span>
                            <span className="text-sm text-secondary-foreground">
                                war der Impostor!
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 justify-center py-20 text-center grow">
                            <span className="text-2xl text-primary font-semibold flex items-center justify-center gap-2 max-w-full">
                                <Skull className="h-7 w-7" />
                                {impostors.join(', ')}
                            </span>
                            <span className="text-sm text-secondary-foreground">
                                waren die Impostor!
                            </span>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 grow">
                    <span className="text-2xl font-medium">
                        {randomPlayer} beginnt!
                    </span>
                    <MessageCircleQuestion className="h-20 w-20 mt-5" />
                </div>
            )}

            {revealImpostor ? (
                <button
                    onClick={() => setGameState('mainMenu')}
                    className="btn-secondary w-full"
                >
                    Zurück zum Menü
                </button>
            ) : (
                <button
                    onClick={() => setRevealImpostor(true)}
                    className="btn w-full"
                >
                    Impostor aufdecken
                </button>
            )}
        </div>
    );
};

export default revealImpostor;
