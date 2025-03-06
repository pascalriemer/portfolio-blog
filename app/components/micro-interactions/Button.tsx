"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "outline"
  className?: string
  disabled?: boolean
  icon?: ReactNode
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  icon,
}: ButtonProps) {
  const baseStyles =
    "font-semibold py-3 px-6 rounded-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"

  const variants = {
    primary:
      "bg-tertiary dark:bg-white text-primary dark:text-black hover:bg-secondary dark:hover:bg-gray-200 focus:ring-tertiary dark:focus:ring-white",
    secondary:
      "bg-primary dark:bg-gray-800 text-quaternary dark:text-white hover:bg-primary/90 dark:hover:bg-gray-700 focus:ring-primary dark:focus:ring-gray-800",
    outline:
      "border-2 border-tertiary dark:border-white text-primary dark:text-white hover:bg-tertiary/10 dark:hover:bg-white/10 focus:ring-tertiary dark:focus:ring-white",
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  )
}

