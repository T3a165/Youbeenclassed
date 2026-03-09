import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const prisma = new PrismaClient();

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const { userId, tier } = session.metadata;

        // Update user tier
        await prisma.user.update({
          where: { id: userId },
          data: { tier },
        });

        // Record payment
        await prisma.payment.create({
          data: {
            userId,
            stripeId: session.id,
            amount: session.amount_total,
            currency: session.currency,
            status: 'completed',
            tier,
          },
        });

        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
        const { userId, tier } = subscription.metadata;

        await prisma.payment.create({
          data: {
            userId,
            stripeId: invoice.id,
            amount: invoice.amount_paid,
            currency: invoice.currency,
            status: 'completed',
            tier,
          },
        });

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const { userId } = subscription.metadata;

        // Downgrade to free
        await prisma.user.update({
          where: { id: userId },
          data: { tier: 'FREE' },
        });

        break;
      }
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ error: error.message });
  }
}
