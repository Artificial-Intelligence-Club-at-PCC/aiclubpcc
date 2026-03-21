"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const upcomingEvents = [
  {
    title: "Guest Speaker: Evan Chou",
    date: "March 26, 2025",
    time: "12:00 PM – 1:00 PM",
    location: "R206, Pasadena City College",
    description: "Evan Chou, former Co-founder & AI Club President, UCSD Transfer, and 2x AI/ML Engineering Intern at NASA JPL, will be sharing his experience building real-world AI/ML projects, and practical career advice.",
    type: "Speaker",
  },
  {
    title: "AI Convention 2026",
    date: "April 23, 2026",
    time: "To Be Announced",
    location: "Creveling Lounge, Pasadena City College",
    description: "Our annual AI Convention is back! More details on schedule, speakers, and activities coming soon. Save the date.",
    type: "Convention",
  },
  // {
  //   title: "Workshop — Details Coming Soon",
  //   date: "To Be Announced",
  //   time: "To Be Announced",
  //   location: "To Be Announced",
  //   description: "Stay tuned for details on our next workshop. Follow us on Instagram or join our Discord to get notified when this is confirmed.",
  //   type: "Workshop",
  // },
  // {
  //   title: "Club Meeting — Details Coming Soon",
  //   date: "To Be Announced",
  //   time: "To Be Announced",
  //   location: "To Be Announced",
  //   description: "Our next general meeting is being planned. Check back soon for the date, time, and topic.",
  //   type: "Meeting",
  // },
]
export default upcomingEvents

const typeColors: Record<string, string> = {
  Workshop: "bg-accent/10 text-accent",
  Meeting: "bg-primary/10 text-primary",
  Speaker: "bg-chart-2/10 text-chart-2",
  Convention: "bg-chart-4/10 text-chart-4",
  Hackathon: "bg-chart-4/10 text-chart-4",
  Career: "bg-chart-4/10 text-chart-4",
}

export function EventsTimeline() {
  return (
    <SectionWrapper className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Coming Up
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Upcoming Events
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {upcomingEvents.map((event) => (
            <div
              key={event.title}
              className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        typeColors[event.type] ?? "bg-secondary text-foreground"
                      }`}
                    >
                      {event.type}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-1.5 text-sm text-muted-foreground md:items-end">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Notified About Events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  )
}