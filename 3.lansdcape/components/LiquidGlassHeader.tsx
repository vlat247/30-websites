export default function LiquidGlassHeader() {
  return (
    <header 
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-8 py-3.5 text-stone-200 rounded-full w-[90%] max-w-4xl overflow-hidden transition-all duration-700 ease-out"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%)',
        backdropFilter: 'blur(35px) saturate(150%)',
        WebkitBackdropFilter: 'blur(35px) saturate(150%)',
        
        boxShadow: `
          inset 0 1px 1px rgba(255, 255, 255, 0.3), 
          inset 0 0 20px rgba(255, 255, 255, 0.05)
        `,
        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="relative font-medium text-base tracking-widest uppercase ml-2 drop-shadow-md z-10 text-white/90">
        King's Landing
      </div>
      
      <nav className="relative hidden md:flex gap-8 text-sm font-medium text-white/70 drop-shadow-md z-10">
        <a href="https://vlat247.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Portfolio</a>
        <a href="#" className="hover:text-white transition-colors duration-300">FAQ</a>
      </nav>
    </header>
  );
}
