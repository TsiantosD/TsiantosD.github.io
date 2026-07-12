import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { ArrowUpRightIcon } from 'lucide-react';

const navLinks = [
  { href: '/#overview', label: 'Overview' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#timeline', label: 'Timeline' },
  { href: '/#tools', label: 'Tools' },
  { href: '/#contact', label: 'Contact' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/88 text-white shadow-lg shadow-slate-950/20 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(45,212,191,0.16),transparent_28%),radial-gradient(circle_at_82%_0%,rgba(59,130,246,0.12),transparent_24%)]" />
      <div className="relative mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <a href="/" className="group inline-flex items-center gap-3 font-black tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-emerald-300/40 bg-emerald-300 text-sm text-slate-950 shadow-lg shadow-emerald-950/30 transition group-hover:scale-105">
            DT
          </span>
          <span className="hidden text-lg sm:inline">tsiantosd.tech</span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-800 bg-slate-900/70 p-1 text-sm font-bold text-slate-300 shadow-inner md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 transition hover:bg-emerald-300 hover:text-slate-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="flex items-center gap-2">
          <a
            href="https://www.linkedin.com/in/tsiantosd/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/70 text-lg text-slate-200 transition hover:border-emerald-300 hover:bg-emerald-300 hover:text-slate-950"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://github.com/TsiantosD/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/70 text-lg text-slate-200 transition hover:border-emerald-300 hover:bg-emerald-300 hover:text-slate-950"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="/#contact"
            className="hidden items-center gap-1 rounded-2xl border border-emerald-300/50 bg-emerald-300 px-3 py-2 text-sm font-black text-slate-950 shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-200 lg:inline-flex"
          >
            Contact <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}
