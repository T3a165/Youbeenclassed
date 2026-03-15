"use client";
import { useState } from "react";
import Link from "next/link";
import { Trophy, TrendingUp, Zap, ArrowLeft } from "lucide-react";

const CC = { A: "#00cc44", B: "#2266ff", C: "#ffdd00", D: "#ff2222" };

const TOP_ROASTERS = [
  { rank: 1, name: "FlameKing99", badge: "🔥", wins: 47, bids: 312, streak: 12, class: "A", posts: 89, joined: "Jan 2025" },
  { rank: 2, name: "RoastMaster", badge: "💀", wins: 31, bids: 201, streak: 8, class: "B", posts: 65, joined: "Feb 2025" },
  { rank: 3, name: "ClassActual", badge: "🏆", wins: 28, bids: 187, streak: 5, class: "B", posts: 54, joined: "Jan 2025" },
  { rank: 4, name: "BoardTakr", badge: "⚡", wins: 22, bids: 143, streak: 3, class: "C", posts: 41, joined: "Mar 2025" },
  { rank: 5, name: "Verdict99", badge: "😤", wins: 18, bids: 110, streak: 2, class: "D", posts: 33, joined: "Feb 2025" },
  { rank: 6, name: "BurnNotice", badge: "🔥", wins: 15, bids: 98, streak: 1, class: "B", posts: 28, joined: "Mar 2025" },
  { rank: 7, name: "ClassicRoast", badge: "😂", wins: 12, bids: 76, streak: 0, class: "C", posts: 22, joined: "Apr 2025" },
  { rank: 8, name: "OutbidKing", badge: "👑", wins: 9, bids: 201, streak: 0, class: "A", posts: 17, joined: "Mar 2025" },
  { rank: 9, name: "PunchlineHQ", badge: "🎯", wins: 7, bids: 55, streak: 0, class: "B", posts: 15, joined: "Apr 2025" },
  { rank: 10, name: "NightRoaster", badge: "🌙", wins: 5, bids: 44, streak: 0, class: "C", posts: 12, joined: "May 2025" },
];

const CLAIMED_POSTS = [
  { rank: 1, name: "FlameKing99", badge: "🔥", claimed: 89, active: 5, record_hold: "14 days" },
  { rank: 2, name: "OutbidKing", badge: "👑", claimed: 76, active: 3, record_hold: "21 days" },
  { rank: 3, name: "RoastMaster", badge: "💀", claimed: 65, active: 2, record_hold: "9 days" },
  { rank: 4, name: "ClassActual", badge: "🏆", claimed: 54, active: 1, record_hold: "7 days" },
  { rank: 5, name: "BoardTakr", badge: "⚡", claimed: 41, active: 2, record_hold: "5 days" },
];

const MOST_OUTBIDS = [
  { rank: 1, name: "OutbidKing", badge: "👑", outbids: 201, spent: "$1,847", biggest: "$95" },
  { rank: 2, name: "FlameKing99", badge: "🔥", outbids: 155, spent: "$1,204", biggest: "$74" },
  { rank: 3, name: "RoastMaster", badge: "💀", outbids: 143, spent: "$987", biggest: "$62" },
  { rank: 4, name: "ClassActual", badge: "🏆", outbids: 112, spent: "$743", biggest: "$48" },
  { rank: 5, name: "Verdict99", badge: "😤", outbids: 98, spent: "$612", biggest: "$39" },
];

