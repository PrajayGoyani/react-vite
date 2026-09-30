import { useState } from 'react'

interface Plan {
  id: 'standard' | 'premium'
  name: string
  priceMonthly: number
  priceYearly: number
  description: string
  popular?: boolean
  stripePriceIdMonthly: string
  stripePriceIdYearly: string
  features: string[]
}

const PLANS: Plan[] = [
  {
    id: 'standard',
    name: 'Standard',
    priceMonthly: 5,
    priceYearly: 50,
    description: 'Essential library tracking tools for casual readers and individual book lovers.',
    stripePriceIdMonthly: 'price_1StandardMonthly_5USD',
    stripePriceIdYearly: 'price_1StandardYearly_50USD',
    features: [
      'Up to 50 books in personal catalog',
      'Track book issue & return status',
      'Basic search and filtering',
      'Single device sync',
      'Standard community support',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    priceMonthly: 20,
    priceYearly: 200,
    description: 'Full-featured professional reading and library management for power readers and collectors.',
    popular: true,
    stripePriceIdMonthly: 'price_1PremiumMonthly_20USD',
    stripePriceIdYearly: 'price_1PremiumYearly_200USD',
    features: [
      'Unlimited books and custom shelves',
      'Reading statistics & annual insights',
      'Multi-device real-time sync',
      'Priority 24/7 dedicated support',
      'Export catalog to CSV / Excel / PDF',
      'Early access to beta features',
    ],
  },
]

export default function Subscription() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [showPortalDemo, setShowPortalDemo] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'payload' | 'backend-code' | 'webhooks'>('payload')
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'simulating' | 'success'>('idle')

  const handleSubscribe = (plan: Plan) => {
    setSelectedPlan(plan)
    setCheckoutStatus('idle')
    setActiveTab('payload')
  }

  const handleSimulateCheckout = () => {
    setCheckoutStatus('simulating')
    setTimeout(() => {
      setCheckoutStatus('success')
    }, 1200)
  }

  const activePriceId = selectedPlan
    ? billingCycle === 'monthly'
      ? selectedPlan.stripePriceIdMonthly
      : selectedPlan.stripePriceIdYearly
    : ''

  const priceAmount = (plan: Plan) =>
    billingCycle === 'monthly' ? `$${plan.priceMonthly}` : `$${plan.priceYearly}`

  return (
    <div className="subscription-container">
      {/* Header */}
      <header className="subscription-header">
        <span className="badge-chip">Flexible Recurring Plans</span>
        <h2>Choose Your Subscription Plan</h2>
        <p>
          Upgrade your reading experience with recurring billing powered by Stripe.
          Easily upgrade, downgrade, or cancel anytime.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="billing-toggle-wrapper">
          <button
            className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
            type="button"
          >
            Monthly Billing
          </button>
          <button
            className={`toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('yearly')}
            type="button"
          >
            Yearly Billing <span className="discount-tag">Save ~17%</span>
          </button>
        </div>
      </header>

      {/* Pricing Cards Grid */}
      <div className="pricing-grid">
        {PLANS.map((plan) => {
          const isPopular = plan.popular
          return (
            <div
              key={plan.id}
              className={`pricing-card ${isPopular ? 'popular-card' : ''}`}
            >
              {isPopular && <div className="popular-badge">Most Popular</div>}

              <div className="card-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-desc">{plan.description}</p>
                <div className="plan-price">
                  <span className="amount">{priceAmount(plan)}</span>
                  <span className="interval">
                    USD / {billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
              </div>

              <div className="card-divider" />

              <ul className="plan-features">
                {plan.features.map((feature, i) => (
                  <li key={i} className="feature-item">
                    <svg
                      className="check-icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width="18"
                      height="18"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => handleSubscribe(plan)}
                className={`subscribe-cta ${isPopular ? 'cta-primary' : 'cta-secondary'}`}
              >
                Subscribe to {plan.name} ({priceAmount(plan)} USD)
              </button>
            </div>
          )
        })}
      </div>

      {/* Customer Portal Banner */}
      <section className="portal-banner">
        <div className="portal-info">
          <h4>Already Subscribed?</h4>
          <p>
            Update payment methods, view invoices, or change your subscription plan via the Stripe Customer Portal.
          </p>
        </div>
        <button
          type="button"
          className="portal-btn"
          onClick={() => setShowPortalDemo(true)}
        >
          Manage Subscription (Customer Portal)
        </button>
      </section>

      {/* Architecture & Flow Highlights */}
      <section className="architecture-section">
        <h3>How Stripe Recurring Subscriptions Work</h3>
        <div className="architecture-grid">
          <div className="arch-card">
            <span className="step-num">1</span>
            <h4>Client Checkout Request</h4>
            <p>
              React sends the chosen Stripe Price ID to your backend server endpoint <code>POST /api/create-checkout-session</code>.
            </p>
          </div>
          <div className="arch-card">
            <span className="step-num">2</span>
            <h4>Hosted Stripe Checkout</h4>
            <p>
              The backend uses the Stripe Secret Key to initialize a session in <code>mode: 'subscription'</code> and returns the secure URL.
            </p>
          </div>
          <div className="arch-card">
            <span className="step-num">3</span>
            <h4>Asynchronous Webhooks</h4>
            <p>
              Stripe notifies your backend via <code>invoice.payment_succeeded</code> on recurring renewals to keep user access in sync in your database.
            </p>
          </div>
          <div className="arch-card">
            <span className="step-num">4</span>
            <h4>Self-Serve Customer Portal</h4>
            <p>
              Subscribers can update cards, switch between Standard &amp; Premium, or cancel anytime through Stripe-hosted billing portal sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Checkout Simulator Modal */}
      {selectedPlan && (
        <div className="modal-backdrop" onClick={() => setSelectedPlan(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-header">
              <div>
                <h3>Stripe Checkout Flow: {selectedPlan.name} Plan</h3>
                <span className="modal-subtitle">
                  Price: {priceAmount(selectedPlan)} USD / {billingCycle} &bull; Price ID: <code>{activePriceId}</code>
                </span>
              </div>
              <button
                className="close-modal-btn"
                onClick={() => setSelectedPlan(null)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div className="modal-tabs">
              <button
                className={`tab-btn ${activeTab === 'payload' ? 'active' : ''}`}
                onClick={() => setActiveTab('payload')}
              >
                1. Frontend &rarr; Backend Payload
              </button>
              <button
                className={`tab-btn ${activeTab === 'backend-code' ? 'active' : ''}`}
                onClick={() => setActiveTab('backend-code')}
              >
                2. Backend Implementation (Node.js)
              </button>
              <button
                className={`tab-btn ${activeTab === 'webhooks' ? 'active' : ''}`}
                onClick={() => setActiveTab('webhooks')}
              >
                3. Webhook Lifecycle
              </button>
            </div>

            <div className="modal-body">
              {activeTab === 'payload' && (
                <div>
                  <p className="tab-description">
                    When the user clicks &ldquo;Subscribe&rdquo;, React issues a fetch call to your backend with the target Price ID and customer identifier:
                  </p>
                  <pre className="code-box">
{`// React Frontend Action:
const response = await fetch('/api/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    planId: '${selectedPlan.id}',
    priceId: '${activePriceId}',
    billingCycle: '${billingCycle}',
    amountUSD: ${billingCycle === 'monthly' ? selectedPlan.priceMonthly : selectedPlan.priceYearly},
    userId: 'user_current_session_123'
  })
});

