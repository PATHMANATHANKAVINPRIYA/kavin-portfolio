import Hero from "@/components/home";
import About from "@/components/about";
import Education from "@/components/education";
import Skills from "@/components/skils";
import Projects from "@/components/projects";
import Experience from "@/components/experiance";
import Certification from "@/components/certification";
import Contact from "@/components/contact";

export default function Portfolio() {
  return (
    <>
      <section className="mt-5">
        <Hero />
      </section>

      <SectionWrapper id="about" title="About Me" number="01">
        <About />
      </SectionWrapper>

      <SectionWrapper id="education" title="Education" number="02">
        <Education />
      </SectionWrapper>

      <SectionWrapper id="skills" title="Skills" number="03">
        <Skills />
      </SectionWrapper>

      <SectionWrapper id="projects" title="Projects" number="04">
        <Projects />
      </SectionWrapper>

      <SectionWrapper id="experience" title="Experience" number="05">
        <Experience />
      </SectionWrapper>

      <SectionWrapper id="certifications" title="Certifications" number="06">
        <Certification />
      </SectionWrapper>

      <SectionWrapper id="contact" title="Get In Touch" number="07">
        <Contact />
      </SectionWrapper>
    </>
  );
}

function SectionWrapper({
  id,
  title,
  number,
  children,
}: {
  id: string;
  title: string;
  number: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
      <div className="mb-10 flex items-center gap-3">
        <span className="font-mono text-primary">{number}.</span>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <div className="ml-4 h-px flex-1 bg-border" />
      </div>
      {children}
    </section>
  );
}
