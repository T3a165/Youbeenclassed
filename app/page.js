"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy, Bell, Share2, Plus, Clock, Zap, Menu, X,
  ChevronUp, ArrowRight, TrendingUp, Target, Users, Map,
} from "lucide-react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const MOCK_POSTS = [
  { id: 501, text: "Gary's gym advice is older than his cardio machine.", author: "FlameKing99", bid: 47, class: "A", pinned: false },
  { id: 500, text: "This startup is a PowerPoint with a runway.", author: "RoastMaster", bid: 31, class: "B", pinned: true },
  { id: 499, text: "My wifi has more commitment than this business plan.", author: "ClassActual", bid: 28, class: "C", pinned: false },
  { id: 498, text: "Their brand strategy: post and pray. 🙏", author: "BoardTakr", bid: 22, class: "B", pinned: false },
  { id: 497, text: "You're disrupting nothing but your own sleep schedule.", author: "Verdict99", bid: 18, class: "D", pinned: false },
];

const DAILY_TARGET = {
  name: "DropshipDave",
  handle: "@dropshipdave",
  category: "E-commerce Hustler",
  emoji: "💀",
  timeLeft: "4h 22m",
  prizePool: 847,
  roasts: 143,
  topRoast: "Sells 'passion' for $29.99 with free shipping.",
};

const LEADERBOARD = [
  { rank: 1, name: "FlameKing99", wins: 47, badge: "🔥", streak: 12, class: "A" },
  { rank: 2, name: "RoastMaster", wins: 31, badge: "💀", streak: 8, class: "B" },
  { rank: 3, name: "ClassActual", wins: 28, badge: "🏆", streak: 5, class: "B" },
  { rank: 4, name: "BoardTakr", wins: 22, badge: "⚡", streak: 3, class: "C" },
  { rank: 5, name: "Verdict99", wins: 18, badge: "😤", streak: 2, class: "D" },
];

const UPCOMING_DUELS = [
  { id: 1, p1: "FlameKing99", p2: "RoastMaster", prize: "$45", status: "LIVE" },
  { id: 2, p1: "ClassActual", p2: "BoardTakr", prize: "$28", status: "2h" },
];

const ALERTS = [
  { id: 1, text: "FlameKing99 outbid Post #500 → $47", time: "2m" },
  { id: 2, text: "RoastMaster claimed Post #498 → $31", time: "5m" },
  { id: 3, text: "New daily target: DropshipDave 💀", time: "1h" },
];

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const CC = { A: "#00cc44", B: "#2266ff", C: "#ffdd00", D: "#ff2222" };
const CL = { A: "Scalable", B: "Fixable", C: "Hobby", D: "Delusion" };

const NAV_LINKS = [
  ["Home", "/"],
  ["Leaderboard", "/leaderboard"],
  ["Duels", "/duels"],
  ["Daily Target", "/target"],
  ["How to Play", "#how-to-play"],
];

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar({ onPostClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.3s",
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>

          <Link href="/" style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontFamily: "'Bangers', cursive", fontSize: 22, letterSpacing: 3, color: "#ffdd00" }}>
              THE CLASS BOARD
            </span>
            <span style={{ fontSize: 8, letterSpacing: 4, textTransform: "uppercase", color: "#555", marginTop: 1 }}>
              YouBeenClassed™
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ alignItems: "center", gap: 28 }}>
            {NAV_LINKS.map(([label, href]) => (
              <Link key={href} href={href} style={{
                color: "#666", fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#f5f5f0"}
                onMouseLeave={e => e.currentTarget.style.color = "#666"}
              >{label}</Link>
            ))}
            <button onClick={onPostClick} style={{
              background: "#ffdd00", color: "#0a0a0a",
              fontFamily: "'Archivo Black', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
              padding: "9px 16px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            }}>
              <Plus size={12} /> Post Roast
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-only"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", color: "#f5f5f0", cursor: "pointer", padding: 8 }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{
            background: "#111", borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 20px",
          }}>
            {NAV_LINKS.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
                display: "block", padding: "12px 0", fontSize: 13, letterSpacing: 2, textTransform: "uppercase",
                color: "#888", borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}>{label}</Link>
            ))}
            <button onClick={() => { onPostClick(); setMenuOpen(false); }} style={{
              width: "100%", background: "#ffdd00", color: "#0a0a0a",
              fontFamily: "'Archivo Black', sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
              padding: "14px", border: "none", cursor: "pointer", marginTop: 16,
            }}>
              + Post Your Roast
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

