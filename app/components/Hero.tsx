import Image from "next/image"

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-primary dark:bg-black text-quaternary dark:text-white pt-20"
    >
      <div className="container mx-auto px-6 py-24 md:flex md:items-center">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Pascal Riemer</h1>
          <h2 className="text-2xl md:text-3xl mb-6">Welcome to my page!</h2>
          <p className="text-lg mb-8">I'm passionate about tech, healthy living, travelling, photography and cooking. Based in Berlin & Bamberg, Germany.</p>
          <a
            href="#projects"
            className="bg-tertiary dark:bg-white text-primary dark:text-black px-6 py-3 rounded-full font-semibold hover:bg-secondary dark:hover:bg-gray-200 transition-colors"
          >
            Explore My Interests
          </a>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0">
          <div className="relative w-[400px] h-[400px] mx-auto">
            <Image
              src="/DSC04869.jpg"
              alt="Pascal Riemer"
              width={400}
              height={400}
              className="rounded-lg object-cover dark:border-2 dark:border-white"
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

