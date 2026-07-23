import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, ArrowUpRight, Mail, Phone, MapPin, Github } from "lucide-react";

import projectLibrary from "/inbcasLibrary.png";
import projectExam from "/uniquest.png";
import projectStudent from "/infoGenerator.png";
import projectFirst from "/strokeRisk.png";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const OnlineJobsIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
    <rect x="3" y="4" width="18" height="14" rx="3" />
    <path d="M8 4v3M16 4v3M8 12h8M8 16h5" />
  </svg>
);

const skills = [
  { label: "Frontend", items: ["Next.js / React", "HTML / CSS / JS", "Tailwind CSS"] },
  { label: "Backend", items: ["PHP / MySQL", "REST API Integration", "Node.js"] },
  { label: "Database", items: ["PostgreSQL", "Supabase", "MySQL"] },
  { label: "AI Tools", items: ["ChatGPT / Claude", "GitHub Copilot", "Deepseek"] },
  { label: "Version Control", items: ["Git", "GitHub"] },
  { label: "Other", items: ["Chrome Extensions", "Google AppScript"] },
];

const projects = [
  {
    n: "01",
    title: "Library Management with AI Chatbot",
    image: projectLibrary,
    tags: ["Next.js", "Supabase", "OSS 120b API"],
    description:
      "A full-stack library management system featuring an AI-powered chatbot that answers user questions about books, availability, and genres. Built for a school librarian to streamline management and improve user experience.",
    features: "Book CRUD, AI chatbot, auth, responsive Shadcn UI",
    challenge: "Identified need for RAG to give the chatbot direct database access",
    featured: true,
  },
  {
    n: "02",
    title: "LLM-Powered Exam Generator",
    image: projectExam,
    tags: ["Chrome API", "LLM API", "Google AppScript"],
    description:
      "Thesis project. A Chrome Extension that extracts content from any webpage and generates SOLO taxonomy-based exams using an LLM API, then auto-populates Google Forms with the generated questions.",
    features: "Content extraction, exam generation, Forms integration",
    challenge: "Managed API rate limits via prompt optimization and retry logic",
    featured: true,
  },
  {
    n: "03",
    title: "Student Info Generator",
    image: projectStudent,
    tags: ["PHP", "MySQL", "HTML/CSS"],
    description:
      "Built during OJT for a school guidance counselor to generate student information reports quickly and efficiently.",
    features: "Data management, information generation, search & filter",
    challenge: "Script permission and authorization, and case sensitivity",
  },
  {
    n: "04",
    title: "Stroke Risk Prediction Web Project",
    image: projectFirst,
    tags: ["PHP", "MySQL", "XAMPP", "Machine Learning"],
    description:
      "My first functional web application with machine learning integration — a simple system built with XAMPP and PHP that predicts a person's stroke risk percentage based on symptoms.",
    features: "CRUD operations, database connectivity, ML prediction",
    challenge: "Learning the request-response cycle end to end while training and integrating a model",
  },
];

const experience = [
  {
    role: "Student Developer (Thesis)",
    org: "Self-Directed",
    period: "School Year 2025-2026",
    body: "Built a Chrome Extension with LLM API integration and Google Forms connectivity. Managed the entire project lifecycle independently — planning, implementation, prompt engineering, and deployment.",
    active: true,
  },
  {
    role: "OJT Developer",
    org: "Inabanga College of Arts and Sciences",
    period: "Summer 2025",
    body: "Developed a Student Info Generator for the guidance counselor using Google Apps Script. Delivered a working tool used to speed up report generation for real staff workflows.",
    active: false,
  },
];

function RevealSection({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const isMobileView = window.matchMedia("(max-width: 768px)").matches;

    if (isMobileView) {
      const timer = window.setTimeout(() => setIsVisible(true), 120);
      return () => window.clearTimeout(timer);
    }

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 sm:translate-y-8"}`}
    >
      {children}
    </section>
  );
}

