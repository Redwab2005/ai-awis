function SelectBtn({
  selected,
  setSelected,
  children,
  selectColor,
  className,
  ...props
}) {
  return (
    <button
      {...props}
      onClick={() => setSelected(children)}
      className={` flex items-center justify-center px-4 h-[30px] rounded-full py-2 border text-sm font-medium transition
          ${
            selected === children
              ? `text-${selectColor} border-${selectColor} bg-[#d6e4f5]`
              : "text-[#6F6F6F] border-gray-300"
          } ${className}`}
    >
      {children}
    </button>
  );
}

export default SelectBtn;
