"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import {
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  Linkedin,
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"

// =============================================================================
// DATA CONFIGURATION - Edit this section to update event details
// =============================================================================

// Guest Speakers - Add/edit speakers here
const guestSpeakers: GuestSpeaker[] = [
  {
    id: "speaker-1",
    name: "Speaker Name",
    title: "Job Title",
    bio: "Brief bio about the speaker and their expertise in AI. This speaker has extensive experience in the field and has contributed to numerous projects. They are passionate about education and helping students discover opportunities in AI.",
    image: "/convention/speakers/placeholder.jpg", // Add speaker photo
    linkedin: "https://linkedin.com/in/username",
    companyLogos: ["/convention/logos/company1.png"], // Add company logos
  },
  {
    id: "speaker-2",
    name: "Speaker Name",
    title: "Job Title",
    bio: "Brief bio about the speaker and their expertise in AI. This speaker has extensive experience in the field and has contributed to numerous projects. They are passionate about education and helping students discover opportunities in AI.",
    image: "/convention/speakers/placeholder.jpg",
    linkedin: "https://linkedin.com/in/username",
    companyLogos: ["/convention/logos/company2.png"],
  },
  {
    id: "speaker-3",
    name: "Speaker Name",
    title: "Job Title",
    bio: "Brief bio about the speaker and their expertise in AI. This speaker has extensive experience in the field and has contributed to numerous projects. They are passionate about education and helping students discover opportunities in AI.",
    image: "/convention/speakers/placeholder.jpg",
    linkedin: "https://linkedin.com/in/username",
    companyLogos: ["/convention/logos/company3.png"],
  },
  {
    id: "speaker-4",
    name: "Speaker Name",
    title: "Job Title",
    bio: "Brief bio about the speaker and their expertise in AI. This speaker has extensive experience in the field and has contributed to numerous projects. They are passionate about education and helping students discover opportunities in AI.",
    image: "/convention/speakers/placeholder.jpg",
    linkedin: "https://linkedin.com/in/username",
    companyLogos: ["/convention/logos/company4.png"],
  },
]

// Event Schedule - Edit times and details here
const eventSchedule: ScheduleItem[] = [
  {
    type: "tabling-fair",
    timeStart: "10:00 AM",
    timeEnd: "2:00 PM",
    title: "Career, Programs, and Internships Fair",
    description:
      "Explore booths from campus programs, research labs, student clubs, and industry partners offering internships and opportunities.",
  },
  {
    type: "presentation",
    timeStart: "11:00 AM",
    timeEnd: "11:30 AM",
    title: "Presentation Title TBA",
    description: "Description of the presentation topic and what attendees will learn...",
    speakerId: "speaker-1",
    flyer: "/convention/flyers/presentation1.jpg", // Add flyer image
  },
  {
    type: "presentation",
    timeStart: "11:45 AM",
    timeEnd: "12:15 PM",
    title: "Presentation Title TBA",
    description: "Description of the presentation topic and what attendees will learn...",
    speakerId: "speaker-2",
    flyer: "/convention/flyers/presentation2.jpg",
  },
  {
    type: "panel",
    timeStart: "12:30 PM",
    timeEnd: "1:15 PM",
    title: "Panel Discussion Title TBA",
    description:
      "An interactive discussion with academics, industry professionals, and practitioners on the future of AI, ethical considerations, and real-world applications.",
    speakerIds: ["speaker-1", "speaker-2", "speaker-3", "speaker-4"],
    flyer: "/convention/flyers/panel1.jpg",
  },
  {
    type: "closing",
    timeStart: "1:30 PM",
    timeEnd: "2:00 PM",
    title: "Closing Remarks & Networking",
    description:
      "Wrap-up, acknowledgements, recognition of contributors, and open networking session.",
  },
]

// Collaborating Clubs/Organizations
const collaborators: Collaborator[] = [
  { name: "Organization 1", logo: "/convention/collaborators/org1.png", url: "#" },
  { name: "Organization 2", logo: "/convention/collaborators/org2.png", url: "#" },
  { name: "Organization 3", logo: "/convention/collaborators/org3.png", url: "#" },
  { name: "Organization 4", logo: "/convention/collaborators/org4.png", url: "#" },
]

// 2025 Convention Photos
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