// ─── DAILY TARGET BANNER ──────────────────────────────────────────────────────

function DailyTargetBanner({ target }) {
  return (
    <div style={{
      background: "rgba(255,221,0,0.04)",
      border: "1px solid rgba(255,221,0,0.2)",
      borderLeft: "4px solid #ffdd00",
      padding: "20px 24px",
      marginBottom: 12,
      animation: "fadeUp 0.6s ease",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#ffdd00", marginBottom: 10 }}>
            🎯 Global Target of the Day
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 38, lineHeight: 1 }}>{target.emoji}</span>
            <div>
              <div style={{ fontFamily: "'Arquivo Black', sans-serif", fontFamily: "'Bangers', cursive", fontSize: 26, letterSpacing: 2, lineHeight: 1 }}>
                {target.name.toUpperCase()}
              </div>
              <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>
                {target.handle} · {target.category}
              </div>
            </div>
          </div>
          <div style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
            fontSize: 14, color: "rgba(245,245,240,0.55)",
            paddingLeft: 14, borderLeft: "2px solid rgba(255,221,0,0.25)",
          }}>
            "{target.topRoast}"
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#888", marginBottom: 2 }}>Prize Pool</div>
            <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 28, color: "#ffdd00", lineHeight: 1 }}>
              ${target.prizePool}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#888", marginBottom: 2 }}>Time Left</div>
            <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: "#ff2222" }}>{target.timeLeft}</div>
          </div>
          <div style={{ fontSize: 10, color: "#555" }}>{target.roasts} roasts submitted</div>
          <Link href="/target" style={{
            background: "#ffdd00", color: "#0a0a0a",
            fontFamily: "'Archivo Black', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
            padding: "10px 18px", display: "flex", alignItems: "center", gap: 6,
          }}>
            Submit Roast <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── POST CARD ────────────────────────────────────────────────────────────────

function PostCard({ post, rank, onOutbid }) {
  const color = CC[post.class] || "#888";
  const [hov, setHov] = useState(false);

  return (
    <div
      style={{
        background: hov ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderLeft: `4px solid ${color}`,
        padding: "18px 20px",
        marginBottom: 4,
        transition: "background 0.15s",
        animation: "fadeUp 0.5s ease",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        {/* Rank */}
        <div style={{
          fontFamily: "'Archivo Black', sans-serif", fontSize: 18,
          color: "rgba(255,255,255,0.12)", width: 28, flexShrink: 0, paddingTop: 4,
        }}>
          {rank < 10 ? `0${rank}` : rank}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Badges row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{
              background: `${color}1a`, color, border: `1px solid ${color}44`,
              fontFamily: "'Archivo Black', sans-serif", fontSize: 9, letterSpacing: 2, padding: "2px 8px",
              textTransform: "uppercase",
            }}>
              Class {post.class} · {CL[post.class]}
            </span>
            {post.pinned && (
              <span style={{ fontSize: 9, letterSpacing: 2, color: "#888", textTransform: "uppercase" }}>📌 Pinned</span>
            )}
          </div>

          {/* Roast text */}
          <p style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
            fontSize: 19, lineHeight: 1.45, marginBottom: 10, color: "#f5f5f0",
          }}>
            "{post.text}"
          </p>

          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 10, color: "#555" }}>by <span style={{ color: "#888" }}>{post.author}</span> · Post #{post.id}</span>
            <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: "#ffdd00" }}>
              💰 ${post.bid}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{
        display: "flex", gap: 6, marginTop: 14,
        paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.04)",
        flexWrap: "wrap",
      }}>
        <button onClick={() => onOutbid(post)} style={{
          background: "#ff2222", color: "#fff",
          fontFamily: "'Archivo Black', sans-serif", fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
          padding: "8px 14px", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 5, flex: 1, justifyContent: "center",
        }}>
          <ChevronUp size={13} /> Outbid (${post.bid + 5}+)
        </button>
        <button style={{
          background: "transparent", color: "#666",
          border: "1px solid rgba(255,255,255,0.08)",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 1,
          padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
        }}>📌 Pin</button>
        <button style={{
          background: "transparent", color: "#666",
          border: "1px solid rgba(255,255,255,0.08)",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 1,
          padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
        }}><Share2 size={11} /> Share</button>
      </div>
    </div>
  );
}

