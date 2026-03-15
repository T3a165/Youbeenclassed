"use client";
import { useState } from "react";
import Link from "next/link";
import { Zap, ArrowLeft, Trophy, Clock } from "lucide-react";

const CC = { A: "#00cc44", B: "#2266ff", C: "#ffdd00", D: "#ff2222" };

const LIVE_DUELS = [
  {
    id: 1,
    status: "LIVE",
    prize: 45,
    entryFee: 10,
    timeLeft: "14:32",
    challenger1: {
      name: "FlameKing99", badge: "🔥", class: "A",
      roast: "Gary's gym advice is older than his cardio machine.",
      votes: 312, percent: 58,
    },
    challenger2: {
      name: "RoastMaster", badge: "💀", class: "B",
      roast: "This startup is a PowerPoint with a runway.",
      votes: 228, percent: 42,
    },
  },
  {
    id: 2,
    status: "LIVE",
    prize: 28,
    entryFee: 5,
    timeLeft: "2:04:18",
    challenger1: {
      name: "ClassActual", badge: "🏆", class: "B",
      roast: "Their brand strategy: post and pray.",
      votes: 88, percent: 52,
    },
    challenger2: {
      name: "BoardTakr", badge: "⚡", class: "C",
      roast: "You're disrupting nothing but your sleep schedule.",
      votes: 81, percent: 48,
    },
  },
];

const COMPLETED_DUELS = [
  {
    id: 10,
    winner: "FlameKing99", loser: "Verdict99",
    winnerBadge: "🔥", loserBadge: "😤",
    prize: "$92",
    roast: "You've been classed: Class D. Delusion with a logo.",
    date: "2h ago",
  },
  {
    id: 9,
    winner: "RoastMaster", loser: "BurnNotice",
    winnerBadge: "💀", loserBadge: "🔥",
    prize: "$34",
    roast: "Their roadmap is a mood board.",
    date: "5h ago",
  },
  {
    id: 8,
    winner: "ClassActual", loser: "NightRoaster",
    winnerBadge: "🏆", loserBadge: "🌙",
    prize: "$28",
    roast: "Pivoting so hard they forgot what they sold.",
    date: "1d ago",
  },
];