const TABS = ["Top Roasters", "Most Claimed Posts", "Most Outbids"];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#f5f5f0", fontFamily: "'JetBrains Mono', monospace" }}>
        {/* Header */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px", background: "rgba(255,255,255,0.01)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#555", marginBottom: 20 }}>
              <ArrowLeft size={12} /> Back to Board
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Trophy size={32} color="#ffdd00" />
              <div>
                <p style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: "#555", marginBottom: 4 }}>Global Rankings</p>
                <h1 style={{ fontFamily: "'Bangers', cursive", fontSize: "clamp(28px,6vw,48px)", letterSpacing: 3 }}>
                  LEADERBOARD
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {[["2,847", "Total Players"], ["47,291", "Roasts Posted"], ["$124K+", "Total Bids"], ["4,201", "Duels Fought"]].map(([num, label]) => (
              <div key={label} style={{ padding: "16px 20px", textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(18px,3vw,28px)", color: "#ffdd00", lineHeight: 1, marginBottom: 4 }}>{num}</div>
                <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#555" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px 60px" }}>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
            {TABS.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)} style={{
                background: activeTab === i ? "#ffdd00" : "rgba(255,255,255,0.03)",
                color: activeTab === i ? "#0a0a0a" : "#666",
                border: `1px solid ${activeTab === i ? "#ffdd00" : "rgba(255,255,255,0.07)"}`,
                fontFamily: "'Archivo Black', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
                padding: "10px 16px", cursor: "pointer", transition: "all 0.2s",
              }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Top Roasters */}
          {activeTab === 0 && (
            <div>
              {/* Top 3 podium */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 20 }}>
                {[TOP_ROASTERS[1], TOP_ROASTERS[0], TOP_ROASTERS[2]].map((user, i) => {
                  const realRank = i === 0 ? 2 : i === 1 ? 1 : 3;
                  const color = realRank === 1 ? "#ffdd00" : realRank === 2 ? "#aaaaaa" : "#cd7f32";
                  const height = realRank === 1 ? "100%" : realRank === 2 ? "85%" : "70%";
                  return (
                    <div key={user.rank} style={{
                      background: "rgba(255,255,255,0.03)", border: `1px solid ${color}33`,
                      borderTop: `3px solid ${color}`,
                      padding: "24px 16px", textAlign: "center",
                      marginTop: realRank === 1 ? 0 : realRank === 2 ? 16 : 24,
                    }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>{user.badge}</div>
                      <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 11, letterSpacing: 1, marginBottom: 4 }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: 10, color: "#555", marginBottom: 8 }}>{user.wins} wins</div>
                      <div style={{ fontFamily: "'Bangers', cursive", fontSize: 32, letterSpacing: 2, color }}>{realRank}</div>
                    </div>
                  );
                })}
              </div>

              {/* Full list */}
              <div>
                {TOP_ROASTERS.map(user => (
                  <div key={user.rank} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 18px",
                    background: user.rank <= 3 ? "rgba(255,221,0,0.03)" : "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderLeft: user.rank <= 3 ? `3px solid ${["#ffdd00","#aaa","#cd7f32"][user.rank-1]}` : "1px solid rgba(255,255,255,0.06)",
                    marginBottom: 3,
                  }}>
                    <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.25)", width: 28 }}>
                      #{user.rank}
                    </span>
                    <span style={{ fontSize: 22 }}>{user.badge}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: "#f5f5f0", marginBottom: 2 }}>{user.name}</div>
                      <div style={{ fontSize: 9, color: "#555" }}>
                        {user.posts} posts · {user.bids} bids · joined {user.joined}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: "#ffdd00", lineHeight: 1 }}>{user.wins}</div>
                      <div style={{ fontSize: 9, color: "#555" }}>wins</div>
                    </div>
                    <div style={{ textAlign: "center", flexShrink: 0 }}>
                      <div style={{ fontSize: 11 }}>🔥{user.streak}</div>
                      <div style={{ fontSize: 9, color: "#555" }}>streak</div>
                    </div>
                    <span style={{
                      fontSize: 9, letterSpacing: 1, color: CC[user.class],
                      border: `1px solid ${CC[user.class]}44`, padding: "3px 8px",
                      fontFamily: "'Archivo Black', sans-serif",
                    }}>
                      {user.class}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Most Claimed Posts */}
          {activeTab === 1 && (
            <div>
              {CLAIMED_POSTS.map(user => (
                <div key={user.rank} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "16px 18px", background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)", marginBottom: 3,
                }}>
                  <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.25)", width: 28 }}>
                    #{user.rank}
                  </span>
                  <span style={{ fontSize: 22 }}>{user.badge}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "#f5f5f0", marginBottom: 2 }}>{user.name}</div>
                    <div style={{ fontSize: 9, color: "#555" }}>
                      Longest hold: {user.record_hold} · Active: {user.active} posts
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: "#00cc44", lineHeight: 1 }}>{user.claimed}</div>
                    <div style={{ fontSize: 9, color: "#555" }}>claimed</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Most Outbids */}
          {activeTab === 2 && (
            <div>
              {MOST_OUTBIDS.map(user => (
                <div key={user.rank} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "16px 18px", background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)", marginBottom: 3,
                }}>
                  <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.25)", width: 28 }}>
                    #{user.rank}
                  </span>
                  <span style={{ fontSize: 22 }}>{user.badge}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "#f5f5f0", marginBottom: 2 }}>{user.name}</div>
                    <div style={{ fontSize: 9, color: "#555" }}>Biggest single bid: {user.biggest}</div>
                  </div>
                  <div style={{ textAlign: "right", marginRight: 16 }}>
                    <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: "#ff2222", lineHeight: 1 }}>{user.outbids}</div>
                    <div style={{ fontSize: 9, color: "#555" }}>outbids</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: "#ffdd00", lineHeight: 1 }}>{user.spent}</div>
                    <div style={{ fontSize: 9, color: "#555" }}>total spent</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
