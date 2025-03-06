"use client"

import { useEffect, useRef, memo } from "react"
import "./landing-animation.css"

interface CubeBackgroundProps {
  scale?: number
  speed?: number
  className?: string
}

function CubeBackground({ scale = 1, speed = 1, className = "" }: CubeBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Adjust wrapper size based on container size
    const updateSize = () => {
      if (!wrapperRef.current) return
      const container = wrapperRef.current.parentElement
      if (!container) return

      const { width, height } = container.getBoundingClientRect()
      const size = Math.max(width, height) * scale
      wrapperRef.current.style.width = `${size}px`
      wrapperRef.current.style.height = `${size}px`
      wrapperRef.current.style.marginLeft = `${-size / 2}px`
      wrapperRef.current.style.marginTop = `${-size / 2}px`
    }

    updateSize()

    // Use ResizeObserver instead of window resize event for better performance
    const resizeObserver = new ResizeObserver(updateSize)
    if (wrapperRef.current?.parentElement) {
      resizeObserver.observe(wrapperRef.current.parentElement)
    }

    return () => resizeObserver.disconnect()
  }, [scale])

  // Apply will-change to optimize animations
  const animationStyle = {
    animationDuration: `${24 / speed}s`,
    willChange: "transform",
  }

  return (
    <div className={`cube-background ${className}`} style={{ willChange: "contents" }}>
      <div ref={wrapperRef} className="wrapper" style={animationStyle}>
        <div className="box box-0">
          <div className="top"></div>
          <div className="bottom"></div>
          <div className="left"></div>
          <div className="right"></div>
          <div className="front"></div>
          <div className="rear"></div>
        </div>

        <div className="box box-1">
          <div className="top"></div>
          <div className="bottom"></div>
          <div className="left"></div>
          <div className="right"></div>
          <div className="front"></div>
          <div className="rear"></div>
        </div>

        <div className="box box-2">
          <div className="top"></div>
          <div className="bottom"></div>
          <div className="left"></div>
          <div className="right"></div>
          <div className="front"></div>
          <div className="rear"></div>
        </div>

        <div className="box box-3">
          <div className="top"></div>
          <div className="bottom"></div>
          <div className="left"></div>
          <div className="right"></div>
          <div className="front"></div>
          <div className="rear"></div>
        </div>
      </div>
    </div>
  )
}

export default memo(CubeBackground)

