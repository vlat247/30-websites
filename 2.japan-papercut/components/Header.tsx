import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 sm:p-10 pointer-events-none">
      <div className="pointer-events-auto">
        <Link
          href="/"
          className="text-white text-xs sm:text-sm font-light tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
        >
          Japan Tales
        </Link>
      </div>

      <nav className="flex gap-6 sm:gap-12 pointer-events-auto">
        <Link
          href="#explore"
          className="text-white text-xs sm:text-sm font-light tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
        >
          Explore
        </Link>
        <Link
          href="#about"
          className="text-white text-xs sm:text-sm font-light tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
        >
          About
        </Link>
      </nav>
    </header>
  );
}
