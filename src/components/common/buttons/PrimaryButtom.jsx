import React from 'react'

const PrimaryButtom = ({ children, className="", ...props }) => {
    return (
        <button
            {...props}
            className={`flex items-center gap-2 rounded-lg bg-white px-6 text-primary text-base font-bold hover:bg-gray-200 transition-all active:scale-95 ${className}`}
        >
            {children}
        </button>
    )
}

export default PrimaryButtom