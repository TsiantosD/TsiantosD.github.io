export function Navbar() {
  return (
    <header className="border-b sticky top-0 z-50 bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <span className="font-semibold text-lg">My Portfolio</span>

        <nav className="space-x-6 text-sm">
          <a href="#home" className="hover:opacity-75">Home</a>
          <a href="#timeline" className="hover:opacity-75">Timeline</a>
          <a href="#projects" className="hover:opacity-75">Projects</a>
        </nav>
      </div>
    </header>
  );
}
