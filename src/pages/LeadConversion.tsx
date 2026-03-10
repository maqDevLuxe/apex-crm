import { motion } from "framer-motion";
import { StatCard } from "@/components/StatCard";
import { TrendingUp, Users, Target, Percent, ArrowRight } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

const conversionData = [
  { week: "W1", leads: 320, converted: 45 },
  { week: "W2", leads: 290, converted: 52 },
  { week: "W3", leads: 380, converted: 68 },
  { week: "W4", leads: 350, converted: 71 },
  { week: "W5", leads: 420, converted: 85 },
  { week: "W6", leads: 390, converted: 78 },
  { week: "W7", leads: 450, converted: 92 },
  { week: "W8", leads: 410, converted: 88 },
];

const channelData = [
  { channel: "Email", rate: 32 },
  { channel: "LinkedIn", rate: 28 },
  { channel: "Referral", rate: 45 },
  { channel: "Cold Call", rate: 12 },
  { channel: "Webinar", rate: 38 },
];

const funnelSteps = [
  { label: "Visitors", count: 12450, pct: 100 },
  { label: "Leads", count: 3200, pct: 25.7 },
  { label: "MQL", count: 1420, pct: 11.4 },
  { label: "SQL", count: 680, pct: 5.5 },
  { label: "Opportunity", count: 290, pct: 2.3 },
  { label: "Won", count: 92, pct: 0.74 },
];

const LeadConversion = () => {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Lead Conversion</h1>
        <p className="text-sm text-muted-foreground mt-1">Analyze conversion rates across channels</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Leads" value="3,200" change="+15.4%" changeType="positive" icon={Users} delay={0} />
        <StatCard title="Converted" value="579" change="+22.1%" changeType="positive" icon={Target} delay={0.05} />
        <StatCard title="Conversion Rate" value="18.1%" change="+3.2%" changeType="positive" icon={Percent} delay={0.1} />
        <StatCard title="Avg. Time to Convert" value="14 days" change="-2 days" changeType="positive" icon={TrendingUp} delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Conversion Trend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Conversion Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" opacity={0.3} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(225, 22%, 11%)", border: "1px solid hsl(225, 18%, 20%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210, 20%, 92%)" }} />
              <Line type="monotone" dataKey="leads" stroke="hsl(210, 100%, 52%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="converted" stroke="hsl(42, 65%, 55%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Channel Performance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Channel Conversion Rates</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={channelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" opacity={0.3} />
              <XAxis dataKey="channel" tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ background: "hsl(225, 22%, 11%)", border: "1px solid hsl(225, 18%, 20%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210, 20%, 92%)" }} />
              <Bar dataKey="rate" fill="hsl(42, 65%, 55%)" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Conversion Funnel */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-6">Conversion Funnel</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {funnelSteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.06 }}
                className="flex-shrink-0 text-center p-4 rounded-lg bg-secondary/60 min-w-[120px]"
                style={{ opacity: 0.4 + (step.pct / 100) * 0.6 }}
              >
                <p className="text-lg font-bold text-foreground">{step.count.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{step.label}</p>
                <p className="text-[10px] text-primary font-medium mt-1">{step.pct}%</p>
              </motion.div>
              {i < funnelSteps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LeadConversion;
