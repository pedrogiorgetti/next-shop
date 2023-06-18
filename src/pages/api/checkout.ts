import { stripe } from '@/lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function checkout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const priceId = req.body.priceId;
  const productQuantity = req.body.quantity;

  if (req.method !== 'POST') {
    const response = res.status(405).json({ error: 'Request not allowed' });

    return response;
  }

  if (!priceId) {
    const response = res.status(400).json({ error: 'Price ID is required' });
    return response;
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: productQuantity || 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  const response = res.status(201).json({
    checkout: checkoutSession.url,
  });

  return response;
}
