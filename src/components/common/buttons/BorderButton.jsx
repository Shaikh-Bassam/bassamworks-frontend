const BorderButton = ({ 
  children, 
  className = "", 
  variant = "default",
  size = "md",
  as = "button",
  direction = "row", // row, column, row-reverse, column-reverse
  align = "center", // start, center, end, stretch, baseline
  justify = "center", // start, center, end, between, around, evenly
  gap = "2", // 0, 1, 2, 3, 4, 6, 8
  fullWidth = false,
  ...props 
}) => {
  
  // Variant styles
  const variants = {
    default: "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20",
    primary: "bg-[#258cf4]/10 border-[#258cf4]/20 text-[#258cf4] hover:bg-[#258cf4]/20 hover:border-[#258cf4]/40",
    outline: "bg-white/5 border-white/10 text-gray-400 hover:text-[#258cf4] hover:border-[#258cf4]/50",
    solid: "bg-[#258cf4] border-[#258cf4] text-white hover:bg-blue-600 shadow-lg shadow-[#258cf4]/20",
    ghost: "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white",
    success: "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20 hover:border-green-500/40",
    danger: "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40",
  };

  // Size styles
  const sizes = {
    sm: "px-2 py-1 text-[10px]",
    md: "px-3 py-1.5 text-xs",
    lg: "px-4 py-2 text-sm size-12",
    xl: "px-5 py-2.5 text-sm",
  };

  // Layout styles
  const directions = {
    row: "flex-row",
    column: "flex-col",
    "row-reverse": "flex-row-reverse",
    "column-reverse": "flex-col-reverse",
  };

  const alignments = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  };

  const justifications = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const gaps = {
    "0": "gap-0",
    "1": "gap-1",
    "2": "gap-2",
    "3": "gap-3",
    "4": "gap-4",
    "6": "gap-6",
    "8": "gap-8",
  };

  const Component = as;
  
  // Base styles with transition
  const baseStyles = "relative rounded-lg border font-medium tracking-wide transition-all duration-200";
  
  // Layout classes
  const layoutStyles = `flex ${directions[direction]} ${alignments[align]} ${justifications[justify]} ${gaps[gap]}`;
  
  const variantStyle = variants[variant] || variants.default;
  const sizeStyle = sizes[size] || sizes.md;
  const widthStyle = fullWidth ? "w-full" : "w-fit";
  
  const combinedClassName = `${baseStyles} ${layoutStyles} ${variantStyle} ${sizeStyle} ${widthStyle} ${className}`.trim();

  return (
    <Component {...props} className={combinedClassName}>
      {children}
    </Component>
  );
};

export default BorderButton;