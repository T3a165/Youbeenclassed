"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Target, ArrowLeft, Clock, ArrowRight, Zap, TrendingUp } from "lucide-react";

const CC = { A: "#00cc44", B: "#2266ff", C: "#ffdd00", D: "#ff2222" };

const DAILY_TARGET = {
  name: "DropshipDave",
  handle: "@dropshipdave",
  category: "E-commerce Hustler",
  emoji: "💀",
  description: "Self-proclaimed 'dropshipping guru' with 14 courses, 3 failed stores, and a ring light.",
  prizePool: 847,
  roasts: 143,
  expiresAt: Date.now() + 4 * 60 * 60 * 1000 + 22 * 60 * 1000,
};

const TOP_ROASTS = [
  { rank: 1, author: "FlameKing99", badge: "🔥", text: "Sells 'passion' for $29.99 with free shipping.", votes: 341, class: "A" },
  { rank: 2, author: "RoastMaster", badge: "💀", text: "The only thing he dropships is his own credibility.", votes: 287, class: "A" },
  { rank: 3, author: "ClassActual", badge: "🏆", text: "His suppliers have a better refund policy than his courses.", votes: 201, class: "B" },
  { rank: 4, author: "BoardTakr", badge: "⚡", text: "Ring light brighter than his business prospects.", votes: 156, class: "B" },
  { rank: 5, author: "Verdict99", badge: "😤", text: "Built a Shopify store for someone else's dream.", votes: 98, class: "C" },
];

