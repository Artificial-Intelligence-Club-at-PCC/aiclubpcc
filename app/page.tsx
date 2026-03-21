import { HeroSection } from "@/components/home/hero-section"
import { GallerySection } from "@/components/home/gallery-section"
import { MissionSection } from "@/components/home/mission-section"
import { ProjectsSection } from "@/components/home/projects-section"
import { UpcomingEventsSection } from "@/components/home/upcoming-events-section"
import { MembershipSection } from "@/components/home/membership-section"



export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GallerySection />
      <MissionSection />
      {/* <ProjectsSection /> */}
      <UpcomingEventsSection /> 
      <MembershipSection />
    </>
  )
}
