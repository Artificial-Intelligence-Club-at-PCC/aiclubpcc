"use client"

import Image from "next/image"
import { SectionWrapper } from "@/components/section-wrapper"

const timeline = [
  {
    year: "Fall 2024",
    title: "Club Founded",
    description:
      "A group of students came together to establish the AI and ML Club at PCC.",
  },
  {
    year: "Fall 2024",
    title: "First Appearance at Club Rush",
    description: "Introduced the club to the campus community.",
    image: "/timeline/club-rush-fall-2024.jpg",
  },
  {
    year: "Fall 2024",
    title: "Official Club Kickoff Meeting",
    description:
      "Launched the club's first meeting and shared upcoming projects.",
    image: "/timeline/kickoff-fall-2024.jpg",
  },
  {
    year: "Spring 2025",
    title: "Meeting of the Spring",
    description: "Welcomed over 100 new members, growing the club community.",
    image: "/timeline/spring-meeting-2025.jpg",
  },
  {
    year: "Spring 2025",
    title: "JPL Field Trip",
    description:
      "Visited NASA's Jet Propulsion Laboratory for a guided tour on space exploration.",
    image: "/timeline/jpl-spring-2025.jpg",
  },
  {
    year: "Spring 2025",
    title: "AI Horizons Convention",
    description: "Hosted the largest event of the year for AI enthusiasts.",
    image: "/timeline/ai-horizons-2025.jpg",
  },
  {
    year: "Fall 2025",
    title: "Club Rush",
    description: "New board, fresh energy, and outreach to campus.",
    image: "/timeline/club-rush-fall-2025.jpg",
  },
  {
    year: "Fall 2025",
    title: "Club Meeting",
    description: "Full room, kicking off the semester with enthusiasm.",
    image: "/timeline/club-meeting-fall-2025.jpg",
  },
  {
    year: "Fall 2025",
    title: "JPL Field Trip",
    description: "Second visit, more members experienced JPL up close.",
    image: "/timeline/jpl-fall-2025.jpg",
  },
  {
    year: "Fall 2025",
    title: "End-of-Semester Club Showcase",
    description: "Showcased projects and collaborated with two other clubs.",
    image: "/timeline/showcase-fall-2025.jpg",
  },
  {
    year: "Spring 2026",
    title: "200+ Members and Growing",
    description: "The club continues to expand its community and impact.",
  },
]

export function AboutTimeline() {
  return (
    <SectionWrapper className="bg-card py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Our Journey
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Timeline
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />

          <div className="flex flex-col gap-12">
            {timeline.map((timelineItem, i) => (
              <div
                key={`${timelineItem.year}-${timelineItem.title}`}
                className={`relative flex items-center gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="absolute left-4 top-1 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background md:left-1/2" />

                {/* Text card */}
                <div
                  className={`ml-10 flex-1 md:ml-0 ${
                    i % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="rounded-2xl border border-border bg-background/60 p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {timelineItem.year}
                    </span>
                    <h3 className="mt-1 font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-foreground">
                      {timelineItem.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {timelineItem.description}
                    </p>
                  </div>
                </div>

                {/* Photo in the opposite blank side */}
                <div
                  className={`hidden flex-1 md:flex items-center ${
                    i % 2 === 0 ? "md:pl-12 justify-start" : "md:pr-12 justify-end"
                  }`}
                >
                  {timelineItem.image && (
                    <div className="relative aspect-[4/3] w-full max-w-xs overflow-hidden rounded-xl border border-border bg-secondary">
                      <Image
                        src={timelineItem.image}
                        alt={timelineItem.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}