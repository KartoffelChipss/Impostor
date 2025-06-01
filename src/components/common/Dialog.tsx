import { useEffect, useRef, useState } from 'react';

type DialogProps = {
    id: string;
    initialOpen?: boolean;
    closeOnOverlayClick?: boolean;
};

export default function Dialog({
    id,
    initialOpen = false,
    closeOnOverlayClick = true,
}: DialogProps) {
    const [open, setOpen] = useState(initialOpen);
    const dialogRef = useRef<HTMLDivElement>(null);
    const focusRef = useRef<HTMLInputElement>(null);

    // Open/Close Event Listeners
    useEffect(() => {
        const handleOpen = (e: CustomEvent) => {
            if (e.detail?.id === id) show();
        };
        const handleClose = (e: CustomEvent) => {
            if (e.detail?.id === id) hide();
        };
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') hide();
        };

        window.addEventListener('dialog:open', handleOpen as EventListener);
        window.addEventListener('dialog:close', handleClose as EventListener);
        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener(
                'dialog:open',
                handleOpen as EventListener
            );
            window.removeEventListener(
                'dialog:close',
                handleClose as EventListener
            );
            window.removeEventListener('keydown', handleEscape);
        };
    }, [id]);

    const show = () => {
        setOpen(true);
        setTimeout(() => {
            focusRef.current?.focus();
            dialogRef.current?.dispatchEvent(
                new CustomEvent('dialog:opened', {
                    bubbles: true,
                    detail: { id },
                })
            );
        }, 50);
    };

    const hide = () => {
        setOpen(false);
        dialogRef.current?.dispatchEvent(
            new CustomEvent('dialog:closed', { bubbles: true, detail: { id } })
        );
    };

    return (
        <div id={id} className="dialog">
            <button
                type="button"
                aria-expanded={open}
                aria-controls={`${id}-dialog`}
                className="btn-outline"
                onClick={show}
            >
                Edit Profile
            </button>

            {open && (
                <div
                    role="dialog"
                    id={`${id}-dialog`}
                    tabIndex={-1}
                    aria-modal="true"
                    aria-labelledby={`${id}-title`}
                    className="dialog-content"
                    ref={dialogRef}
                    onClick={(e) => {
                        if (
                            e.target === dialogRef.current &&
                            closeOnOverlayClick
                        ) {
                            hide();
                        }
                    }}
                >
                    <article className="w-full sm:max-w-[425px] max-h-[612px]">
                        <header>
                            <h2 id={`${id}-title`}>Edit profile</h2>
                            <p>
                                Make changes to your profile here. Click save
                                when you're done.
                            </p>
                        </header>

                        <section>
                            <form className="form grid gap-4">
                                <div className="grid gap-3">
                                    <label htmlFor={`${id}-name`}>Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Pedro Duarte"
                                        id={`${id}-name`}
                                        ref={focusRef}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <label htmlFor={`${id}-username`}>
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="@peduarte"
                                        id={`${id}-username`}
                                    />
                                </div>
                            </form>
                        </section>

                        <footer>
                            <button className="btn-outline" onClick={hide}>
                                Cancel
                            </button>
                            <button className="btn" onClick={hide}>
                                Save changes
                            </button>
                        </footer>

                        <button onClick={hide} aria-label="Close dialog">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-x"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </article>
                </div>
            )}
        </div>
    );
}
