"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Mic2,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  CoffeeIcon,
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { SectionWrapper } from "@/components/section-wrapper"

const schedule = [
  {
    time: "To Be Announced",
    title: "Opening Remarks",
    description:
      "Welcome address from the AI Club president and faculty advisor. Sets the tone for the day and provides an overview of the schedule and key highlights.",
  },
  {
    time: "To Be Announced",
    title: "Career and Internship Fair",
    description:
      "Explore career programs, educational opportunities, internship programs, and student-led clubs with their projects. Connect with industry partners and campus resources to learn about AI opportunities and future pathways.",
    tag: "Career Fair",
  },
  {
    time: "To Be Announced",
    title: "Guest Speaker Presentation",
    description:
      "TBA: Hear from a leading researcher or industry professional on cutting-edge AI developments, trends, and applications. Gain insights from expert perspectives in AI research and industry practice.",
    tag: "Guest Speaker",
  },
  {
    time: "To Be Announced",
    title: "Guest Speaker Presentation",
    description:
      "TBA: Hear from a leading researcher or industry professional on cutting-edge AI developments, trends, and applications. Gain insights from expert perspectives in AI research and industry practice.",
    tag: "Guest Speaker",
  },
  {
    time: "To Be Announced",
    title: "Panel",
    description:
      "An interactive discussion with academics, industry professionals, and practitioners on the future of AI, ethical considerations, and real-world applications. Audience Q&A is included.",
    tag: "Panel",
  },
  {
    time: "To Be Announced",
    title: "Closing Ceremony",
    description:
      "Wrap-up, acknowledgements, and recognition of outstanding projects and contributors.",
  },
]

const highlights2025 = [
  { stat: "200+", label: "Attendees" },
  { stat: "15", label: "Clubs & Career Programs" },
  { stat: "9", label: "Guest Speakers" },
  { stat: "2", label: "Panel Discussions" },
]

const conventionPhotos = [
  "/convention/conventionpic1.jpg",
  "/convention/conventionpic2.jpg",
  "/convention/conventionpic3.jpg",
  "/convention/conventionpic4.jpg",
  "/convention/conventionpic5.jpg",
  "/convention/conventionpic6.jpg",
  "/convention/conventionpic7.jpg",
  "/convention/conventionpic8.jpg",
  "/convention/conventionpic9.jpg",
  "/convention/conventionpic10.jpg",
  "/convention/conventionpic11.jpg",
  "/convention/conventionpic12.jpg",
  "/convention/conventionpic13.jpg",
  "/convention/conventionpic14.jpg",
  "/convention/conventionpic15.jpg",
  "/convention/conventionpic16.jpg",
  "/convention/conventionpic17.jpg",
  "/convention/conventionpic18.jpg",
  "/convention/conventionpic19.jpg",
  "/convention/conventionpic20.jpg",
  "/convention/conventionpic21.jpg",
  "/convention/conventionpic22.jpg",
  "/convention/conventionpic23.jpg",
  "/convention/conventionpic24.jpg",
  "/convention/conventionpic25.jpg",
  "/convention/conventionpic26.jpg",
  "/convention/conventionpic27.jpg",
]

function ConventionSlideshow() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + conventionPhotos.length) % conventionPhotos.length)
  }, [])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % conventionPhotos.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [paused, next])

  return (
    <div
      className="relative mt-14 overflow-hidden rounded-2xl border border-border bg-secondary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/9] w-full">
        {conventionPhotos.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`AI Convention 2025 photo ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground backdrop-blur-sm transition hover:bg-background/90"
        aria-label="Previous photo"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground backdrop-blur-sm transition hover:bg-background/90"
        aria-label="Next photo"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {conventionPhotos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current
                ? "w-6 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>

      <div className="absolute right-3 bottom-3 rounded-full bg-background/70 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
        {current + 1} / {conventionPhotos.length}
      </div>
    </div>
  )
}

export default function ConventionPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.05)

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
      >
        <Image
          src="/images/convention-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-background/50" />

        <div
          className={`relative z-10 mx-auto max-w-4xl px-6 text-center transition-all duration-1000 ${
            heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Spring 2026
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
            <span className="text-balance">AI Convention</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Our flagship annual event bringing together students, researchers,
            and industry leaders to explore the frontiers of artificial
            intelligence.
          </p>

          <div className="mx-auto mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-accent" />
              <span>April 23, 2026</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-accent" />
              <span>Time To Be Announced</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-accent" />
              <span>Creveling Lounge, Pasadena City College</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Register Interest
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://artificial-intelligence-club-at-pcc.github.io/aihorizons/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-background"
            >
              Revisit 2025 Convention
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <SectionWrapper className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              What to Expect
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              A Full Day of AI
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-accent">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-foreground">
                Tabling Fair
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Explore booths from campus programs, research labs, student
                clubs, and industry partners offering internships and graduate
                opportunities.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-accent">
                <Mic2 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-foreground">
                Guest Speakers
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Hear from leading researchers and industry professionals on the
                latest breakthroughs in generative AI, responsible deployment,
                and more.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-accent">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-foreground">
                Panel Discussion
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                An engaging conversation with academics and practitioners on the
                future of AI in industry, academia, and society, with audience
                Q&A.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-accent">
                <CoffeeIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-foreground">
                Snacks & Refreshments
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Enjoy a variety of food, snacks, and beverages throughout the event. Take a break, grab a bite, and network with fellow attendees in a relaxed setting.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Schedule */}
      <SectionWrapper className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Event Schedule
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              The Day at a Glance
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Full schedule coming soon. Check back closer to the event date for
              confirmed times.
            </p>
          </div>

          <div className="mt-14 flex flex-col gap-0">
            {schedule.map((item, i) => (
              <div
                key={i}
                className={`flex gap-6 py-6 ${
                  i < schedule.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="w-40 shrink-0">
                  <p className="text-sm font-semibold text-muted-foreground">
                    {item.time}
                  </p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    {item.tag && (
                      <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Last year's convention */}
      <SectionWrapper className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Looking Back
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Spring 2025 Convention
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Our inaugural AI Convention brought the campus community together
              for a day of learning, networking, and inspiration. Here is what
              we accomplished.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
            {highlights2025.map((h) => (
              <div key={h.label} className="text-center">
                <p className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-foreground">
                  {h.stat}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{h.label}</p>
              </div>
            ))}
          </div>

          {/* Slideshow */}
          <ConventionSlideshow />

          <div className="mx-auto mt-14 max-w-2xl">
            <p className="text-base leading-relaxed text-muted-foreground">
              The 2025 convention featured keynotes on foundation models and
              responsible AI, a tabling fair with over 15 organizations
              representing research labs, graduate programs, and tech companies,
              and a lively panel on the intersection of AI and society. It set
              the bar for what we are building again this year, bigger and
              better.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Be Part of AI Convention 2026
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">
            Whether you want to attend, speak, or table, we would love to have
            you. Reach out to get involved.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Involved
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-background"
            >
              View All Events
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}