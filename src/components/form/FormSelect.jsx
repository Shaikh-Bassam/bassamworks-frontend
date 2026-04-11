import React from 'react'

const FormSelect = ({
    label,
    id,
    options = [],
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

            <div className="relative">
                <select
                    id={id}
                    className={`
            w-full rounded-lg bg-[#101922]
            border border-white/10 px-4 py-3
            text-white appearance-none cursor-pointer
            focus:border-primary focus:ring-1 focus:ring-primary
            focus:outline-none transition-all
            ${className}
          `}
                    {...props}
                >
                    {options.map(option => (
                        <option key={option.value ?? option} value={option.value ?? option}>
                            {option.label ?? option}
                        </option>
                    ))}
                </select>

                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-sm">
                    expand_more
                </span>
            </div>
        </div>
    )
}

export default FormSelect
