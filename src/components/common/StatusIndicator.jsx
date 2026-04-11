import React from 'react'

const VARIANTS = {
  active: {
    ping: 'bg-emerald-400',
    base: 'bg-emerald-500',
  },
  idle: {
    ping: 'bg-yellow-400',
    base: 'bg-yellow-500',
  },
  error: {
    ping: 'bg-red-400',
    base: 'bg-red-500',
  },
  info: {
    ping: 'bg-blue-400',
    base: 'bg-blue-500',
  },
}

const SIZES = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
}

const SHAPES = {
  dot: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-md',
  pill: 'rounded-full w-4', // for badges / timelines
}

const StatusIndicator = ({
  variant = 'active',
  size = 'md',
  shape = 'dot',
  ping = false,
  className,
}) => {
  const colors = VARIANTS[variant] || VARIANTS.active
  const dimension = SIZES[size] || SIZES.md
  const borderRadius = SHAPES[shape] || SHAPES.dot

  return (
    <span className={`relative flex ${dimension} ${className}`}>
      {ping && (
        <span
          className={`
            absolute inline-flex h-full w-full animate-ping opacity-70
            ${borderRadius}
            ${colors.ping}
          `}
        />
      )}
      <span
        className={`
          relative inline-flex h-full w-full
          ${borderRadius}
          ${colors.base}
        `}
      />
    </span>
  )
}

export default StatusIndicator