function Portfolio() {
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-bg text-brand-text antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-brand-bg/80 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <a href="#top" className="font-medium tracking-tight text-sm sm:text-base flex-shrink-0">
            Joshua Nioda<span className="text-brand-accent">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-muted">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-brand-text transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 bg-brand-text text-brand-bg px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-widest hover:bg-brand-accent transition-colors"
            >
              Hire me
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex md:hidden items-center justify-center h-10 w-10 rounded-sm border border-black/10 bg-brand-bg text-brand-text shadow-sm"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-black/5 bg-brand-bg">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm font-medium text-brand-text border-b border-black/5 last:border-0"
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center bg-brand-text text-brand-bg px-4 py-3 rounded-sm text-xs font-mono uppercase tracking-widest"
              >
                Hire me
              </a>
            </nav>
          </div>
        )}
      </header>

      <main id="top">
        {/* HERO */}
        <RevealSection className="py-20 sm:py-28 lg:py-36 border-b border-black/5">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            {/* Mobile: show image card directly under header */}
            <div className="md:hidden flex justify-center mb-6">
              <div className="relative h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72 rounded-2xl overflow-hidden ring-1 ring-black/5 bg-brand-bg">
                <div className="h-6 bg-zinc-100/80 flex items-center gap-2 px-3 rounded-t-xl">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                </div>
                <div className="h-full rounded-b-xl overflow-hidden bg-white/5">
                  <img src="/joshGrey.png" alt="Joshua Nioda" loading="lazy" className="w-full h-full object-cover object-center transition-transform" style={{ objectPosition: '50% 20%' }} />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex-1 min-w-0">
                <div className="inline-flex flex-wrap items-center gap-2 self-start px-2.5 py-1 rounded-full bg-brand-accent/5 text-brand-accent text-[11px] font-mono">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
                  </span>
                  <MapPin className="h-3 w-3" /> Bohol, Philippines · Available for hire
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-balance max-w-full sm:max-w-[18ch]">
                  Web Developer &amp; AI Integration Specialist
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-brand-muted max-w-[58ch] text-pretty leading-relaxed">
                  I'm Joshua — I build AI-powered applications with Next.js and modern web
                  technologies. Focused on bridging the gap between LLM capabilities and practical
                  user interfaces.
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 bg-brand-text text-brand-bg px-5 py-3 rounded-sm text-sm font-medium hover:bg-brand-accent transition-colors ring-1 ring-brand-text"
                  >
                    View My Work <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/Joshua_Nioda_Resume.pdf"
                    download
                    className="inline-flex items-center gap-2 bg-transparent text-brand-text px-5 py-3 rounded-sm text-sm font-medium border border-black/10 hover:bg-black/5 transition-colors"
                  >
                    Download CV
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-transparent text-brand-text px-5 py-3 rounded-sm text-sm font-medium border border-black/10 hover:bg-black/5 transition-colors"
                  >
                    Contact Me
                  </a>
                </div>

                <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-black/5 max-w-3xl">
                  {[
                    ["Role", "Web Dev + AI"],
                    ["Stack", "Next.js / Supabase"],
                    ["Grad.", "June 2026"],
                    ["IQ Test", "Top 23.7%"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[10px] font-mono uppercase tracking-widest text-brand-muted">
                        {k}
                      </dt>
                      <dd className="mt-1.5 text-sm font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex-shrink-0 hidden md:block">
                <div className="relative h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-80 lg:w-80 rounded-2xl overflow-hidden ring-1 ring-black/5 bg-brand-bg">
                  <div className="h-6 bg-zinc-100/80 flex items-center gap-2 px-3">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="h-2 w-2 rounded-full bg-yellow-400" />
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 overflow-hidden rounded-b-xl">
                    <img src="/joshGrey.png" alt="Joshua Nioda" className="w-full h-full object-cover object-center transition-transform" style={{ objectPosition: '50% 35%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* WORK */}
        <RevealSection id="work" className="py-20 sm:py-24 bg-brand-surface">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
              <div>
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-brand-muted mb-2">
                  // Selected Works
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                  Intelligence-driven interfaces
                </h2>
              </div>
              <p className="text-sm text-brand-muted max-w-xs">
                Four projects spanning AI integration, full-stack development, and real
                client-facing tools.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {projects.map((p) => (
                <article
                  key={p.n}
                  className="group flex flex-col gap-5 p-1.5 bg-brand-bg rounded-xl ring-1 ring-black/5 hover:ring-brand-accent/40 transition-all"
                >
                  <div className="relative overflow-hidden rounded-[10px] bg-zinc-100 outline-1 -outline-offset-1 outline-black/5">
                    <img
                      src={p.image}
                      alt={`${p.title} preview`}
                      width={1280}
                      height={800}
                      loading="lazy"
                      className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-sm bg-brand-bg/90 backdrop-blur text-[10px] font-mono text-brand-muted">
                      /{p.n}
                    </span>
                    {p.featured && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-sm bg-brand-accent text-brand-bg text-[10px] font-mono uppercase tracking-widest">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-zinc-100 text-[10px] font-mono rounded border border-zinc-200 text-brand-text"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-sm text-brand-muted mb-5 text-pretty leading-relaxed">
                      {p.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-5 border-t border-black/5">
                      <div>
                        <p className="text-[10px] font-mono uppercase text-brand-muted mb-1">
                          Features
                        </p>
                        <p className="text-xs leading-relaxed">{p.features}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase text-brand-muted mb-1">
                          Challenge
                        </p>
                        <p className="text-xs leading-relaxed">{p.challenge}</p>
                      </div>
                    </div>
                    {p.links?.length ? (
                      <div className="flex flex-wrap gap-4 mt-5 pt-5 border-t border-black/5">
                        {p.links.map((l) => (
                          <a
                            key={l.label}
                            href={l.href}
                            className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-brand-text hover:text-brand-accent transition-colors"
                          >
                            {l.label} <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* ABOUT / SKILLS / EXPERIENCE */}
        <RevealSection id="about" className="py-20 sm:py-24 border-t border-black/5">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-brand-muted mb-6 sm:mb-8">
                  // Background
                </p>
                <p className="text-xl sm:text-2xl leading-snug font-medium mb-6 text-pretty">
                  I'm a Computer Science graduate (June 2026) with a passion for building
                  AI-powered applications that solve real problems.
                </p>
                <p className="text-brand-muted max-w-[58ch] text-pretty mb-10 leading-relaxed">
                  I've built projects from scratch — including a Chrome Extension with LLM API
                  integration and a Library Management System with an AI chatbot. I'm comfortable
                  with the full development lifecycle, from planning to deployment, and I thrive on
                  learning new technologies quickly.
                </p>

                <div id="skills" className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-6 pt-10 border-t border-black/5">
                  {skills.map((s) => (
                    <div key={s.label}>
                      <p className="text-xs font-mono text-brand-accent mb-3 uppercase tracking-widest">
                        {s.label}
                      </p>
                      <ul className="text-sm space-y-1.5 text-brand-muted">
                        {s.items.map((i) => (
                          <li key={i}>{i}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <aside id="experience" className="lg:col-span-5 flex flex-col gap-8">
                <div className="p-6 sm:p-8 bg-brand-surface rounded-lg ring-1 ring-black/5">
                  <h3 className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-brand-muted mb-6">
                    // Experience
                  </h3>
                  <div className="space-y-8">
                    {experience.map((x) => (
                      <div key={x.role} className="relative pl-6 border-l border-zinc-200">
                        <div
                          className={`absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full ${x.active ? "bg-brand-accent" : "bg-zinc-300"
                            }`}
                        />
                        <p className="text-sm font-semibold">{x.role}</p>
                        <p className="text-xs text-brand-muted mb-2 font-mono">
                          {x.org} · {x.period}
                        </p>
                        <p className="text-xs text-brand-muted leading-relaxed">{x.body}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-brand-muted mt-10 mb-5">
                    // Education
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold">BS Computer Science</p>
                      <p className="text-xs text-brand-muted font-mono mt-1">Class of 2026</p>
                      <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                        Relevant coursework: Software Development, Database Management, Machine
                        Learning, Web Development, API Integration.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-black/5">
                      <p className="text-[10px] font-mono text-brand-accent mb-1 uppercase tracking-widest">
                        Achievement
                      </p>
                      <div className="space-y-2 text-xs text-brand-muted">
                        <p>
                          <span className="font-semibold text-brand-text">RiotIQ</span> · IQ Score: 111
                          <span className="text-brand-accent"> ±4.9</span>
                        </p>
                        <p>Percentile: Top 23.7%</p>
                        <p>Test Type: OnlineJobs</p>
                        <p>English: C2 (Advanced/Mastery)</p>
                        <p>DISC: Dominance 33% · Influence 7% · Steadiness 34% · Compliance 26%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </RevealSection>

        {/* CONTACT */}
        <RevealSection id="contact" className="py-20 sm:py-24 bg-brand-text text-brand-bg">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="max-w-[42ch]">
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
                  // Contact
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-5 text-balance">
                  Let's build something intelligent.
                </h2>
                <p className="text-zinc-400 text-pretty leading-relaxed">
                  Open to software engineering and AI integration roles — remote or based in the
                  Philippines. Fastest reply via email.
                </p>
              </div>

              <div className="flex flex-col divide-y divide-zinc-800">
                <ContactRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value="joshniodz1@gmail.com"
                  href="mailto:joshniodz1@gmail.com"
                />
                <ContactRow
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone"
                  value="0929-625-2418"
                  href="tel:+639296252418"
                />
                <ContactRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Location"
                  value="Bohol, Philippines"
                />
                <ContactRow
                  icon={<Github className="h-4 w-4" />}
                  label="GitHub"
                  value="github.com/JuiceNewdz"
                  href="https://github.com/JuiceNewdz"
                />
                <div className="py-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2.5 text-[10px] font-mono uppercase text-zinc-500 tracking-widest shrink-0">
                      <span className="text-zinc-600">
                        <OnlineJobsIcon />
                      </span>
                      OnlineJobs
                    </span>
                    <div className="flex flex-col items-end gap-1 text-right">
                      <a
                        href="https://www.onlinejobs.ph/jobseekers/info/5083111"
                        className="text-sm sm:text-base font-medium text-brand-bg hover:text-brand-accent transition-colors"
                      >
                        onlinejobs.ph/jobseekers/info/5083111
                      </a>
                      <a
                        href="https://onlinejobs.riotiq.com/app/share/444b4ff0-2ac3-4cba-9f4b-e23a33a18c40"
                        className="text-xs text-zinc-400 hover:text-brand-accent transition-colors"
                      >
                        RiotIQ official results
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center text-[10px] font-mono uppercase text-zinc-500 tracking-widest">
              <span>© 2026 Joshua Nioda</span>
              <span>Built with Next.js · Designed in Bohol</span>
            </div>
          </div>
        </RevealSection>
      </main>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center justify-between py-4 gap-4 group">
      <span className="flex items-center gap-2.5 text-[10px] font-mono uppercase text-zinc-500 tracking-widest shrink-0">
        <span className="text-zinc-600">{icon}</span>
        {label}
      </span>
      <span className="text-sm sm:text-base font-medium text-brand-bg group-hover:text-brand-accent transition-colors truncate">
        {value}
      </span>
    </div>
  );
  return href ? (
    <a href={href} className="block">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}
