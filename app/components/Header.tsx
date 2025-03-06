"use client"
import { useEffect, useState, useCallback } from "react"
import ThemeToggle from "./ThemeToggle"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Memoize the scroll handler for better performance
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, [])

  // Memoize the smooth scroll function
  const smoothScroll = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLAnchorElement
    if (target.hash && !target.pathname.includes("/blog")) {
      e.preventDefault()
      const element = document.querySelector(target.hash)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        })
        setMobileMenuOpen(false)
      }
    }
  }, [])

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => link.addEventListener("click", smoothScroll))

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      links.forEach((link) => link.removeEventListener("click", smoothScroll))
    }
  }, [handleScroll, smoothScroll])

  const navLinks = [
    { href: "/#hero", label: "Home" },
    { href: "/#projects", label: "Projects" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary dark:bg-black py-2 shadow-md" : "bg-primary/90 dark:bg-black/90 py-4"
      } text-quaternary dark:text-white`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            Pascal Riemer
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block flex-1">
          <ul className="flex justify-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="relative hover:text-tertiary dark:hover:text-gray-300 transition-colors py-2 px-1 group"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-tertiary dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="mr-4 text-quaternary dark:text-white hover:text-tertiary dark:hover:text-gray-300 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="ml-4">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"} absolute left-0 right-0 top-full bg-primary dark:bg-black shadow-lg`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, height: mobileMenuOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ul className="container mx-auto px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block py-2 hover:text-tertiary dark:hover:text-gray-300 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </header>
  )
}

