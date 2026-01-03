import React, { useState } from 'react'

const useMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const toggleMenu = () => {
        if (isDisabled) return;
        setIsDisabled(true);
        setIsOpen(!isOpen);
        setTimeout(() => {
            setIsDisabled(false);
        }, 1000);
    };
    return { isOpen, toggleMenu, isDisabled }
}

export default useMenu