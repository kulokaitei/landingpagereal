/**
 * Vercel Serverless Function: Proxy audit requests to n8n Webhook
 * Path: /api/submit-audit
 */

export default async function handler(req, res) {
  // Enable CORS headers for safety
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
      company,
      notes,
      gdprConsent,
      diagnostic = {},
      website_hp,
    } = body;

    // Honeypot anti-spam verification: if filled, silently succeed
    if (website_hp) {
      return res.status(200).json({
        success: true,
        message: 'Intake received successfully.',
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
        error: 'GDPR consent is required to process your audit request.',
      });
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    const submissionId = `audit_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const nowIso = new Date().toISOString();

    const forwardPayload = {
      event: 'audit_roadmap_requested',
      submissionId,
      timestamp: nowIso,
      contact: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        fullName: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim().toLowerCase(),
        company: (company || '').trim(),
        notes: (notes || '').trim(),
      },
      diagnostic: {
        bottleneck: diagnostic.bottleneck || 'unspecified',
        volume: diagnostic.volume || 'unspecified',
        techStack: diagnostic.techStack || 'unspecified',
      },
      compliance: {
        gdprConsent: true,
        consentTimestamp: nowIso,
        consentText:
          'I consent to the processing of my personal data to receive my tailored automation audit roadmap in accordance with the Privacy Policy.',
      },
      metadata: {
        source: 'meridian_diagnostic_intake',
        clientIp: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
      },
    };

    if (!webhookUrl) {
      console.warn(
        '⚠️ N8N_WEBHOOK_URL is not configured in environment variables. Webhook was simulated.'
      );
      return res.status(200).json({
        success: true,
        simulated: true,
        submissionId,
        message: 'Audit intake processed successfully (Simulated mode).',
      });
    }

    // Dispatch to n8n Webhook with 10-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const n8nResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Meridian-Operations-Proxy/1.0',
        },
        body: JSON.stringify(forwardPayload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!n8nResponse.ok) {
        const errorText = await n8nResponse.text().catch(() => '');
        console.error(`n8n webhook error (${n8nResponse.status}):`, errorText);
        return res.status(502).json({
          success: false,
          error: 'Failed to relay submission to automation workflow. Please try again.',
        });
      }

      return res.status(200).json({
        success: true,
        submissionId,
        message: 'Audit roadmap request successfully dispatched.',
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error('n8n webhook request timed out after 10s');
        return res.status(504).json({
          success: false,
          error: 'Automation workflow timed out. Please try again.',
        });
      }
      throw fetchError;
    }
  } catch (error) {
    console.error('Unexpected error in /api/submit-audit:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected internal server error occurred.',
    });
  }
}
