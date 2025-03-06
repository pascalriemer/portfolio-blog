export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  tags: string[]
  image: string
  readTime: number
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Responsive UIs with Tailwind CSS",
    slug: "building-responsive-uis-with-tailwind-css",
    excerpt: "Learn how to create beautiful, responsive user interfaces quickly and efficiently using Tailwind CSS.",
    content: `
# Building Responsive UIs with Tailwind CSS

When it comes to building modern web applications, responsive design isn't just a nice-to-have—it's essential. With the vast array of devices people use to access the web, from smartphones to ultra-wide monitors, your websites need to look great on all of them.

## Why Tailwind CSS?

Tailwind CSS has revolutionized the way developers approach styling. Instead of defining styles in separate CSS files, Tailwind embraces utility-first CSS, allowing you to build complex designs directly in your markup.

Here are some key advantages:

1. **Speed of development**: With Tailwind, you can rapidly build interfaces without writing custom CSS.
2. **Consistency**: Tailwind's predefined design system ensures consistency across your project.
3. **Customization**: Despite being a framework, Tailwind is highly customizable to match your brand's aesthetic.
4. **Responsive design made easy**: Tailwind's responsive modifiers make it simple to create layouts that work across all device sizes.

## Getting Started with Responsive Design in Tailwind

Tailwind uses a mobile-first approach to responsive design. This means that unprefixed utilities (like \`w-full\`) apply to all screen sizes, while prefixed utilities (like \`md:w-1/2\`) apply at the specified breakpoint and above.

Here's a simple example of a responsive layout:

\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-white p-4 shadow rounded">
    <!-- Card content -->
  </div>
  <!-- More cards... -->
</div>
\`\`\`

This grid will display:
- One column on mobile devices
- Two columns on medium-sized screens (768px and above)
- Three columns on large screens (1024px and above)

## Advanced Responsive Techniques

### Container Queries

While Tailwind primarily uses viewport-based responsive design, modern web development sometimes requires container queries for more granular control.

### Responsive Typography

Tailwind makes it easy to adjust text sizes based on screen size:

\`\`\`html
<h1 class="text-2xl md:text-4xl lg:text-6xl">Responsive Heading</h1>
\`\`\`

### Handling Images Responsively

Images often need special treatment to ensure they look good on all devices:

\`\`\`html
<img 
  src="/path/to/image.jpg" 
  alt="Description" 
  class="w-full h-auto object-cover"
/>
\`\`\`

## Conclusion

Tailwind CSS provides an excellent framework for building responsive UIs without the headache of writing custom media queries for every component. By leveraging its utility classes and responsive modifiers, you can create websites that look great on any device with minimal effort.

In the next post, we'll explore how to combine Tailwind with React components for even more powerful UI development.
    `,
    author: "Pascal Riemer",
    date: "March 3, 2025",
    category: "Web Development",
    tags: ["CSS", "Tailwind", "Responsive Design", "Frontend"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zqpHhsf81oPZVOdUA76ZWnojTvnpFN.png",
    readTime: 5,
  },
  {
    id: "2",
    title: "The Future of Web Development with Next.js",
    slug: "the-future-of-web-development-with-nextjs",
    excerpt:
      "Explore how Next.js is changing the landscape of web development with its powerful features and optimizations.",
    content: `
# The Future of Web Development with Next.js

Next.js has rapidly become one of the most popular frameworks for building modern web applications. By combining the best of React with powerful server-side capabilities, Next.js offers developers a comprehensive solution for creating fast, SEO-friendly, and user-friendly websites.

## Why Next.js Is Gaining Popularity

Next.js addresses many of the challenges developers face when building React applications:

1. **Server-Side Rendering (SSR)**: Next.js can render pages on the server before sending them to the client, improving performance and SEO.
2. **Static Site Generation (SSG)**: Pages can be generated at build time, resulting in blazing-fast load times.
3. **Automatic Code Splitting**: Only the JavaScript needed for each page is loaded, improving performance.
4. **Built-in API Routes**: Create API endpoints as part of your Next.js application.
5. **File-Based Routing**: Simple and intuitive routing based on the file system.

## The App Router: A Game-Changer

With the introduction of the App Router, Next.js has taken a significant step forward in simplifying and enhancing the development experience. Some key features include:

### React Server Components

Server Components allow you to render components on the server, reducing the JavaScript sent to the client and improving performance.

\`\`\`jsx
// A server component
export default async function ProductList() {
  const products = await getProducts();
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

### Streaming

Next.js now supports streaming, allowing parts of your page to be sent to the client as they're generated, rather than waiting for the entire page to be ready.

### Simplified Data Fetching

Data fetching in the App Router is more straightforward and powerful:

\`\`\`jsx
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  
  return <div>{data.message}</div>;
}
\`\`\`

## Building Modern Applications with Next.js

### Performance Optimization

Next.js includes many built-in optimizations:

- **Image Optimization**: The \`next/image\` component automatically optimizes images for different devices.
- **Font Optimization**: Next.js automatically optimizes font loading to prevent layout shift.
- **Script Optimization**: Control how third-party scripts are loaded.

### Styling Options

Next.js supports various styling approaches:

- CSS Modules
- Styled Components
- Tailwind CSS
- Global CSS

### Deployment and Scaling

Platforms like Vercel make deploying Next.js applications simple, with features like:

- Automatic preview deployments
- Edge functions
- Global CDN
- Analytics

## Conclusion

Next.js represents the future of web development by providing a comprehensive framework that addresses the challenges of building modern web applications. Its focus on performance, developer experience, and scalability makes it an excellent choice for projects of all sizes.

In my next post, I'll dive deeper into using Next.js with Tailwind CSS to create beautiful, performant user interfaces.
    `,
    author: "Pascal Riemer",
    date: "February 25, 2025",
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript", "Frontend"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XBQiY8S0RicSuHjJrGUi6RxTSeYqDd.png",
    readTime: 7,
  },
  {
    id: "3",
    title: "Designing Effective User Experiences",
    slug: "designing-effective-user-experiences",
    excerpt: "Discover key principles for creating user experiences that are both beautiful and functional.",
    content: `
# Designing Effective User Experiences

In today's digital landscape, a well-designed user experience (UX) can be the difference between a successful product and one that users abandon after the first interaction. Good UX design isn't just about aesthetics—it's about creating products that are intuitive, accessible, and enjoyable to use.

## Understanding UX Design

UX design encompasses all aspects of a user's interaction with a product, from the initial impression to the completion of tasks and the emotional response it evokes. It's a multidisciplinary field that combines elements of:

- User research
- Information architecture
- Interaction design
- Visual design
- Usability testing

## Key Principles for Effective UX Design

### 1. Know Your Users

The foundation of effective UX design is a deep understanding of your users—their needs, goals, behaviors, and pain points. This understanding comes from:

- User interviews
- Surveys
- Analytics
- Usability testing
- Creating user personas

Remember, you are not your user. What seems obvious to you might not be to your audience.

### 2. Design for Hierarchy and Flow

Users should instinctively know where to look and what to do next. This requires:

- Clear visual hierarchy
- Logical information architecture
- Intuitive navigation
- Consistent patterns

A well-designed interface guides users through a journey, not a maze.

### 3. Simplify Whenever Possible

As Leonardo da Vinci said, "Simplicity is the ultimate sophistication." In UX design:

- Remove unnecessary elements
- Break complex tasks into manageable steps
- Use progressive disclosure to reveal information as needed
- Focus on the essential

### 4. Provide Clear Feedback

Users need to know that their actions have been registered and what the result was:

- Button state changes
- Loading indicators
- Success/error messages
- Animated transitions

Good feedback reduces uncertainty and builds confidence.

### 5. Design for Accessibility

Inclusive design ensures your product works for everyone:

- Color contrast for visibility
- Keyboard navigation
- Screen reader compatibility
- Responsive design for different devices
- Alternative text for images

Accessibility isn't just a moral imperative—it's often a legal requirement and expands your potential user base.

## The UX Design Process

An effective UX design process typically follows these steps:

1. **Research**: Understand the problem space and user needs
2. **Define**: Establish goals and requirements
3. **Ideate**: Generate potential solutions
4. **Prototype**: Create interactive models
5. **Test**: Validate with real users
6. **Implement**: Build the solution
7. **Evaluate**: Measure success and gather feedback

This process is iterative—each round of testing provides insights that inform the next iteration.

## Balancing Aesthetics and Functionality

A common misconception is that UX is solely about making things easy to use, while UI (User Interface) design handles aesthetics. In reality, both are integral parts of the user experience:

- **Aesthetics** create emotional connections and first impressions
- **Functionality** ensures tasks can be completed efficiently

The most successful designs achieve both beauty and usability.

## Conclusion

Effective UX design is centered on empathy—putting yourself in the user's shoes and designing solutions that address their needs. By following core principles and a structured design process, you can create digital experiences that users find valuable, accessible, and enjoyable.

In my next post, I'll explore how to conduct effective usability testing to validate your UX design decisions.
    `,
    author: "Pascal Riemer",
    date: "February 10, 2025",
    category: "Design",
    tags: ["UX Design", "UI Design", "User Research", "Design Principles"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yWmQwH731Kf47Yedzhh115n7817YSJ.png",
    readTime: 6,
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getRecentBlogPosts(count = 3): BlogPost[] {
  return getAllBlogPosts().slice(0, count)
}

export function getRelatedBlogPosts(currentPostId: string, count = 2): BlogPost[] {
  const currentPost = blogPosts.find((post) => post.id === currentPostId)
  if (!currentPost) return []

  return blogPosts
    .filter((post) => post.id !== currentPostId)
    .sort((a, b) => {
      // Count matching tags
      const aMatchingTags = a.tags.filter((tag) => currentPost.tags.includes(tag)).length
      const bMatchingTags = b.tags.filter((tag) => currentPost.tags.includes(tag)).length

      if (aMatchingTags !== bMatchingTags) {
        return bMatchingTags - aMatchingTags
      }

      // If same number of matching tags, sort by date
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, count)
}

