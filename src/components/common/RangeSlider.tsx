import type { FC } from 'preact/compat';
import { useEffect, useRef } from 'preact/hooks';

interface RangeSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: string;
    max?: string;
    className?: string;
    displayValue?: boolean;
}

const RangeSlider: FC<RangeSliderProps> = ({
    onChange,
    value,
    min = '0',
    max = '100',
    className = '',
    displayValue = true,
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const el = inputRef.current;
        if (!el) return;

        const min = parseFloat(el.min || '0');
        const max = parseFloat(el.max || '100');
        const val = parseFloat(String(value));
        const percent = max === min ? 0 : ((val - min) / (max - min)) * 100;

        el.style.setProperty('--slider-value', `${percent}%`);
    }, [value, max, min]);

    return (
        <div className={'flex items-center gap-3 w-full ' + className}>
            <input
                type="range"
                className="input grow"
                min={min}
                max={max}
                value={value}
                ref={inputRef}
                onInput={(e) =>
                    onChange(parseFloat((e.target as HTMLInputElement).value))
                }
            />
            {displayValue && (
                <span className="text-sm text-gray-700">
                    {value} {max ? `/${max}` : ''}
                </span>
            )}
        </div>
    );
};

export default RangeSlider;
