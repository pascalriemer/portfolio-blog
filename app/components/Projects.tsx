"use client"

import { memo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const projects = [
  {
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce solution for electronic products, featuring a modern UI and seamless shopping experience.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zqpHhsf81oPZVOdUA76ZWnojTvnpFN.png",
    tags: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    title: "Agency Website",
    description: "A dark-themed, modern agency website with dynamic animations and creative portfolio showcase.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XBQiY8S0RicSuHjJrGUi6RxTSeYqDd.png",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
  },
  {
    title: "Task Management App",
    description:
      "A minimal, intuitive task management mobile app with calendar integration and team collaboration features.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yWmQwH731Kf47Yedzhh115n7817YSJ.png",
    tags: ["React Native", "TypeScript", "Node.js"],
  },
]

// Memoized project card component
const ProjectCard = memo(({ project, index }: { project: (typeof projects)[0]; index: number }) => (
  <motion.div
    key={index}
    className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden dark:border dark:border-gray-700"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true, margin: "-100px" }}
  >
    <div className="relative h-48 md:h-64">
      <Image
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading={index < 2 ? "eager" : "lazy"}
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-primary dark:text-white">{project.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className="bg-tertiary dark:bg-white text-primary dark:text-black px-3 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
))

ProjectCard.displayName = "ProjectCard"

function Projects() {
  return (
    <section id="projects" className="py-20 bg-quaternary dark:bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-primary dark:text-white">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(Projects)

