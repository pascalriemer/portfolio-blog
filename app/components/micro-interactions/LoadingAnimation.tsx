"use client"

import type { HTMLAttributes } from "react"
import { motion } from "framer-motion"

interface LoadingAnimationProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  color?: "primary" | "secondary" | "white"
  type?: "spinner" | "dots" | "pulse"
}

export default function LoadingAnimation({
  size = "md",
  color = "primary",
  type = "spinner",
  className = "",
  ...props
}: LoadingAnimationProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const colorClasses = {
    primary: "text-tertiary dark:text-white",
    secondary: "text-primary dark:text-gray-300",
    white: "text-white",
  }

  if (type === "spinner") {
    return (
      <div className={`${className} ${colorClasses[color]}`} {...props}>
        <motion.svg
          className={`animate-spin ${sizeClasses[size]}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </motion.svg>
      </div>
    )
  }

  if (type === "dots") {
    return (
      <div className={`flex justify-center space-x-2 ${className}`} {...props}>
        {[0, 1, 2].map((idx) => (
          <motion.div
            key={idx}
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: idx * 0.2,
              ease: "easeInOut",
            }}
            className={`rounded-full ${sizeClasses[size]} ${colorClasses[color]} bg-current`}
          />
        ))}
      </div>
    )
  }

  // Pulse animation
  return (
    <div className={`${className}`} {...props}>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className={`${sizeClasses[size]} rounded-full ${colorClasses[color]} bg-current`}
      />
    </div>
  )
}

