import React from 'react'

const BorderButton = ({ children, className="", ...props }) => {
    return (
        <div className={`"relative px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit text-xs font-medium text-gray-300 tracking-wide" ${className}`}>
            {children}
        </div>
    )
}

export default BorderButton