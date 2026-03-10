import { motion } from "framer-motion";
import { CreditCard, Download, CheckCircle, Zap, Users, BarChart3 } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    features: ["5 Team Members", "1,000 Contacts", "Basic Analytics", "Email Support"],
    current: false,
  },
  {
    name: "Business",
    price: "$79",
    period: "/mo",
    features: ["25 Team Members", "10,000 Contacts", "Advanced Analytics", "Priority Support", "API Access", "Custom Fields"],
    current: true,
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/mo",
    features: ["Unlimited Members", "Unlimited Contacts", "Custom Reports", "Dedicated Manager", "SSO/SAML", "SLA Guarantee"],
    current: false,
  },
];

const invoices = [
  { id: "INV-2024-012", date: "Mar 1, 2024", amount: "$79.00", status: "Paid" },
  { id: "INV-2024-011", date: "Feb 1, 2024", amount: "$79.00", status: "Paid" },
  { id: "INV-2024-010", date: "Jan 1, 2024", amount: "$79.00", status: "Paid" },
  { id: "INV-2024-009", date: "Dec 1, 2023", amount: "$79.00", status: "Paid" },
  { id: "INV-2024-008", date: "Nov 1, 2023", amount: "$79.00", status: "Paid" },
];

const BillingPage = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your subscription and payment methods</p>
      </div>

      {/* Current Usage */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Team Members", value: "12 / 25", icon: Users, pct: 48 },
          { label: "Contacts", value: "4,820 / 10,000", icon: BarChart3, pct: 48 },
          { label: "API Calls", value: "18.2K / 50K", icon: Zap, pct: 36 },
        ].map((usage, i) => (
          <motion.div
            key={usage.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <usage.icon className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">{usage.label}</span>
            </div>
            <p className="text-sm font-semibold text-foreground mb-2">{usage.value}</p>
            <div className="w-full h-1.5 rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${usage.pct}%` }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                className="h-full rounded-full bg-primary"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Plans */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className={`rounded-xl p-5 border transition-colors ${
                plan.highlight
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/5"
                  : "glass-card hover:border-primary/20"
              }`}
            >
              {plan.current && (
                <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">Current Plan</span>
              )}
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-base font-semibold text-foreground mt-1">{plan.name}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full mt-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  plan.current
                    ? "bg-secondary text-muted-foreground cursor-default"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                disabled={plan.current}
              >
                {plan.current ? "Current Plan" : "Upgrade"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Payment Method</h3>
          </div>
          <button className="text-xs text-primary hover:underline font-medium">Update</button>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
          <div className="h-10 w-14 rounded-md bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">•••• •••• •••• 4242</p>
            <p className="text-xs text-muted-foreground">Expires 12/2026 · Visa</p>
          </div>
        </div>
      </motion.div>

      {/* Invoices */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Invoice History</h3>
        <div className="space-y-1">
          {invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between py-2.5 border-b border-border/30 last:border-0">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-muted-foreground">{inv.id}</span>
                <span className="text-sm text-foreground">{inv.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-foreground">{inv.amount}</span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-success/15 text-success">{inv.status}</span>
                <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BillingPage;