const { url } = await response.json();
// Redirect user to Stripe's hosted subscription page:
window.location.href = url;`}
                  </pre>

                  <div className="simulator-action-box">
                    {checkoutStatus === 'idle' && (
                      <button
                        className="simulate-checkout-btn"
                        onClick={handleSimulateCheckout}
                      >
                        Simulate API Call &amp; Redirect
                      </button>
                    )}
                    {checkoutStatus === 'simulating' && (
                      <div className="status-indicator">
                        <span className="spinner" /> Contacting backend &amp; generating Stripe Session...
                      </div>
                    )}
                    {checkoutStatus === 'success' && (
                      <div className="simulation-success">
                        <div className="success-icon">&check;</div>
                        <div>
                          <strong>Stripe Checkout Session Generated!</strong>
                          <p>
                            URL: <code>https://checkout.stripe.com/c/pay/cs_test_a1b2c3d4e5f6...</code>
                          </p>
                          <small>In production, the browser instantly redirects to Stripe to complete the subscription.</small>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'backend-code' && (
                <div>
                  <p className="tab-description">
                    Sample Node.js / Express endpoint using the official <code>stripe</code> SDK to create a subscription session:
                  </p>
                  <pre className="code-box">
{`import Stripe from 'stripe';
import express from 'express';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/api/create-checkout-session', async (req, res) => {
  const { priceId, userId } = req.body;
  
  // 1. Retrieve or create Stripe customer for this user
  const user = await db.user.findById(userId);
  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user.id }
    });
    customerId = customer.id;
    await db.user.update(userId, { stripeCustomerId: customerId });
  }

  // 2. Create Stripe Checkout Session in 'subscription' mode
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: \`\${process.env.CLIENT_URL}/subscription?status=success&session_id={CHECKOUT_SESSION_ID}\`,
    cancel_url: \`\${process.env.CLIENT_URL}/subscription?status=cancelled\`,
    metadata: { userId }
  });

  res.json({ url: session.url });
});`}
                  </pre>
                </div>
              )}

              {activeTab === 'webhooks' && (
                <div>
                  <p className="tab-description">
                    The Stripe Webhook handler securely listens for asynchronous billing events with raw body verification:
                  </p>
                  <pre className="code-box">
{`// Express raw body webhook handler:
router.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(\`Webhook Signature Verification Failed: \${err.message}\`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      // User just subscribed. Provision access in your database!
      const session = event.data.object;
      await db.user.update(session.metadata.userId, {
        stripeSubscriptionId: session.subscription,
        subscriptionStatus: 'active'
      });
      break;

    case 'invoice.payment_succeeded':
      // Monthly recurring renewal succeeded. Extend current_period_end!
      const invoice = event.data.object;
      await db.user.updateByCustomerId(invoice.customer, {
        subscriptionStatus: 'active',
        currentPeriodEnd: new Date(invoice.lines.data[0].period.end * 1000)
      });
      break;

    case 'invoice.payment_failed':
      // Card renewal failed. Flag account or send dunning email.
      await db.user.updateByCustomerId(event.data.object.customer, {
        subscriptionStatus: 'past_due'
      });
      break;

    case 'customer.subscription.deleted':
      // User canceled or subscription lapsed. Revert back to free tier.
      await db.user.updateByCustomerId(event.data.object.customer, {
        subscriptionStatus: 'canceled'
      });
      break;
  }

  res.json({ received: true });
});`}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Customer Portal Simulator Modal */}
      {showPortalDemo && (
        <div className="modal-backdrop" onClick={() => setShowPortalDemo(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-header">
              <div>
                <h3>Stripe Customer Billing Portal Flow</h3>
                <span className="modal-subtitle">Self-service billing &amp; plan management</span>
              </div>
              <button
                className="close-modal-btn"
                onClick={() => setShowPortalDemo(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p className="tab-description">
                Instead of coding card management or cancellation dialogs yourself, Stripe provides a hosted Customer Portal configured in your Stripe Dashboard.
              </p>
              <pre className="code-box">
{`// Backend Endpoint:
router.post('/api/create-portal-session', async (req, res) => {
  const user = await db.user.findById(req.user.id);

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: \`\${process.env.CLIENT_URL}/subscription\`
  });

  res.json({ url: portalSession.url });
});

// React Action:
const { url } = await fetch('/api/create-portal-session', { method: 'POST' }).then(r => r.json());
window.location.href = url;`}
              </pre>
              <div className="portal-features-list">
                <strong>Capabilities out-of-the-box:</strong>
                <ul>
                  <li>Update credit/debit card details without touching sensitive numbers</li>
                  <li>Switch plans between Standard ($5) and Premium ($20) with automated proration</li>
                  <li>Cancel subscription at period end or immediately</li>
                  <li>Download past PDF tax invoices and receipts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
