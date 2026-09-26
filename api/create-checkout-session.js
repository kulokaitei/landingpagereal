import Stripe from 'stripe';

/**
 * Vercel Serverless Function: Create Stripe Checkout Session
 * Path: /api/create-checkout-session
 */
export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Only POST requests are accepted.',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const {
      firstName,
      lastName,
      email,
      company = '',
      notes = '',
      gdprConsent,
      diagnostic = {},
      website_hp,
    } = body;

    // Honeypot anti-spam verification: silently succeed if filled
    if (website_hp) {
      return res.status(200).json({
        success: true,
        message: 'Request processed successfully.',
      });
    }

    // Input Validation
    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
      return res.status(400).json({
        success: false,
        error: 'First Name is required.',
      });
    }

    if (!lastName || typeof lastName !== 'string' || !lastName.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Last Name is required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'A valid email address is required.',
      });
    }

    if (gdprConsent !== true) {
      return res.status(400).json({
        success: false,
        error: 'Consent is required to proceed with your application.',
      });
    }

    // Determine host origin for success/cancel redirects
    const origin =
      req.headers['origin'] ||
      (req.headers['referer'] ? new URL(req.headers['referer']).origin : null) ||
      (req.headers['x-forwarded-host']
        ? `https://${req.headers['x-forwarded-host']}`
        : req.headers['host']
        ? `http://${req.headers['host']}`
        : 'http://localhost:5173');

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripePriceId = process.env.STRIPE_PRICE_ID;

    // Build metadata payload to attach to Stripe Session
    // This metadata will be forwarded in Stripe webhooks (e.g., checkout.session.completed) to n8n
    const sessionMetadata = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      fullName: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim().toLowerCase(),
      company: company.trim().substring(0, 100),
      notes: notes.trim().substring(0, 450),
      bottleneck: String(diagnostic.bottleneck || 'unspecified').substring(0, 100),
      volume: String(diagnostic.volume || 'unspecified').substring(0, 100),
      techStack: String(diagnostic.techStack || 'unspecified').substring(0, 100),
      plan: 'Transformation Plan',
      source: 'meridian_diagnostic_intake',
      gdprConsent: 'true',
      timestamp: new Date().toISOString(),
    };

    // If Stripe keys are not configured in environment, handle simulated checkout mode for testing
    if (!stripeSecretKey) {
      console.warn(
        '⚠️ STRIPE_SECRET_KEY is not configured in environment variables. Simulating checkout session.'
      );
      return res.status(200).json({
        success: true,
        simulated: true,
        url: `${origin}/?payment=success&session_id=simulated_${Date.now()}&email=${encodeURIComponent(
          email.trim()
        )}`,
        message: 'Stripe keys not set; simulated checkout redirect generated.',
      });
    }

    const stripe = new Stripe(stripeSecretKey);

    let checkoutMode = 'payment';
    if (stripePriceId) {
      try {
        const priceObj = await stripe.prices.retrieve(stripePriceId);
        if (priceObj.type === 'recurring') {
          checkoutMode = 'subscription';
        }
      } catch (priceErr) {
        console.warn('Could not inspect price type from Stripe, defaulting to payment:', priceErr.message);
      }
    }

    const lineItems = stripePriceId
      ? [{ price: stripePriceId, quantity: 1 }]
      : [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Meridian — Operations Transformation Plan',
                description:
                  'Comprehensive Operational Automation Architecture, Systems Integration, and Deployment Blueprint.',
              },
              unit_amount: 149500, // $1,495.00 default fallback if price ID is not set
            },
            quantity: 1,
          },
        ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: checkoutMode,
      customer_email: email.trim().toLowerCase(),
      line_items: lineItems,
      metadata: sessionMetadata,
      success_url: `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(
        email.trim()
      )}`,
      cancel_url: `${origin}/?payment=cancelled#request-audit`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    });

    return res.status(200).json({
      success: true,
      url: session.url,
      sessionId: session.id,
      mode: checkoutMode,
    });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to initialize payment checkout session.',
    });
  }
}
