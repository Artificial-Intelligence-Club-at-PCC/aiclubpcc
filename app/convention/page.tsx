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
    name: "Michael Krause",
    title: "AI Instructor at Caltech",
    bio: "Mike Krause is an AI leader and instructor with 15+ years deploying real-world AI solutions across energy, healthcare, finance, and smart cities. He has cofounded several companies in the space and helped pioneer an industry-leading hybrid AI platform. A Stanford PhD and Caltech instructor, he currently leads AI at Zenith Insurance and is based in Glendale, CA.",
    image: "/convention/speakers/michaelkrause.png",
    linkedin: "https://www.linkedin.com/in/mike-krause-ai25",
    companyLogos: ["/convention/logos/caltech.png"],
  },
  {
    id: "speaker-2",
    name: "Katie Hughes",
    title: "Senior Product Designer at Meta",
    bio: "Katie Hughes is a product designer who has worked on generative AI, game creation tools, and social discovery features for Horizon Worlds. A six-year Meta veteran, her work was featured at Meta Connect 2024. She is based in Pasadena, CA.",
    image: "/convention/speakers/katiehughes.png",
    linkedin: "https://www.linkedin.com/in/hughezilla",
    companyLogos: ["/convention/logos/meta.png"],
  },
  {
    id: "speaker-3",
    name: "Krys Blackwood",
    title: "Principal UX Designer at NASA JPL",
    bio: "Krys is a principal user experience researcher and designer at NASA’s Jet Propulsion Laboratory, where she leads the Human Centered Design Group in the AI and Data Science section. She is a proud member of the team designing the future of mission operations with the Deep Space Network and Perseverance Mars Rover, and has also worked on the Mars Sample Return, NISAR, Europa Clipper, and Europa Lander missions. Before joining JPL in 2015, Krys spent 20 years in Silicon Valley, designing ecommerce and healthcare experiences with companies ranging from tiny startups to industry giants. She believes that as we charge boldly forward into a world populated by intelligent machines, we have a responsibility to create systems that empower and augment the brilliance of human capability – not replace it.",
    image: "/convention/speakers/krysblackwood.png",
    linkedin: "https://www.linkedin.com/in/krysblackwood",
    companyLogos: ["/convention/logos/jpl.png"],
  },
  {
    id: "speaker-4",
    name: "Junyi Chai",
    title: "Principal Applied Scientist at Microsoft",
    bio: "Junyi is a Principal Applied Scientist at Microsoft AI, where he currently develops AI applications for Copilot. He is an expert in Deep Learning, Natural Language Processing (NLP), Search, and Recommendation Systems—the core technologies that allow AI to understand human language and help us find exactly what we need. \n ​Throughout his career, he has worked on products used by millions of consumers every day, including Bing, Amazon Ads, and Bing Ads. Most recently at Amazon, he served as the technical lead for Alexa Plus, a \"zero-to-one\" initiative where he helped rebuild the Alexa experience from the ground up to make the AI significantly smarter and more capable of handling complex tasks.",
    image: "/convention/speakers/junyichai.png",
    linkedin: "https://www.linkedin.com/in/junyi-chai-174a1ba3",
    companyLogos: ["/convention/logos/microsoft.png"],
  },
  {
    id: "speaker-5",
    name: "Alex Desharnais",
    title: "Technical Group Supervisor - Enterprise Software, Systems, and Modeling Engineering - at NASA JPL",
    bio: "Since joining JPL in 2019, Alex has supported systems and software engineering teams by strategically planning, developing, and deploying complex projects that leverage modern frameworks, tools, processes, and agile engineering practices. He is currently the Manager of the Enterprise Software, Systems and Modeling Engineering group, which provides end-to-end digital engineering support to flight projects and programs. He has also been helping to spearhead GenAI infusion across JPL's Engineering and Science directorate.",
    image: "/convention/speakers/alexdesharnais.png",
    linkedin: "https://www.linkedin.com/in/electrolexx",
    companyLogos: ["/convention/logos/jpl.png"],
  },
  {
    id: "speaker-6",
    name: "Peng Guo",
    title: "AR Engineer at Snap Inc.",
    bio: "Peng is an AR Engineer at Snap working on cutting-edge AR glasses Snap Spectacles. He focuses on building agentic system level experiences. Peng came from a background of game development and ML research, and his vision is to bridge AI, XR, and gamification to redefine how people connect with the world.",
    image: "/convention/speakers/pengguo.png",
    linkedin: "https://www.linkedin.com/in/eric-peng-guo",
    companyLogos: ["/convention/logos/snap.png"],
  },
  {
    id: "speaker-7",
    name: "Rick Hefner",
    title: "Executive Director at Caltech CTME",
    bio: "Dr. Rick Hefner is the Executive Director of the Caltech Center for Technology and Management Education (CTME), where he leads the development of advanced professional and executive education programs. He has over 40 years of experience spanning aerospace, defense, communications, and health sciences, and is credited with over 200 presentations and publications.",
    image: "/convention/speakers/rickhefner.png",
    linkedin: "https://www.linkedin.com/in/rickhefner",
    companyLogos: ["/convention/logos/caltech.png"],
  },
  {
    id: "speaker-8",
    name: "Rafal Kocielnik",
    title: "AI Research Scientist (Surgical AI) at Cedars-Sinai",
    bio: "Rafał Kocielnik is a Research Scientist at Cedars-Sinai Medical Center in Los Angeles, focusing on Human-Centered AI, including leveraging multimodal AI to advance the quality of surgical training. He earned his Ph.D. in Human-Centered Design & Engineering from the University of Washington, where he focused on designing engaging conversational interactions for health and behavior change, and previously held a CRA Computing Innovation Fellowship at Caltech. His research addresses some of AI’s most pressing challenges, conversational agents, bias in generative AI, and AI for surgical training, earning Best Paper Awards at leading venues spanning human-computer interaction, applied AI, and NLP, including CSCW (the premier conference on computing and social behavior), CHI (the flagship conference on human factors in computing systems), ML4H (Machine Learning for Health), and COLM (Conference on Language Modeling), with work also published in Nature Digital Medicine. With over 60 publications and industry collaborations with Activision, Microsoft, NVIDIA, and Wikipedia, Rafał is dedicated to advancing AI that is both technically rigorous and genuinely human-centered.",
    image: "/convention/speakers/rafalkocielnik.png",
    linkedin: "https://www.linkedin.com/in/rkocielnik/",
    companyLogos: ["/convention/logos/cedarssinai.png"],
  },
  {
    id: "speaker-9",
    name: "Rita Sargsyan",
    title: "AI LA IDEAS Program Director",
    bio: "Rita serves as Program Director and Founders/Investors Ambassador at AI LA, where she builds community-driven programs at the intersection of AI, education, and entrepreneurship—like the IDEAS Program, which equips college students with the tools, mentorship, and hands-on experience to explore and succeed in the world of AI and emerging tech. She previously supported early-stage founders as a Platform Coordinator at the UCLA Venture Accelerator and has worked across venture capital, product, and strategy roles with a focus on AI for social good. With a background in Applied Math from UCLA, Rita is passionate about making tech and entrepreneurship more inclusive—mentoring the next generation of changemakers from all majors and communities.",
    image: "/convention/speakers/ritasargsyan.png",
    linkedin: "https://www.linkedin.com/in/ritasargsyan",
    companyLogos: ["/convention/logos/aila.png"],
  },
  {
    id: "speaker-10",
    name: "Gamas Chang",
    title: "Principal Software Engineer at Magnite",
    bio: "Gamas Chang is an experienced software engineer with decades of expertise in the entertainment and advertising technology industries, having worked with companies such as Disney, HBO, DreamWorks Animation, and Magnite. In addition to his industry experience, he is the founder of an online coding school for kids, www.ayclogic.com. Gamas is passionate about teaching students how to create games, mobile applications, and explore AI machine learning, computer vision, and AI agents using modern technologies.",
    image: "/convention/speakers/gamaschang.png",
    linkedin: "https://linkedin.com/in/gamas",
    companyLogos: ["/convention/logos/magnite.png"],
  },
]