function DuelCard({ duel }) {
  const [voted, setVoted] = useState(null);
  const [votes1, setVotes1] = useState(duel.challenger1.votes);
  const [votes2, setVotes2] = useState(duel.challenger2.votes);
  const total = votes1 + votes2;
  const pct1 = Math.round((votes1 / total) * 100);
  const pct2 = 100 - pct1;

  function vote(side) {
    if (voted) return;
    setVoted(side);
    if (side === 1) setVotes1(v => v + 1);
    else setVotes2(v => v + 1);
  }

  return (
    <div style={{
      border: "1px solid rgba(255,255,255,0.08)",
      borderTop: "3px solid #ff2222",
      background: "rgba(255,255,255,0.02)",
      marginBottom: 12,
      animation: "fadeUp 0.5s ease",
    }}>
      {/* Duel header */}
      <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            background: "rgba(255,34,34,0.1)", color: "#ff2222", border: "1px solid rgba(255,34,34,0.25)",
            fontSize: 9, letterSpacing: 3, textTransform: "uppercase", padding: "3px 10px",
            animation: "pulse 1.5s ease infinite",
          }}>
            🔴 LIVE
          </span>
          <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: "#ffdd00" }}>
            Prize Pool: ${duel.prize}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 10, color: "#555" }}>Entry: ${duel.entryFee}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "#888" }}>
            <Clock size={11} /> {duel.timeLeft}
          </span>
        </div>
      </div>

      {/* Challengers */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0 }}>
        {/* Challenger 1 */}
        <div style={{
          padding: "24px 20px",
          borderRight: "1px solid rgba(255,255,255,0.04)",
          background: voted === 1 ? "rgba(0,204,68,0.05)" : "transparent",
          transition: "background 0.3s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>{duel.challenger1.badge}</span>
            <div>
              <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 14, textTransform: "uppercase" }}>
                {duel.challenger1.name}
              </div>
              <span style={{
                fontSize: 8, letterSpacing: 1, color: CC[duel.challenger1.class],
                border: `1px solid ${CC[duel.challenger1.class]}44`, padding: "1px 6px",
              }}>Class {duel.challenger1.class}</span>
            </div>
          </div>
          <p style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
            fontSize: 16, lineHeight: 1.5, color: "#f5f5f0", marginBottom: 16,
          }}>
            "{duel.challenger1.roast}"
          </p>
          {/* Vote bar */}
          <div style={{ height: 4, background: "rgba(255,255,255,0.05)", marginBottom: 8 }}>
            <div style={{ height: "100%", width: `${pct1}%`, background: "#00cc44", transition: "width 0.5s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 10, color: "#555" }}>{votes1.toLocaleString()} votes</span>
            <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 14, color: "#00cc44" }}>{pct1}%</span>
          </div>
          <button onClick={() => vote(1)} disabled={!!voted} style={{
            width: "100%", background: voted === 1 ? "#00cc44" : "rgba(0,204,68,0.1)",
            color: voted === 1 ? "#0a0a0a" : "#00cc44",
            border: "1px solid rgba(0,204,68,0.3)",
            fontFamily: "'Archivo Black', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
            padding: "12px", cursor: voted ? "default" : "pointer", transition: "all 0.2s",
          }}>
            {voted === 1 ? "✓ Voted" : "🟢 Vote Challenger 1"}
          </button>
        </div>

        {/* VS divider */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
          <div style={{
            fontFamily: "'Bangers', cursive", fontSize: 28, letterSpacing: 2, color: "#ff2222",
            textShadow: "0 0 20px rgba(255,34,34,0.5)",
          }}>VS</div>
        </div>

        {/* Challenger 2 */}
        <div style={{
          padding: "24px 20px",
          borderLeft: "1px solid rgba(255,255,255,0.04)",
          background: voted === 2 ? "rgba(255,34,34,0.05)" : "transparent",
          transition: "background 0.3s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>{duel.challenger2.badge}</span>
            <div>
              <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 14, textTransform: "uppercase" }}>
                {duel.challenger2.name}
              </div>
              <span style={{
                fontSize: 8, letterSpacing: 1, color: CC[duel.challenger2.class],
                border: `1px solid ${CC[duel.challenger2.class]}44`, padding: "1px 6px",
              }}>Class {duel.challenger2.class}</span>
            </div>
          </div>
          <p style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
            fontSize: 16, lineHeight: 1.5, color: "#f5f5f0", marginBottom: 16,
          }}>
            "{duel.challenger2.roast}"
          </p>
          <div style={{ height: 4, background: "rgba(255,255,255,0.05)", marginBottom: 8 }}>
            <div style={{ height: "100%", width: `${pct2}%`, background: "#ff2222", transition: "width 0.5s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 10, color: "#555" }}>{votes2.toLocaleString()} votes</span>
            <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 14, color: "#ff2222" }}>{pct2}%</span>
          </div>
          <button onClick={() => vote(2)} disabled={!!voted} style={{
            width: "100%", background: voted === 2 ? "#ff2222" : "rgba(255,34,34,0.1)",
            color: voted === 2 ? "#fff" : "#ff2222",
            border: "1px solid rgba(255,34,34,0.3)",
            fontFamily: "'Archivo Black', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
            padding: "12px", cursor: voted ? "default" : "pointer", transition: "all 0.2s",
          }}>
            {voted === 2 ? "✓ Voted" : "🔴 Vote Challenger 2"}
          </button>
        </div>
      </div>

      {voted && (
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
          <span style={{ fontSize: 10, color: "#666", letterSpacing: 2 }}>Vote recorded. Results update live.</span>
        </div>
      )}
    </div>
  );
}

export default function DuelsPage() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#f5f5f0", fontFamily: "'JetBrains Mono', monospace" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#555", marginBottom: 20 }}>
            <ArrowLeft size={12} /> Back to Board
          </Link>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Zap size={32} color="#ff2222" />
              <div>
                <p style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: "#555", marginBottom: 4 }}>Head-to-Head</p>
                <h1 style={{ fontFamily: "'Bangers', cursive", fontSize: "clamp(28px,6vw,48px)", letterSpacing: 3 }}>
                  DUEL ARENA
                </h1>
              </div>
            </div>
            <button style={{
              background: "#ff2222", color: "#fff",
              fontFamily: "'Archivo Black', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
              padding: "12px 20px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
            }}>
              <Zap size={14} /> Challenge Someone
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px 60px" }}>
        {/* Live battles */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#666" }}>⚔️ Live Battles</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
          <span style={{ fontSize: 9, color: "#ff222280", animation: "pulse 1.5s infinite" }}>● {LIVE_DUELS.length} Active</span>
        </div>

        {LIVE_DUELS.map(duel => <DuelCard key={duel.id} duel={duel} />)}

        {/* Completed */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "32px 0 16px" }}>
          <span style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#666" }}>🏆 Recent Results</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
        </div>

        {COMPLETED_DUELS.map(d => (
          <div key={d.id} style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "14px 18px", background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderLeft: "3px solid #ffdd00",
            marginBottom: 4,
          }}>
            <div style={{ flexShrink: 0 }}>
              <span style={{ fontSize: 22 }}>{d.winnerBadge}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#ffdd00", fontFamily: "'Archivo Black', sans-serif" }}>{d.winner}</span>
                <span style={{ fontSize: 9, color: "#555" }}>defeated</span>
                <span style={{ fontSize: 12, color: "#888" }}>{d.loser} {d.loserBadge}</span>
              </div>
              <p style={{
                fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
                fontSize: 13, color: "rgba(245,245,240,0.55)",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                "{d.roast}"
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: "#00cc44" }}>{d.prize}</div>
              <div style={{ fontSize: 9, color: "#555" }}>{d.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
