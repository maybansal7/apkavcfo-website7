import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Building2,
  Check,
  ChevronDown,
  Globe2,
  Landmark,
  LineChart,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Rocket,
  Settings2,
  ShieldCheck,
  Wallet,
  X,
} from "lucide-react";

import founderPhoto from "@/assets/mayank-bansal-photo.jpg";
import logo from "@/assets/apka-vcfo-logo-final.png";

const PHONE = "+91 99676 46344";
const whatsappUrl =
  "https://wa.me/919967646344?text=Hi%20CA%20Mayank%2C%20I%20found%20your%20website%20and%20would%20like%20to%20book%20a%20free%20consultation.";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Who I Serve", href: "#markets" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

const heroStats = [
  { value: "11+", label: "Years in finance leadership" },
  { value: "3", label: "Countries served — IN · US · UAE" },
  { value: "30+", label: "Finance & automation services" },
];

const trustBadges = [
  "Chartered Accountant — ICAI",
  "QuickBooks Online Certified ProAdvisor",
  "A2X Certified Partner",
];

const toolsStrip = ["QuickBooks", "Microsoft Excel", "Power Query", "Tally Prime", "Zoho Books", "Xero", "n8n"];

type Pillar = { icon: LucideIcon; index: string; title: string; blurb: string; items: string[] };

const pillars: Pillar[] = [
  {
    icon: BarChart3,
    index: "01",
    title: "Strategic Finance",
    blurb: "The numbers that drive decisions — not just compliance.",
    items: ["P&L management & analysis", "Profitability mapping by product/client", "Pricing & margin engineering", "Budgeting & variance analysis"],
  },
  {
    icon: Wallet,
    index: "02",
    title: "Operational Control",
    blurb: "Cash, working capital and reporting under control every month.",
    items: ["Cash-flow forecasting", "Working capital optimization", "Monthly MIS & board pack", "Receivables & payables discipline"],
  },
  {
    icon: Settings2,
    index: "03",
    title: "Automation & Systems",
    blurb: "Finance that runs on systems, not manual grunt work.",
    items: ["Excel + Power Query tools", "Bank statement → GL conversion", "QuickBooks / Tally setup", "n8n workflow automation"],
  },
  {
    icon: Globe2,
    index: "04",
    title: "International",
    blurb: "CPA-firm-grade backend for US and UAE clients.",
    items: ["US bookkeeping (QuickBooks)", "US financial statements & payroll", "UAE VAT filing & compliance", "IFRS-aligned reporting"],
  },
];

const gapRows = [
  { without: "Reports arrive 15+ days late — you decide blind", withUs: "Monthly MIS on a fixed date, every month" },
  { without: "One blended margin hides where money leaks", withUs: "Profit by product, client and channel" },
  { without: "Profitable on paper, but cash keeps vanishing", withUs: "Rolling cash-flow forecast and runway view" },
  { without: "Bookkeeping is manual, delayed and error-prone", withUs: "Automated bank-to-GL and reconciliation SOPs" },
];

const markets = [
  {
    icon: Building2,
    tag: "India — primary",
    title: "Indian MSMEs & Startups",
    sub: "₹1 Cr – ₹50 Cr revenue",
    points: ["Virtual CFO & monthly MIS", "Cash flow, budgeting & P&L", "GST, TDS & compliance", "Government funding (MUDRA, CGTMSE, PMEGP)"],
  },
  {
    icon: Landmark,
    tag: "USA",
    title: "US Accounting Firms",
    sub: "CPA firm backend support",
    points: ["QuickBooks Online bookkeeping", "Bank reconciliation & GL cleanup", "Financial statement preparation", "Month-end close & reporting"],
  },
  {
    icon: Globe2,
    tag: "UAE",
    title: "UAE Businesses",
    sub: "VAT & corporate tax ready",
    points: ["VAT registration & filing", "FTA-compliant bookkeeping", "Corporate tax preparation", "IFRS financial reporting"],
  },
];

