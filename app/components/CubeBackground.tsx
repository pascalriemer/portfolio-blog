"use client"

import { useEffect, useRef, useState, memo } from "react"
import "./landing-animation.css"

interface CubeBackgroundProps {
  scale?: number
  speed?: number
  className?: string
  scrollRotate?: boolean // Enable scroll-based rotation
}

function CubeBackground({ scale = 1, speed = 1, className = "", scrollRotate = false }: CubeBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Physics state
  const [rotations, setRotations] = useState<{ x: number; y: number }[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ])
  const velocityRef = useRef({ x: 0, y: 0 })
  const lastScrollRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    // Adjust wrapper size based on container size
    const updateSize = () => {
      if (!wrapperRef.current || !containerRef.current) return

      const { width, height } = containerRef.current.getBoundingClientRect()

      // Adjust scale based on screen size
      let responsiveScale = scale
      if (isMobile) {
        responsiveScale = scale * 0.8 // Smaller on mobile
      }

      const size = Math.max(width, height) * responsiveScale
      wrapperRef.current.style.width = `${size}px`
      wrapperRef.current.style.height = `${size}px`
      wrapperRef.current.style.marginLeft = `${-size / 2}px`
      wrapperRef.current.style.marginTop = `${-size / 2}px`

      // Update CSS variables for responsive cube sizes
      document.documentElement.style.setProperty("--cube-size-factor", isMobile ? "0.7" : "1")
    }

    updateSize()

    // Use ResizeObserver for responsive updates
    const resizeObserver = new ResizeObserver(updateSize)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [scale, isMobile])

  // Physics-based animation system
  useEffect(() => {
    if (!scrollRotate) return

    // Track scroll velocity - works for both mouse wheel and touch scrolling
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const delta = currentScroll - lastScrollRef.current
      lastScrollRef.current = currentScroll

      // Adjust acceleration based on device
      const accelerationY = isMobile ? 0.003 : 0.004 // Slightly less on mobile
      const accelerationX = isMobile ? 0.002 : 0.0025

      velocityRef.current.y += delta * accelerationY
      velocityRef.current.x += delta * accelerationX * (Math.random() > 0.5 ? 1 : -1)

      // Mark as scrolling
      isScrollingRef.current = true

      // Clear previous timeout and set a new one
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
      }, 100) // Short timeout to detect when scrolling stops
    }

    // Animation loop with performance optimizations
    const animate = () => {
      // Apply physics only when not actively scrolling
      if (!isScrollingRef.current) {
        // Same low friction for persistent movement
        velocityRef.current.x *= 0.995
        velocityRef.current.y *= 0.995
      }

      // Only update state if there's significant movement
      const hasSignificantMovement = Math.abs(velocityRef.current.x) > 0.001 || Math.abs(velocityRef.current.y) > 0.001

      if (hasSignificantMovement) {
        // Update rotations based on velocity
        setRotations((prev) =>
          prev.map((rotation, index) => {
            // Adjust factors based on device
            const baseFactorX = index === 0 ? 0.13 : index === 1 ? -0.1 : index === 2 ? 0.07 : -0.11
            const baseFactorY = index === 0 ? 0.1 : index === 1 ? -0.13 : index === 2 ? 0.08 : -0.06

            // Scale factors for mobile
            const factorX = isMobile ? baseFactorX * 0.8 : baseFactorX
            const factorY = isMobile ? baseFactorY * 0.8 : baseFactorY

            return {
              x: rotation.x + velocityRef.current.x * factorX,
              y: rotation.y + velocityRef.current.y * factorY,
            }
          }),
        )
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Set up event listeners and animation
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Add touch event listeners for mobile
    const touchStartY = { current: 0 }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY
      const deltaY = touchStartY.current - touchY

      if (Math.abs(deltaY) > 5) {
        // Threshold to avoid tiny movements
        // Simulate scroll effect
        const simulatedDelta = deltaY * 0.5 // Scale down touch movement

        // Apply the same logic as in handleScroll
        const accelerationY = isMobile ? 0.003 : 0.004
        const accelerationX = isMobile ? 0.002 : 0.0025

        velocityRef.current.y += simulatedDelta * accelerationY
        velocityRef.current.x += simulatedDelta * accelerationX * (Math.random() > 0.5 ? 1 : -1)

        isScrollingRef.current = true

        touchStartY.current = touchY // Update for next move
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
      }, 100)
    }

    if (isMobile) {
      window.addEventListener("touchstart", handleTouchStart, { passive: true })
      window.addEventListener("touchmove", handleTouchMove, { passive: true })
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (isMobile) {
        window.removeEventListener("touchstart", handleTouchStart)
        window.removeEventListener("touchmove", handleTouchMove)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [scrollRotate, isMobile])

  // Apply will-change to optimize animations
  const animationStyle = {
    animationDuration: `${24 / speed}s`,
    willChange: "transform",
  }

  return (
    <div ref={containerRef} className={`cube-background ${className}`} style={{ willChange: "contents" }}>
      <div
        ref={wrapperRef}
        className="wrapper"
        style={scrollRotate ? { ...animationStyle, animationPlayState: "paused" } : animationStyle}
      >
        {[0, 1, 2, 3].map((boxIndex) => (
          <div
            key={boxIndex}
            className={`box box-${boxIndex}`}
            style={
              scrollRotate
                ? {
                    transform: `
                translateZ(var(--z-offset)) 
                rotateX(${rotations[boxIndex].x}deg) 
                rotateY(${rotations[boxIndex].y}deg)
                scale(calc(1 + sin(var(--hover) * 3.14 * 2) * 0.1))
              `,
                    transition: isMobile ? "transform 0.1s ease-out" : "transform 0.2s ease-out",
                  }
                : {}
            }
          >
            <div className="top"></div>
            <div className="bottom"></div>
            <div className="left"></div>
            <div className="right"></div>
            <div className="front"></div>
            <div className="rear"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(CubeBackground)

