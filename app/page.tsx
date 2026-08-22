import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Services from "@/components/Services";
import HeadlessFlow from "@/components/HeadlessFlow";
import SkillMatrix from "@/components/SkillMatrix";
import SignatureBuilds from "@/components/SignatureBuilds";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <main className="relative noise">
        <Hero />
        <TechMarquee />
        <About />
        <Services />
        <HeadlessFlow />
        <SignatureBuilds />
        <Projects />
        <SkillMatrix />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