// Moderators - Add/edit speakers here
const moderators: Moderator[] = [
  {
    id: "moderator-1",
    name: "Shin Aung",
    title: "AI Club President & Lead Organizer",
    bio: "Shin is a Computer Science major at Pasadena City College, and the President and Co-Founder of the AI Club at PCC. He plans to transfer in Fall 2026 to further pursue his interests in AI and software engineering.",
    image: "/convention/speakers/shinaung.png",
    linkedin: "https://linkedin.com/in/shin-htet",
  },
  {
    id: "moderator-2",
    name: "Jamal Ashraf",
    title: "PCC Faculty, AI Club Advisor",
    bio: "Jamal Ashraf is a senior faculty member at Pasadena City College, bringing over 30 years of experience in computer science education, with expertise in Python, Java, and data structures. Passionate about integrating artificial intelligence and data science into education, he developed PCC’s Data Science Certificate program, which has enabled over 150 students to gain advanced skills and secure opportunities at leading tech companies and universities. Beyond teaching, Jamal mentors student-led clubs such as AI Club. His dedication to equity in STEM and real-world applications has earned him recognition for fostering academic-industry connections and inspiring the next generation of technologists.",
    image: "/convention/speakers/jamalashraf.png",
  },
]

// Event Schedule - Edit times and details here
const eventSchedule: ScheduleItem[] = [
  {
    type: "tabling-fair",
    timeStart: "11:00 AM",
    timeEnd: "1:00 PM",
    title: "Career, Programs, and Internships Fair",
    description:
      "Explore booths from campus programs, research labs, student clubs, and industry partners offering internships and opportunities.",
  },
  {
    type: "presentation",
    timeStart: "1:00 PM",
    timeEnd: "1:45 PM",
    title: "AI in 2026: Hype, Reality, and What Comes Next",
    description: "This talk cuts through the noise on where AI actually stands in 2026 - what's working, what's overhyped, and what's coming next. Mike will share his perspective from 15 years deploying AI solutions in real-world use cases, covering topics like the gap between AI demos and production reality, how to build the skills and domain knowledge that make AI genuinely useful, and how to think about the risks that actually matter. He'll also address what the current moment means for students entering the workforce - and how to position yourself on the right side of the shift.",
    speakerId: "speaker-1",
    flyer: "/convention/flyers/placeholder.png",
  },
  {
    type: "presentation",
    timeStart: "2:00 PM",
    timeEnd: "2:45 PM",
    title: "Designing for AI Game Characters",
    description: "This talk looks at what it takes to design interactions for AI-driven game characters that actually feel good to play with. Katie will share lessons from her work on aspects such as setting player expectations, giving players the right amount of control, and making interactions feel smooth and natural. She'll also touch on physical presence and how these characters behave in multiplayer spaces.",
    speakerId: "speaker-2",
    flyer: "/convention/flyers/placeholder.png",
  },
  {
    type: "panel",
    timeStart: "3:00 PM",
    timeEnd: "3:50 PM",
    title: "AI in Industry and Real-World Deployment",
    description:
      "This panel explores how AI is applied in real-world settings across industries, highlighting the challenges of scaling AI systems, integrating them into existing workflows, and achieving measurable impact. Discussions will include lessons learned from practical deployments and insights on translating AI research into everyday solutions.",
    moderatorIds: ["moderator-1"],
    speakerIds: ["speaker-3", "speaker-4", "speaker-5", "speaker-6"],
    flyer: "/convention/flyers/placeholder.png",
  },
  {
    type: "panel",
    timeStart: "4:00 PM",
    timeEnd: "4:50 PM",
    title: "Careers, Research and the Future of AI",
    description:
      "Exploring pathways into AI, this panel will highlight careers in industry and academia, opportunities in research, and the future directions shaping the field. Discussions will cover how students can get involved, the skills needed to succeed, and how emerging trends are influencing both professional and research landscapes.",
    moderatorIds: ["moderator-2"],
    speakerIds: ["speaker-7", "speaker-8", "speaker-9", "speaker-10"],
    flyer: "/convention/flyers/placeholder.png",
  },
  {
    type: "closing",
    timeStart: "5:00 PM",
    timeEnd: "5:30 PM",
    title: "Closing Remarks & Networking",
    description:
      "Wrap-up, acknowledgements, recognition of contributors, and open networking session.",
  },
]

