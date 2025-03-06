"use client"

import { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import About from "./components/About"
import Footer from "./components/Footer"
import { AnimatePresence, motion } from "framer-motion"
import CubeBackground from "./components/CubeBackground"
import ScrollAnimation from "./components/ScrollAnimation"

// Lazy load components with no SSR to ensure client-side only rendering
const UnifiedLanding = dynamic(() => import("./components/UnifiedLanding"), { ssr: false })
const ContactForm = dynamic(() => import("./components/ContactForm"), { ssr: false })
const BlogPreview = dynamic(() => import("./components/BlogPreview"), { ssr: false })

// Loading fallbacks
const LoadingFallback = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tertiary"></div>
  </div>
)

export default function Home() {
  const [showLanding, setShowLanding] = useState(false)
  const [mainContentVisible, setMainContentVisible] = useState(false)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisitedBefore = sessionStorage.getItem("hasVisitedBefore")

    if (!hasVisitedBefore) {
      // First visit - show landing page
      setShowLanding(true)
      sessionStorage.setItem("hasVisitedBefore", "true")
    } else {
      // Returning visit - skip landing page
      setMainContentVisible(true)
    }
  }, [])

  const handleEnter = () => {
    setShowLanding(false)
    setTimeout(() => {
      setMainContentVisible(true)
    }, 300)
  }

  return (
    <>
      {showLanding && (
        <Suspense fallback={<LoadingFallback />}>
          <UnifiedLanding onEnter={handleEnter} />
        </Suspense>
      )}

      <AnimatePresence>
        {mainContentVisible && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Header />
            <main>
              <Hero />
              <Projects />
              <About />

              {/* Combined section for BlogPreview and ContactForm */}
              <section className="relative">
                <CubeBackground scale={1.2} speed={0.5} scrollRotate={true} />
                <div className="relative z-10">
                  <div className="container mx-auto px-6">
                    {/* Blog Preview Content */}
                    <div className="pb-20">
                      <ScrollAnimation type="fade">
                        <div className="flex flex-col items-center text-center mb-12">
                          <h2 className="inline-block text-3xl font-bold mb-4 text-white bg-black/30 backdrop-blur-md px-8 py-4">
                            Latest Articles
                          </h2>
                          <p className="inline-block text-white max-w-2xl mx-auto bg-black/30 backdrop-blur-md px-6 py-3 mt-2">
                            Thoughts and insights.
                          </p>
                        </div>
                      </ScrollAnimation>
                      <Suspense fallback={<LoadingFallback />}>
                        <BlogPreview />
                      </Suspense>
                    </div>

                    {/* Contact Form Content */}
                    <div id="contact" className="pt-0">
                      <ScrollAnimation type="fade">
                        <div className="flex flex-col items-center text-center mb-12">
                          <h2 className="inline-block text-3xl font-bold mb-4 text-white bg-black/30 backdrop-blur-md px-8 py-4">
                            Get In Touch
                          </h2>
                          <p className="inline-block text-white max-w-2xl mx-auto bg-black/30 backdrop-blur-md px-6 py-3 mt-2">
                            I'll always have an open ear for you.
                          </p>
                        </div>
                      </ScrollAnimation>
                      <Suspense fallback={<LoadingFallback />}>
                        <ContactForm />
                      </Suspense>
                    </div>
                  </div>
                </div>
              </section>
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

