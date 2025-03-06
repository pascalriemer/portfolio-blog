"use client"

import { motion } from "framer-motion"

export default function FallbackLanding({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex flex-col justify-center items-center cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onClick={onEnter}
    >
      <motion.h1
        className="text-white text-[20vw] font-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Thru.
      </motion.h1>

      <motion.div
        className="mt-8 text-white text-sm opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Click anywhere to enter
      </motion.div>
    </motion.div>
  )
}

