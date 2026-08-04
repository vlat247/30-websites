export default function LiquidGlassHeader() {
  return (
    <header 
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-8 py-3.5 text-stone-200 rounded-full w-[90%] max-w-4xl overflow-hidden transition-all duration-700 ease-out"
      style={{
        background: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(30px) saturate(120%)',
        WebkitBackdropFilter: 'blur(30px) saturate(120%)',
        
        boxShadow: `
          inset 0 1px 1px rgba(255, 255, 255, 0.2), 
          inset 0 0 20px rgba(255, 255, 255, 0.05), 
          inset 0 -8px 24px rgba(255, 255, 255, 0.05),
          inset 0 8px 24px rgba(255, 255, 255, 0.05)
        `,
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="relative font-medium text-base tracking-widest uppercase ml-2 drop-shadow-md z-10 text-white/90">
        King's Landing
      </div>
      
      <nav className="relative hidden md:flex gap-8 text-sm font-medium text-white/70 drop-shadow-md z-10">
        <a href="#" className="hover:text-white transition-colors duration-300">Vision</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Tech</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Design</a>
      </nav>
    </header>
  );
}
