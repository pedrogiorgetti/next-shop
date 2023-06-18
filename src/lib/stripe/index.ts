import { Stripe } from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Next Shop',
  },
});
