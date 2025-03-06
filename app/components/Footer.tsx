export default function Footer() {
  return (
    <footer className="bg-primary dark:bg-black text-quaternary dark:text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Pascal Riemer. All rights reserved.</p>
        <div className="mt-4">
          <a
            href="https://github.com/pascalriemer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-quaternary dark:text-white hover:text-tertiary dark:hover:text-gray-300 mr-4"
          >
            GitHub
          </a>
          <a
            href="https://github.com/pascalriemer/portfolio-blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-quaternary dark:text-white hover:text-tertiary dark:hover:text-gray-300"
          >
            Source
          </a>
        </div>
      </div>
    </footer>
  )
}

