import { getAllBlogPosts } from "@/app/lib/blog-data"
import Link from "next/link"
import Image from "next/image"
import ScrollAnimation from "@/app/components/micro-interactions/ScrollAnimation"
import { Calendar, Clock } from "lucide-react"
import Header from "@/app/components/Header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Pascal Riemer - Tech Hobbyist",
  description: "Read articles about my tech hobbies including self-hosting experiments, open source projects, and other tech topics by Pascal Riemer.",
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Blog header */}
        <section className="bg-primary dark:bg-black text-quaternary dark:text-white py-20">
          <ScrollAnimation type="fade" className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Thoughts, ideas, and insights about web development, design, and technology.
            </p>
          </ScrollAnimation>
        </section>

        {/* Blog posts */}
        <section className="py-16 bg-quaternary dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <ScrollAnimation key={post.id} type="slide-up" delay={index * 0.1} className="h-full">
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg?height=400&width=600"}
                          alt={post.title}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        {/* Category */}
                        <div className="mb-3">
                          <span className="inline-block bg-tertiary dark:bg-white text-primary dark:text-black px-3 py-1 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold mb-3 text-primary dark:text-white group-hover:text-tertiary dark:group-hover:text-gray-300 transition-colors">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>

                        {/* Meta info */}
                        <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
                          <div className="flex items-center mr-4">
                            <Calendar size={14} className="mr-1" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span>{post.readTime} min read</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