const steps = [
  { n: "01", title: "Discovery Call", desc: "A free 30-minute call to understand your numbers, pain points and goals." },
  { n: "02", title: "System Audit", desc: "A deep review of your books, tools, reporting gaps and compliance status." },
  { n: "03", title: "Custom Roadmap", desc: "A tailored Virtual CFO or automation plan with clear deliverables and transparent pricing." },
  { n: "04", title: "Execution & Reporting", desc: "Dashboards, monthly MIS, compliance support and automation — delivered on cadence." },
];

const deliverables = [
  "Monthly MIS & board-ready pack",
  "Rolling cash-flow forecast",
  "Budget vs actual variance report",
  "Profitability by product & client",
  "GST / TDS compliance tracking",
  "Automated bank-to-GL reporting",
];

const founderSkills = [
  "Advanced Financial Modeling",
  "QuickBooks Online Expert",
  "Excel + Power Query Automation",
  "US & UAE Accounting",
  "GST, TDS & Indian Compliance",
  "AI & Automation Tools",
];

const faqs = [
  {
    q: "What exactly is a Virtual CFO?",
    a: "A Virtual CFO gives you the financial leadership of a full-time CFO — reporting, cash-flow control, planning and systems — on a flexible, part-time basis, at a fraction of the cost of a full-time hire.",
  },
  {
    q: "Who is this a good fit for?",
    a: "Growing Indian MSMEs and startups (roughly ₹1–50 Cr revenue) that have outgrown basic accounting, and US/UAE firms that need a reliable, process-driven offshore finance backend.",
  },
  {
    q: "How is this different from my current accountant or Tally?",
    a: "Your accountant records the past for compliance. I build the systems and reporting that tell you what to do next — margins, cash, and decision-ready monthly numbers that go beyond what Tally or spreadsheets show.",
  },
  {
    q: "How does pricing work?",
    a: "Every engagement starts with a free discovery call and a system audit. You then get a custom roadmap with clear deliverables and transparent, scope-based pricing — no obligation.",
  },
  {
    q: "Do you work with US and UAE clients?",
    a: "Yes. Alongside Indian MSMEs, I provide CPA-firm backend support in the US (QuickBooks bookkeeping, statements, payroll) and VAT / IFRS work for UAE businesses.",
  },
];

