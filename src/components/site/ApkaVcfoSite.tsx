import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowRightLeft,
  BarChart3,
  BookOpenText,
  Bot,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Filter,
  Globe2,
  HandCoins,
  IndianRupee,
  Landmark,
  LayoutDashboard,
  Linkedin,
  ListChecks,
  Mail,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Phone,
  PhoneCall,
  PieChart,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Table2,
  Tags,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import founderPhoto from "@/assets/mayank-bansal-photo.jpg";
import logo from "@/assets/apka-vcfo-logo-final.png";
import AnimatedCounter from "@/components/site/AnimatedCounter";
import SectionReveal from "@/components/site/SectionReveal";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const whatsappUrl =
  "https://wa.me/919967646344?text=Hi%20CA%20Mayank%2C%20I%20found%20your%20website%20and%20would%20like%20to%20book%20a%20free%20consultation.";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Who I Serve", href: "#markets" },
  { label: "Automation", href: "#automation" },
  { label: "International", href: "#international" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

const trustBadges = [
  "US & UAE Clients Served",
  "QuickBooks + Excel Expert",
  "Automation & AI Tools",
];

const heroKpis = [
  { name: "Cash Flow", value: "₹ Positive", trend: "↑" },
  { name: "Net Margin", value: "18.5%", trend: "↑" },
  { name: "Runway", value: "14 Months", trend: "→" },
];

const sparklineData = [
  { value: 10 },
  { value: 14 },
  { value: 12 },
  { value: 16 },
  { value: 18 },
  { value: 17 },
  { value: 21 },
];

const marketCards = [
  {
    icon: Building2,
    eyebrow: "India",
    title: "Indian MSMEs & Startups",
    subtitle: "₹1 Cr – ₹50 Cr Revenue Range",
    points: [
      "Virtual CFO & Monthly MIS",
      "Budgeting, Cash Flow, P&L",
      "GST, TDS & Compliance",
      "Government Funding (MUDRA, CGTMSE, PMEGP)",
      "Startup Valuation & ESOP",
    ],
  },
  {
    icon: Briefcase,
    eyebrow: "USA",
    title: "US Accounting Firms",
    subtitle: "CPA Firm Backend Support",
    points: [
      "QuickBooks Online Bookkeeping",
      "Bank Reconciliation & GL Cleanup",
      "Financial Statement Preparation",
      "Payroll Processing Support",
      "Month-end Close & Reporting",
    ],
  },
  {
    icon: Globe2,
    eyebrow: "UAE",
    title: "UAE Businesses",
    subtitle: "VAT & Corporate Tax Ready",
    points: [
      "UAE VAT Registration & Filing",
      "FTA-Compliant Bookkeeping",
      "Corporate Tax Preparation",
      "Financial Reporting (IFRS)",
      "Business Setup Financial Advisory",
    ],
  },
];

const serviceCategories = [
  "All",
  "Strategic Finance",
  "Operational Control",
  "Automation & Systems",
  "International",
  "Growth & Funding",
] as const;

type ServiceCategory = (typeof serviceCategories)[number];

type Service = {
  category: Exclude<ServiceCategory, "All">;
  icon: LucideIcon;
  title: string;
  description: string;
};

type DashboardView = "monthly" | "quarterly";
type DashboardSegment = "All Clients" | "India MSMEs" | "US & UAE";
type DashboardFocus = "profitability" | "cashflow" | "controls";

type DashboardDatum = {
  label: string;
  revenue: number;
  margin: number;
  cash: number;
  receivables: number;
  variance: number;
};

const services: Service[] = [
  { category: "Strategic Finance", icon: BarChart3, title: "P&L Management & Analysis", description: "Turn raw numbers into monthly performance narratives and decision-ready insights." },
  { category: "Strategic Finance", icon: PieChart, title: "Profitability Mapping", description: "Pinpoint margin drivers by product, client, channel, and geography." },
  { category: "Strategic Finance", icon: Tags, title: "Pricing Strategy & Margin Engineering", description: "Rework pricing logic so growth compounds profit instead of complexity." },
  { category: "Strategic Finance", icon: Landmark, title: "Tax Planning & Optimization", description: "Plan tax exposures early and structure transactions with foresight." },
  { category: "Strategic Finance", icon: ShieldCheck, title: "Risk Identification & Mitigation", description: "Surface operational and finance risks before they disrupt scale." },
  { category: "Strategic Finance", icon: Target, title: "Budgeting & Variance Analysis", description: "Create accountable budgets and explain the gap between plan and reality." },
  { category: "Operational Control", icon: Wallet, title: "Cash Flow Forecasting", description: "Stay ahead of cash crunches with rolling forecasts and weekly visibility." },
  { category: "Operational Control", icon: ArrowRightLeft, title: "Working Capital Optimization", description: "Release trapped cash across receivables, payables, and inventory cycles." },
  { category: "Operational Control", icon: Package, title: "Inventory & Stock Management", description: "Improve stock discipline and reduce hidden carrying cost leakage." },
  { category: "Operational Control", icon: HandCoins, title: "Debt Structuring & Management", description: "Organize debt intelligently to protect runway and funding flexibility." },
  { category: "Operational Control", icon: LayoutDashboard, title: "Monthly MIS & Board Pack", description: "Get concise dashboards and leadership-ready reporting every month." },
  { category: "Operational Control", icon: FileText, title: "Accounts Payable/Receivable Management", description: "Tighten collections and payment control without slowing the business." },
  { category: "Automation & Systems", icon: Table2, title: "Excel + Power Query Custom Tools", description: "Custom-built finance tools that automate reporting without ERP bloat." },
  { category: "Automation & Systems", icon: Zap, title: "QuickBooks Online Setup & Automation", description: "Set up clean ledgers, rules, mappings, and repeatable reporting flows." },
  { category: "Automation & Systems", icon: ArrowRightLeft, title: "Bank Statement → GL Conversion Tool", description: "Convert raw bank data into categorized accounting output in minutes." },
  { category: "Automation & Systems", icon: Bot, title: "N8N / Zapier Workflow Automation", description: "Automate approvals, alerts, follow-ups, and recurring data movement." },
  { category: "Automation & Systems", icon: LayoutDashboard, title: "Custom KPI Dashboard Building", description: "Turn finance data into dashboards your founders and managers will actually use." },
  { category: "Automation & Systems", icon: ListChecks, title: "Internal SOP Documentation", description: "Document finance processes so reporting stays consistent as teams grow." },
  { category: "Automation & Systems", icon: Settings2, title: "ERP & Tally Configuration", description: "Align your accounting stack with reporting, compliance, and control needs." },
  { category: "International", icon: Globe2, title: "US Bookkeeping (QuickBooks Online)", description: "Accurate books delivered with turnaround and standards CPA firms expect." },
  { category: "International", icon: Users, title: "US Payroll Processing Support", description: "Support payroll workflows and month-end close with dependable execution." },
  { category: "International", icon: FileText, title: "US Financial Statement Preparation", description: "Produce clean statements, schedules, and reporting packs for US clients." },
  { category: "International", icon: Landmark, title: "UAE VAT Filing & Compliance", description: "Stay ready for VAT timelines, reconciliations, and FTA scrutiny." },
  { category: "International", icon: BookOpenText, title: "UAE Bookkeeping & IFRS Reporting", description: "Maintain IFRS-aligned books with documentation and reporting discipline." },
  { category: "International", icon: Briefcase, title: "CPA Firm Backend Support", description: "Extend your accounting team with a responsive, process-driven offshore backend." },
  { category: "Growth & Funding", icon: Rocket, title: "Startup Valuation", description: "Build credible valuation logic for pre-revenue and growth-stage fundraising." },
  { category: "Growth & Funding", icon: Search, title: "Investor Readiness & Due Diligence Prep", description: "Prepare books and data rooms so investor scrutiny feels effortless." },
  { category: "Growth & Funding", icon: Users, title: "ESOP Structuring & Advisory", description: "Design practical ESOP structures aligned to talent and growth goals." },
  { category: "Growth & Funding", icon: Building2, title: "Government Funding Schemes Advisory", description: "Navigate MSME and startup schemes with sharper eligibility and documentation." },
  { category: "Growth & Funding", icon: TrendingUp, title: "Pitch Deck Financials & Projections", description: "Translate strategy into investor-facing financial models that hold up." },
];

const automationCards = [
  {
    icon: ArrowRightLeft,
    title: "Bank PDF → General Ledger",
    description:
      "Upload a raw bank statement PDF and get a categorized General Ledger ready for accounting software — in minutes, not hours.",
    tag: "Excel + Power Query",
  },
  {
    icon: Table2,
    title: "Custom Excel Financial Tools",
    description:
      "QuickBooks-grade financial reporting inside Excel with tailored invoice tools, reconciliations, and MIS dashboards.",
    tag: "VBA + Power Query",
  },
  {
    icon: Bot,
    title: "N8N API Workflow Automation",
    description:
      "Connect your accounting stack with automated alerts, scheduled reporting, and data pipelines that keep finance moving.",
    tag: "N8N + API Integration",
  },
];

const toolsStrip = ["QuickBooks Online", "Microsoft Excel", "Power Query", "Tally Prime", "N8N", "Zoho Books", "Xero", "Google Sheets"];

const painPoints = [
  {
    label: "I don't know where my money is going",
    title: "Financial Clarity Package",
    solution: "We implement P&L Management, expense tracking, and monthly MIS so every rupee is tracked product-wise, client-wise, and category-wise.",
  },
  {
    label: "Profitable on paper, but no cash in hand",
    title: "Cash Flow Mastery",
    solution: "We fix the working capital gap with cash flow forecasting, receivables optimization, and weekly cash reports that drive action.",
  },
  {
    label: "My bookkeeping is always delayed or wrong",
    title: "Automation + Reconciliation System",
    solution: "We replace manual entry with bank-to-GL workflows, QuickBooks setup, and reconciliation SOPs that reduce error and delay.",
  },
  {
    label: "I want to raise investor funding soon",
    title: "Investor Readiness Package",
    solution: "We prepare due-diligence ready books, financial projections, pitch deck financials, and a startup valuation report.",
  },
  {
    label: "My US/UAE client books need cleanup",
    title: "International Accounting Track",
    solution: "Dedicated QuickBooks cleanup, bank reconciliation, and statement preparation delivered with CPA-firm level discipline.",
  },
];

const dashboardSegments: DashboardSegment[] = ["All Clients", "India MSMEs", "US & UAE"];

const dashboardFocusOptions: { id: DashboardFocus; label: string }[] = [
  { id: "profitability", label: "Profitability Lens" },
  { id: "cashflow", label: "Cash Flow Lens" },
  { id: "controls", label: "Control Lens" },
];

const dashboardData: Record<DashboardView, Record<DashboardSegment, DashboardDatum[]>> = {
  monthly: {
    "All Clients": [
      { label: "Jan", revenue: 15, margin: 12, cash: 7, receivables: 6, variance: -2 },
      { label: "Feb", revenue: 16, margin: 13, cash: 8, receivables: 5, variance: -1 },
      { label: "Mar", revenue: 14, margin: 11, cash: 6, receivables: 7, variance: -3 },
      { label: "Apr", revenue: 18, margin: 14, cash: 9, receivables: 5, variance: 1 },
      { label: "May", revenue: 21, margin: 16, cash: 11, receivables: 4, variance: 2 },
      { label: "Jun", revenue: 24, margin: 18, cash: 13, receivables: 4, variance: 3 },
    ],
    "India MSMEs": [
      { label: "Jan", revenue: 11, margin: 11, cash: 5, receivables: 5, variance: -2 },
      { label: "Feb", revenue: 12, margin: 12, cash: 5, receivables: 5, variance: -1 },
      { label: "Mar", revenue: 12, margin: 11, cash: 4, receivables: 6, variance: -2 },
      { label: "Apr", revenue: 14, margin: 13, cash: 6, receivables: 5, variance: 1 },
      { label: "May", revenue: 16, margin: 14, cash: 7, receivables: 4, variance: 2 },
      { label: "Jun", revenue: 18, margin: 16, cash: 8, receivables: 4, variance: 3 },
    ],
    "US & UAE": [
      { label: "Jan", revenue: 8, margin: 14, cash: 4, receivables: 3, variance: 0 },
      { label: "Feb", revenue: 9, margin: 15, cash: 4, receivables: 3, variance: 1 },
      { label: "Mar", revenue: 10, margin: 16, cash: 5, receivables: 3, variance: 1 },
      { label: "Apr", revenue: 11, margin: 17, cash: 6, receivables: 2, variance: 2 },
      { label: "May", revenue: 13, margin: 18, cash: 7, receivables: 2, variance: 2 },
      { label: "Jun", revenue: 15, margin: 20, cash: 8, receivables: 2, variance: 3 },
    ],
  },
  quarterly: {
    "All Clients": [
      { label: "Q1", revenue: 45, margin: 12, cash: 21, receivables: 18, variance: -6 },
      { label: "Q2", revenue: 52, margin: 15, cash: 25, receivables: 14, variance: 2 },
      { label: "Q3", revenue: 61, margin: 18, cash: 29, receivables: 12, variance: 5 },
      { label: "Q4", revenue: 75, margin: 22, cash: 34, receivables: 10, variance: 8 },
    ],
    "India MSMEs": [
      { label: "Q1", revenue: 33, margin: 11, cash: 15, receivables: 15, variance: -4 },
      { label: "Q2", revenue: 40, margin: 13, cash: 18, receivables: 13, variance: 1 },
      { label: "Q3", revenue: 46, margin: 15, cash: 21, receivables: 11, variance: 3 },
      { label: "Q4", revenue: 55, margin: 18, cash: 25, receivables: 9, variance: 6 },
    ],
    "US & UAE": [
      { label: "Q1", revenue: 24, margin: 15, cash: 11, receivables: 8, variance: 1 },
      { label: "Q2", revenue: 29, margin: 18, cash: 13, receivables: 7, variance: 3 },
      { label: "Q3", revenue: 36, margin: 20, cash: 16, receivables: 6, variance: 5 },
      { label: "Q4", revenue: 44, margin: 24, cash: 19, receivables: 5, variance: 7 },
    ],
  },
};

const dashboardFocusContent: Record<
  DashboardFocus,
  {
    title: string;
    description: string;
    bullets: string[];
    callout: string;
  }
> = {
  profitability: {
    title: "Margin expansion becomes visible before year-end closes.",
    description: "Track revenue, margin, and budget variance together so pricing, service mix, and delivery efficiency are reviewed in one place.",
    bullets: [
      "Client-wise and service-line margin drill-down",
      "Budget vs actual flags highlighted period by period",
      "Faster pricing and profitability review before month-end slip happens",
    ],
    callout: "Best for founders asking: where is profit actually coming from?",
  },
  cashflow: {
    title: "Cash pressure shows up earlier than the bank balance suggests.",
    description: "Bring cash buffer and receivables into the same reporting view so collections risk, runway, and weekly priorities are obvious.",
    bullets: [
      "Receivables heatmap for overdue collections",
      "12-week cash position and runway visibility",
      "Working-capital actions linked directly to reporting cadence",
    ],
    callout: "Best for teams saying: profitable hai, but cash kyun nahi bach raha?",
  },
  controls: {
    title: "Controls improve when reporting becomes operational, not cosmetic.",
    description: "Highlight variance, cleanup load, and process drift so finance teams can fix root causes instead of only compiling reports.",
    bullets: [
      "Expense variance alerts with follow-up notes",
      "Month-close blockers and data cleanup indicators",
      "SOP-led reporting so numbers stay reliable as the team grows",
    ],
    callout: "Best for businesses that need disciplined reporting, not just prettier dashboards.",
  },
};

const dashboardFeatureCards = [
  { title: "Profitability Analysis", description: "Product-wise and client-wise margin drill-down with pricing triggers." },
  { title: "Expense Variance", description: "Monthly budget vs actuals with alerts, comments, and owner visibility." },
  { title: "Cash Forecasting", description: "12-week rolling cash position report with receivables pressure tracking." },
];

const processSteps = [
  { icon: PhoneCall, title: "Discovery Call (Free)", description: "30-minute call to understand your current financial state, pain points, and goals." },
  { icon: Search, title: "System Audit", description: "Deep review of your books, tools, reporting gaps, and compliance status." },
  { icon: Map, title: "Custom Roadmap", description: "Tailored Virtual CFO or Automation plan with clear deliverables and transparent pricing." },
  { icon: Rocket, title: "Execution & Monthly Reporting", description: "Dashboards, MIS reports, calls, compliance support, and automation rollout." },
];

const stats = [
  { value: 3, label: "Countries (India, USA, UAE)" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 30, suffix: "+", label: "Finance Services Offered" },
];

const founderSkills = [
  "Advanced Financial Modeling",
  "QuickBooks Online Expert",
  "Excel + Power Query Automation",
  "US & UAE Accounting",
  "GST, TDS & Indian Compliance",
  "AI & Automation Tools",
];

const footerServices = ["Virtual CFO", "Cash Flow Management", "Tax Planning", "Automation Tools", "US Bookkeeping", "UAE VAT Filing"];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mayank-bansal7/", icon: Linkedin },
  { label: "WhatsApp", href: whatsappUrl, icon: MessageCircle },
  { label: "Email", href: "mailto:maybansal7@gmail.com", icon: Mail },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ApkaVCFO",
  url: "https://apkavcfo.com",
  image: "https://apkavcfo.com/apkavcfo-og.png",
  description: "Premium Virtual CFO and financial automation services for Indian MSMEs, US accounting firms, and UAE businesses.",
  areaServed: ["India", "United States", "United Arab Emirates"],
  founder: {
    "@type": "Person",
    name: "CA Mayank Bansal",
    jobTitle: "Chartered Accountant",
    alumniOf: "ICAI",
    sameAs: ["https://www.linkedin.com/in/mayank-bansal7/"],
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-9967646344",
      contactType: "customer service",
      email: "maybansal7@gmail.com",
      areaServed: ["IN", "US", "AE"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Udaipur",
    addressRegion: "Rajasthan",
    addressCountry: "India",
  },
};

const SectionHeading = ({
  kicker,
  title,
  subtitle,
  inverted = false,
}: {
  kicker?: string;
  title: string;
  subtitle: string;
  inverted?: boolean;
}) => (
  <div className="mx-auto max-w-3xl text-center">
    {kicker ? <span className="section-kicker">{kicker}</span> : null}
    <h2 className={cn("mt-5 text-4xl font-semibold md:text-5xl", inverted ? "text-primary-foreground" : "text-foreground")}>{title}</h2>
    <p className={cn("mt-4 text-base leading-7 md:text-lg", inverted ? "text-primary-foreground/72" : "text-muted-foreground")}>{subtitle}</p>
  </div>
);

const formatLakhs = (value: number) => `₹ ${value}L`;

const average = (values: number[]) => Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);

