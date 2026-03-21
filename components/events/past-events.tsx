"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { Calendar, MapPin, Clock } from "lucide-react"

const pastEvents = [
  {
    title: "Club Kickoff Meeting",
    date: "Fall 2024",
    time: "Evening",
    location: "Pasadena City College",
    description: "The very first official club meeting where we launched our vision, introduced upcoming projects, and welcomed our founding members.",
    type: "Meeting",
  },
  {
    title: "Python with AI Workshop",
    date: "October 16, 2024",
    time: "12:00 PM – 1:00 PM",
    location: "R206, Pasadena City College",
    description: "A beginner-friendly workshop covering the basics of Python programming for AI, popular AI libraries, and hands-on experience building a simple AI project.",
    type: "Workshop",
  },
  {
    title: "AI Industry Guest Speaker: Phyo Thu Htet",
    date: "October 25, 2024",
    time: "7:00 PM – 8:30 PM PDT",
    location: "Online",
    description: "Phyo Thu Htet, Founder & CEO of SimboloAI, introduced key AI concepts ranging from data science to generative AI, sharing his experience teaching AI and ML engineering to students in Myanmar.",
    type: "Speaker",
  },
  {
    title: "Guest Speaker: Prof. Murali Annavaram",
    date: "November 15, 2024",
    time: "2:00 PM – 4:00 PM PST",
    location: "R122, 1570 E Colorado Blvd, Pasadena, CA",
    description: "USC Viterbi Professor Murali Annavaram explored how deep learning-based recommendation models power personalized content online and the privacy risks they pose — even without identifiable personal data.",
    type: "Speaker",
  },
  {
    title: "AI Industry Guest Speaker: Jaikumar Pettikkattil",
    date: "November 22, 2024",
    time: "2:00 PM – 3:00 PM PST",
    location: "Online",
    description: "AI industry professional Jaikumar Pettikkattil gave a beginner-friendly talk on how LLMs, Transformers, and AI agents work, followed by a networking Q&A session.",
    type: "Speaker",
  },
  {
    title: "Ace Your Finals Using AI Workshop",
    date: "November 26, 2024",
    time: "12:30 PM – 2:00 PM PST",
    location: "R221, 1570 E Colorado Blvd, Pasadena, CA",
    description: "A practical workshop teaching students how to use AI tools effectively to study smarter and prepare for finals.",
    type: "Workshop",
  },
  {
    title: "AI Horizons Convention",
    date: "Spring 2025",
    time: "All Day",
    location: "Pasadena City College",
    description: "Our flagship convention brought together 200+ attendees, 9 guest speakers, 15 clubs and career programs, and 2 panel discussions for a full day of AI.",
    type: "Convention",
  },
  {
    title: "JPL Field Trip",
    date: "Spring 2025",
    time: "All Day",
    location: "NASA Jet Propulsion Laboratory",
    description: "Our first visit to NASA's Jet Propulsion Laboratory gave members an up-close look at real-world AI and engineering in action.",
    type: "Field Trip",
  },
  {
    title: "AI LA IDEAS Cohort 5: ML Track Info Session",
    date: "April 3, 2025",
    time: "1:00 PM – 2:00 PM PDT",
    location: "C355, 1570 E Colorado Blvd, Pasadena, CA",
    description: "An info session for the IDEAS Cohort 5 free career accelerator program — a 10-week hybrid program offering coursework, mentorship, and hands-on AI/ML projects for community college students.",
    type: "Info Session",
  },
  {
    title: "JPL Field Trip",
    date: "Fall 2025",
    time: "All Day",
    location: "NASA Jet Propulsion Laboratory",
    description: "Members visited NASA's Jet Propulsion Laboratory for a guided tour exploring space exploration technology and AI applications in aerospace.",
    type: "Field Trip",
  },
  {
    title: "End-of-Semester Club Showcase",
    date: "Fall 2025",
    time: "Evening",
    location: "Pasadena City College",
    description: "Members showcased their projects and collaborated with two other clubs in a joint end-of-semester celebration of the work done throughout the semester.",
    type: "Showcase",
  },
]

const typeColors: Record<string, string> = {
  Convention: "bg-accent/10 text-accent",
  "Field Trip": "bg-primary/10 text-primary",
  Showcase: "bg-chart-2/10 text-chart-2",
  Meeting: "bg-chart-4/10 text-chart-4",
  Workshop: "bg-accent/10 text-accent",
  Speaker: "bg-chart-2/10 text-chart-2",
  "Info Session": "bg-primary/10 text-primary",
}

export function PastEvents() {
  return (
    <SectionWrapper className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Looking Back
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Past Events
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />

          <div className="flex flex-col gap-12">
            {pastEvents.map((event, index) => (
              <div
                key={event.title + event.date}
                className={`relative flex flex-col gap-4 pl-12 md:w-1/2 md:pl-0 ${
                  index % 2 === 0
                    ? "md:self-start md:pr-12"
                    : "md:self-end md:pl-12"
                }`}
              >
                <div
                  className={`absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background md:top-1.5 ${
                    index % 2 === 0
                      ? "md:left-auto md:right-[-6.5px]"
                      : "md:left-[-6.5px]"
                  }`}
                />

                <div className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-md">
                  <div className="mb-3 flex items-center gap-2">
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

                  <div className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
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

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}