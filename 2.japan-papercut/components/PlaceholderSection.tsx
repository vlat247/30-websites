"use client";

// TODO: content for this section
// This is a scaffold — replace the placeholder text below with real content.

export default function PlaceholderSection() {
  return (
    <section
      id="placeholder"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-8"
      style={{
        background: "linear-gradient(180deg, #e8b4a0 0%, #f0d4c0 40%, #f5ede0 100%)",
      }}
    >
      {/* ── Decorative paper-cut corner marks ──────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 opacity-30"
        style={{ borderColor: "#3d4f6e" }}
      />
      <div
        aria-hidden="true"
        className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 opacity-30"
        style={{ borderColor: "#3d4f6e" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 opacity-30"
        style={{ borderColor: "#3d4f6e" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 opacity-30"
        style={{ borderColor: "#3d4f6e" }}
      />

      {/* ── Placeholder content ──────────────────────────────────────── */}
      <div className="text-center max-w-xl">
        {/* Japanese character watermark */}
        <p
          className="text-6xl mb-8 opacity-15 select-none"
          style={{ color: "#3d4f6e", fontFamily: "var(--font-display)" }}
        >
          待
        </p>

        <div
          className="inline-block px-4 py-1 mb-6 text-xs tracking-[0.35em] uppercase"
          style={{
            background: "rgba(61,79,110,0.08)",
            color: "#3d4f6e",
            fontFamily: "var(--font-body)",
            transform: "rotate(0.5deg)",
          }}
        >
          Coming Soon
        </div>

        <h2
          className="font-display text-[clamp(2rem,5vw,4rem)] text-[#3d4f6e] opacity-40 mb-4"
        >
          Chapter Three
        </h2>

        <p
          className="text-[#3d4f6e] opacity-40 text-sm tracking-widest uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {/* TODO: content for this section */}
          Content to be determined
        </p>

        {/* Paper-fold visual hint */}
        <div className="flex justify-center mt-12 gap-3 opacity-25">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#3d4f6e" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
