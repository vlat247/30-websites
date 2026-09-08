export default function ContactButton() {
  return (
    <a 
      href="mailto:voddoo247@gmail.com"
      className="group fixed top-6 right-6 md:right-12 z-50 px-6 py-3.5 text-sm font-medium text-stone-200 rounded-full transition-all duration-300 hover:text-white hover:scale-105 active:scale-95 overflow-hidden"
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
      <span className="relative z-10 drop-shadow-md transition-all duration-300 group-hover:tracking-wider">Contact us</span>
    </a>
  );
}