// Collaborating Clubs/Organizations
const collaborators: Collaborator[] = [
  { name: "Decoded Brain", logo: "/convention/logos/decodedbrain.png", url: "https://research.decodedbrain.net/" },
  { name: "She.Codes", logo: "/convention/logos/shecodes.png", url: "https://lancerlife.pasadena.edu/organization/shecodes" },
  { name: "Data Science Club", logo: "/convention/logos/datascienceclub.png", url: "https://lancerlife.pasadena.edu/organization/datascienceclub" },
  { name: "Pi Club", logo: "/convention/logos/piclub.png", url: "https://lancerlife.pasadena.edu/organization/piclub" },
  { name: "AI LA IDEAS Program", logo: "/convention/logos/aila.png", url: "https://www.joinai.la/" },
  // { name: "STEM Advantage", logo: "/convention/logos/stemadvantage.png", url: "https://stemadvantage.org/" },
  { name: "Autodesk", logo: "/convention/logos/autodesk.png", url: "https://www.autodesk.com/" },
  { name: "MESA", logo: "/convention/logos/mesa.png", url: "https://pasadena.edu/academics/support/mesa/index.php" },
  { name: "JPL STEM Engagement", logo: "/convention/logos/jpl.png", url: "https://www.jpl.nasa.gov/edu/about-jpl-education/" },
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
  { stat: "150+", label: "Attendees" },
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

interface Moderator {
  id: string
  name: string
  title: string
  bio: string
  image: string
  linkedin?: string
}

interface ScheduleItem {
  type: "tabling-fair" | "presentation" | "panel" | "closing"
  timeStart: string
  timeEnd: string
  title: string
  description: string
  speakerId?: string
  speakerIds?: string[]
  moderatorIds?: string[]
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

function getModeratorById(id: string): Moderator | undefined {
  return moderators.find((s) => s.id === id)
}

// =============================================================================
// COMPONENTS
// =============================================================================

// Marquee Banner Component
function MarqueeBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-primary py-2 mb-6">
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
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </div>
  )
}

