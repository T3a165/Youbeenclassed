import { OpenAI } from 'openai';
import { PrismaClient } from '@prisma/client';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prisma = new PrismaClient();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = {
  free: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '24h'),
    prefix: 'ratelimit:free',
  }),
  casual: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, '24h'),
    prefix: 'ratelimit:casual',
  }),
  pro: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1000, '24h'),
    prefix: 'ratelimit:pro',
  }),
};

const CATEGORY_PROMPTS = {
  idea: 'Evaluate this idea for creativity, practicality, and potential impact.',
  business: 'Evaluate this business concept for market viability and scalability.',
  argument: 'Evaluate this argument for logical structure and persuasiveness.',
  story: 'Evaluate this story for narrative strength and engagement.',
  dish: 'Evaluate this dish concept for culinary creativity and menu practicality.',
  startup: 'Evaluate this startup for investment potential and market fit.',
  product: 'Evaluate this product for usability and differentiation.',
  marketing: 'Evaluate this marketing idea for virality and reach potential.',
  advice: 'Evaluate this life advice for usefulness and logical soundness.',
  conspiracy: 'Evaluate this conspiracy theory for plausibility and evidence.',
};

const TONE_INSTRUCTIONS = {
  professional: 'Provide analytical, neutral, and constructive feedback. Focus on reasoning and useful critique.',
  brutal: 'Be blunt and direct. Criticism should be sharp but directed at the idea, not the person.',
  roast: 'Be humorous and sarcastic. Make it entertaining and shareable while still delivering a real verdict.',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { submission, category, tone, userId, userTier = 'FREE' } = req.body;

    // Validate input
    if (!submission || submission.length < 10 || submission.length > 5000) {
      return res.status(400).json({ error: 'Invalid submission length' });
    }

    // Check rate limit
    const limiter = ratelimit[userTier.toLowerCase()] || ratelimit.free;
    const { success, limit, remaining } = await limiter.limit(userId || 'anonymous');

    if (!success) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        limit,
        remaining: 0,
        upgradeUrl: '/upgrade'
      });
    }

    // Generate verdict with OpenAI
    const prompt = `${CATEGORY_PROMPTS[category] || CATEGORY_PROMPTS.idea}

${TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS.professional}

Submission: "${submission}"

Provide a structured verdict in this exact JSON format:
{
  "score": (number 0-100),
  "rank": ("S" for 90-100, "A" for 80-89, "B" for 70-79, "C" for 60-69, "D" for 50-59, "F" for 0-49),
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "finalRuling": (one sentence summary, max 100 chars)
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: 'You are the YouBeenClassed AI Judge. Deliver structured, consistent verdicts. Be fair but honest. Always respond in valid JSON.' 
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: 'json_object' },
    });

    const verdictData = JSON.parse(completion.choices[0].message.content);

    // Save to database if user is authenticated
    let savedVerdict = null;
    if (userId && userId !== 'anonymous') {
      savedVerdict = await prisma.verdict.create({
        data: {
          userId,
          submission,
          category,
          tone,
          score: verdictData.score,
          rank: verdictData.rank,
          strengths: verdictData.strengths,
          weaknesses: verdictData.weaknesses,
          finalRuling: verdictData.finalRuling,
        },
      });

      // Update user submission count
      await prisma.user.update({
        where: { id: userId },
        data: { submissions: { increment: 1 } },
      });
    }

    return res.status(200).json({
      ...verdictData,
      id: savedVerdict?.id || null,
      shareToken: savedVerdict?.shareToken || null,
      remaining,
      limit,
    });

  } catch (error) {
    console.error('Verdict generation error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate verdict',
      message: error.message 
    });
  }
}
