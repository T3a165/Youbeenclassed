import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const prisma = new PrismaClient();

const PRICE_MAP = {
  CASUAL: process.env.STRIPE_PRICE_CASUAL || 'price_casual',
  PRO: process.env.STRIPE_PRICE_PRO || 'price_pro',
  TEAM: process.env.STRIPE_PRICE_TEAM || 'price_team',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tier, userId, email } = req.body;

    if (!PRICE_MAP[tier]) {
      return res.status(400).json({ error: 'Invalid tier' });
    }

    // Get or create Stripe customer
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    let customerId = user?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        metadata: { userId },
      });
      customerId = customer.id;

      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: PRICE_MAP[tier],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.VITE_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VITE_APP_URL}/payment/cancel`,
      metadata: {
        userId,
        tier,
      },
    });

    return res.status(200).json({ sessionId: session.id, url: session.url });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: error.message });
  }
}
