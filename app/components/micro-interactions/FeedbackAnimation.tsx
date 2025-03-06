"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface FeedbackAnimationProps {
  type: "success" | "error" | "info" | null
  message: string | null
  onDismiss?: () => void
  duration?: number
  position?: "top" | "bottom"
}

export default function FeedbackAnimation({
  type,
  message,
  onDismiss,
  duration = 5000,
  position = "top",
}: FeedbackAnimationProps) {
  useEffect(() => {
    if (message && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [message, duration, onDismiss])

  const positionStyles = {
    top: "top-4 inset-x-0",
    bottom: "bottom-4 inset-x-0",
  }

  const icons = {
    success: <CheckCircle className="text-green-500 mr-2" size={20} />,
    error: <XCircle className="text-red-500 mr-2" size={20} />,
    info: <AlertCircle className="text-blue-500 mr-2" size={20} />,
  }

  const bgColors = {
    success: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900",
    error: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900",
  }

  const textColors = {
    success: "text-green-800 dark:text-green-200",
    error: "text-red-800 dark:text-red-200",
    info: "text-blue-800 dark:text-blue-200",
  }

  return (
    <AnimatePresence>
      {type && message && (
        <div className={`fixed ${positionStyles[position]} z-50 flex justify-center pointer-events-none`}>
          <motion.div
            initial={{ opacity: 0, y: position === "top" ? -20 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === "top" ? -20 : 20 }}
            className={`${bgColors[type]} ${textColors[type]} px-6 py-3 rounded-lg shadow-lg border pointer-events-auto max-w-md`}
          >
            <div className="flex items-center">
              {icons[type]}
              <span>{message}</span>
              {onDismiss && (
                <button onClick={onDismiss} className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <XCircle size={16} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

