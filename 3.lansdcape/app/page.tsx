import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center select-none">
      <Image
        src="/image.png"
        alt="Landscape Background"
        fill
        priority
        quality={100}
        className="object-cover object-center -z-10 brightness-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 -z-10 pointer-events-none" />

      <h1 className="font-manufacturing-consent text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-normal tracking-wide text-stone-100 drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]">
        Hero&apos;s journey
      </h1>
    </main>
  );
}
