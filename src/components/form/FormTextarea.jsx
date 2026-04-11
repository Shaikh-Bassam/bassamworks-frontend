import React from 'react'

const FormTextarea = ({
    label,
    id,
    rows = 5,
    className = '',
    ...props
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-gray-300">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                rows={rows}
                className={`
                    w-full rounded-lg bg-[#101922]
                    border border-white/10 px-4 py-3
                    text-white placeholder-gray-600 resize-none
                    focus:border-primary focus:ring-1 focus:ring-primary
                    focus:outline-none transition-all
                    ${className}
                `}
                {...props}
            />
        </div>
    )
}

export default FormTextarea
