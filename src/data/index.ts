import alltagWords from './alltag.json';
import rundUmDieWeltWords from './rundUmDieWelt.json';
import sportUndFreizeitWords from './sportUndFreizeit.json';
import unterhaltungWords from './unterhaltung.json';
import wissenUndSchuleWords from './wissenUndSchule.json';
import tiereWords from './tiere.json';
import uralteWoerterWords from './uralteWoerter.json';

interface WordEntry {
    goalWord: string;
    imposterHint: string;
}

export function getWordCategories(): string[] {
    return [
        'Alltag',
        'Sport & Freizeit',
        'Unterhaltung',
        'Wissen & Schule',
        'Tiere',
        'Rund um die Welt',
        'Uralte Wörter',
    ];
}

export function getRecommendedCategories(): string[] {
    return [
        'Alltag',
        'Sport & Freizeit',
        'Unterhaltung',
        'Wissen & Schule',
        'Tiere',
    ];
}

export function getWordsByCategory(category: string): WordEntry[] {
    switch (category) {
        case 'Alltag':
            return alltagWords;
        case 'Rund um die Welt':
            return rundUmDieWeltWords;
        case 'Sport & Freizeit':
            return sportUndFreizeitWords;
        case 'Unterhaltung':
            return unterhaltungWords;
        case 'Wissen & Schule':
            return wissenUndSchuleWords;
        case 'Tiere':
            return tiereWords;
        case 'Uralte Wörter':
            return uralteWoerterWords;
        default:
            return [];
    }
}

export function getRandomWord(categories: string[]): WordEntry {
    const allWords: WordEntry[] = categories.flatMap(getWordsByCategory);
    if (allWords.length === 0)
        throw new Error('Keine Wörter in den angegebenen Kategorien gefunden.');

    const randomIndex = Math.floor(Math.random() * allWords.length);
    return allWords[randomIndex];
}