const chunkItems = <T,>(items: T[], size: number) => {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
};

const ChartTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number | string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-border/70 bg-card/95 p-4 shadow-brand backdrop-blur">
      <p className="font-stats text-sm font-semibold text-foreground">{label}</p>
      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
        {payload.map((entry) => (
          <p key={entry.name}>
            {entry.name}:{" "}
            <span className="font-medium text-foreground">
              {typeof entry.value === "number"
                ? entry.name === "Net Profit"
                  ? `${entry.value}%`
                  : formatLakhs(entry.value)
                : entry.value}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
};

const ApkaVcfoSite = () => {
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("All");
  const [activePainPoint, setActivePainPoint] = useState(0);
  const [chartView, setChartView] = useState<DashboardView>("monthly");
  const [dashboardSegment, setDashboardSegment] = useState<DashboardSegment>("All Clients");
  const [dashboardFocus, setDashboardFocus] = useState<DashboardFocus>("profitability");
  const [servicesApi, setServicesApi] = useState<CarouselApi>();
  const [serviceIndex, setServiceIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredServices = useMemo(
    () => (activeCategory === "All" ? services : services.filter((service) => service.category === activeCategory)),
    [activeCategory],
  );

  const serviceSlides = useMemo(() => chunkItems(filteredServices, isMobile ? 1 : 6), [filteredServices, isMobile]);

  const chartData = dashboardData[chartView][dashboardSegment];
  const latestPoint = chartData[chartData.length - 1];
  const previousPoint = chartData[Math.max(chartData.length - 2, 0)];
  const focusContent = dashboardFocusContent[dashboardFocus];
  const revenueDelta = latestPoint.revenue - previousPoint.revenue;
  const marginDelta = latestPoint.margin - previousPoint.margin;
  const collectionsDelta = previousPoint.receivables - latestPoint.receivables;

  const dashboardSummary = [
    {
      label: "Run-rate Revenue",
      value: formatLakhs(latestPoint.revenue),
      detail: `${revenueDelta >= 0 ? "+" : ""}${revenueDelta}L vs previous period`,
    },
    {
      label: "Net Profit %",
      value: `${latestPoint.margin}%`,
      detail: `${marginDelta >= 0 ? "+" : ""}${marginDelta}% movement`,
    },
    {
      label: "Cash Buffer",
      value: formatLakhs(latestPoint.cash),
      detail: `${chartView === "monthly" ? "Current" : "Quarter-end"} liquidity view`,
    },
    {
      label: "Collections Pressure",
      value: formatLakhs(latestPoint.receivables),
      detail: `${collectionsDelta >= 0 ? "Improving" : "Watchlist"} receivables trend`,
    },
  ];

  useEffect(() => {
    if (!servicesApi) return;

    const updateIndex = () => setServiceIndex(servicesApi.selectedScrollSnap());

    updateIndex();
    servicesApi.on("select", updateIndex);
    servicesApi.on("reInit", updateIndex);

    return () => {
      servicesApi.off("select", updateIndex);
      servicesApi.off("reInit", updateIndex);
    };
  }, [servicesApi]);

  useEffect(() => {
    servicesApi?.scrollTo(0);
    setServiceIndex(0);
  }, [activeCategory, servicesApi]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
        <div className={cn("container rounded-full transition-all duration-300", scrolled ? "glass-nav shadow-brand" : "bg-primary/45 text-primary-foreground") }>
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
            <a href="#top" className="brand-logo-panel flex items-center gap-3 px-3 py-2" aria-label="ApkaVCFO home">
              <img src={logo} alt="ApkaVCFO logo" className="h-11 w-auto object-contain" />
            </a>

            <nav className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => (
                <Button key={item.href} asChild variant="nav" size="sm">
                  <a href={item.href}>{item.label}</a>
                </Button>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Button asChild variant="hero" size="lg">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  Book Free Call
                  <ArrowRight />
                </a>
              </Button>
            </div>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="hero-outline" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-primary-foreground/10 bg-primary text-primary-foreground sm:max-w-md">
                <SheetTitle className="font-display text-2xl text-primary-foreground">Apka VCFO</SheetTitle>
                <div className="mt-8 flex flex-col gap-3">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="rounded-2xl border border-primary-foreground/10 px-4 py-3 text-base text-primary-foreground/80 transition hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                <Button asChild variant="hero" size="xl" className="mt-8 w-full">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    Book Free WhatsApp Consultation
                  </a>
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main id="top" className="overflow-x-hidden">
        <section className="hero-grid relative overflow-hidden bg-primary pt-32 text-primary-foreground md:pt-36">
          <div className="hero-orbit absolute left-[-6rem] top-[8rem] h-64 w-64 rounded-full" />
          <div className="container section-pad relative z-10">
            <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
              <SectionReveal className="max-w-3xl">
                <span className="section-kicker border-primary-foreground/15 bg-primary-foreground/5 text-primary-foreground/80">
                  Chartered Accountant | ICAI Certified | Est. 2014
                </span>
                <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.95] text-primary-foreground md:text-7xl">
                  Finance Systemized.
                  <br />
                  Automated. Scaled.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/72">
                  CA Mayank Bansal delivers Virtual CFO services and financial automation for Indian MSMEs, US CPA firms, and UAE businesses — from a single integrated practice.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button asChild variant="hero" size="xl">
                    <a href={whatsappUrl} target="_blank" rel="noreferrer">
                      Book Free WhatsApp Consultation
                      <ArrowRight />
                    </a>
                  </Button>
                  <Button asChild variant="hero-outline" size="xl">
                    <a href="#services">Explore Services</a>
                  </Button>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {trustBadges.map((badge) => (
                    <span key={badge} className="metric-chip">
                      <Sparkles className="text-accent" />
                      {badge}
                    </span>
                  ))}
                </div>
              </SectionReveal>

              <SectionReveal delay={120} className="lg:justify-self-end">
                <div className="surface-card mx-auto max-w-md p-6 text-foreground animate-float">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-stats text-sm uppercase tracking-[0.18em] text-muted-foreground">Live KPI Snapshot</p>
                      <h2 className="mt-2 text-2xl font-semibold">Growth visibility, not guesswork</h2>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                      <span className="h-2.5 w-2.5 rounded-full bg-success" />
                      Active
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {heroKpis.map((metric) => (
                      <div key={metric.name} className="flex items-center justify-between rounded-2xl bg-secondary/80 px-4 py-3">
                        <span className="text-sm text-muted-foreground">{metric.name}</span>
                        <span className="font-stats text-lg font-semibold text-foreground">
                          {metric.value} <span className="text-success">{metric.trend}</span>
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 h-24 rounded-2xl bg-secondary/60 p-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sparklineData}>
                        <Line type="monotone" dataKey="value" stroke="hsl(var(--accent))" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-5 inline-flex rounded-full bg-primary px-4 py-2 font-stats text-sm font-semibold text-primary-foreground shadow-soft">
                    Built by ApkaVCFO
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        <section id="markets" className="section-pad scroll-mt-28 bg-background">
          <div className="container">
            <SectionReveal>
              <SectionHeading
                kicker="Who I Serve"
                title="One Practice. Three Markets."
                subtitle="I serve clients across India, USA, and UAE with specialized financial services for each market."
              />
            </SectionReveal>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {marketCards.map((market, index) => {
                const Icon = market.icon;
                return (
                  <SectionReveal key={market.title} delay={index * 90} className="service-card group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-stats text-xs uppercase tracking-[0.18em] text-accent">
                        {market.eyebrow}
                      </span>
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold">{market.title}</h3>
                    <p className="mt-2 font-stats text-sm uppercase tracking-[0.18em] text-muted-foreground">{market.subtitle}</p>
                    <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
                      {market.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="services" className="section-pad scroll-mt-28 bg-card">
          <div className="container">
            <SectionReveal>
              <SectionHeading
                kicker="Comprehensive Financial Architecture"
                title="30+ services across five practice areas"
                subtitle="Select a category to explore the systems, controls, and growth support ApkaVCFO builds for clients."
              />
            </SectionReveal>

            <div className="mt-10 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <SectionReveal delay={120} className="flex flex-wrap justify-center gap-3 xl:justify-start">
                {serviceCategories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "selector-active" : "selector"}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </SectionReveal>

              <SectionReveal delay={160} className="flex flex-wrap items-center justify-center gap-3 xl:justify-end">
                <div className="rounded-full border border-border/70 bg-secondary px-4 py-2 font-stats text-sm text-foreground">
                  {filteredServices.length} service modules in this track
                </div>
                <div className="rounded-full border border-border/70 bg-background px-4 py-2 text-sm text-muted-foreground">
                  Swipe or use arrows to browse without stretching the page
                </div>
              </SectionReveal>
            </div>

            <SectionReveal delay={200} className="service-slider-shell mt-12 overflow-hidden p-6 md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-stats text-sm uppercase tracking-[0.18em] text-muted-foreground">Service Carousel</p>
                  <h3 className="mt-2 text-2xl font-semibold text-foreground">Compact, category-based service browsing</h3>
                  <p className="mt-2 text-sm text-muted-foreground">6 services per slide in a balanced 3 + 3 layout.</p>
                </div>

                <div className="flex items-center justify-between gap-3 md:justify-end">
                  <span className="text-sm text-muted-foreground">
                    Slide {serviceSlides.length ? serviceIndex + 1 : 0} / {serviceSlides.length}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="pill"
                      size="icon"
                      className="h-11 w-11"
                      onClick={() => servicesApi?.scrollPrev()}
                      disabled={!servicesApi?.canScrollPrev()}
                    >
                      <ChevronLeft />
                    </Button>
                    <Button
                      type="button"
                      variant="pill"
                      size="icon"
                      className="h-11 w-11"
                      onClick={() => servicesApi?.scrollNext()}
                      disabled={!servicesApi?.canScrollNext()}
                    >
                      <ChevronRight />
                    </Button>
                  </div>
                </div>
              </div>

              <Carousel className="mt-8" opts={{ align: "start" }} setApi={setServicesApi}>
                <CarouselContent>
                  {serviceSlides.map((slide, slideIdx) => (
                    <CarouselItem key={`${activeCategory}-${slideIdx}`}>
                      <div className={cn("grid gap-5", isMobile ? "grid-cols-1" : "md:grid-cols-2 xl:grid-cols-3")}>
                        {slide.map((service) => {
                          const Icon = service.icon;

                          return (
                            <article key={service.title} className="service-card h-full p-6">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                                  <Icon className="h-6 w-6" />
                                </div>
                                <span className="font-stats text-xs uppercase tracking-[0.18em] text-muted-foreground">{service.category}</span>
                              </div>
                              <h3 className="mt-5 text-xl font-semibold leading-snug text-foreground">{service.title}</h3>
                              <p className="mt-3 text-sm leading-7 text-muted-foreground">{service.description}</p>
                            </article>
                          );
                        })}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <div className="mt-6 flex justify-center gap-2">
                {serviceSlides.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    type="button"
                    aria-label={`Go to service slide ${index + 1}`}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300",
                      serviceIndex === index ? "w-8 bg-accent" : "w-2.5 bg-border hover:bg-accent/40",
                    )}
                    onClick={() => servicesApi?.scrollTo(index)}
                  />
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        <section id="automation" className="section-pad scroll-mt-28 bg-primary text-primary-foreground">
          <div className="container">
            <SectionReveal>
              <SectionHeading
                kicker="Automation Showcase"
                title="Finance on Autopilot"
                subtitle="I don't just advise — I build the systems that eliminate manual work and reporting delays."
                inverted
              />
            </SectionReveal>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {automationCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <SectionReveal key={card.title} delay={index * 90} className="surface-dark-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/45 hover:shadow-glow">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/12 text-accent">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-primary-foreground">{card.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-primary-foreground/72">{card.description}</p>
                    <div className="mt-6 inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-2 font-stats text-sm font-semibold text-accent-light">
                      {card.tag}
                    </div>
                  </SectionReveal>
                );
              })}
            </div>

            <SectionReveal delay={150} className="mt-12 rounded-[2rem] border border-primary-foreground/10 bg-primary-foreground/5 p-6">
              <p className="font-stats text-sm uppercase tracking-[0.22em] text-primary-foreground/60">Tools I Work With</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {toolsStrip.map((tool) => (
                  <span key={tool} className="rounded-full border border-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground/80">
                    {tool}
                  </span>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        <section id="international" className="section-pad scroll-mt-28 bg-[hsl(var(--hero))] text-primary-foreground">
          <div className="container">
            <SectionReveal>
              <SectionHeading
                kicker="Interactive Problem Solver"
                title="What's Your Biggest Financial Challenge?"
                subtitle="Click your pain point and see the exact solution ApkaVCFO deploys."
                inverted
              />
            </SectionReveal>

            <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <SectionReveal className="surface-dark-card p-4">
                <div className="space-y-3">
                  {painPoints.map((item, index) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setActivePainPoint(index)}
                      className={cn(
                        "w-full rounded-2xl border px-5 py-4 text-left transition-all duration-300",
                        activePainPoint === index
                          ? "border-accent/40 bg-accent/12 text-primary-foreground shadow-glow"
                          : "border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground/72 hover:border-primary-foreground/20 hover:text-primary-foreground",
                      )}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-medium md:text-base">{item.label}</span>
                        <ChevronRight className={cn("transition-transform", activePainPoint === index && "translate-x-1 text-accent")} />
                      </div>
                    </button>
                  ))}
                </div>
              </SectionReveal>

              <SectionReveal key={painPoints[activePainPoint].title} delay={80} className="surface-card animate-fade-up p-8 md:p-10">
                <span className="section-kicker">Solution Track</span>
                <h3 className="mt-6 text-3xl font-semibold text-foreground">{painPoints[activePainPoint].title}</h3>
                <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">{painPoints[activePainPoint].solution}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-secondary p-5">
                    <p className="font-stats text-sm uppercase tracking-[0.18em] text-muted-foreground">Outcome</p>
                    <p className="mt-3 text-lg font-medium text-foreground">Clarity, faster decisions, and system-driven reporting.</p>
                  </div>
                  <div className="rounded-2xl bg-secondary p-5">
                    <p className="font-stats text-sm uppercase tracking-[0.18em] text-muted-foreground">Delivery Style</p>
                    <p className="mt-3 text-lg font-medium text-foreground">Hands-on CFO thinking + automation-first execution.</p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        <section className="section-pad bg-card">
          <div className="container">
            <SectionReveal>
              <SectionHeading
                kicker="Live Dashboard Demo"
                title="The Clarity You'll Get Every Month"
                subtitle="This is the kind of dashboard ApkaVCFO builds for every client — real numbers and real decision support."
              />
            </SectionReveal>

            <SectionReveal delay={120} className="dashboard-shell mt-14 overflow-hidden p-6 md:p-8">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <p className="font-stats text-sm uppercase tracking-[0.2em] text-muted-foreground">Revenue in Lakhs + Net Profit % + Cash Buffer</p>
                  <h3 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">Decision-grade reporting with filters, callouts, and action signals</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                    This dashboard now feels closer to a CFO reporting system — not just a basic chart — with segment filters, trend overlays, and decision notes.
                  </p>
                </div>

                <div className="space-y-3 xl:text-right">
                  <div className="flex flex-wrap gap-3 xl:justify-end">
                    <Button variant={chartView === "monthly" ? "selector-active" : "selector"} onClick={() => setChartView("monthly")}>
                      Monthly View
                    </Button>
                    <Button variant={chartView === "quarterly" ? "selector-active" : "selector"} onClick={() => setChartView("quarterly")}>
                      Quarterly Trend
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-3 xl:justify-end">
                    {dashboardSegments.map((segment) => (
                      <Button
                        key={segment}
                        variant={dashboardSegment === segment ? "selector-active" : "selector"}
                        onClick={() => setDashboardSegment(segment)}
                      >
                        {segment}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-4">
                {dashboardSummary.map((item) => (
                  <div key={item.label} className="rounded-[1.5rem] border border-border/70 bg-background/80 p-5">
                    <p className="font-stats text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-foreground">{item.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
                <div className="rounded-[1.75rem] border border-border/70 bg-background/70 p-5 md:p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-stats text-sm uppercase tracking-[0.18em] text-muted-foreground">{dashboardSegment}</p>
                      <h4 className="mt-2 text-xl font-semibold text-foreground">Revenue, margin, and liquidity in one command view</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full border border-border/70 bg-card px-3 py-1.5">Revenue Bars</span>
                      <span className="rounded-full border border-border/70 bg-card px-3 py-1.5">Net Profit Line</span>
                      <span className="rounded-full border border-border/70 bg-card px-3 py-1.5">Cash Buffer Area</span>
                    </div>
                  </div>

                  <div className="mt-6 h-[380px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={chartData} margin={{ top: 12, right: 8, left: -8, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="4 6" stroke="hsl(var(--border))" />
                        <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                        <YAxis
                          yAxisId="left"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          tickFormatter={(value) => `${value}L`}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip content={<ChartTooltip />} />
                        <ReferenceLine yAxisId="right" y={15} stroke="hsl(var(--border))" strokeDasharray="4 4" />
                        <Area
                          yAxisId="left"
                          type="monotone"
                          dataKey="cash"
                          name="Cash Buffer"
                          stroke="hsl(var(--accent))"
                          fill="hsl(var(--accent) / 0.12)"
                          strokeWidth={2}
                        />
                        <Bar
                          yAxisId="left"
                          dataKey="revenue"
                          name="Revenue"
                          radius={[12, 12, 0, 0]}
                          fill="hsl(var(--chart-revenue))"
                          barSize={chartView === "monthly" ? 32 : 52}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="margin"
                          name="Net Profit"
                          stroke="hsl(var(--chart-margin))"
                          strokeWidth={3}
                          dot={{ r: 4, fill: "hsl(var(--chart-margin))" }}
                          activeDot={{ r: 6 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {dashboardFeatureCards.map((insight) => (
                      <div key={insight.title} className="rounded-[1.5rem] border border-border/70 bg-card/80 p-5">
                        <p className="font-stats text-xs uppercase tracking-[0.18em] text-accent">Insight</p>
                        <h4 className="mt-3 text-lg font-semibold text-foreground">{insight.title}</h4>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{insight.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6">
                  <div className="rounded-[1.75rem] border border-border/70 bg-background/70 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-stats text-sm uppercase tracking-[0.18em] text-muted-foreground">Analysis Filters</p>
                        <h4 className="mt-2 text-xl font-semibold text-foreground">Focus the decision layer</h4>
                      </div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-accent">
                        <Filter className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {dashboardFocusOptions.map((option) => (
                        <Button
                          key={option.id}
                          variant={dashboardFocus === option.id ? "selector-active" : "selector"}
                          onClick={() => setDashboardFocus(option.id)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>

                    <div className="mt-6 rounded-[1.5rem] bg-secondary/80 p-5">
                      <p className="font-stats text-xs uppercase tracking-[0.18em] text-accent">Current Focus</p>
                      <h5 className="mt-3 text-lg font-semibold text-foreground">{focusContent.title}</h5>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{focusContent.description}</p>
                    </div>

                    <div className="mt-5 space-y-3">
                      {focusContent.bullets.map((bullet) => (
                        <div key={bullet} className="flex gap-3 rounded-[1.25rem] border border-border/70 bg-card/80 px-4 py-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <p className="text-sm leading-6 text-muted-foreground">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] bg-primary p-6 text-primary-foreground shadow-brand">
                    <p className="font-stats text-sm uppercase tracking-[0.18em] text-primary-foreground/60">CFO Callout</p>
                    <h4 className="mt-3 text-2xl font-semibold">{focusContent.callout}</h4>
                    <div className="mt-6 space-y-3">
                      <div className="rounded-[1.25rem] border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3">
                        <p className="text-sm text-primary-foreground/72">Average net margin across this filter</p>
                        <p className="mt-1 font-stats text-xl font-semibold text-primary-foreground">{average(chartData.map((item) => item.margin))}%</p>
                      </div>
                      <div className="rounded-[1.25rem] border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3">
                        <p className="text-sm text-primary-foreground/72">Budget variance in latest period</p>
                        <p className="mt-1 font-stats text-xl font-semibold text-primary-foreground">{latestPoint.variance >= 0 ? "+" : ""}{latestPoint.variance}%</p>
                      </div>
                      <div className="rounded-[1.25rem] border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3">
                        <p className="text-sm text-primary-foreground/72">Receivables watchlist</p>
                        <p className="mt-1 font-stats text-xl font-semibold text-primary-foreground">{formatLakhs(latestPoint.receivables)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        <section className="section-pad bg-background">
          <div className="container">
            <SectionReveal>
              <SectionHeading
                kicker="How It Works"
                title="From Chaos to Clarity in 4 Steps"
                subtitle="A simple engagement model designed to move quickly without compromising control."
              />
            </SectionReveal>

            <div className="relative mt-14 grid gap-6 lg:grid-cols-4">
              <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-border lg:block" />
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <SectionReveal key={step.title} delay={index * 80} className="relative surface-card p-6 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-glow">
                      <Icon className="h-7 w-7" />
                    </div>
                    <p className="mt-5 font-stats text-sm uppercase tracking-[0.18em] text-muted-foreground">Step {index + 1}</p>
                    <h3 className="mt-2 text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{step.description}</p>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-accent py-8 text-accent-foreground">
          <div className="container grid gap-8 text-center md:grid-cols-3 md:text-left">
            {stats.map((stat) => (
              <SectionReveal key={stat.label} className="space-y-2">
                <div className="font-stats text-4xl font-bold md:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm uppercase tracking-[0.18em] text-accent-foreground/78">{stat.label}</p>
              </SectionReveal>
            ))}
          </div>
        </section>

        <section id="about" className="section-pad scroll-mt-28 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <SectionReveal>
                <div className="rounded-[2rem] border border-accent/25 bg-primary-foreground/5 p-4 shadow-brand">
                  <img
                    src={founderPhoto}
                    alt="CA Mayank Bansal professional portrait"
                    className="aspect-[4/5] w-full rounded-[1.6rem] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="rounded-full bg-accent px-4 py-2 font-stats text-sm font-semibold text-accent-foreground">CA — ICAI</span>
                  <span className="rounded-full border border-primary-foreground/15 bg-primary-foreground/8 px-4 py-2 font-stats text-sm font-semibold text-primary-foreground/86">
                    US Accounting Certified
                  </span>
                </div>
              </SectionReveal>

              <SectionReveal delay={100}>
                <span className="section-kicker border-accent/25 bg-accent/10 text-accent-light">The Founder</span>
                <h2 className="mt-6 text-5xl font-semibold text-primary-foreground">CA Mayank Bansal</h2>
                <p className="mt-3 text-2xl text-primary-foreground/82">Systems Architect. Not Just a CA.</p>
                <blockquote className="mt-8 border-l-2 border-accent pl-5 text-xl leading-8 text-primary-foreground/86">
                  “Profit is not just an accounting figure — it's the result of disciplined systems, informed decisions, and transparent reporting.”
                </blockquote>
                <p className="mt-8 text-base leading-8 text-primary-foreground/72">
                  Mayank is a Chartered Accountant with 10+ years of experience who specializes in building financial systems — not just filing returns. From Udaipur, he serves clients across India, USA, and UAE, delivering CFO-level thinking at MSME-friendly investment.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {founderSkills.map((skill) => (
                    <div key={skill} className="flex items-center gap-3 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      <span className="text-sm text-primary-foreground/86">{skill}</span>
                    </div>
                  ))}
                </div>

                <Button asChild variant="hero" size="xl" className="mt-8">
                  <a href="https://www.linkedin.com/in/mayank-bansal7/" target="_blank" rel="noreferrer">
                    Connect on LinkedIn
                    <Linkedin />
                  </a>
                </Button>
              </SectionReveal>
            </div>
          </div>
        </section>

        <section id="contact" className="section-pad scroll-mt-28 bg-card">
          <div className="container">
            <SectionReveal>
              <SectionHeading
                kicker="Contact"
                title="Ready to Build a Finance System That Actually Works?"
                subtitle="Book a free 30-minute WhatsApp consultation. No obligations. Just clarity."
              />
            </SectionReveal>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              <SectionReveal className="rounded-[2rem] bg-accent p-8 text-accent-foreground shadow-glow">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-foreground/12">
                  <MessageCircle className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-3xl font-semibold">Chat on WhatsApp</h3>
                <p className="mt-3 text-lg text-accent-foreground/80">+91 9967 64 6344</p>
                <p className="mt-5 text-base leading-8 text-accent-foreground/85">Fastest way to discuss your finance challenges and book a consultation.</p>
                <Button asChild variant="hero-outline" size="xl" className="mt-8 border-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/10">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    Open WhatsApp
                    <ArrowRight />
                  </a>
                </Button>
              </SectionReveal>

              <SectionReveal delay={100} className="surface-card p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-foreground">
                  <Mail className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mt-6 text-3xl font-semibold text-foreground">Send an Email</h3>
                <p className="mt-3 text-lg text-muted-foreground">maybansal7@gmail.com</p>
                <p className="mt-5 text-base leading-8 text-muted-foreground">Best for detailed briefs, documents, or structured engagement queries.</p>
                <Button asChild variant="pill" size="xl" className="mt-8">
                  <a href="mailto:maybansal7@gmail.com">
                    Send Email
                    <ArrowRight />
                  </a>
                </Button>
              </SectionReveal>
            </div>

            <SectionReveal delay={140} className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Button key={link.label} asChild variant="pill">
                    <a href={link.href} target="_blank" rel="noreferrer">
                      <Icon />
                      {link.label}
                    </a>
                  </Button>
                );
              })}
            </SectionReveal>

            <SectionReveal delay={180} className="mt-6 text-center text-sm text-muted-foreground">
              Typical response time: Within 4 hours | Available Mon–Sat, 9am–7pm IST
            </SectionReveal>
          </div>
        </section>
      </main>

      <footer className="bg-primary py-16 text-primary-foreground">
        <div className="container grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <div className="brand-logo-panel inline-flex items-center gap-3 px-4 py-3">
              <img src={logo} alt="ApkaVCFO logo" className="h-12 w-auto object-contain" loading="lazy" />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-7 text-primary-foreground/68">From Udaipur, India — Serving the World.</p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/12 text-primary-foreground/72 transition hover:border-accent/40 hover:text-accent"
                    aria-label={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Services</h3>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/70">
              {footerServices.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/70">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition hover:text-accent">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="https://www.linkedin.com/in/mayank-bansal7/" target="_blank" rel="noreferrer" className="transition hover:text-accent">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /> +91 9967 64 6344</li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-accent" /> maybansal7@gmail.com</li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-accent" /> Udaipur, Rajasthan, India</li>
              <li className="flex items-center gap-3"><IndianRupee className="h-4 w-4 text-accent" /> Serving MSMEs, CPA firms, and UAE businesses</li>
            </ul>
          </div>
        </div>

        <div className="container mt-10 border-t border-primary-foreground/10 pt-6 text-sm text-primary-foreground/55">
          © 2025 ApkaVCFO.com | All Rights Reserved | CA Mayank Bansal
        </div>
      </footer>
    </>
  );
};

export default ApkaVcfoSite;