const highlights2025 = [
  { stat: "200+", label: "Attendees" },
  { stat: "15", label: "Clubs & Career Programs" },
  { stat: "9", label: "Guest Speakers" },
  { stat: "2", label: "Panel Discussions" },
]

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

interface GuestSpeaker {
  id: string
  name: string
  title: string
  bio: string
  image: string
  linkedin: string
  companyLogos: string[]
}

interface ScheduleItem {
  type: "tabling-fair" | "presentation" | "panel" | "closing"
  timeStart: string
  timeEnd: string
  title: string
  description: string
  speakerId?: string
  speakerIds?: string[]
  flyer?: string
}

interface Collaborator {
  name: string
  logo: string
  url: string
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getSpeakerById(id: string): GuestSpeaker | undefined {
  return guestSpeakers.find((s) => s.id === id)
}

// =============================================================================
// COMPONENTS
// =============================================================================

// Marquee Banner Component
function MarqueeBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-primary py-2">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="mx-8 text-xs font-medium tracking-wide text-primary-foreground"
          >
            Presented to you by Artificial Intelligence Club at Pasadena City College
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}

// Speaker Card Component - Full size for presentations/panels
function SpeakerCard({ speaker }: { speaker: GuestSpeaker }) {
  return (
    <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:gap-6">
      {/* Speaker Photo */}
      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-40 sm:w-40">
        <Image
          src={speaker.image}
          alt={speaker.name}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Speaker Info */}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-3">
          <h4 className="text-lg font-semibold text-foreground sm:text-xl">
            {speaker.name}
          </h4>
          <Link
            href={speaker.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent/80 transition-colors"
            aria-label={`${speaker.name}'s LinkedIn profile`}
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
        
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {speaker.title}
        </p>
        
        {/* Company Logos */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {speaker.companyLogos.map((logo, i) => (
            <div key={i} className="relative h-8 w-20">
              <Image
                src={logo}
                alt="Company logo"
                fill
                className="object-contain object-left"
              />
            </div>
          ))}
        </div>
        
        {/* Bio */}
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {speaker.bio}
        </p>
      </div>
    </div>
  )
}

// Schedule Item Components
function TablingFairItem({ item }: { item: ScheduleItem }) {
  return (
    <div className="py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
        <div className="shrink-0 md:w-40">
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            Tabling Fair
          </span>
          <p className="mt-2 text-sm font-semibold text-foreground">
            {item.timeStart} - {item.timeEnd}
          </p>
        </div>
        <div className="flex-1">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-foreground">
            {item.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}

function PresentationItem({ item }: { item: ScheduleItem }) {
  const speaker = item.speakerId ? getSpeakerById(item.speakerId) : null

  return (
    <div className="py-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        {/* Flyer - fixed size, doesn't stretch */}
        {item.flyer && (
          <div className="relative h-64 w-48 shrink-0 overflow-hidden rounded-lg bg-secondary lg:h-72 lg:w-52">
            <Image
              src={item.flyer}
              alt={`${item.title} flyer`}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              Guest Speaker
            </span>
            <span className="text-sm font-semibold text-foreground">
              {item.timeStart} - {item.timeEnd}
            </span>
          </div>
          <h3 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-foreground">
            {item.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {item.description}
          </p>
          
          {/* Speaker */}
          {speaker && (
            <div className="mt-6 border-t border-border">
              <SpeakerCard speaker={speaker} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PanelItem({ item }: { item: ScheduleItem }) {
  const speakers = item.speakerIds
    ? item.speakerIds.map((id) => getSpeakerById(id)).filter(Boolean) as GuestSpeaker[]
    : []

  return (
    <div className="py-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        {/* Flyer - fixed size, doesn't stretch */}
        {item.flyer && (
          <div className="relative h-64 w-48 shrink-0 overflow-hidden rounded-lg bg-secondary lg:h-72 lg:w-52">
            <Image
              src={item.flyer}
              alt={`${item.title} flyer`}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Panel Discussion
            </span>
            <span className="text-sm font-semibold text-foreground">
              {item.timeStart} - {item.timeEnd}
            </span>
          </div>
          <h3 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-foreground">
            {item.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {item.description}
          </p>
          
          {/* Panelists */}
          {speakers.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Panelists
              </p>
              <div className="flex flex-col gap-4">
                {speakers.map((speaker) => (
                  <SpeakerCard key={speaker.id} speaker={speaker} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ClosingItem({ item }: { item: ScheduleItem }) {
  return (
    <div className="py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
        <div className="shrink-0 md:w-40">
          <span className="inline-block rounded-full bg-foreground/10 px-3 py-1 text-xs font-semibold text-foreground">
            Closing
          </span>
          <p className="mt-2 text-sm font-semibold text-foreground">
            {item.timeStart} - {item.timeEnd}
          </p>
        </div>
        <div className="flex-1">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-foreground">
            {item.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}

function ScheduleItemRenderer({ item }: { item: ScheduleItem }) {
  switch (item.type) {
    case "tabling-fair":
      return <TablingFairItem item={item} />
    case "presentation":
      return <PresentationItem item={item} />
    case "panel":
      return <PanelItem item={item} />
    case "closing":
      return <ClosingItem item={item} />
    default:
      return null
  }
}

// Slideshow Component
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
      className="relative overflow-hidden rounded-2xl border border-border bg-secondary"
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

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function ConventionPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.05)

  return (
    <div className="relative">
      {/* Marquee Banner */}
      <MarqueeBanner />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex min-h-[85vh] items-center justify-center overflow-hidden"
      >
        {/* Background with gradient fade */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/convention-bg.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div
          className={`relative z-10 mx-auto max-w-4xl px-6 text-center transition-all duration-1000 ${
            heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Spring 2026
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
            <span className="text-balance">AI Horizons Convention</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Explore the world of Artificial Intelligence at PCC&apos;s AI Horizons
            Convention! Join us for a day of tabling fair, guest presentations, and
            expert panels designed to showcase AI&apos;s real-world applications,
            educational pathways, and career opportunities. Whether you&apos;re a
            beginner or looking to advance your skills, this free event is your
            chance to learn, connect, and discover your next steps in AI.
          </p>

          {/* Date, Time, Location Row */}
          <div className="mx-auto mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
              <Calendar className="h-4 w-4 text-accent" />
              <span>April 23, 2026</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
              <Clock className="h-4 w-4 text-accent" />
              <span>10:00 AM - 2:00 PM</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
              <MapPin className="h-4 w-4 text-accent" />
              <span>Creveling Lounge, PCC</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact">RSVP Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link
                href="https://artificial-intelligence-club-at-pcc.github.io/aihorizons/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Revisit 2025 Convention
              </Link>
            </Button>
          </div>
        </div>

      </section>

      {/* Separator Line */}
      <div className="mx-auto max-w-4xl px-6">
        <div className="h-px w-full bg-border" />
      </div>

      {/* Event Schedule */}
      <SectionWrapper className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Program
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Event Schedule
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              A full day of learning, networking, and exploring AI opportunities.
            </p>
          </div>

          <div className="mt-14 flex flex-col">
            {eventSchedule.map((item, i) => (
              <div key={i}>
                {i > 0 && (
                  <div className="relative py-2">
                    <div className="h-px w-full bg-border" />
                    <div className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-border" />
                  </div>
                )}
                <ScheduleItemRenderer item={item} />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Collaborators Section */}
      <SectionWrapper className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Partners
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Collaborating Organizations
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Made possible through collaboration with these amazing clubs and
              organizations.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            {collaborators.map((collab) => (
              <Link
                key={collab.name}
                href={collab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center rounded-xl border border-border bg-card p-6 transition-colors hover:bg-accent/5"
              >
                <div className="relative h-16 w-full">
                  <Image
                    src={collab.logo}
                    alt={collab.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">
                  {collab.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Looking Back Section */}
      <SectionWrapper className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Looking Back
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Spring 2025 Convention
            </h2>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
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
          <div className="mt-10">
            <ConventionSlideshow />
          </div>

          <div className="mx-auto mt-10 max-w-2xl text-center">
            <p className="text-base leading-relaxed text-muted-foreground">
              Our inaugural AI Horizons Convention brought the campus community
              together for a day of learning, networking, and inspiration. The event
              featured keynotes on foundation models and responsible AI, a tabling
              fair with over 15 organizations, and lively panel discussions on AI
              and society.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
