"use client"

import type React from "react"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"
import Button from "./micro-interactions/Button"
import ScrollAnimation from "./micro-interactions/ScrollAnimation"
import LoadingAnimation from "./micro-interactions/LoadingAnimation"
import FeedbackAnimation from "./micro-interactions/FeedbackAnimation"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | "info" | null; message: string | null }>({
    type: null,
    message: null,
  })

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email"
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        const data = await response.json()

        if (response.ok) {
          setIsSubmitted(true)
          setFeedback({
            type: "success",
            message: "Your message has been sent successfully!",
          })

          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          })

          // Reset success message after 5 seconds
          setTimeout(() => {
            setIsSubmitted(false)
          }, 5000)
        } else {
          throw new Error(data.error || "Failed to send message")
        }
      } catch (error) {
        setFeedback({
          type: "error",
          message: (error as Error).message || "Failed to send message. Please try again later.",
        })

        // Clear error message after 5 seconds
        setTimeout(() => {
          setFeedback({
            type: null,
            message: null,
          })
        }, 5000)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setFeedback({
        type: "error",
        message: "Please fix the errors in the form",
      })

      // Clear error message after 5 seconds
      setTimeout(() => {
        setFeedback({
          type: null,
          message: null,
        })
      }, 5000)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <FeedbackAnimation
        type={feedback.type}
        message={feedback.message}
        onDismiss={() => setFeedback({ type: null, message: null })}
      />

      {isSubmitted ? (
        <ScrollAnimation type="scale" className="bg-black/30 backdrop-blur-md rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
          <p className="text-white">Thank you for reaching out. I'll get back to you as soon as possible.</p>
        </ScrollAnimation>
      ) : (
        <ScrollAnimation type="slide-up">
          <form onSubmit={handleSubmit} className="bg-black/30 backdrop-blur-md rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-white bg-white/10 backdrop-blur-sm text-white transition-colors ${errors.name ? "border-red-500" : "border-gray-300/50"}`}
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500 animate-pulse">{errors.name}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-white bg-white/10 backdrop-blur-sm text-white transition-colors ${errors.email ? "border-red-500" : "border-gray-300/50"}`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500 animate-pulse">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-white mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-white bg-white/10 backdrop-blur-sm text-white transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-white bg-white/10 backdrop-blur-sm text-white transition-colors ${errors.message ? "border-red-500" : "border-gray-300/50"}`}
                placeholder="Your message here..."
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-500 animate-pulse">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              icon={isSubmitting ? <LoadingAnimation size="sm" color="white" /> : <Send size={18} />}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </ScrollAnimation>
      )}
    </div>
  )
}

