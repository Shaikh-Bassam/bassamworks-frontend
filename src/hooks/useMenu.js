import { useEffect, useRef, useState } from 'react'

const useMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const timeoutRef = useRef(null);

    const toggleMenu = () => {
        if (isDisabled) return;
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
        }

        setIsDisabled(true);
        setIsOpen((prev) => !prev);
        timeoutRef.current = window.setTimeout(() => {
            setIsDisabled(false);
            timeoutRef.current = null;
        }, 420);
    };

    useEffect(() => {
        const overflowValue = isOpen ? 'hidden' : '';
        document.documentElement.style.overflow = overflowValue;
        document.body.style.overflow = overflowValue;

        return undefined;
    }, [isOpen]);

    useEffect(() => {
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return { isOpen, toggleMenu, isDisabled }
}

export default useMenu