// ─── POST ROAST MODAL ─────────────────────────────────────────────────────────

function PostRoastModal({ onClose }) {
  const [text, setText] = useState("");
  const [bid, setBid] = useState("5");
  const [generating, setGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [posted, setPosted] = useState(false);

  async function sharpenWithAI() {
    if (!text.trim()) return;
    setGenerating(true);
    setAiSuggestion("");
    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      const data = await res.json();
      if (data.roast) setAiSuggestion(data.roast);
    } catch (e) {}
    setGenerating(false);
  }

  function submitPost() {
    setPosted(true);
    setTimeout(onClose, 2000);
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
      zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div style={{
        background: "#111", border: "1px solid rgba(255,255,255,0.12)",
        padding: 32, maxWidth: 560, width: "100%", position: "relative",
        animation: "fadeUp 0.3s ease",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          background: "none", border: "none", color: "#555", cursor: "pointer",
        }}>
          <X size={20} />
        </button>

        {posted ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔥</div>
            <div style={{ fontFamily: "'Bangers', cursive", fontSize: 32, letterSpacing: 3, color: "#ffdd00", marginBottom: 8 }}>
              YOU BEEN POSTED!
            </div>
            <p style={{ fontSize: 12, color: "#666" }}>Your roast is live on the board.</p>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: "'Bangers', cursive", fontSize: 28, letterSpacing: 3, color: "#ffdd00", marginBottom: 4 }}>
              POST YOUR ROAST
            </div>
            <p style={{ fontSize: 10, color: "#555", marginBottom: 20, letterSpacing: 2, textTransform: "uppercase" }}>
              Min bid $1 · Max 280 chars
            </p>

            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              maxLength={280}
              placeholder="Write your roast here... make it punchy."
              style={{
                width: "100%", minHeight: 100,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#f5f5f0", fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
                fontSize: 16, padding: 16, resize: "none", outline: "none", lineHeight: 1.5, marginBottom: 8,
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 10, color: "#444" }}>{text.length}/280</span>
              <button onClick={sharpenWithAI} disabled={!text.trim() || generating} style={{
                background: "none", border: "1px solid rgba(255,255,255,0.1)", color: generating ? "#555" : "#888",
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
                padding: "6px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
              }}>
                <Zap size={11} /> {generating ? "Sharpening..." : "AI Sharpen It"}
              </button>
            </div>

            {aiSuggestion && (
              <div style={{
                background: "rgba(255,221,0,0.05)", border: "1px solid rgba(255,221,0,0.15)",
                padding: 14, marginBottom: 14,
              }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: "#ffdd00", marginBottom: 6, textTransform: "uppercase" }}>
                  ⚡ AI Sharpened:
                </div>
                <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 15, color: "#f5f5f0", lineHeight: 1.5 }}>
                  "{aiSuggestion}"
                </p>
                <button onClick={() => { setText(aiSuggestion); setAiSuggestion(""); }} style={{
                  marginTop: 8, background: "none", border: "none", color: "#ffdd00",
                  fontSize: 10, letterSpacing: 2, cursor: "pointer", textTransform: "uppercase",
                }}>Use This ↑</button>
              </div>
            )}

            <div style={{ display: "flex", gap: 8, alignItems: "flex-end", marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#666", marginBottom: 6 }}>
                  Your Bid ($)
                </div>
                <input
                  type="number" min="1" max="1000" value={bid}
                  onChange={e => setBid(e.target.value)}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)", color: "#ffdd00",
                    fontFamily: "'Archivo Black', sans-serif", fontSize: 22,
                    padding: "10px 14px", outline: "none",
                  }}
                />
              </div>
              <button
                onClick={submitPost}
                disabled={!text.trim() || !bid}
                style={{
                  background: "#ffdd00", color: "#0a0a0a",
                  fontFamily: "'Archivo Black', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                  padding: "22px 20px", border: "none", cursor: "pointer",
                  opacity: (!text.trim() || !bid) ? 0.5 : 1,
                }}
              >
                Post for ${bid || "0"}
              </button>
            </div>

            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4,
              padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)",
            }}>
              {[["Post message", "$1–5"], ["Replace post", "$3–20"], ["Pin message", "$10–50"]].map(([action, cost]) => (
                <div key={action} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, letterSpacing: 1, textTransform: "uppercase", color: "#444", marginBottom: 2 }}>{action}</div>
                  <div style={{ fontSize: 11, color: "#ffdd00" }}>{cost}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── SIDEBAR COMPONENTS ───────────────────────────────────────────────────────

function SidebarBlock({ children, title, icon: Icon, iconColor, href, linkText }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
      padding: 18, marginBottom: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <Icon size={13} color={iconColor} />
        <span style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#666" }}>{title}</span>
        {href && (
          <Link href={href} style={{ marginLeft: "auto", fontSize: 9, color: "#444", letterSpacing: 2 }}>
            {linkText} →
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

function LeaderboardSidebar({ data }) {
  return (
    <SidebarBlock title="Top Roasters" icon={Trophy} iconColor="#ffdd00" href="/leaderboard" linkText="All">
      {data.map(user => (
        <div key={user.rank} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}>
          <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)", width: 20 }}>
            #{user.rank}
          </span>
          <span style={{ fontSize: 16 }}>{user.badge}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: "#f5f5f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user.name}
            </div>
            <div style={{ fontSize: 9, color: "#555" }}>{user.wins} wins · {user.streak}🔥 streak</div>
          </div>
          <span style={{
            fontSize: 8, letterSpacing: 1, color: CC[user.class],
            border: `1px solid ${CC[user.class]}44`, padding: "2px 6px",
          }}>
            {user.class}
          </span>
        </div>
      ))}
    </SidebarBlock>
  );
}

function DuelsSidebar({ duels }) {
  return (
    <SidebarBlock title="Upcoming Duels" icon={Zap} iconColor="#ff2222" href="/duels" linkText="Arena">
      {duels.map(d => (
        <div key={d.id} style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: "#f5f5f0" }}>
              {d.p1} <span style={{ color: "#444" }}>vs</span> {d.p2}
            </span>
            <span style={{
              fontSize: 8, letterSpacing: 2, textTransform: "uppercase", padding: "2px 8px",
              color: d.status === "LIVE" ? "#ff2222" : "#666",
              border: `1px solid ${d.status === "LIVE" ? "rgba(255,34,34,0.3)" : "rgba(255,255,255,0.06)"}`,
              ...(d.status === "LIVE" ? { animation: "pulse 1.5s ease infinite" } : {}),
            }}>
              {d.status}
            </span>
          </div>
          <div style={{ fontSize: 10, color: "#ffdd00" }}>Prize: {d.prize}</div>
        </div>
      ))}
    </SidebarBlock>
  );
}

