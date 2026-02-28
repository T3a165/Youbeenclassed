“use client”;
import { useState, useEffect } from “react”;

const NAV_LINKS = [
{ label: “Philosophy”, href: “#philosophy” },
{ label: “The Engine”, href: “#engine” },
{ label: “Pricing”, href: “#pricing” },
{ label: “Try It Now”, href: “/app” },
];

const STATS = [
{ value: “10x”, label: “Leverage Multiplier” },
{ value: “2,400+”, label: “Blueprints Generated” },
{ value: “47”, label: “Industries Covered” },
{ value: “< 60s”, label: “Time to Generate” },
];

const PHILOSOPHY_CARDS = [
{
icon: “⚙️”,
title: “Systems Over Hustle”,
desc: “Your revenue shouldn’t scale linearly with your hours. Build operational systems that work while you don’t.”,
},
{
icon: “📈”,
title: “Leverage Stacking”,
desc: “Entry funnel, mid-tier product, premium offering, recurring revenue. Each layer compounds the one below it.”,
},
{
icon: “🔄”,
title: “The Flywheel”,
desc: “Brand feeds traffic. Engine converts. Email list compounds. Upsells deploy. Authority increases. Repeat.”,
},
{
icon: “🏰”,
title: “Defensible Moat”,
desc: “Your moat isn’t AI. It’s your philosophy, your frameworks, your voice, and your categorization model.”,
},
];

const FLYWHEEL_STEPS = [
{ num: “01”, title: “Brand Feeds Traffic”, desc: “Content, thought leadership, and system breakdowns build authority and attract high-intent operators.” },
{ num: “02”, title: “Engine Converts”, desc: “The Leverage Blueprint Generator turns visitors into leads with zero friction. Input, output, capture.” },
{ num: “03”, title: “Email List Compounds”, desc: “Automated nurture sequences deliver value while soft-selling premium offerings on autopilot.” },
{ num: “04”, title: “Upsells Deploy”, desc: “Advanced Pack, Premium Build, and Operators Membership create a revenue ladder that scales itself.” },
{ num: “05”, title: “Authority Increases”, desc: “Results compound into case studies, testimonials, and social proof. The cycle accelerates.” },
];

const PRICING_TIERS = [
{
name: “Blueprint”,
price: “Free”,
sub: “Your starting point. See the system.”,
features: [
“Personalized leverage blueprint”,
“System architecture overview”,
“Core tool stack recommendations”,
“Basic automation sequences”,
“Monetization ladder outline”,
],
cta: “Generate Free Blueprint”,
popular: false,
},
{
name: “Advanced Pack”,
price: “$29”,
sub: “Deep builds with tool integrations and playbooks.”,
features: [
“Everything in Blueprint, plus:”,
“Full tool integration guides”,
“12 automation workflow templates”,
“90-day implementation roadmap”,
“Industry-specific case studies”,
“Private community access”,
],
cta: “Get Advanced Pack”,
popular: true,
},
{
name: “Premium Build”,
price: “$199”,
sub: “Industry-specific deep system generation.”,
features: [
“Everything in Advanced Pack, plus:”,
“Custom system architecture”,
“1-on-1 strategy session”,
“Done-for-you automation setup”,
“Revenue projection model”,
“Priority support channel”,
“Quarterly system audit”,
],
cta: “Go Premium”,
popular: false,
},
];

const INDUSTRIES = [
“SaaS / Software”, “E-commerce”, “Agency / Consulting”, “Content / Media”,
“Real Estate”, “Health & Fitness”, “Education / Coaching”, “Finance / Fintech”,
“Food & Beverage”, “Retail”, “Freelance / Solopreneur”, “Other”,
];

const REVENUE_TARGETS = [
“$1K - $5K/mo”, “$5K - $10K/mo”, “$10K - $25K/mo”,
“$25K - $50K/mo”, “$50K - $100K/mo”, “$100K+/mo”,
];

const TIME_OPTIONS = [
“5-10 hrs/week”, “10-20 hrs/week”, “20-30 hrs/week”,
“30-40 hrs/week”, “Full-time (40+)”,
];

export default function LandingPage() {
const [mobileMenu, setMobileMenu] = useState(false);
const [scrolled, setScrolled] = useState(false);
const [goal, setGoal] = useState(””);
const [industry, setIndustry] = useState(””);
const [revenue, setRevenue] = useState(””);
const [time, setTime] = useState(””);

useEffect(() => {
const handleScroll = () => setScrolled(window.scrollY > 50);
window.addEventListener(“scroll”, handleScroll);
return () => window.removeEventListener(“scroll”, handleScroll);
}, []);

const handleGenerate = (e) => {
e.preventDefault();
const params = new URLSearchParams();
if (goal) params.set(“goal”, goal);
if (industry) params.set(“industry”, industry);
if (revenue) params.set(“revenue”, revenue);
if (time) params.set(“time”, time);
window.location.href = `/app${params.toString() ? "?" + params.toString() : ""}`;
};

return (
<div style={{ background: “#0a0a14”, color: “#f0ece8”, fontFamily: “‘DM Sans’, sans-serif”, minHeight: “100vh” }}>
<style>{`* { box-sizing: border-box; margin: 0; padding: 0; } html { scroll-behavior: smooth; } ::selection { background: #e8364b; color: #fff; } @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } } @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } } @keyframes glow { 0%,100% { box-shadow: 0 0 20px rgba(232,54,75,0.2); } 50% { box-shadow: 0 0 40px rgba(232,54,75,0.4); } } @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } } .fade-up { animation: fadeUp 0.8s ease-out both; } .fade-up-1 { animation-delay: 0.1s; } .fade-up-2 { animation-delay: 0.2s; } .fade-up-3 { animation-delay: 0.3s; } .fade-up-4 { animation-delay: 0.4s; } .cta-btn { transition: all 0.3s ease; cursor: pointer; } .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(232,54,75,0.3); } .card-hover { transition: all 0.3s ease; } .card-hover:hover { transform: translateY(-4px); border-color: rgba(232,54,75,0.3) !important; } select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; } input::placeholder { color: rgba(240,236,232,0.3); } @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-toggle { display: flex !important; } .stats-grid { grid-template-columns: 1fr 1fr !important; } .philosophy-grid { grid-template-columns: 1fr !important; } .pricing-grid { grid-template-columns: 1fr !important; } .hero-h1 { font-size: 36px !important; } .section-h2 { font-size: 28px !important; } } @media (min-width: 769px) { .mobile-toggle { display: none !important; } .mobile-menu { display: none !important; } }`}</style>

```
  {/* ═══════ NAVBAR ═══════ */}
  <nav style={{
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    background: scrolled ? "rgba(10,10,20,0.95)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(240,236,232,0.06)" : "none",
    transition: "all 0.3s ease",
    padding: "16px 24px",
  }}>
    <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "3px" }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 800, color: "#f0ece8" }}>YouBeen</span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 800, color: "#e8364b" }}>Classed</span>
      </a>
      <div className="desktop-nav" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} style={{
            color: link.href === "/app" ? "#e8364b" : "rgba(240,236,232,0.6)",
            textDecoration: "none", fontSize: "14px", fontWeight: 500,
            transition: "color 0.2s",
            border: link.href === "/app" ? "1px solid rgba(232,54,75,0.4)" : "none",
            padding: link.href === "/app" ? "8px 20px" : "0",
            borderRadius: link.href === "/app" ? "8px" : "0",
            background: link.href === "/app" ? "rgba(232,54,75,0.1)" : "none",
          }}>{link.label}</a>
        ))}
      </div>
      <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} style={{
        background: "none", border: "none", color: "#f0ece8", fontSize: "24px", cursor: "pointer",
        display: "none", alignItems: "center", justifyContent: "center",
      }}>☰</button>
    </div>
    {mobileMenu && (
      <div className="mobile-menu" style={{
        background: "rgba(10,10,20,0.98)", padding: "20px 24px", marginTop: "12px", borderRadius: "12px",
        border: "1px solid rgba(240,236,232,0.06)",
      }}>
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} onClick={() => setMobileMenu(false)} style={{
            display: "block", padding: "12px 0", color: "rgba(240,236,232,0.7)", textDecoration: "none",
            fontSize: "16px", borderBottom: "1px solid rgba(240,236,232,0.06)",
          }}>{link.label}</a>
        ))}
      </div>
    )}
  </nav>

  {/* ═══════ HERO ═══════ */}
  <section style={{
    minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
    padding: "120px 24px 60px", position: "relative", overflow: "hidden",
  }}>
    <div style={{
      position: "absolute", width: "600px", height: "600px", borderRadius: "50%",
      background: "radial-gradient(circle, rgba(232,54,75,0.08) 0%, transparent 70%)",
      top: "-100px", right: "-100px", filter: "blur(80px)", pointerEvents: "none",
    }} />
    <div style={{
      position: "absolute", width: "400px", height: "400px", borderRadius: "50%",
      background: "radial-gradient(circle, rgba(100,50,200,0.05) 0%, transparent 70%)",
      bottom: "0", left: "-100px", filter: "blur(60px)", pointerEvents: "none",
    }} />
    <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
      <div className="fade-up" style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        background: "rgba(232,54,75,0.1)", border: "1px solid rgba(232,54,75,0.2)",
        borderRadius: "100px", padding: "8px 20px", marginBottom: "32px",
        fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: "1.5px",
        textTransform: "uppercase", color: "#e8364b",
      }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#e8364b", animation: "pulse 2s infinite" }} />
        The Leverage Engine
      </div>
      <h1 className="fade-up fade-up-1 hero-h1" style={{
        fontFamily: "'Syne', sans-serif", fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 800,
        lineHeight: 1.05, marginBottom: "24px", letterSpacing: "-1px",
      }}>
        You've Been{" "}
        <span style={{
          color: "#e8364b",
          textShadow: "0 0 60px rgba(232,54,75,0.3)",
        }}>Classed.</span>
      </h1>
      <p className="fade-up fade-up-2" style={{
        fontSize: "18px", color: "rgba(240,236,232,0.55)", maxWidth: "600px",
        margin: "0 auto 40px", lineHeight: 1.6, fontWeight: 300,
      }}>
        Stop trading hours for revenue. Build systems that compound. Generate your operational leverage blueprint in 60 seconds.
      </p>
      <div className="fade-up fade-up-3" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
        <a href="/app" className="cta-btn" style={{
          background: "#e8364b", color: "#fff", padding: "16px 36px", borderRadius: "12px",
          fontSize: "16px", fontWeight: 600, textDecoration: "none", display: "inline-block",
        }}>Generate Your Blueprint</a>
        <a href="#philosophy" className="cta-btn" style={{
          background: "rgba(240,236,232,0.06)", border: "1px solid rgba(240,236,232,0.12)",
          color: "#f0ece8", padding: "16px 36px", borderRadius: "12px",
          fontSize: "16px", fontWeight: 600, textDecoration: "none", display: "inline-block",
        }}>Learn the Philosophy</a>
      </div>
    </div>
  </section>

  {/* ═══════ STATS BAR ═══════ */}
  <section style={{ padding: "0 24px 80px" }}>
    <div className="stats-grid" style={{
      maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px",
    }}>
      {STATS.map((stat, i) => (
        <div key={i} style={{
          textAlign: "center", padding: "24px 16px",
          background: "rgba(240,236,232,0.03)", borderRadius: "16px",
          border: "1px solid rgba(240,236,232,0.06)",
        }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: 800, color: "#e8364b", marginBottom: "4px" }}>
            {stat.value}
          </div>
          <div style={{ fontSize: "12px", color: "rgba(240,236,232,0.4)", fontWeight: 500, letterSpacing: "0.3px" }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* ═══════ PHILOSOPHY ═══════ */}
  <section id="philosophy" style={{ padding: "80px 24px", background: "rgba(240,236,232,0.02)" }}>
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#e8364b", marginBottom: "16px" }}>
          The Philosophy
        </p>
        <h2 className="section-h2" style={{ fontFamily: "'Syne', sans-serif", fontSize: "36px", fontWeight: 700, lineHeight: 1.2 }}>
          Brand on top. <span style={{ color: "#e8364b" }}>Engine underneath.</span>
        </h2>
        <p style={{ color: "rgba(240,236,232,0.5)", fontSize: "16px", maxWidth: "550px", margin: "16px auto 0", lineHeight: 1.6 }}>
          Think Tesla, Notion, HubSpot. You don't pick between building a movement and building a product. You make one feed the other.
        </p>
      </div>
      <div className="philosophy-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {PHILOSOPHY_CARDS.map((card, i) => (
          <div key={i} className="card-hover" style={{
            padding: "32px 28px", borderRadius: "18px",
            background: "rgba(240,236,232,0.03)", border: "1px solid rgba(240,236,232,0.06)",
          }}>
            <div style={{ fontSize: "28px", marginBottom: "16px" }}>{card.icon}</div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, marginBottom: "10px" }}>
              {card.title}
            </h3>
            <p style={{ color: "rgba(240,236,232,0.5)", fontSize: "14px", lineHeight: 1.6 }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ═══════ ENGINE / BLUEPRINT GENERATOR ═══════ */}
  <section id="engine" style={{ padding: "80px 24px" }}>
    <div style={{ maxWidth: "650px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#e8364b", marginBottom: "16px" }}>
          The Engine
        </p>
        <h2 className="section-h2" style={{ fontFamily: "'Syne', sans-serif", fontSize: "36px", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
          Leverage Blueprint <span style={{ color: "#e8364b" }}>Generator</span>
        </h2>
        <p style={{ color: "rgba(240,236,232,0.5)", fontSize: "16px", lineHeight: 1.6 }}>
          Input your situation. Get a personalized system architecture, tool stack, automation blueprint, and monetization ladder. Instantly.
        </p>
      </div>
      <form onSubmit={handleGenerate} style={{
        padding: "36px 32px", borderRadius: "20px",
        background: "rgba(240,236,232,0.03)", border: "1px solid rgba(240,236,232,0.08)",
      }}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px", color: "rgba(240,236,232,0.4)", marginBottom: "8px", textTransform: "uppercase" }}>
            What's your goal?
          </label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. Build a SaaS product, Start a side hustle, Automate my business..."
            style={{
              width: "100%", padding: "14px 18px", borderRadius: "12px",
              background: "rgba(240,236,232,0.04)", border: "1px solid rgba(240,236,232,0.1)",
              color: "#f0ece8", fontSize: "15px", fontFamily: "inherit", outline: "none",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px", color: "rgba(240,236,232,0.4)", marginBottom: "8px", textTransform: "uppercase" }}>
            Industry
          </label>
          <select value={industry} onChange={(e) => setIndustry(e.target.value)} style={{
            width: "100%", padding: "14px 18px", borderRadius: "12px",
            background: "rgba(240,236,232,0.04)", border: "1px solid rgba(240,236,232,0.1)",
            color: industry ? "#f0ece8" : "rgba(240,236,232,0.3)", fontSize: "15px", fontFamily: "inherit", outline: "none", cursor: "pointer",
          }}>
            <option value="">Select your industry</option>
            {INDUSTRIES.map((ind) => <option key={ind} value={ind} style={{ background: "#1a1a2e" }}>{ind}</option>)}
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px", color: "rgba(240,236,232,0.4)", marginBottom: "8px", textTransform: "uppercase" }}>
              Revenue Target
            </label>
            <select value={revenue} onChange={(e) => setRevenue(e.target.value)} style={{
              width: "100%", padding: "14px 18px", borderRadius: "12px",
              background: "rgba(240,236,232,0.04)", border: "1px solid rgba(240,236,232,0.1)",
              color: revenue ? "#f0ece8" : "rgba(240,236,232,0.3)", fontSize: "14px", fontFamily: "inherit", outline: "none", cursor: "pointer",
            }}>
              <option value="">Select target</option>
              {REVENUE_TARGETS.map((r) => <option key={r} value={r} style={{ background: "#1a1a2e" }}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px", color: "rgba(240,236,232,0.4)", marginBottom: "8px", textTransform: "uppercase" }}>
              Time Available
            </label>
            <select value={time} onChange={(e) => setTime(e.target.value)} style={{
              width: "100%", padding: "14px 18px", borderRadius: "12px",
              background: "rgba(240,236,232,0.04)", border: "1px solid rgba(240,236,232,0.1)",
              color: time ? "#f0ece8" : "rgba(240,236,232,0.3)", fontSize: "14px", fontFamily: "inherit", outline: "none", cursor: "pointer",
            }}>
              <option value="">Select time</option>
              {TIME_OPTIONS.map((t) => <option key={t} value={t} style={{ background: "#1a1a2e" }}>{t}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="cta-btn" style={{
          width: "100%", padding: "16px", borderRadius: "12px", border: "none",
          background: "#e8364b", color: "#fff", fontSize: "16px", fontWeight: 700,
          fontFamily: "'Syne', sans-serif", cursor: "pointer", animation: "glow 3s infinite",
        }}>
          Generate My Blueprint →
        </button>
        <p style={{ textAlign: "center", fontSize: "12px", color: "rgba(240,236,232,0.3)", marginTop: "14px" }}>
          Free preview included. No credit card required.
        </p>
      </form>
    </div>
  </section>

  {/* ═══════ FLYWHEEL ═══════ */}
  <section style={{ padding: "80px 24px", background: "rgba(240,236,232,0.02)" }}>
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#e8364b", marginBottom: "16px" }}>
          The Flywheel
        </p>
        <h2 className="section-h2" style={{ fontFamily: "'Syne', sans-serif", fontSize: "36px", fontWeight: 700 }}>
          This is how leverage <span style={{ color: "#e8364b" }}>compounds.</span>
        </h2>
      </div>
      {FLYWHEEL_STEPS.map((step, i) => (
        <div key={i} className="card-hover" style={{
          display: "flex", gap: "24px", alignItems: "flex-start",
          padding: "28px 24px", borderRadius: "16px", marginBottom: "12px",
          background: "rgba(240,236,232,0.02)", border: "1px solid rgba(240,236,232,0.06)",
        }}>
          <div style={{
            fontFamily: "'Syne', sans-serif", fontSize: "24px", fontWeight: 800,
            color: "#e8364b", opacity: 0.6, flexShrink: 0, width: "40px",
          }}>{step.num}</div>
          <div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, marginBottom: "6px" }}>
              {step.title}
            </h3>
            <p style={{ color: "rgba(240,236,232,0.5)", fontSize: "14px", lineHeight: 1.6 }}>
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* ═══════ PRICING ═══════ */}
  <section id="pricing" style={{ padding: "80px 24px" }}>
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#e8364b", marginBottom: "16px" }}>
          Pricing
        </p>
        <h2 className="section-h2" style={{ fontFamily: "'Syne', sans-serif", fontSize: "36px", fontWeight: 700 }}>
          Leverage <span style={{ color: "#e8364b" }}>stacking.</span>
        </h2>
        <p style={{ color: "rgba(240,236,232,0.5)", fontSize: "16px", marginTop: "12px" }}>
          Start free. Scale when the system proves itself.
        </p>
      </div>
      <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", alignItems: "start" }}>
        {PRICING_TIERS.map((tier, i) => (
          <div key={i} className="card-hover" style={{
            padding: "36px 28px", borderRadius: "20px",
            background: tier.popular ? "rgba(232,54,75,0.06)" : "rgba(240,236,232,0.03)",
            border: tier.popular ? "1px solid rgba(232,54,75,0.3)" : "1px solid rgba(240,236,232,0.06)",
            position: "relative",
          }}>
            {tier.popular && (
              <div style={{
                position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                background: "#e8364b", color: "#fff", padding: "4px 16px", borderRadius: "100px",
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px",
              }}>Most Popular</div>
            )}
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>
              {tier.name}
            </h3>
            <div style={{ marginBottom: "8px" }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "36px", fontWeight: 800, color: "#e8364b" }}>
                {tier.price}
              </span>
              {tier.price !== "Free" && (
                <span style={{ fontSize: "13px", color: "rgba(240,236,232,0.4)", marginLeft: "4px" }}>one-time</span>
              )}
            </div>
            <p style={{ fontSize: "13px", color: "rgba(240,236,232,0.4)", marginBottom: "24px", lineHeight: 1.5 }}>
              {tier.sub}
            </p>
            {tier.features.map((f, j) => (
              <div key={j} style={{
                display: "flex", gap: "10px", alignItems: "flex-start",
                padding: "6px 0", fontSize: "13px", color: "rgba(240,236,232,0.6)",
              }}>
                <span style={{ color: "#e8364b", flexShrink: 0 }}>✓</span>
                {f}
              </div>
            ))}
            <a href="/app" className="cta-btn" style={{
              display: "block", textAlign: "center", marginTop: "24px",
              padding: "14px", borderRadius: "10px", textDecoration: "none",
              fontWeight: 600, fontSize: "14px",
              background: tier.popular ? "#e8364b" : "rgba(240,236,232,0.06)",
              color: tier.popular ? "#fff" : "#f0ece8",
              border: tier.popular ? "none" : "1px solid rgba(240,236,232,0.1)",
            }}>{tier.cta}</a>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ═══════ FOOTER ═══════ */}
  <footer style={{
    padding: "60px 24px 40px", borderTop: "1px solid rgba(240,236,232,0.06)",
  }}>
    <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "40px" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "12px" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 800, color: "#f0ece8" }}>YouBeen</span>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 800, color: "#e8364b" }}>Classed</span>
        </div>
        <p style={{ color: "rgba(240,236,232,0.3)", fontSize: "13px", maxWidth: "280px", lineHeight: 1.6 }}>
          Operational leverage for ambitious operators. Build systems that compound. Stop trading time for revenue.
        </p>
      </div>
      <div>
        <h4 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(240,236,232,0.4)", marginBottom: "16px" }}>
          Product
        </h4>
        <a href="/app" style={{ display: "block", color: "rgba(240,236,232,0.5)", textDecoration: "none", fontSize: "14px", marginBottom: "8px" }}>Leverage Engine</a>
        <a href="#engine" style={{ display: "block", color: "rgba(240,236,232,0.5)", textDecoration: "none", fontSize: "14px", marginBottom: "8px" }}>Blueprint Generator</a>
        <a href="#pricing" style={{ display: "block", color: "rgba(240,236,232,0.5)", textDecoration: "none", fontSize: "14px", marginBottom: "8px" }}>Pricing</a>
        <a href="#philosophy" style={{ display: "block", color: "rgba(240,236,232,0.5)", textDecoration: "none", fontSize: "14px" }}>Philosophy</a>
      </div>
    </div>
    <div style={{ maxWidth: "1000px", margin: "40px auto 0", paddingTop: "20px", borderTop: "1px solid rgba(240,236,232,0.04)", textAlign: "center" }}>
      <p style={{ fontSize: "12px", color: "rgba(240,236,232,0.2)" }}>
        © 2026 YouBeenClassed. All rights reserved. Built with leverage. Powered by systems.
      </p>
    </div>
  </footer>
</div>
```

);
}