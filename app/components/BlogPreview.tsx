"use client"

import { getRecentBlogPosts } from "@/app/lib/blog-data"
import Link from "next/link"
import Image from "next/image"
import ScrollAnimation from "./micro-interactions/ScrollAnimation"
import Button from "./micro-interactions/Button"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import type { BlogPost } from "@/app/lib/blog-data"

export default function BlogPreview() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    // Get recent posts on client side
    setRecentPosts(getRecentBlogPosts(3))
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {recentPosts.map((post, index) => (
          <ScrollAnimation key={post.id} type="slide-up" delay={index * 0.1} className="h-full">
            <Link href={`/blog/${post.slug}`} className="group block h-full">
              <article className="bg-black/30 backdrop-blur-md rounded-lg shadow-lg overflow-hidden h-full transition-transform duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg?height=400&width=600"}
                    alt={post.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-tertiary dark:group-hover:text-gray-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white mb-4">{post.excerpt}</p>
                  <div className="text-sm text-white/70">
                    {post.date} · {post.readTime} min read
                  </div>
                </div>
              </article>
            </Link>
          </ScrollAnimation>
        ))}
      </div>

      <div className="text-center">
        <ScrollAnimation type="slide-up">
          <Link href="/blog">
            <Button variant="primary" icon={<ArrowRight size={18} />}>
              View All Articles
            </Button>
          </Link>
        </ScrollAnimation>
      </div>
    </>
  )
}

