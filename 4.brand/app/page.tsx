"use client";

import { Download, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";
const randomChar = () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

function Marquee() {
  const [displayTexts, setDisplayTexts] = useState<string[]>(Array(20).fill("grace! "));

  useEffect(() => {
    const timers = Array(20).fill(null).map((_, i) => {
      let timeoutId: NodeJS.Timeout;
      const text = "grace! ";
      
      const triggerScramble = () => {
        let iteration = 0;
        const maxIterations = 12;
        
        const runFrame = () => {
          setDisplayTexts((prev) => {
            const next = [...prev];
            const resolveChance = iteration / maxIterations;
            next[i] = text.split("").map((char, index) => {
              if (char === " ") return " ";
              return Math.random() < resolveChance ? text[index] : randomChar();
            }).join("");
            return next;
          });
          
          if (iteration < maxIterations) {
            iteration++;
            timeoutId = setTimeout(runFrame, 40);
          } else {
            setDisplayTexts((prev) => {
              const next = [...prev];
              next[i] = text;
              return next;
            });
            timeoutId = setTimeout(triggerScramble, Math.random() * 4000 + 1000);
          }
        };
        
        runFrame();
      };

      timeoutId = setTimeout(triggerScramble, Math.random() * 3000 + 500);
      return () => clearTimeout(timeoutId);
    });

    return () => timers.forEach((cleanup) => cleanup());
  }, []);

  const renderWords = (offset = 0) => displayTexts.map((text, i) => {
    const fontClass = i % 3 === 0 ? "font-mono" : i % 3 === 1 ? "font-sans tracking-wide" : "font-serif italic";
    return (
      <span key={i + offset} className={`text-2xl font-light shrink-0 w-[120px] text-center inline-block ${fontClass}`}>
        {text}
      </span>
    );
  });

  return (
    <div className="w-full bg-black py-3 overflow-hidden border-t border-white/10 mt-12 relative z-20">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {renderWords(0)}
        {renderWords(20)}
      </div>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeWindow, setActiveWindow] = useState<'terminal' | 'dashboard'>('dashboard');
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [cursorBlink, setCursorBlink] = useState(true);

  useEffect(() => {
    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setCursorBlink((b) => !b);
    }, 500);

    const codeSnippet = [
      "import numpy as np",
      "from grace import Agent",
      "",
      "> initializing GraceAgent(strategy='alpha_v1')...",
      "agent = Agent()",
      "agent.connect_to_exchange('NASDAQ')",
      "",
      "def on_tick(data):",
      "    signal = agent.predict(data)",
      "    if signal.confidence > 0.85:",
      "        agent.execute_order('BUY', qty=100)",
      "        print(f'Trade filled at {data.price}')",
      "",
      "agent.start_stream(on_tick)",
      "> Analyzing market microstructure...",
      "> Identified liquidity imbalance.",
      "> Executing high-frequency block trade...",
      "> Success: +14.2% yield realized."
    ];
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setCodeLines(prev => {
        if (currentIndex >= codeSnippet.length) {
          currentIndex = 0;
          return [];
        }
        const next = [...prev, codeSnippet[currentIndex]];
        currentIndex++;
        if (next.length > 14) return next.slice(next.length - 14);
        return next;
      });
    }, 600);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <main 
      className="min-h-screen w-full flex flex-col bg-[url('/image.png')] bg-cover bg-center bg-no-repeat text-white overflow-hidden relative"
    >
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
      <div className="flex-1 flex flex-col items-center justify-start mt-20 px-8 z-10 relative w-full h-full">
        <div className="w-full max-w-5xl pointer-events-auto">
          <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight mb-6">
            AI agent<br />that really works.
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-12 font-light leading-relaxed">
            Grace operates autonomously on your behalf. Deploy sophisticated quantitative trading algorithms instantly—our agent writes the code, analyzes real-time market microstructure, and executes block trades with unparalleled precision.
          </p>
          
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

        {/* Mock Window Container (Fixed) */}
        <div 
          ref={containerRef}
          className="mt-20 w-full max-w-5xl h-[500px] md:h-[600px] border border-white/20 rounded-3xl bg-white/10 backdrop-blur-xl p-4 md:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Dashboard Window (Draggable) */}
          <motion.div 
            drag
            dragConstraints={containerRef}
            dragElastic={0}
            dragMomentum={false}
            onPointerDown={() => setActiveWindow('dashboard')}
            style={{ zIndex: activeWindow === 'dashboard' ? 20 : 10 }}
            whileDrag={{ scale: 1.02, cursor: "grabbing" }}
            className="w-[90%] max-w-xl absolute top-[5%] md:top-[10%] left-[10%] md:left-[35%] bg-[#1c1c1e]/95 backdrop-blur-3xl rounded-xl overflow-hidden font-sans text-sm border border-white/10 cursor-grab active:cursor-grabbing shadow-2xl flex flex-col ring-1 ring-black/50"
          >
            {/* Mac Window Header */}
            <div className="flex items-center px-4 py-3 border-b border-white/10 bg-[#2d2d2d]/50 relative">
              <div className="flex gap-2 absolute left-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
              </div>
              <div className="font-medium text-white/80 text-xs w-full text-center">Grace Quant Analytics</div>
            </div>
            
            <div className="p-5 flex flex-col gap-5">
              {/* Top Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-white/40 text-xs font-medium">Net Portfolio</div>
                  <div className="text-xl font-medium tracking-tight text-white/90">$45,231.00</div>
                  <div className="text-emerald-400 text-xs font-medium">+14.2% YTD</div>
                </div>
                <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-white/40 text-xs font-medium">Sharpe Ratio</div>
                  <div className="text-xl font-medium tracking-tight text-white/90">2.41</div>
                  <div className="text-emerald-400 text-xs font-medium">Optimal</div>
                </div>
                <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-white/40 text-xs font-medium">Max Drawdown</div>
                  <div className="text-xl font-medium tracking-tight text-white/90">-4.2%</div>
                  <div className="text-emerald-400 text-xs font-medium">Controlled</div>
                </div>
              </div>

              {/* Data Table */}
              <div className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
                <div className="grid grid-cols-4 px-4 py-2 text-xs font-medium text-white/40 border-b border-white/10 bg-white/[0.02]">
                  <div>Asset</div>
                  <div className="text-right">Position</div>
                  <div className="text-right">Entry</div>
                  <div className="text-right">Unrealized P&L</div>
                </div>
                <div className="flex flex-col divide-y divide-white/5">
                  <div className="grid grid-cols-4 px-4 py-2.5 text-xs">
                    <div className="font-medium text-white/90">AAPL</div>
                    <div className="text-right text-white/70">Long 140</div>
                    <div className="text-right text-white/70">$172.40</div>
                    <div className="text-right text-emerald-400">+$2,450.00</div>
                  </div>
                  <div className="grid grid-cols-4 px-4 py-2.5 text-xs">
                    <div className="font-medium text-white/90">MSFT</div>
                    <div className="text-right text-white/70">Short 50</div>
                    <div className="text-right text-white/70">$412.10</div>
                    <div className="text-right text-red-400">-$420.50</div>
                  </div>
                  <div className="grid grid-cols-4 px-4 py-2.5 text-xs">
                    <div className="font-medium text-white/90">NVDA</div>
                    <div className="text-right text-white/70">Long 85</div>
                    <div className="text-right text-white/70">$118.20</div>
                    <div className="text-right text-emerald-400">+$4,120.25</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-[11px] font-medium text-white/40 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  Live Execution Active
                </div>
                <div>Last updated: Just now</div>
              </div>
            </div>
          </motion.div>

          {/* Inner Terminal (Draggable) */}
          <motion.div 
            drag
            dragConstraints={containerRef}
            dragElastic={0}
            dragMomentum={false}
            onPointerDown={() => setActiveWindow('terminal')}
            style={{ zIndex: activeWindow === 'terminal' ? 20 : 10 }}
            whileDrag={{ scale: 1.02, cursor: "grabbing" }}
            className="w-[90%] max-w-2xl absolute top-[25%] left-[5%] bg-[#1e1e1e]/95 backdrop-blur-xl rounded-xl overflow-hidden font-mono text-sm border border-white/10 cursor-grab active:cursor-grabbing shadow-2xl"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs text-white/50">grace-agent</div>
              <div className="text-xs text-white/50">Get CLI</div>
            </div>
            
            <div className="p-6 text-white/80 space-y-6 font-mono text-sm h-[320px] overflow-hidden flex flex-col justify-end">
              <div className="flex flex-col gap-1.5 w-full">
                {codeLines.map((line, i) => {
                  let colorClass = "text-white/80";
                  if (line.startsWith(">")) colorClass = "text-emerald-400";
                  else if (line.startsWith("import") || line.startsWith("from")) colorClass = "text-purple-400";
                  else if (line.includes("def") || line.includes("print")) colorClass = "text-blue-400";
                  else if (line.includes("Agent") || line.includes("predict") || line.includes("execute_order")) colorClass = "text-amber-300";
                  
                  return (
                    <div key={i} className="flex items-start gap-4 w-full">
                      <span className="text-white/20 select-none text-xs mt-0.5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={`whitespace-pre ${colorClass}`}>
                        {line || " "}
                      </span>
                    </div>
                  );
                })}
                <div className="flex items-center gap-4 w-full">
                  <span className="text-white/20 select-none text-xs shrink-0">
                    {String(codeLines.length + 1).padStart(2, '0')}
                  </span>
                  <span className={`w-2 h-4 bg-white/50 ${cursorBlink ? "opacity-100" : "opacity-0"}`}></span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Marquee />
    </main>
  );
}
