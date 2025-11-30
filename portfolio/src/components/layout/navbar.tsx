import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">

        {/* Left side: site name */}
        <span className="font-semibold text-lg">tsiantosd.tech</span>

        {/* Social icons – still visible on all sizes */}
        <nav className="flex items-center space-x-4 text-xl">
          <a
            href="https://www.linkedin.com/in/tsiantosd/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://github.com/TsiantosD/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </nav>

        {/* Full nav links – hidden on mobile, visible on md+ */}
        <nav className="hidden md:flex space-x-6 text-sm">
          <a href="#about" className="hover:opacity-75">About me</a>
          <a href="#timeline" className="hover:opacity-75">Timeline</a>
          <a href="#projects" className="hover:opacity-75">Projects</a>
          <a href="#contact" className="hover:opacity-75">Contact</a>
        </nav>
      </div>
    </header>
  );
}
