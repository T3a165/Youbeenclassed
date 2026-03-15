"use client";
import { useState } from "react";
import Link from "next/link";
import { Map, ArrowLeft, Lock } from "lucide-react";

const CC = { A: "#00cc44", B: "#2266ff", C: "#ffdd00", D: "#ff2222" };

// Generate an 8x8 territory grid with some claimed tiles
function generateGrid() {
  const owners = [
    { name: "FlameKing99", color: "#ff2222", class: "A" },
    { name: "RoastMaster", color: "#2266ff", class: "B" },
    { name: "ClassActual", color: "#00cc44", class: "B" },
    { name: "BoardTakr", color: "#ff8800", class: "C" },
    { name: "Verdict99", color: "#aa44ff", class: "D" },
  ];

  const claimed = [
    [0,0],[0,1],[0,2],[1,0],[1,1],          // FlameKing99 territory
    [0,5],[0,6],[0,7],[1,6],[1,7],          // RoastMaster territory
    [3,2],[3,3],[4,2],[4,3],[4,4],          // ClassActual territory
    [6,0],[6,1],[7,0],[7,1],               // BoardTakr territory
    [5,5],[5,6],[6,6],[6,7],               // Verdict99 territory
  ];

  const ownerIndex = [0,0,0,0,0, 0,1,1,1,1, 2,2,2,2,2, 3,3,3,3, 4,4,4,4];

  const grid = [];
  let claimIdx = 0;

  for (let row = 0; row < 8; row++) {
    const rowTiles = [];
    for (let col = 0; col < 8; col++) {
      const claimedTile = claimed.find(([r, c]) => r === row && c === col);
      if (claimedTile) {
        const oi = ownerIndex[claimIdx++];
        rowTiles.push({
          id: `${row}-${col}`, row, col,
          owner: owners[oi].name,
          color: owners[oi].color,
          class: owners[oi].class,
          message: "This territory belongs to me. Come at me.",
          bid: Math.floor(Math.random() * 40) + 10,
          claimed: true,
        });
      } else {
        rowTiles.push({
          id: `${row}-${col}`, row, col,
          owner: null, color: null, class: null,
          message: null, bid: 5, claimed: false,
        });
      }
    }
    grid.push(rowTiles);
  }
  return grid;
}

const GRID = generateGrid();

const OWNER_STATS = [
  { name: "FlameKing99", badge: "🔥", tiles: 5, color: "#ff2222", spent: "$284" },
  { name: "RoastMaster", badge: "💀", tiles: 4, color: "#2266ff", spent: "$198" },
  { name: "ClassActual", badge: "🏆", tiles: 5, color: "#00cc44", spent: "$241" },
  { name: "BoardTakr", badge: "⚡", tiles: 4, color: "#ff8800", spent: "$156" },
  { name: "Verdict99", badge: "😤", tiles: 4, color: "#aa44ff", spent: "$134" },
];

