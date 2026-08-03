import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex flex-col flex-1 min-h-screen items-center justify-center font-sans overflow-hidden text-white">
      <Image
        src="/image.png"
        alt="Background"
        fill
        priority
        className="object-cover object-center -z-10"
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />

      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start backdrop-blur-sm bg-black/30 rounded-2xl border border-white/10 my-8 shadow-2xl">
        <Image
          className="invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-white">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-200">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-white underline underline-offset-4 hover:text-zinc-300"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-white underline underline-offset-4 hover:text-zinc-300"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-black transition-colors hover:bg-zinc-200 md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-white/20 px-5 transition-colors hover:border-transparent hover:bg-white/10 md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
