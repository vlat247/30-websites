import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <Image
        src="/image.png"
        alt="Landscape Background"
        fill
        priority
        quality={100}
        className="object-cover object-center -z-10"
      />
    </main>
  );
}
