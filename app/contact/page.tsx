"use client"

import Link from "next/link"
import { LINKS } from "@/lib/links"
import {
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ArrowRight,
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const contactDetails = [
  {
    icon: Mail,
    label: "General Inquiries",
    value: "aimlclub.pcc@gmail.com",
    href: LINKS.email,
  },
  {
    icon: ExternalLink,
    label: "Become an Official Member on LancerLife",
    value: "lancerlife.pasadena.edu/organization/aimlclub",
    href:  LINKS.lancerlife,
  },
  {
    icon: Mail,
    label: "Drop questions on Discord",
    value: "Invite Link",
    href: LINKS.discord,
  },
  {
    icon: MapPin,
    label: "Meeting Location",
    value: "R-206",
  },
  { 
    icon: Clock,
    label: "Weekly Meetings",
    value: "Thursdays, 12:00 PM - 2:00 PM",
  },
]

const socialLinks = [
  { label: "Discord", href: LINKS.discord },
  { label: "GitHub", href: LINKS.github },
  { label: "LinkedIn", href: LINKS.linkedin },
  { label: "Instagram", href: LINKS.instagram },
  { label: "Lancerlife", href: LINKS.lancerlife },
]

export default function ContactPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.05)
  const { ref: detailsRef, isVisible: detailsVisible } = useScrollAnimation()
  const { ref: socialsRef, isVisible: socialsVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-secondary"
      >
        <div
          className={`relative z-10 mx-auto max-w-3xl px-6 text-center transition-all duration-1000 ${
            heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Get In Touch
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            <span className="text-balance">Contact Us</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Have questions, ideas, or want to collaborate? We would love to hear
            from you.
          </p>
        </div>
      </section>

      {/* Contact details -- flat, no boxes */}
      <section
        ref={detailsRef}
        className={`py-20 transition-all duration-700 md:py-28 ${
          detailsVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Reach Out
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Drop us an email or stop by during one of our weekly meetings.
          </p>

          <div className="mt-10 flex flex-col gap-8">
            {contactDetails.map((detail) => (
              <div key={detail.label} className="flex items-start gap-4">
                <detail.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {detail.label}
                  </p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="mt-0.5 text-base font-medium text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-base font-medium text-foreground">
                      {detail.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-3xl px-6">
        <hr className="border-border" />
      </div>

      {/* Social links -- flat rows */}
      <section
        ref={socialsRef}
        className={`py-20 transition-all duration-700 md:py-28 ${
          socialsVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Connect With Us
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Follow us on social media to stay up to date.
          </p>

          <div className="mt-10 flex flex-col gap-0">
            {socialLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between py-4 text-base font-medium text-foreground transition-colors hover:text-accent ${
                  i < socialLinks.length - 1 ? "border-b border-border" : ""
                }`}
              >
                {link.label}
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={ctaRef}
        className={`bg-secondary py-20 transition-all duration-700 md:py-28 ${
          ctaVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Want to join?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">
            No application needed. Just come to one of our weekly meetings or
            send us an email. Everyone is welcome, regardless of experience
            level.
          </p>
          <Link
            href="/events"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            See Upcoming Events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}