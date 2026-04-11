import React from 'react'

const FormInput = ({
    label,
    id,
    type = 'text',
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
            <input
                id={id}
                type={type}
                className={`
                    w-full rounded-lg bg-[#101922]
                    border border-white/10 px-4 py-3
                    text-white placeholder-gray-600
                    focus:border-primary focus:ring-1 focus:ring-primary
                    focus:outline-none transition-all
                    ${className}
                `}
                {...props}
            />
        </div>
    )
}

export default FormInput
