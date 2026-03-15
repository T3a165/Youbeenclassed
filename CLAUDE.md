# YouBeenClassed™ — The Class Board
## Claude Code Configuration (powered by Claude Flow V3)

## Project Overview

**YouBeenClassed™ — The Class Board** is a gamified social roasting platform built on Next.js 15.
Users post roasts, outbid for board spots, compete in duels, hunt daily targets, and claim territory.

### Stack
- **Framework**: Next.js 15.1.0 (App Router)
- **UI**: React 19, CSS-in-JS (inline styles)
- **AI**: Anthropic Claude API (claude-sonnet-4-20250514)
- **Icons**: lucide-react
- **Fonts**: Bangers, Archivo Black, Instrument Serif, JetBrains Mono

### Key Routes
| Route | Purpose |
|-------|---------|
| `/` | Homepage — board, daily target, sidebar |
| `/leaderboard` | Full leaderboard with tabs |
| `/duels` | Live duel arena with voting |
| `/target` | Daily global target with live rankings |
| `/territory` | Tile-based territory map |
| `/api/classify` | Claude AI classification (A/B/C/D) |
| `/api/roast` | Claude AI roast sharpener |

### Design System
- Background: `#0a0a0a`
- Accent Red: `#ff2222`
- Accent Yellow: `#ffdd00`
- Accent Blue: `#2266ff`
- Accent Green: `#00cc44`
- Class A: `#00cc44` · B: `#2266ff` · C: `#ffdd00` · D: `#ff2222`

### Environment
```bash
ANTHROPIC_API_KEY=sk-ant-...  # Required for /api/classify and /api/roast
```

### Development
```bash
npm run dev    # Start dev server
npm run build  # Production build
npm start      # Production server
```

---

# Claude Code Configuration — Claude Flow V3

## Behavioral Rules (Always Enforced)

- Do what has been asked; nothing more, nothing less
- NEVER create files unless they're absolutely necessary for achieving your goal
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (*.md) or README files unless explicitly requested
- NEVER save working files, text/mds, or tests to the root folder
- Never continuously check status after spawning a swarm — wait for results
- ALWAYS read a file before editing it
- NEVER commit secrets, credentials, or .env files

## File Organization

- NEVER save to root folder — use the directories below
- Use `/app` for Next.js pages and API routes
- Use `/app/components` for shared React components
- Use `/public` for static assets
- Use `/scripts` for utility scripts

## Project Architecture

- Follow Domain-Driven Design with bounded contexts
- Keep files under 500 lines
- Use typed interfaces for all public APIs
- Prefer TDD London School (mock-first) for new code
- Use event sourcing for state changes
- Ensure input validation at system boundaries

## Concurrency: 1 MESSAGE = ALL RELATED OPERATIONS

- All operations MUST be concurrent/parallel in a single message
- Use Claude Code's Task tool for spawning agents, not just MCP

**Mandatory patterns:**
- ALWAYS batch ALL todos in ONE TodoWrite call (5-10+ minimum)
- ALWAYS spawn ALL agents in ONE message with full instructions via Task tool
- ALWAYS batch ALL file reads/writes/edits in ONE message
- ALWAYS batch ALL terminal operations in ONE Bash message
- ALWAYS batch ALL memory store/retrieve operations in ONE message

---

## Swarm Orchestration

- MUST initialize the swarm using MCP tools when starting complex tasks
- MUST spawn concurrent agents using Claude Code's Task tool
- Never use MCP tools alone for execution — Task tool agents do the actual work

### 3-Tier Model Routing (ADR-026)

| Tier | Handler | Latency | Cost | Use Cases |
|------|---------|---------|------|-----------|
| **1** | Agent Booster (WASM) | <1ms | $0 | Simple transforms — **Skip LLM entirely** |
| **2** | Haiku | ~500ms | $0.0002 | Simple tasks, low complexity (<30%) |
| **3** | Sonnet/Opus | 2-5s | $0.003-0.015 | Complex reasoning, architecture, security (>30%) |

### Anti-Drift Coding Swarm (PREFERRED DEFAULT)

- ALWAYS use hierarchical topology for coding swarms
- Keep maxAgents at 6-8 for tight coordination
- Use specialized strategy for clear role boundaries
- Use `raft` consensus for hive-mind (leader maintains authoritative state)

```javascript
mcp__ruv-swarm__swarm_init({
  topology: "hierarchical",
  maxAgents: 8,
  strategy: "specialized"
})
```

## Auto-Start Swarm Protocol

When the user requests a complex task (multi-file changes, feature implementation, refactoring), **immediately execute this pattern in a SINGLE message:**