function AlertsSidebar({ alerts }) {
  return (
    <SidebarBlock title="Live Alerts" icon={Bell} iconColor="#2266ff">
      {alerts.map(a => (
        <div key={a.id} style={{
          display: "flex", gap: 10, padding: "8px 0",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div style={{ fontSize: 11, color: "rgba(245,245,240,0.65)", flex: 1, lineHeight: 1.5 }}>{a.text}</div>
          <div style={{ fontSize: 9, color: "#444", flexShrink: 0, paddingTop: 2 }}>{a.time}ago</div>
        </div>
      ))}
    </SidebarBlock>
  );
}

// ─── HOW TO PLAY ──────────────────────────────────────────────────────────────

function HowToPlay() {
  const steps = [
    { icon: "✍️", step: "01", title: "Post a Roast", desc: "Write your roast (max 280 chars). Set your bid. Go live." },
    { icon: "💰", step: "02", title: "Outbid to Replace", desc: "See a better spot? Outbid the current holder. Your post takes the slot." },
    { icon: "⚔️", step: "03", title: "Enter Duels", desc: "Challenge other roasters head-to-head. Crowd votes. Winner takes the pool." },
    { icon: "🎯", step: "04", title: "Target the Daily", desc: "Submit a roast for the daily target. Top roast wins the prize pool." },
    { icon: "🏆", step: "05", title: "Climb the Board", desc: "Earn badges, streaks, and class ratings. Get crowned Top Roaster." },
    { icon: "🗺️", step: "06", title: "Claim Territory", desc: "Own tiles on the map. Defend them from outbids. Build your empire." },
  ];

  return (
    <section id="how-to-play" style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "60px 20px",
      background: "rgba(255,255,255,0.01)",
    }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: "#555", marginBottom: 10 }}>Rules of the Game</p>
          <h2 style={{ fontFamily: "'Bangers', cursive", fontSize: "clamp(28px,6vw,48px)", letterSpacing: 3 }}>
            HOW TO PLAY
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 4 }}>
          {steps.map(s => (
            <div key={s.step} style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
              padding: "24px 20px",
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 9, letterSpacing: 3, color: "#555", marginBottom: 6 }}>STEP {s.step}</div>
              <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
                {s.title}
              </div>
              <p style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MOBILE BOTTOM NAV ────────────────────────────────────────────────────────

function MobileBottomNav() {
  const items = [
    ["🏠", "Home", "/"],
    ["🏆", "Board", "/leaderboard"],
    ["⚔️", "Duels", "/duels"],
    ["🎯", "Target", "/target"],
    ["🗺️", "Map", "/territory"],
  ];

  return (
    <nav
      className="mobile-only"
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(10,10,10,0.97)", backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
      }}
    >
      {items.map(([icon, label, href]) => (
        <Link key={href} href={href} style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          padding: "10px 4px", color: "#555",
        }}>
          <span style={{ fontSize: 18 }}>{icon}</span>
          <span style={{ fontSize: 8, letterSpacing: 1, textTransform: "uppercase" }}>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Home() {
  const [showPost, setShowPost] = useState(false);
  const [posts] = useState(MOCK_POSTS);

  return (
    <>
      <Navbar onPostClick={() => setShowPost(true)} />
      {showPost && <PostRoastModal onClose={() => setShowPost(false)} />}

      {/* Board Header */}
      <div style={{
        paddingTop: 60, borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.01)",
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "22px 20px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: "#555", marginBottom: 6 }}>
                Live Competitive Board
              </p>
              <h1 style={{
                fontFamily: "'Bangers', cursive",
                fontSize: "clamp(32px,7vw,56px)", letterSpacing: 3, lineHeight: 1,
              }}>
                THE CLASS BOARD
              </h1>
              <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 15, color: "#666", marginTop: 4 }}>
                Outbid. Roast. Take the board.
              </p>
            </div>
            <button
              onClick={() => setShowPost(true)}
              className="hide-mobile"
              style={{
                background: "#ff2222", color: "#fff",
                fontFamily: "'Archivo Black', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
                padding: "14px 22px", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              <Plus size={16} /> Post Your Roast
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "16px 20px 120px" }}>
        <div className="main-grid" style={{ display: "grid", gap: 14, alignItems: "flex-start" }}>

          {/* ── Left: Board ── */}
          <div>
            <DailyTargetBanner target={DAILY_TARGET} />

            {/* Section header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0 10px" }}>
              <span style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#666" }}>🔥 Current Top Posts</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
              <span style={{ fontSize: 9, color: "#444" }}>Outbid to replace</span>
            </div>

            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} rank={i + 1} onOutbid={() => setShowPost(true)} />
            ))}

            {/* Post CTA */}
            <div style={{
              marginTop: 12, padding: "28px 24px",
              border: "1px dashed rgba(255,255,255,0.08)",
              textAlign: "center", background: "rgba(255,255,255,0.01)",
              animation: "fadeUp 0.8s ease",
            }}>
              <p style={{ fontFamily: "'Bangers', cursive", fontSize: 22, letterSpacing: 3, marginBottom: 6 }}>
                THINK YOU CAN DO BETTER?
              </p>
              <p style={{ fontSize: 11, color: "#555", marginBottom: 18 }}>
                Post your roast and outbid your way to the top.
              </p>
              <button onClick={() => setShowPost(true)} style={{
                background: "#ffdd00", color: "#0a0a0a",
                fontFamily: "'Archivo Black', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
                padding: "12px 28px", border: "none", cursor: "pointer",
              }}>
                Claim Your Spot →
              </button>
            </div>
          </div>

          {/* ── Right: Sidebar ── */}
          <div className="sidebar" style={{ position: "sticky", top: 74 }}>
            <LeaderboardSidebar data={LEADERBOARD} />
            <DuelsSidebar duels={UPCOMING_DUELS} />
            <AlertsSidebar alerts={ALERTS} />

            {/* Explore buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              {[
                [Target, "Daily Target", "/target", "#ffdd00"],
                [Users, "Leaderboard", "/leaderboard", "#00cc44"],
                [Zap, "Duels", "/duels", "#ff2222"],
                [Map, "Territory", "/territory", "#2266ff"],
              ].map(([Icon, label, href, color]) => (
                <Link key={href} href={href} style={{
                  background: "rgba(255,255,255,0.02)", border: `1px solid rgba(255,255,255,0.06)`,
                  borderTop: `2px solid ${color}`,
                  padding: "14px 12px", display: "flex", flexDirection: "column", gap: 6,
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                >
                  <Icon size={14} color={color} />
                  <span style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#666" }}>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <HowToPlay />

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#070707" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "40px 20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32, marginBottom: 32 }}>
            <div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: 20, letterSpacing: 3, color: "#ffdd00", marginBottom: 8 }}>
                THE CLASS BOARD
              </div>
              <p style={{ fontSize: 12, color: "#555", lineHeight: 1.7, maxWidth: 240 }}>
                The most chaotic social board on the internet. Post roasts. Outbid for spots. Take the board.
              </p>
            </div>
            {[
              ["Navigate", [["Home", "/"], ["Leaderboard", "/leaderboard"], ["Duels", "/duels"], ["Daily Target", "/target"]]],
              ["Play", [["Post a Roast", "#"], ["Enter a Duel", "/duels"], ["Territory Mode", "/territory"], ["How to Play", "#how-to-play"]]],
              ["About", [["About", "#"], ["Terms", "#"], ["Privacy", "#"], ["Contact", "#"]]],
            ].map(([title, links]) => (
              <div key={title}>
                <p style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#444", marginBottom: 12 }}>{title}</p>
                {links.map(([label, href]) => (
                  <Link key={label} href={href} style={{
                    display: "block", fontSize: 12, color: "#555", marginBottom: 8, transition: "color 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "#f5f5f0"}
                    onMouseLeave={e => e.currentTarget.style.color = "#555"}
                  >{label}</Link>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 10, color: "#333", letterSpacing: 2 }}>
              © 2025 YouBeenClassed™ · The Class Board
            </p>
            <p style={{ fontSize: 10, color: "#333", letterSpacing: 2 }}>
              Outbid. Roast. Take the board.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile: floating post button */}
      <button
        onClick={() => setShowPost(true)}
        className="mobile-only"
        style={{
          position: "fixed", bottom: 68, right: 16, zIndex: 900,
          background: "#ff2222", color: "#fff", border: "none",
          width: 50, height: 50,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", boxShadow: "0 4px 24px rgba(255,34,34,0.45)",
        }}
      >
        <Plus size={22} />
      </button>

      <MobileBottomNav />
    </>
  );
}
