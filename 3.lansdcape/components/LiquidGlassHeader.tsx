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
      {/* Ambient edge chromatic aberration & inner glow */}
      <div className="absolute inset-0 pointer-events-none rounded-full" style={{
        boxShadow: 'inset 0 0 1px 1px rgba(200, 220, 255, 0.05)',
        background: 'radial-gradient(150% 100% at 50% 100%, transparent 70%, rgba(200, 220, 255, 0.02) 80%, rgba(180, 200, 255, 0.1) 100%)'
      }}></div>

      {/* Clean Texture Overlay without SVG filter box clipping */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen" 
        style={{ 
          backgroundImage: `url("/shabby-texture.png")`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
        }}
      />

      <div className="relative font-medium text-base tracking-widest uppercase ml-2 drop-shadow-md z-10 text-white/90">
        Landscape
      </div>
      
      <nav className="relative hidden md:flex gap-8 text-sm font-medium text-white/70 drop-shadow-md z-10">
        <a href="#" className="hover:text-white transition-colors duration-300">Vision</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Tech</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Design</a>
      </nav>
    </header>
  );
}
