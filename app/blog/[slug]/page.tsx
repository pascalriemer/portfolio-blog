"use client"

import { getBlogPostBySlug, getRelatedBlogPosts } from "@/app/lib/blog-data"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react"
import ScrollAnimation from "@/app/components/micro-interactions/ScrollAnimation"
import { useEffect, useState } from "react"
import Header from "@/app/components/Header"
import type { BlogPost } from "@/app/lib/blog-data"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | undefined>(undefined)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const router = useRouter()

  useEffect(() => {
    // Get post data on client side
    const currentPost = getBlogPostBySlug(params.slug)

    if (!currentPost) {
      router.push("/404")
      return
    }

    setPost(currentPost)
    setRelatedPosts(getRelatedBlogPosts(currentPost.id, 2))

    // Update document title
    document.title = `${currentPost.title} | Pascal Riemer's Blog`
  }, [params.slug, router])

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tertiary"></div>
      </div>
    )
  }

  // Function to convert markdown headings to HTML
  const formatContent = (content: string) => {
    const formattedContent = content
      // Format headings
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-6">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold my-5">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold my-4">$1</h3>')
      // Format paragraphs
      .replace(/^(?!(#|```|<))(.*$)/gm, (match) => {
        if (match.trim() === "") return match
        return `<p class="my-4">${match}</p>`
      })
      // Format code blocks - fixed the multiline regex
      .replace(
        /```(.*?)\n([\s\S]*?)```/g,
        '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6 overflow-x-auto"><code>$2</code></pre>',
      )
      // Format inline code
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-gray-100 dark:bg-gray-800 p-1 rounded text-pink-500 dark:text-pink-300">$1</code>',
      )
      // Format lists
      .replace(/^- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-6 list-decimal">$2</li>')
      // Wrap lists - fixed the multiline regex
      .replace(/(<li.*<\/li>\n)+/g, '<ul class="my-4">$&</ul>')

    return formattedContent
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Blog post header */}
        <section className="bg-primary dark:bg-black text-quaternary dark:text-white pt-16 pb-20">
          <div className="container mx-auto px-6">
            <ScrollAnimation type="fade">
              <Link
                href="/blog"
                className="inline-flex items-center text-tertiary dark:text-gray-300 hover:text-quaternary dark:hover:text-white mb-6"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to all posts
              </Link>
            </ScrollAnimation>

            <ScrollAnimation type="slide-up" className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

              {/* Meta info */}
              <div className="flex flex-wrap items-center text-sm mb-8">
                <div className="flex items-center mr-6 mb-2">
                  <Calendar size={16} className="mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center mr-6 mb-2">
                  <Clock size={16} className="mr-2" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center mb-2">
                  <Tag size={16} className="mr-2" />
                  <span>{post.category}</span>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Blog post content */}
        <section className="py-16 bg-quaternary dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main content */}
              <ScrollAnimation type="fade" className="lg:w-2/3">
                {/* Featured image */}
                <div className="relative h-72 md:h-96 mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg?height=600&width=1200"}
                    alt={post.title}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                    priority
                  />
                </div>

                {/* Content */}
                <article className="prose prose-lg dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
                </article>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 text-primary dark:text-white">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-800 text-primary dark:text-white px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              {/* Sidebar */}
              <div className="lg:w-1/3">
                {/* Author info */}
                <ScrollAnimation type="slide-up" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-primary dark:text-white">About the Author</h3>
                  <div className="flex items-center mb-4">
                    <Image
                      src="/DSC04869.jpg"
                      alt="Pascal Riemer"
                      width={80}
                      height={80}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-medium text-primary dark:text-white">{post.author}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Tech, Fitness & Travel Enthusiast</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Hi, I'm Pascal Riemer, a tech-interested guy based in Berlin and Bamberg, Germany. Beyond my tech
                    hobbies, I'm passionate about fitness, travelling, vegan cooking, and enjoying time with friends.
                  </p>
                </ScrollAnimation>

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                  <ScrollAnimation
                    type="slide-up"
                    delay={0.1}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-primary dark:text-white">Related Posts</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group block">
                          <div className="flex items-start">
                            <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={relatedPost.image || "/placeholder.svg?height=80&width=80"}
                                alt={relatedPost.title}
                                className="object-cover"
                                fill
                                sizes="80px"
                              />
                            </div>
                            <div className="ml-4">
                              <h4 className="font-medium text-primary dark:text-white group-hover:text-tertiary dark:group-hover:text-gray-300 transition-colors">
                                {relatedPost.title}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {relatedPost.date} · {relatedPost.readTime} min read
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </ScrollAnimation>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

