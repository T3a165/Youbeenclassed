# YouBeenClassed — The Human Leverage Engine

AI-powered platform helping everyday people gain advantages through automation and intelligent systems.

## Live Site

- **Domain:** youbeenclassed.org
- **Vercel:** youbeenclassed.vercel.app
- **GitHub:** github.com/T3a165/Youbeenclassed

## Stack

- React / Next.js
- Anthropic API (Claude Sonnet)
- Vercel (hosting)
- Squarespace (domain registrar)

## Features

- 6 category cards: Make Money, Fix Something, Learn Something, Build Something, Improve Myself, Save Me Time
- Universal input bar for direct questions
- Real-time AI chat powered by Anthropic API
- Hybrid dark/light design (dark header, warm white body)
- Mobile-first, works on all devices
- Time-aware greetings

## Project Structure

```
├── app/
│   ├── layout.js      # Next.js root layout
│   └── page.js        # Main page (imports App component)
├── src/
│   └── App.jsx        # Core app component (all UI + AI logic)
├── package.json
└── README.md
```

## Development

```bash
npm install
npm run dev
```

## Deployment

Connected to GitHub repo T3a165/Youbeenclassed.
Auto-deploys to Vercel on push to main branch.

## Created by Garrett McLain

Built with Claude AI assistance.