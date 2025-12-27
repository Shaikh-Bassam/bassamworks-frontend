import React from 'react'

const SecondaryButton = ({ children }) => {
    return (
        <button
            class="flex h-12 items-center gap-2 rounded-lg border border-white/20 bg-transparent px-6 text-white text-base font-bold hover:bg-white/5 transition-all active:scale-95">
            {children}
        </button>
    )
}

export default SecondaryButton