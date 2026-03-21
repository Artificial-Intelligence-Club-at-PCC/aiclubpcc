"use client"

import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function AboutHero() {
  const { ref, isVisible } = useScrollAnimation(0.05)

  return (
    <section
      ref={ref}
      className="relative flex min-h-[50vh] items-center justify-center overflow-hidden"
    >
      <Image
        src="/images/about-hero.jpg"
        alt=""
        fill
        className="object-cover opacity-25"
        priority
      />
      <div className="absolute inset-0 bg-background/50" />
      <div
        className={`relative z-10 mx-auto max-w-3xl px-6 text-center transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          About Us
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          <span className="text-balance">Our story</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          From a small friend group to one of the active student
          organizations on campus, here is how we got here.
        </p>
      </div>
    </section>
  )
}
