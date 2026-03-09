import { PrismaClient } from '@prisma/client';
import { Webhook } from 'svix';

const prisma = new PrismaClient();

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
  const payload = buf.toString();
  const headers = req.headers;

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  const { type, data } = evt;

  try {
    switch (type) {
      case 'user.created':
        await prisma.user.create({
          data: {
            clerkId: data.id,
            email: data.email_addresses[0]?.email_address || '',
            name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
            image: data.image_url,
            tier: 'FREE',
          },
        });
        console.log('✅ User created:', data.id);
        break;

      case 'user.updated':
        await prisma.user.update({
          where: { clerkId: data.id },
          data: {
            email: data.email_addresses[0]?.email_address || '',
            name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
            image: data.image_url,
          },
        });
        console.log('✅ User updated:', data.id);
        break;

      case 'user.deleted':
        await prisma.user.delete({
          where: { clerkId: data.id },
        });
        console.log('✅ User deleted:', data.id);
        break;
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ error: error.message });
  }
}