export default function TerritoryPage() {
  const [selected, setSelected] = useState(null);
  const [grid, setGrid] = useState(GRID);

  function handleTile(tile) {
    setSelected(selected?.id === tile.id ? null : tile);
  }

  function claimTile() {
    if (!selected) return;
    setGrid(prev => prev.map(row => row.map(t =>
      t.id === selected.id
        ? { ...t, claimed: true, owner: "You", color: "#ffdd00", class: "A", message: "My territory now." }
        : t
    )));
    setSelected(null);
  }

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#f5f5f0", fontFamily: "'JetBrains Mono', monospace" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        .tile:hover { filter: brightness(1.3); transform: scale(1.05); z-index: 10; }
        .tile { transition: all 0.15s; cursor: pointer; position: relative; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#555", marginBottom: 20 }}>
            <ArrowLeft size={12} /> Back to Board
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Map size={32} color="#2266ff" />
            <div>
              <p style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: "#555", marginBottom: 4 }}>Claim & Defend</p>
              <h1 style={{ fontFamily: "'Bangers', cursive", fontSize: "clamp(28px,6vw,48px)", letterSpacing: 3 }}>
                TERRITORY MODE
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 20, alignItems: "flex-start" }}>

          {/* Territory grid */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#666" }}>🗺️ Territory Map</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
              <span style={{ fontSize: 9, color: "#555" }}>64 tiles · {grid.flat().filter(t => t.claimed).length} claimed</span>
            </div>

            {/* Grid */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 3,
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
              padding: 12,
            }}>
              {grid.flat().map(tile => (
                <div
                  key={tile.id}
                  className="tile"
                  onClick={() => handleTile(tile)}
                  style={{
                    aspectRatio: "1",
                    background: tile.claimed
                      ? `${tile.color}22`
                      : selected?.id === tile.id
                        ? "rgba(255,221,0,0.15)"
                        : "rgba(255,255,255,0.03)",
                    border: selected?.id === tile.id
                      ? "2px solid #ffdd00"
                      : tile.claimed
                        ? `1px solid ${tile.color}55`
                        : "1px solid rgba(255,255,255,0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10,
                  }}
                >
                  {tile.claimed && (
                    <span style={{ color: tile.color, fontSize: 12, animation: "pulse 3s infinite" }}>■</span>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12 }}>
              {OWNER_STATS.map(o => (
                <div key={o.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, background: o.color }} />
                  <span style={{ fontSize: 9, color: "#666" }}>{o.name}</span>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }} />
                <span style={{ fontSize: 9, color: "#666" }}>Unclaimed</span>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div>
            {/* Selected tile info */}
            {selected ? (
              <div style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,221,0,0.2)",
                borderTop: "2px solid #ffdd00",
                padding: 20, marginBottom: 12, animation: "fadeUp 0.3s ease",
              }}>
                <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#ffdd00", marginBottom: 12 }}>
                  Selected Tile
                </div>
                <div style={{ fontSize: 11, color: "#888", marginBottom: 8 }}>
                  Position: [{selected.row},{selected.col}]
                </div>

                {selected.claimed ? (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 10, height: 10, background: selected.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: "#f5f5f0" }}>{selected.owner}</span>
                      <span style={{ fontSize: 8, color: CC[selected.class], border: `1px solid ${CC[selected.class]}44`, padding: "1px 5px" }}>
                        {selected.class}
                      </span>
                    </div>
                    {selected.message && (
                      <p style={{
                        fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
                        fontSize: 12, color: "#666", marginBottom: 14, lineHeight: 1.5,
                      }}>
                        "{selected.message}"
                      </p>
                    )}
                    <div style={{ fontSize: 10, color: "#555", marginBottom: 14 }}>
                      Current bid: <span style={{ color: "#ffdd00" }}>${selected.bid}</span>
                    </div>
                    <button onClick={claimTile} style={{
                      width: "100%", background: "#ff2222", color: "#fff",
                      fontFamily: "'Archivo Black', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
                      padding: "12px", border: "none", cursor: "pointer",
                    }}>
                      Outbid (${selected.bid + 5}+)
                    </button>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 11, color: "#666", marginBottom: 14 }}>
                      Unclaimed territory. Stake your claim.
                    </div>
                    <div style={{ fontSize: 10, color: "#555", marginBottom: 14 }}>
                      Starting bid: <span style={{ color: "#ffdd00" }}>${selected.bid}</span>
                    </div>
                    <button onClick={claimTile} style={{
                      width: "100%", background: "#ffdd00", color: "#0a0a0a",
                      fontFamily: "'Archivo Black', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
                      padding: "12px", border: "none", cursor: "pointer",
                    }}>
                      Claim for ${selected.bid}
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
                padding: 20, marginBottom: 12, textAlign: "center",
              }}>
                <Map size={24} color="#444" style={{ margin: "0 auto 12px" }} />
                <p style={{ fontSize: 11, color: "#555", lineHeight: 1.6 }}>
                  Tap any tile on the map to view details and place a claim.
                </p>
              </div>
            )}

            {/* Territory owners */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: 18 }}>
              <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#666", marginBottom: 14 }}>
                Territory Leaders
              </div>
              {OWNER_STATS.map((o, i) => (
                <div key={o.name} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}>
                  <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)", width: 18 }}>
                    #{i + 1}
                  </span>
                  <div style={{ width: 8, height: 8, background: o.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: "#f5f5f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {o.badge} {o.name}
                    </div>
                    <div style={{ fontSize: 9, color: "#555" }}>{o.tiles} tiles · {o.spent} spent</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
