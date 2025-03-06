"use client"

import { useEffect, useRef, useState, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as THREE from "three"
import "./landing-animation.css"

interface UnifiedLandingProps {
  onEnter: () => void
}

function UnifiedLanding({ onEnter }: UnifiedLandingProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [renderMode, setRenderMode] = useState<"vfx" | "three" | "simple">("vfx")
  const initAttemptedRef = useRef(false)
  const animationFrameRef = useRef<number | null>(null)
  const threeCleanupRef = useRef<(() => void) | null>(null)

  // Initialize VFX-JS with performance optimizations
  const initVFX = async () => {
    if (!h1Ref.current || initAttemptedRef.current) return false

    try {
      console.log("Attempting to initialize VFX-JS")
      const VFXModule = await import("@vfx-js/core")
      const VFX = VFXModule.VFX

      const shader = `
      precision highp float;
      uniform vec2 resolution;
      uniform vec2 offset;
      uniform vec2 mouse;
      uniform float time;
      uniform sampler2D src;

      #define PI 3.141593
      #define SAMPLES 32.

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(489., 589.))) * 492.) * 2. - 1.;
      }
      float hash(vec3 p) {
        return fract(sin(dot(p, vec3(489., 589., 58.))) * 492.) * 2. - 1.;
      }
      vec2 hash2(vec3 p) {
        return vec2(hash(p), hash(p + 1.));
      }
      vec4 readTex(vec2 uv) {
        if (uv.x < 0. || uv.x > 1. || uv.y < 0. || uv.y > 1.) { return vec4(0); }
        return texture2D(src, uv);
      }
      vec3 spectrum(float x) {
          return cos((x - vec3(0, .5, 1)) * vec3(.6, 1., .5) * PI);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - offset) / resolution;  
        if (readTex(uv).r > 0.) { discard; }
        
        vec2 p = uv * 2. - 1.;
        p.x *= resolution.x / resolution.y;
        
        // Determine light position
        vec2 mp = (mouse - offset) / resolution;
        mp = mp * 2. - 1.;
        mp.x *= resolution.x / resolution.y;
        
        vec2 rp = p;
        vec2 d = (mp - p) / SAMPLES;
        float acc = 0.;
        
        for (float i = 0.; i < SAMPLES; i++) {
          rp += d;
          rp += hash2(vec3(rp, i)) * 0.5 / SAMPLES;
          
          vec2 uv2 = rp;
          uv2.x /= resolution.x / resolution.y;
          uv2 = uv2 * 0.5 + 0.5;    
          acc += readTex(uv2).r / SAMPLES;
        }

        // Light
        float lm = length(p - mp);
        vec4 c = vec4(smoothstep(0., 1., pow(.1 / lm, .2)));
        
        c -= acc; // shadow
        c += vec4((spectrum(cos(acc * 3.5))), 1) * acc * 2.5; // rainbow
        
        c -= hash(vec3(uv.xyy)) * 0.01; // dither   
        gl_FragColor = c;  
      }
      `

      const vfx = new VFX()
      vfx.add(h1Ref.current, {
        shader,
        overflow: true,
        overlay: true,
      })

      console.log("VFX-JS initialized successfully")
      setIsLoaded(true)
      initAttemptedRef.current = true
      return true
    } catch (error) {
      console.error("Error initializing VFX:", error)
      return false
    }
  }

  // Initialize Three.js with performance optimizations
  const initThree = () => {
    if (!containerRef.current || !h1Ref.current) return false

    try {
      console.log("Attempting to initialize Three.js")

      // Create scene
      const scene = new THREE.Scene()

      // Create camera
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 5

      // Create renderer with optimized settings
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        precision: "mediump",
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 1)
      containerRef.current.appendChild(renderer.domElement)

      // Create text texture with optimized size
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")
      canvas.width = 512
      canvas.height = 256

      if (context) {
        context.fillStyle = "white"
        context.font = "bold 120px sans-serif"
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillText("Thru.", canvas.width / 2, canvas.height / 2)
      }

      const textTexture = new THREE.CanvasTexture(canvas)
      textTexture.minFilter = THREE.LinearFilter
      textTexture.magFilter = THREE.LinearFilter

      // Create shader material with optimized shader
      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          mouse: { value: new THREE.Vector2(0.5, 0.5) },
          textTexture: { value: textTexture },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec2 resolution;
          uniform vec2 mouse;
          uniform sampler2D textTexture;
          varying vec2 vUv;
          
          #define PI 3.141593
          
          vec3 spectrum(float x) {
            return cos((x - vec3(0, .5, 1)) * vec3(.6, 1., .5) * PI);
          }
          
          void main() {
            // Sample the texture
            vec4 texColor = texture2D(textTexture, vUv);
            
            // Only process pixels where the text is
            if (texColor.r < 0.1) {
              discard;
            }
            
            // Calculate distance from mouse
            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec2 p = uv * 2.0 - 1.0;
            p.x *= resolution.x / resolution.y;
            
            vec2 mp = mouse * 2.0 - 1.0;
            mp.x *= resolution.x / resolution.y;
            
            float dist = length(p - mp);
            
            // Rainbow effect
            float rainbowIntensity = sin(dist * 10.0 - time) * 0.5 + 0.5;
            vec3 rainbow = spectrum(rainbowIntensity);
            
            // Light effect
            float lightIntensity = 0.1 / dist;
            lightIntensity = clamp(lightIntensity, 0.0, 1.0);
            
            // Final color
            gl_FragColor = vec4(texColor.rgb * rainbow * lightIntensity, texColor.a);
          }
        `,
        transparent: true,
      })

      // Create plane for text with optimized geometry
      const geometry = new THREE.PlaneGeometry(4, 2, 1, 1)
      const textMesh = new THREE.Mesh(geometry, shaderMaterial)
      scene.add(textMesh)

      // Handle mouse movement with throttling
      const mouse = new THREE.Vector2()
      let lastMouseMoveTime = 0
      const mouseMoveThrottle = 16 // ~60fps

      function onMouseMove(event: MouseEvent) {
        const now = performance.now()
        if (now - lastMouseMoveTime < mouseMoveThrottle) return

        lastMouseMoveTime = now
        mouse.x = event.clientX / window.innerWidth
        mouse.y = 1 - event.clientY / window.innerHeight

        shaderMaterial.uniforms.mouse.value = mouse
      }

      window.addEventListener("mousemove", onMouseMove, { passive: true })

      // Handle window resize with throttling
      let resizeTimeout: number | null = null
      function onWindowResize() {
        if (resizeTimeout) window.clearTimeout(resizeTimeout)

        resizeTimeout = window.setTimeout(() => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
          shaderMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight)
        }, 100)
      }

      window.addEventListener("resize", onWindowResize, { passive: true })

      // Animation loop with frame limiting
      const clock = new THREE.Clock()
      let lastFrameTime = 0
      const targetFPS = 60
      const frameInterval = 1000 / targetFPS

      function animate(now: number) {
        animationFrameRef.current = requestAnimationFrame(animate)

        // Limit frame rate
        if (now - lastFrameTime < frameInterval) return
        lastFrameTime = now

        shaderMaterial.uniforms.time.value = clock.getElapsedTime()
        renderer.render(scene, camera)
      }

      animate(0)

      // Store cleanup function
      threeCleanupRef.current = () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }

        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("resize", onWindowResize)

        if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement)
        }

        scene.remove(textMesh)
        geometry.dispose()
        shaderMaterial.dispose()
        textTexture.dispose()
        renderer.dispose()
      }

      console.log("Three.js initialized successfully")
      setIsLoaded(true)
      initAttemptedRef.current = true
      return true
    } catch (error) {
      console.error("Error initializing Three.js:", error)
      return false
    }
  }

  // Initialize simple canvas with performance optimizations
  const initSimple = () => {
    const canvas = canvasRef.current
    if (!canvas) return false

    try {
      console.log("Attempting to initialize simple canvas")

      const ctx = canvas.getContext("2d", { alpha: false })
      if (!ctx) return false

      // Set canvas dimensions
      const resizeCanvas = () => {
        const dpr = window.devicePixelRatio || 1
        const displayWidth = window.innerWidth
        const displayHeight = window.innerHeight

        canvas.width = displayWidth * dpr
        canvas.height = displayHeight * dpr

        canvas.style.width = `${displayWidth}px`
        canvas.style.height = `${displayHeight}px`

        ctx.scale(dpr, dpr)
      }
      resizeCanvas()

      // Mouse position with throttling
      let mouseX = window.innerWidth / 2
      let mouseY = window.innerHeight / 2
      let lastMouseMoveTime = 0
      const mouseMoveThrottle = 16 // ~60fps

      const handleMouseMove = (e: MouseEvent) => {
        const now = performance.now()
        if (now - lastMouseMoveTime < mouseMoveThrottle) return

        lastMouseMoveTime = now
        mouseX = e.clientX
        mouseY = e.clientY
      }
      window.addEventListener("mousemove", handleMouseMove, { passive: true })

      // Draw text with optimized rendering
      let lastFrameTime = 0
      const targetFPS = 60
      const frameInterval = 1000 / targetFPS

      const drawText = (now: number) => {
        if (!ctx) return

        // Limit frame rate
        if (now - lastFrameTime < frameInterval) {
          animationFrameRef.current = requestAnimationFrame(drawText)
          return
        }
        lastFrameTime = now

        // Clear canvas
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

        // Set text properties
        const fontSize = Math.min(window.innerWidth * 0.2, window.innerHeight * 0.4)
        ctx.font = `900 ${fontSize}px sans-serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Measure text
        const text = "Thru."
        const textMetrics = ctx.measureText(text)
        const textWidth = textMetrics.width
        const textHeight = fontSize

        // Create gradient based on mouse position
        const gradient = ctx.createLinearGradient(
          window.innerWidth / 2 - textWidth / 2,
          window.innerHeight / 2 - textHeight / 2,
          window.innerWidth / 2 + textWidth / 2,
          window.innerHeight / 2 + textHeight / 2,
        )

        // Rainbow colors
        gradient.addColorStop(0, "rgba(255, 0, 255, 1)")
        gradient.addColorStop(0.25, "rgba(0, 255, 255, 1)")
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 1)")
        gradient.addColorStop(0.75, "rgba(255, 255, 0, 1)")
        gradient.addColorStop(1, "rgba(255, 0, 0, 1)")

        // Draw text
        ctx.fillStyle = gradient
        ctx.fillText(text, window.innerWidth / 2, window.innerHeight / 2)

        animationFrameRef.current = requestAnimationFrame(drawText)
      }

      // Start animation
      animationFrameRef.current = requestAnimationFrame(drawText)

      // Handle window resize with throttling
      let resizeTimeout: number | null = null
      const handleResize = () => {
        if (resizeTimeout) window.clearTimeout(resizeTimeout)

        resizeTimeout = window.setTimeout(() => {
          resizeCanvas()
        }, 100)
      }
      window.addEventListener("resize", handleResize, { passive: true })

      // Store cleanup function
      threeCleanupRef.current = () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }

        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("resize", handleResize)
      }

      console.log("Simple canvas initialized successfully")
      setIsLoaded(true)
      initAttemptedRef.current = true
      return true
    } catch (error) {
      console.error("Error initializing simple canvas:", error)
      return false
    }
  }

  // Main initialization logic
  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = "hidden"

    // Try to initialize in sequence
    const initialize = async () => {
      // Try VFX-JS first
      if (renderMode === "vfx") {
        const vfxSuccess = await initVFX()
        if (!vfxSuccess) {
          console.log("VFX-JS failed, trying Three.js")
          setRenderMode("three")
          setRenderMode("three")
          return
        }
      }

      // Try Three.js if VFX-JS failed
      if (renderMode === "three") {
        const threeSuccess = initThree()
        if (!threeSuccess) {
          console.log("Three.js failed, trying simple canvas")
          setRenderMode("simple")
          return
        }
      }

      // Try simple canvas as last resort
      if (renderMode === "simple") {
        initSimple()
      }
    }

    initialize()

    // Cleanup function
    return () => {
      document.body.style.overflow = ""

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      if (threeCleanupRef.current) {
        threeCleanupRef.current()
        threeCleanupRef.current = null
      }
    }
  }, [renderMode])

  // Render the appropriate content based on the render mode
  const renderContent = () => {
    switch (renderMode) {
      case "vfx":
        return (
          <h1
            ref={h1Ref}
            className="text-white text-[20vw] font-black select-none relative z-10"
            style={{ margin: 0, lineHeight: 1, willChange: "transform, opacity" }}
          >
            Thru.
          </h1>
        )
      case "three":
        // Three.js renders to the container directly
        return null
      case "simple":
        return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-50 bg-black flex justify-center items-center cursor-pointer"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        onClick={onEnter}
      >
        {/* Original 3D Cube Animation Background */}
        <div className="wrapper">
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

        {/* Foreground Content */}
        {renderContent()}

        {isLoaded && (
          <motion.div
            className="absolute bottom-10 text-white text-sm opacity-50 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Click anywhere to enter
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default memo(UnifiedLanding)