// Speaker Card Component - Full size for presentations/panels
function SpeakerCard({ speaker }: { speaker: GuestSpeaker }) {
  const [expanded, setExpanded] = useState(false)
  const bioCutoff = 350
  const isLong = speaker.bio.length > bioCutoff

  return (
    <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:gap-6">
      {/* Speaker Photo */}
      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-none bg-secondary sm:h-40 sm:w-40">
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
            <div key={i} className="relative h-12 w-28">
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
        <p className="mt-4 text-sm leading-relaxed whitespace-pre-line">
          <span className="font-medium text-foreground">Bio: </span>{" "}
          {expanded || !isLong
            ? speaker.bio
            : speaker.bio.slice(0, bioCutoff) + "..."}
        </p>

        {/* Read More Button */}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1 text-xs font-medium text-accent hover:underline w-fit"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  )
}

// Moderator Card Component - Full size for presentations/panels
function ModeratorCard({ moderator }: { moderator: Moderator }) {
  const [expanded, setExpanded] = useState(false)
  const bioCutoff = 300
  const isLong = moderator.bio.length > bioCutoff

  return (
    <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:gap-6">
      {/* Moderator Photo */}
      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-none bg-secondary sm:h-40 sm:w-40">
        <Image
          src={moderator.image}
          alt={moderator.name}
          fill
          className="object-cover"
        />
      </div>
      
     {/* Speaker Info */}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-3">
          <h4 className="text-lg font-semibold text-foreground sm:text-xl">
            {moderator.name}
          </h4>

          {moderator.linkedin && (
            <Link
              href={moderator.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
              aria-label={`${moderator.name}'s LinkedIn profile`}
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          )}
        </div>
        
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {moderator.title}
        </p>
        
        {/* Bio */}
        {/* Bio */}
        <p className="mt-4 text-sm leading-relaxed">
          <span className="font-medium text-foreground">Bio: </span>{" "}
          {expanded || !isLong
            ? moderator.bio
            : moderator.bio.slice(0, bioCutoff) + "..."}
        </p>

        {/* Read More Button */}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1 text-xs font-medium text-accent hover:underline w-fit"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
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
          <div className="relative h-64 w-48 shrink-0 overflow-hidden rounded-none bg-secondary lg:h-72 lg:w-52">
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
          <p className="mt-3 text-base leading-relaxed">
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
    ? item.speakerIds.map((id) => getSpeakerById(id))
      .filter((speaker): speaker is GuestSpeaker => !!speaker && speaker.name !== "TBA")
    : [];
  const moderators = item.moderatorIds
    ? item.moderatorIds.map((id) => getModeratorById(id)).filter(Boolean) as Moderator[]
    : []

  return (
    <div className="py-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        {/* Flyer - fixed size, doesn't stretch */}
        {item.flyer && (
          <div className="relative h-64 w-48 shrink-0 overflow-hidden rounded-none bg-secondary lg:h-72 lg:w-52">
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
          {/* Moderator */}
          {moderators.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Moderator
              </p>
              <div className="flex flex-col gap-4">
                {moderators.map((moderator) => (
                  <ModeratorCard key={moderator.id} moderator={moderator} />
                ))}
              </div>
            </div>
          )}
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
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.3)

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
            src="/convention/conventionpic14.jpg"
            alt=""
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          {/* Ultra-light icy blue overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-blue-50/10" />
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
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed md:text-lg">
            Explore the world of Artificial Intelligence at PCC&apos;s AI Horizons
            Convention! Join us for a day of tabling fair, guest presentations, and
            expert panels designed to showcase AI&apos;s real-world applications,
            educational pathways, and career opportunities. Whether you&apos;re a
            beginner or looking to advance your skills, this free event is your
            chance to learn, connect, and discover your next steps in AI.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row mb-3">
            <Button
              asChild
              className="bg-red-600 hover:bg-red-700 text-white px-10 py-7 text-base font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <Link href="https://forms.gle/dXG9QJpSovu6TnGf6"
                target="_blank"          // opens in new tab/window
                rel="noopener noreferrer" // security best practice
              >
                RSVP Now
              </Link>
            </Button>
            {/*
            <Button variant="outline" size="lg" asChild>
              <Link
                href="https://artificial-intelligence-club-at-pcc.github.io/aihorizons/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Revisit 2025 Convention
              </Link>
            </Button>
            */}
          </div>

          {/* Date, Time, Location Row */}
          <div className="mx-auto mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
              <Calendar className="h-4 w-4 text-accent" />
              <span>April 23, 2026</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
              <Clock className="h-4 w-4 text-accent" />
              <span>11:00 AM - 5:30 PM</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
              <MapPin className="h-4 w-4 text-accent" />
              <span>CC-201, Creveling Lounge, PCC</span>
            </div>
          </div>
        </div>

      </section>

      {/* Separator Line */}
      <div className="mx-auto max-w-4xl px-6">
        <div className="h-px w-full bg-border" />
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row sm:justify-center">
        {/* Landscape Poster */}
        <div className="relative w-full sm:w-2/3 max-w-[640px] aspect-[16/9] bg-secondary">
          <Image
            src="/convention/landscape.png"
            alt="AI Horizons Convention Poster"
            fill
            className="object-cover"
          />
        </div>

        {/* Square Map */}
        <div className="flex flex-col items-center w-40 sm:w-1/3">
          <a
            href="https://drive.google.com/uc?export=download&id=1puS1k28qrXxhKPyt98S0WqVi0UWJS2Oh"
            download
            className="relative w-full aspect-square"
          >
            <Image
              src="/convention/map.png"
              alt="Location Map"
              fill
              className="object-cover rounded-none"
            />
          </a>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Click the map to download
          </p>
        </div>
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
              Our AI Horizons Convention 2025 brought the campus community
              together for a day of learning, networking, and inspiration. The event
              featured keynotes on foundation models and responsible AI, a tabling
              fair with over 15 organizations, and lively panel discussions on AI
              and society.
            </p>
          </div>

          {/* Revisit old website button */}
          <div className="flex justify-center mt-8">
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
      </SectionWrapper>
    </div>
  )
}
