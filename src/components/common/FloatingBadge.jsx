import React from 'react'

const FloatingBadge = ({
    icon="",
    wrapperClass="",
    usage="",
    frameWork="",
}) => {
    return (
        <div className={`absolute flex items-center gap-3 p-3 rounded-lg bg-[#141414]/90 backdrop-blur-md border border-white/10 shadow-lg transform transition-transform group-hover:translate-y-[-5px] ${wrapperClass}`}>
            <div className="w-8 h-8 rounded flex items-center justify-center bg-[#61DAFB]/10 text-[#61DAFB]">
                {icon}
            </div>
            <div>
                <div className="text-xs text-gray-400">{usage}</div>
                <div className="text-sm font-bold text-white">{frameWork}</div>
            </div>
        </div>
    )
}

export default FloatingBadge