const useReveal = () => {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

const Eyebrow = ({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) => (
  <span className={`eyebrow ${muted ? "eyebrow--muted" : ""}`}>
    <span className="h-px w-8 bg-current opacity-60" />
    {children}
  </span>
);

const ApkaVcfoSite = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="top" className="overflow-x-hidden">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b bg-[hsl(var(--paper)/0.92)] backdrop-blur transition-colors duration-200 ${
          scrolled ? "border-border" : "border-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          <a href="#top" className="flex items-center gap-2" aria-label="ApkaVCFO home">
            <img src={logo} alt="ApkaVCFO logo" className="h-9 w-auto object-contain md:h-10" />
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((i) => (
              <a key={i.href} href={i.href} className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
                {i.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-accent">
              Book Free Call <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-border bg-[hsl(var(--paper))] lg:hidden">
            <div className="container-x flex flex-col gap-1 py-4">
              {navItems.map((i) => (
                <a key={i.href} href={i.href} onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-base font-medium text-foreground/80 hover:bg-foreground/5">
                  {i.label}
                </a>
              ))}
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-accent mt-2">
                Book Free Call <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section className="grid-texture relative bg-[hsl(var(--ink))] pt-28 text-[hsl(var(--paper))] md:pt-36">
          <div className="container-x section pt-8 md:pt-10">
            <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="reveal">
                <Eyebrow>CA Mayank Bansal · ICAI </Eyebrow>
                <h1 className="mt-6 text-5xl font-bold leading-[0.98] tracking-tight text-balance md:text-7xl">
                  Finance,<br />
                  <span className="text-accent">systemized</span> and<br />
                  built to scale.
                </h1>
                <p className="mt-7 max-w-xl text-lg leading-8 text-[hsl(var(--paper)/0.72)]">
                  Virtual CFO services and financial automation for Indian MSMEs, US CPA firms and UAE businesses — clean monthly numbers, tighter cash flow, and systems that go beyond Tally and spreadsheets.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-accent btn-lg">
                    Book Free WhatsApp Consultation <ArrowRight className="h-5 w-5" />
                  </a>
                  <a href="#services" className="btn-outline btn-lg text-[hsl(var(--paper))]">
                    Explore Services
                  </a>
                </div>
                <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2">
                  {trustBadges.map((b) => (
                    <span key={b} className="inline-flex items-center gap-2 text-sm text-[hsl(var(--paper)/0.7)]">
                      <ShieldCheck className="h-4 w-4 text-accent" /> {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="reveal grid gap-4">
                {heroStats.map((s) => (
                  <div key={s.label} className="flex items-end justify-between gap-6 rounded-md border-2 border-[hsl(var(--paper)/0.14)] px-6 py-6">
                    <div>
                      <p className="text-sm text-[hsl(var(--paper)/0.6)]">{s.label}</p>
                    </div>
                    <div className="stat-num text-5xl text-[hsl(var(--paper))] md:text-6xl">{s.value}</div>
                  </div>
                ))}
                <div className="flex items-center gap-3 rounded-md bg-accent px-6 py-4 text-accent-foreground">
                  <LineChart className="h-5 w-5" />
                  <span className="text-sm font-semibold">"Profit is the result of disciplined systems — not luck."</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-b border-border bg-[hsl(var(--paper))]">
          <div className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6 md:justify-between">
            <span className="font-mono2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Works with</span>
            {toolsStrip.map((t) => (
              <span key={t} className="text-sm font-semibold text-foreground/70">{t}</span>
            ))}
          </div>
        </section>

        {/* THE GAP */}
        <section className="section bg-[hsl(var(--paper))]">
          <div className="container-x">
            <div className="reveal max-w-2xl">
              <Eyebrow>The gap</Eyebrow>
              <h2 className="mt-5 text-4xl font-bold tracking-tight text-balance md:text-5xl">
                Most businesses record the past. Few build for what's next.
              </h2>
            </div>
            <div className="reveal mt-12 overflow-hidden rounded-lg border-2 border-border">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="border-b-2 border-border bg-secondary/50 p-6 md:border-b-0 md:border-r-2">
                  <p className="font-mono2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Without a CFO layer</p>
                </div>
                <div className="bg-[hsl(var(--ink))] p-6 text-[hsl(var(--paper))]">
                  <p className="font-mono2 text-xs font-bold uppercase tracking-[0.18em] text-accent">With ApkaVCFO</p>
                </div>
              </div>
              {gapRows.map((r) => (
                <div key={r.without} className="grid grid-cols-1 border-t-2 border-border md:grid-cols-2">
                  <div className="flex items-start gap-3 p-6">
                    <Minus className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                    <p className="text-[15px] leading-7 text-foreground/80">{r.without}</p>
                  </div>
                  <div className="flex items-start gap-3 border-t-2 border-border bg-[hsl(var(--ink))] p-6 text-[hsl(var(--paper))] md:border-l-2 md:border-t-0">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <p className="text-[15px] leading-7 text-[hsl(var(--paper)/0.85)]">{r.withUs}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section scroll-mt-20 border-t border-border bg-[hsl(var(--paper))]">
          <div className="container-x">
            <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>What I do</Eyebrow>
                <h2 className="mt-5 text-4xl font-bold tracking-tight text-balance md:text-5xl">
                  Four pillars. One integrated finance function.
                </h2>
              </div>
              <p className="max-w-sm text-muted-foreground">
                30+ services across strategy, control, automation and international accounting — run as one system.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <article key={p.title} className="reveal card-sharp p-7 md:p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[hsl(var(--ink))] text-[hsl(var(--paper))]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="stat-num text-4xl text-border">{p.index}</span>
                    </div>
                    <h3 className="mt-6 text-2xl font-bold">{p.title}</h3>
                    <p className="mt-2 text-muted-foreground">{p.blurb}</p>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {p.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-[15px] text-foreground/80">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {it}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHO I SERVE */}
        <section id="markets" className="grid-texture section scroll-mt-20 bg-[hsl(var(--ink))] text-[hsl(var(--paper))]">
          <div className="container-x">
            <div className="reveal max-w-2xl">
              <Eyebrow>Who I serve</Eyebrow>
              <h2 className="mt-5 text-4xl font-bold tracking-tight text-balance md:text-5xl">One practice. Three markets.</h2>
              <p className="mt-4 text-[hsl(var(--paper)/0.7)]">India-first, with a dedicated international accounting backend for US and UAE clients.</p>
            </div>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {markets.map((m) => {
                const Icon = m.icon;
                return (
                  <article key={m.title} className="reveal rounded-md border-2 border-[hsl(var(--paper)/0.14)] p-7 transition-colors hover:border-accent/60">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent text-accent-foreground">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono2 text-xs uppercase tracking-[0.18em] text-accent">{m.tag}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold">{m.title}</h3>
                    <p className="mt-1 text-sm text-[hsl(var(--paper)/0.6)]">{m.sub}</p>
                    <ul className="mt-6 space-y-3">
                      {m.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-sm text-[hsl(var(--paper)/0.82)]">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {pt}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="section scroll-mt-20 bg-[hsl(var(--paper))]">
          <div className="container-x">
            <div className="reveal max-w-2xl">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-5 text-4xl font-bold tracking-tight text-balance md:text-5xl">From chaos to clarity in four steps.</h2>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-lg border-2 border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div key={s.n} className="reveal bg-[hsl(var(--paper))] p-7">
                  <span className="stat-num text-5xl text-accent">{s.n}</span>
                  <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section className="section bg-[hsl(var(--paper))]">
          <div className="container-x">
            <div className="reveal grid gap-10 rounded-lg border-2 border-border p-8 md:grid-cols-[1fr_1.2fr] md:p-12">
              <div>
                <Eyebrow>Every month, you get</Eyebrow>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-balance md:text-4xl">
                  Decision-ready reporting, on a fixed cadence.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  No more waiting weeks for numbers you can't act on. A consistent pack that tells you where the business actually stands.
                </p>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-ink mt-8">
                  See what your MIS could look like <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3 rounded-md border border-border bg-secondary/40 p-4 text-[15px] font-medium">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="grid-texture section scroll-mt-20 bg-[hsl(var(--ink))] text-[hsl(var(--paper))]">
          <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="reveal">
              <div className="overflow-hidden rounded-lg border-2 border-[hsl(var(--paper)/0.16)]">
                <img src={founderPhoto} alt="CA Mayank Bansal, founder of ApkaVCFO, Udaipur" className="aspect-[4/5] w-full object-cover" loading="lazy" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-accent px-3 py-1.5 font-mono2 text-xs font-bold uppercase tracking-wider text-accent-foreground">CA — ICAI</span>
                <span className="rounded-md border border-[hsl(var(--paper)/0.2)] px-3 py-1.5 font-mono2 text-xs font-bold uppercase tracking-wider text-[hsl(var(--paper)/0.85)]">QuickBooks ProAdvisor</span>
              </div>
            </div>
            <div className="reveal">
              <Eyebrow>The founder</Eyebrow>
              <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">CA Mayank Bansal</h2>
              <p className="mt-2 text-xl text-[hsl(var(--paper)/0.82)]">Systems architect. Not just a CA.</p>
              <p className="mt-7 max-w-2xl leading-8 text-[hsl(var(--paper)/0.72)]">
                A Chartered Accountant with 11+ years of experience who builds financial systems — not just files returns. From Udaipur, Mayank serves clients across India, the USA and the UAE, delivering CFO-level thinking at MSME-friendly investment.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {founderSkills.map((s) => (
                  <div key={s} className="flex items-center gap-3 rounded-md border border-[hsl(var(--paper)/0.14)] px-4 py-3">
                    <Check className="h-4 w-4 shrink-0 text-accent" />
                    <span className="text-sm text-[hsl(var(--paper)/0.85)]">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section scroll-mt-20 bg-[hsl(var(--paper))]">
          <div className="container-x grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="reveal">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-5 text-4xl font-bold tracking-tight text-balance md:text-5xl">Questions, answered.</h2>
              <p className="mt-4 text-muted-foreground">Still unsure? A free discovery call is the fastest way to get clarity.</p>
            </div>
            <div className="reveal divide-y-2 divide-border border-y-2 border-border">
              {faqs.map((f, i) => {
                const active = openFaq === i;
                return (
                  <div key={f.q}>
                    <button
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                      onClick={() => setOpenFaq(active ? null : i)}
                      aria-expanded={active}
                    >
                      <span className="text-lg font-semibold">{f.q}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-accent transition-transform ${active ? "rotate-180" : ""}`} />
                    </button>
                    {active && <p className="pb-6 pr-8 leading-7 text-muted-foreground">{f.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="contact" className="section scroll-mt-20 bg-[hsl(var(--paper))]">
          <div className="container-x">
            <div className="reveal grid gap-8 rounded-lg bg-[hsl(var(--ink))] p-8 text-[hsl(var(--paper))] md:grid-cols-[1.3fr_0.7fr] md:items-center md:p-14">
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
                  Ready for a finance system that actually works?
                </h2>
                <p className="mt-5 max-w-xl text-[hsl(var(--paper)/0.72)]">
                  Book a free 30-minute WhatsApp consultation. No obligation — just clarity on where your numbers stand and what to fix first.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-accent btn-lg">
                    <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
                  </a>
                  <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="btn-outline btn-lg text-[hsl(var(--paper))]">
                    <Phone className="h-5 w-5" /> {PHONE}
                  </a>
                </div>
              </div>
              <div className="rounded-md border-2 border-[hsl(var(--paper)/0.16)] p-6">
                <p className="font-mono2 text-xs uppercase tracking-[0.2em] text-[hsl(var(--paper)/0.6)]">Direct</p>
                <a href="mailto:Mayank@apkavcfo.com" className="mt-3 flex items-center gap-3 text-[hsl(var(--paper))] hover:text-accent">
                  <Mail className="h-5 w-5 text-accent" /> Mayank@apkavcfo.com
                </a>
                <p className="mt-4 flex items-center gap-3 text-[hsl(var(--paper)/0.8)]">
                  <MapPin className="h-5 w-5 text-accent" /> Udaipur, Rajasthan, India
                </p>
                <p className="mt-4 text-sm text-[hsl(var(--paper)/0.55)]">Response within 4 hours · Mon–Sat, 9am–7pm IST</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-[hsl(var(--paper))] py-14">
        <div className="container-x grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logo} alt="ApkaVCFO logo" className="h-10 w-auto object-contain" loading="lazy" />
            <p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">
              Virtual CFO & financial automation. From Udaipur, India — serving India, the USA and the UAE.
            </p>
          </div>
          <div>
            <h3 className="font-mono2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems.map((i) => (
                <li key={i.href}><a href={i.href} className="text-foreground/70 hover:text-accent">{i.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/70">
              <li>Virtual CFO & MIS</li>
              <li>Cash-flow management</li>
              <li>Excel & QuickBooks automation</li>
              <li>US bookkeeping · UAE VAT</li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/70">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> {PHONE}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> Mayank@apkavcfo.com</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Udaipur, Rajasthan</li>
            </ul>
          </div>
        </div>
        <div className="container-x mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} ApkaVCFO.com · CA Mayank Bansal</p>
          <p>Transforming financial complexity into strategic clarity.</p>
        </div>
      </footer>
    </div>
  );
};

export default ApkaVcfoSite;
