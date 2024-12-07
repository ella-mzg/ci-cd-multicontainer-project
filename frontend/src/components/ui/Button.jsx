import clsx from "clsx"

const base =
  "rounded text-white font-semibold transition-colors duration-200 focus:outline-none"
const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
  secondary: "bg-gray-500 hover:bg-gray-600 active:bg-gray-700",
  danger: "bg-red-600 hover:bg-red-700 active:bg-red-800",
  disabled: "bg-gray-300 text-gray-700 cursor-not-allowed"
}
const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg"
}
const Button = (props) => {
  const {
    as: Component = "button",
    variant = "primary",
    size = "md",
    className,
    ...otherProps
  } = props

  return (
    <Component
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={variant === "disabled"}
      {...otherProps}
    />
  )
}

export default Button