function Countdown({ expiresAt }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function update() {
      const diff = expiresAt - Date.now();
      if (diff <= 0) { setTimeLeft("00:00:00"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  return (
    <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(28px,6vw,52px)", color: "#ff2222", letterSpacing: 4, lineHeight: 1 }}>
      {timeLeft}
    </div>
  );
}

export default function TargetPage() {
  const [roastText, setRoastText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [aiRoast, setAiRoast] = useState("");

  async function generateAI() {
    if (!roastText.trim()) return;
    setGenerating(true);
    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `Write a sharper version of this roast about a dropshipping guru named DropshipDave: "${roastText}"` }),
      });
      const data = await res.json();
      if (data.roast) setAiRoast(data.roast);
    } catch (e) {}
    setGenerating(false);
  }

  function submitRoast() {
    if (!roastText.trim()) return;
    setSubmitted(true);
  }

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#f5f5f0", fontFamily: "'JetBrains Mono', monospace" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#555", marginBottom: 20 }}>
            <ArrowLeft size={12} /> Back to Board
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Target size={32} color="#ffdd00" />
            <div>
              <p style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: "#555", marginBottom: 4 }}>Daily Competition</p>
              <h1 style={{ fontFamily: "'Bangers', cursive", fontSize: "clamp(28px,6vw,48px)", letterSpacing: 3 }}>
                GLOBAL TARGET
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px 60px" }}>
        {/* Target Hero */}
        <div style={{
          background: "rgba(255,221,0,0.04)", border: "1px solid rgba(255,221,0,0.2)",
          borderTop: "3px solid #ffdd00",
          padding: "32px", marginBottom: 20,
          animation: "fadeUp 0.5s ease",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "start" }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#ffdd00", marginBottom: 16 }}>
                🎯 Today's Target
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
                <span style={{ fontSize: 52, lineHeight: 1 }}>{DAILY_TARGET.emoji}</span>
                <div>
                  <div style={{ fontFamily: "'Bangers', cursive", fontSize: 36, letterSpacing: 2, lineHeight: 1 }}>
                    {DAILY_TARGET.name.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>
                    {DAILY_TARGET.handle} · {DAILY_TARGET.category}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "rgba(245,245,240,0.55)", lineHeight: 1.7 }}>
                {DAILY_TARGET.description}
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#888", marginBottom: 6 }}>
                  <Clock size={10} style={{ display: "inline", marginRight: 4 }} />
                  Time Remaining
                </div>
                <Countdown expiresAt={DAILY_TARGET.expiresAt} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#888", marginBottom: 6 }}>Prize Pool</div>
                <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 32, color: "#ffdd00", lineHeight: 1 }}>
                  ${DAILY_TARGET.prizePool}
                </div>
              </div>
              <div style={{ fontSize: 10, color: "#555" }}>{DAILY_TARGET.roasts} roasts submitted</div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {/* Submit roast */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: 24 }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔥</div>
                <div style={{ fontFamily: "'Bangers', cursive", fontSize: 24, letterSpacing: 3, color: "#ffdd00", marginBottom: 8 }}>
                  ROAST SUBMITTED!
                </div>
                <p style={{ fontSize: 11, color: "#666" }}>Live on the leaderboard now.</p>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#666", marginBottom: 16 }}>
                  ✍️ Submit Your Roast
                </div>
                <textarea
                  value={roastText}
                  onChange={e => setRoastText(e.target.value)}
                  maxLength={280}
                  placeholder={`Roast ${DAILY_TARGET.name}... make it count.`}
                  style={{
                    width: "100%", minHeight: 100,
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#f5f5f0", fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
                    fontSize: 15, padding: 14, resize: "none", outline: "none", lineHeight: 1.5, marginBottom: 8,
                  }}
                />
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <button onClick={generateAI} disabled={!roastText.trim() || generating} style={{
                    flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    color: generating ? "#444" : "#888",
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
                    padding: "9px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}>
                    <Zap size={11} /> {generating ? "Sharpening..." : "AI Sharpen It"}
                  </button>
                </div>

                {aiRoast && (
                  <div style={{
                    background: "rgba(255,221,0,0.05)", border: "1px solid rgba(255,221,0,0.15)",
                    padding: 12, marginBottom: 12,
                  }}>
                    <div style={{ fontSize: 8, letterSpacing: 3, color: "#ffdd00", marginBottom: 6, textTransform: "uppercase" }}>⚡ Sharpened:</div>
                    <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 14, color: "#f5f5f0" }}>
                      "{aiRoast}"
                    </p>
                    <button onClick={() => { setRoastText(aiRoast); setAiRoast(""); }} style={{
                      marginTop: 8, background: "none", border: "none", color: "#ffdd00",
                      fontSize: 9, letterSpacing: 2, cursor: "pointer", textTransform: "uppercase",
                    }}>Use This ↑</button>
                  </div>
                )}

                <button onClick={submitRoast} disabled={!roastText.trim()} style={{
                  width: "100%", background: "#ffdd00", color: "#0a0a0a",
                  fontFamily: "'Archivo Black', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
                  padding: "14px", border: "none", cursor: "pointer",
                  opacity: !roastText.trim() ? 0.5 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                  Submit Roast <ArrowRight size={14} />
                </button>
                <p style={{ fontSize: 9, color: "#444", textAlign: "center", marginTop: 8 }}>Free to submit. Top roast wins ${DAILY_TARGET.prizePool}.</p>
              </>
            )}
          </div>

          {/* Live leaderboard */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <TrendingUp size={13} color="#ffdd00" />
              <span style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#666" }}>Live Rankings</span>
              <span style={{ marginLeft: "auto", fontSize: 9, color: "#ff222280", animation: "blink 1.5s infinite" }}>● Live</span>
            </div>

            {TOP_ROASTS.map(r => (
              <div key={r.rank} style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}>
                <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.2)", width: 20, paddingTop: 2 }}>
                  #{r.rank}
                </span>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{r.badge}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 11, color: "#f5f5f0" }}>{r.author}</span>
                    <span style={{ fontSize: 8, color: CC[r.class], border: `1px solid ${CC[r.class]}44`, padding: "1px 5px" }}>{r.class}</span>
                  </div>
                  <p style={{
                    fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
                    fontSize: 12, color: "rgba(245,245,240,0.6)", lineHeight: 1.4,
                  }}>"{r.text}"</p>
                  <div style={{ fontSize: 9, color: "#555", marginTop: 4 }}>👍 {r.votes.toLocaleString()} votes</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