```javascript
// STEP 1: Initialize swarm coordination via MCP
mcp__ruv-swarm__swarm_init({ topology: "hierarchical", maxAgents: 8, strategy: "specialized" })

// STEP 2: Spawn agents concurrently using Claude Code's Task tool
Task("Coordinator", "Initialize session, coordinate other agents via memory.", "hierarchical-coordinator")
Task("Researcher", "Analyze requirements and existing code patterns.", "researcher")
Task("Architect", "Design implementation approach based on research.", "system-architect")
Task("Coder", "Implement the solution following architect's design.", "coder")
Task("Tester", "Write tests for the implementation.", "tester")
Task("Reviewer", "Review code quality and security.", "reviewer")

// STEP 3: Batch all todos
TodoWrite({ todos: [
  {content: "Initialize swarm coordination", status: "in_progress", activeForm: "Initializing swarm"},
  {content: "Research and analyze requirements", status: "in_progress", activeForm: "Researching requirements"},
  {content: "Design architecture", status: "pending", activeForm: "Designing architecture"},
  {content: "Implement solution", status: "pending", activeForm: "Implementing solution"},
  {content: "Write tests", status: "pending", activeForm: "Writing tests"},
  {content: "Review and finalize", status: "pending", activeForm: "Reviewing code"}
]})
```

### Task Complexity Detection

**AUTO-INVOKE SWARM when task involves:**
- Multiple files (3+)
- New feature implementation
- Refactoring across modules
- API changes with tests
- Security-related changes
- Performance optimization

**SKIP SWARM for:**
- Single file edits
- Simple bug fixes (1-2 lines)
- Documentation updates
- Configuration changes

## Available Agents (60+ Types)

### Core Development
`coder`, `reviewer`, `tester`, `planner`, `researcher`

### V3 Specialized Agents
`security-architect`, `security-auditor`, `memory-specialist`, `performance-engineer`

### Swarm Coordination
`hierarchical-coordinator`, `mesh-coordinator`, `adaptive-coordinator`, `collective-intelligence-coordinator`

### GitHub & Repository
`github-modes`, `pr-manager`, `code-review-swarm`, `issue-tracker`, `release-manager`

### SPARC Methodology
`sparc-coord`, `sparc-coder`, `specification`, `pseudocode`, `architecture`, `refinement`

## V3 Hooks System (17 Hooks + 12 Workers)

### Essential Hook Commands

```bash
# Core hooks
npx claude-flow@v3alpha hooks pre-task --description "[task]"
npx claude-flow@v3alpha hooks post-task --task-id "[id]" --success true
npx claude-flow@v3alpha hooks post-edit --file "[file]" --train-patterns

# Session management
npx claude-flow@v3alpha hooks session-start --session-id "[id]"
npx claude-flow@v3alpha hooks session-end --export-metrics true
```

### 12 Background Workers

| Worker | Priority | Description |
|--------|----------|-------------|
| `ultralearn` | normal | Deep knowledge acquisition |
| `optimize` | high | Performance optimization |
| `consolidate` | low | Memory consolidation |
| `audit` | critical | Security analysis |
| `map` | normal | Codebase mapping |
| `testgaps` | normal | Test coverage analysis |

## Intelligence System (RuVector)

V3 includes the RuVector Intelligence System:
- **SONA**: Self-Optimizing Neural Architecture (<0.05ms adaptation)
- **MoE**: Mixture of Experts for specialized routing
- **HNSW**: 150x-12,500x faster pattern search
- **EWC++**: Elastic Weight Consolidation (prevents forgetting)
- **Flash Attention**: 2.49x-7.47x speedup

## V3 CLI Commands

```bash
# Initialize project
npx claude-flow@v3alpha init --wizard

# Start daemon with background workers
npx claude-flow@v3alpha daemon start

# Spawn an agent
npx claude-flow@v3alpha agent spawn -t coder --name my-coder

# Initialize swarm
npx claude-flow@v3alpha swarm init --v3-mode

# Search memory (HNSW-indexed)
npx claude-flow@v3alpha memory search -q "authentication patterns"

# System diagnostics
npx claude-flow@v3alpha doctor --fix

# Security scan
npx claude-flow@v3alpha security scan --depth full
```

## Headless Background Instances (claude -p)

```bash
# Single headless task
claude -p "Analyze the authentication module for security issues"

# Parallel background execution
claude -p "Analyze app/api/ for vulnerabilities" &
claude -p "Write tests for app/api/roast/route.js" &
claude -p "Review app/page.js for performance issues" &
wait
```

## Project Configuration (Anti-Drift Defaults)

- **Topology**: hierarchical (prevents drift via central coordination)
- **Max Agents**: 8 (smaller team = less drift)
- **Strategy**: specialized (clear roles, no overlap)
- **Consensus**: raft (leader maintains authoritative state)
- **Memory Backend**: hybrid (SQLite + AgentDB)
- **HNSW Indexing**: Enabled (150x-12,500x faster)
- **Neural Learning**: Enabled (SONA)

## Quick Setup

```bash
# Add MCP servers
claude mcp add claude-flow npx claude-flow@v3alpha mcp start

# Start daemon
npx claude-flow@v3alpha daemon start

# Run doctor
npx claude-flow@v3alpha doctor --fix
```

---

Remember: **Claude Flow coordinates, Claude Code creates!**

Source: https://github.com/garrettmclain96-prog/claude-flow
