import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { setupAuth } from "./auth";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Stripe subscription route
  app.post('/api/create-subscription', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    let user = req.user;

    // Check if user already has an active subscription
    if (user.stripeSubscriptionId) {
      try {
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        
        if (subscription.status === 'active') {
          return res.json({
            subscriptionId: subscription.id,
            clientSecret: null, // Active subscription doesn't need payment
          });
        }
      } catch (error) {
        console.log('Existing subscription not found, creating new one');
      }
    }
    
    if (!user.email) {
      return res.status(400).json({ error: { message: 'No user email on file' } });
    }

    try {
      let customerId = user.stripeCustomerId;
      
      // Create customer if doesn't exist
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.username,
        });
        customerId = customer.id;
      }

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price_data: {
            currency: 'usd',
            product: 'prod_nextia_pro',
            unit_amount: 2900, // $29.00 in cents
            recurring: {
              interval: 'month',
            },
          },
        }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      // Update user with Stripe info
      await storage.updateUserStripeInfo(user.id, customerId, subscription.id);
  
      res.json({
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret || null,
      });
    } catch (error: any) {
      console.error('Stripe subscription error:', error);
      return res.status(400).json({ error: { message: error.message } });
    }
  });

  // Stripe webhook endpoint for handling subscription events
  app.post('/api/webhooks/stripe', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET || '');
    } catch (err: any) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Payment successful:', session.id);
        break;
      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        console.log('Subscription payment succeeded:', invoice.id);
        break;
      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        console.log('Subscription payment failed:', failedInvoice.id);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  });

  // Get subscription plans
  app.get('/api/plans', async (req, res) => {
    const plans = [
      {
        id: 'basic',
        name: 'Basic',
        price: 9,
        features: [
          '10 virtual try-ons per month',
          'Basic size recommendations',
          'Mobile app access',
          'Email support'
        ]
      },
      {
        id: 'pro',
        name: 'Pro',
        price: 29,
        popular: true,
        features: [
          'Unlimited virtual try-ons',
          'Advanced AI recommendations',
          'Social sharing features',
          'Priority customer support',
          'Style consultation sessions'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 99,
        features: [
          'Everything in Pro',
          'API access & integration',
          'Custom branding options',
          'Analytics dashboard',
          'Dedicated account manager'
        ]
      }
    ];

    res.json(plans);
  });

  const httpServer = createServer(app);
  return httpServer;
}
