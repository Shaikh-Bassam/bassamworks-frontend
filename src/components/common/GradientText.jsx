import React from 'react'

const GRADIENTS = {
  bluePurple: 'from-[#258cf4] to-purple-400',
  greenBlue: 'from-emerald-400 to-cyan-400',
  orangePink: 'from-orange-400 to-pink-500',
  redYellow: 'from-red-400 to-yellow-400',
}

const GradientText = ({
  children,
  gradient = 'bluePurple',
  as: Component = 'span',
  className = '',
}) => {
  const gradientClasses = GRADIENTS[gradient] || GRADIENTS.bluePurple

  return (
    <Component
      className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientClasses} ${className}`}
    >
      {children}
    </Component>
  )
}

export default GradientText
