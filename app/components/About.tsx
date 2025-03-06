import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="py-20 bg-primary dark:bg-black text-quaternary dark:text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
        <div className="md:flex md:items-center md:space-x-12">
          <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <Image
                src="/DSC04869.jpg"
                alt="Pascal Riemer"
                fill
                className="rounded-lg object-cover dark:border-2 dark:border-white"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <p className="mb-4">
              Hi, I'm Pascal Riemer, a tech-interested guy based in Berlin and Bamberg, Germany who enjoys tinkering
              with self-hosting solutions and open source projects in his free time.
            </p>
            <p className="mb-4">
              As a hobby, I like to explore innovative (preferrably open source) technologies, especially setting up
              self-hosted applications at home. I find it fun to learn about system administration, networking, and
              dabble with code while maintaining my personal digital services.
            </p>
            <p className="mb-4">Beyond tech, I'm passionate about healthy living and Hertha BSC.</p>
            <p>
              When I'm not engaged with my various hobbies, you'll find me hanging out with friends and family, whether
              that's sharing a meal, enjoying outdoor activities, or just catching up over coffee.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

