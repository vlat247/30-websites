import { Download, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-[url('/image.png')] bg-cover bg-center bg-no-repeat text-white overflow-hidden relative">
      {/* Vignette Overlay at Top */}
      <div className="absolute top-0 left-0 w-full h-[70vh] bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="w-full flex items-center justify-between px-16 md:px-24 py-6 z-10 relative">
        <div className="text-xl">grace</div>
        <div className="hidden md:flex items-center gap-8 text-white/80">
          <a href="#" className="hover:text-white transition-colors">Models</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">Enterprise</a>
        </div>
        <div className="text-white/80 hover:text-white transition-colors cursor-pointer">
          Contact us
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-start mt-20 px-8 z-10 relative">
        <div className="w-full max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight mb-12">
            AI agent<br />that really works.
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="flex items-center gap-2 bg-[#e8e8e8] text-black px-6 py-3 rounded-full hover:bg-white transition-colors text-sm font-medium">
              Download for macOS
              <Download size={16} />
            </button>
            <button className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-full hover:bg-black/60 transition-colors text-sm font-medium">
              Request a demo
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Mock Window */}
        <div className="mt-20 w-full max-w-4xl border border-white/20 rounded-3xl bg-white/10 backdrop-blur-xl p-4 md:p-8 shadow-2xl">
          <div className="w-full bg-[#1e1e1e]/90 rounded-xl overflow-hidden font-mono text-sm border border-white/5">
            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs text-white/50">cursor-agent</div>
              <div className="text-xs text-white/50">Get CLI</div>
            </div>
            
            <div className="p-6 text-white/80 space-y-6">
              <div>
                <div className="text-white/40 mb-1">Question</div>
                <div>What data should the mission control display?</div>
                <div className="mt-2 pl-4 text-white/60">
                  <div>[x] Real-time metrics</div>
                  <div>[ ] System status</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <span className="text-white/60">Analyzed scope <span className="text-white/30">2s</span></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <span>Started 3 agents</span>
                  </div>
                  <div className="pl-6 mt-2 space-y-1 text-white/60">
                    <div>○ Health · Moving to cloud</div>
                    <div>○ Deployments · Moving to cloud</div>
                    <div>○ Incidents · Moving to cloud</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-white/40 flex items-center gap-2">
                <ArrowRight size={14} />
                Ask, plan, build anything
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Footer */}
      <div className="w-full bg-black py-3 overflow-hidden border-t border-white/10 mt-12 relative z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(20).fill("grace! ").map((text, i) => (
            <span key={i} className="text-2xl font-light px-4 shrink-0">
              {text}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {Array(20).fill("grace! ").map((text, i) => (
            <span key={i + 20} className="text-2xl font-light px-4 shrink-0">
              {text}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
