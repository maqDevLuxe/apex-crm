import { StatCard } from "@/components/StatCard";
import { DollarSign, Users, TrendingUp, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ── Mock Data ── */
const revenueData = [
  { month: "Jan", revenue: 42000, target: 38000 },
  { month: "Feb", revenue: 48000, target: 40000 },
  { month: "Mar", revenue: 55000, target: 45000 },
  { month: "Apr", revenue: 52000, target: 48000 },
  { month: "May", revenue: 61000, target: 50000 },
  { month: "Jun", revenue: 67000, target: 55000 },
  { month: "Jul", revenue: 72000, target: 58000 },
];

const pipelineData = [
  { stage: "Prospect", count: 124, value: 2.4 },
  { stage: "Qualified", count: 87, value: 1.8 },
  { stage: "Proposal", count: 45, value: 1.2 },
  { stage: "Negotiation", count: 28, value: 0.9 },
  { stage: "Closed Won", count: 19, value: 0.7 },
];

const dealSourceData = [
  { name: "Referral", value: 35, color: "hsl(42, 65%, 55%)" },
  { name: "Inbound", value: 28, color: "hsl(210, 100%, 52%)" },
  { name: "Outbound", value: 22, color: "hsl(152, 60%, 40%)" },
  { name: "Partner", value: 15, color: "hsl(280, 60%, 55%)" },
];

const recentDeals = [
  { name: "Acme Corp", value: "$125,000", stage: "Negotiation", agent: "Sarah K.", probability: 85 },
  { name: "TechVentures Inc", value: "$89,000", stage: "Proposal", agent: "Mike R.", probability: 65 },
  { name: "GlobalTrade Ltd", value: "$210,000", stage: "Qualified", agent: "Emma L.", probability: 40 },
  { name: "Pinnacle Systems", value: "$67,500", stage: "Closed Won", agent: "James T.", probability: 100 },
  { name: "Nova Dynamics", value: "$156,000", stage: "Prospect", agent: "Lisa M.", probability: 20 },
];

const SalesDashboard = () => {
  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Sales Pipeline</h1>
        <p className="text-sm text-muted-foreground mt-1">Track revenue, deals, and team performance</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value="$2.4M" change="+12.5%" changeType="positive" icon={DollarSign} delay={0} />
        <StatCard title="Active Deals" value="284" change="+8.2%" changeType="positive" icon={Target} delay={0.05} />
        <StatCard title="Conversion Rate" value="24.8%" change="-2.1%" changeType="negative" icon={TrendingUp} delay={0.1} />
        <StatCard title="New Leads" value="1,247" change="+18.3%" changeType="positive" icon={Users} delay={0.15} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="lg:col-span-2 glass-card rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Revenue vs Target</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(42, 65%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(42, 65%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  background: "hsl(225, 22%, 11%)",
                  border: "1px solid hsl(225, 18%, 20%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "hsl(210, 20%, 92%)",
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(42, 65%, 55%)" strokeWidth={2} fill="url(#revenueGrad)" />
              <Area type="monotone" dataKey="target" stroke="hsl(210, 100%, 52%)" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Deal Source Pie */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
          className="glass-card rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Deal Sources</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={dealSourceData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                {dealSourceData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "hsl(225, 22%, 11%)",
                  border: "1px solid hsl(225, 18%, 20%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "hsl(210, 20%, 92%)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {dealSourceData.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                <span className="text-xs text-muted-foreground">{d.name} ({d.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pipeline + Deals */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Pipeline Stages */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="lg:col-span-2 glass-card rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Pipeline Stages</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={pipelineData} layout="vertical" barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" opacity={0.3} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="stage" tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} width={90} />
              <Tooltip
                contentStyle={{
                  background: "hsl(225, 22%, 11%)",
                  border: "1px solid hsl(225, 18%, 20%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "hsl(210, 20%, 92%)",
                }}
              />
              <Bar dataKey="count" fill="hsl(42, 65%, 55%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Deals */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.35 }}
          className="lg:col-span-3 glass-card rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Deals</h3>
          <div className="space-y-3">
            {recentDeals.map((deal, i) => (
              <motion.div
                key={deal.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{deal.name}</p>
                  <p className="text-xs text-muted-foreground">{deal.agent} · {deal.stage}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm font-semibold text-foreground">{deal.value}</p>
                  <div className="flex items-center gap-1 justify-end">
                    {deal.probability >= 50 ? (
                      <ArrowUpRight className="h-3 w-3 text-success" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-destructive" />
                    )}
                    <span className={`text-xs ${deal.probability >= 50 ? "text-success" : "text-destructive"}`}>
                      {deal.probability}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SalesDashboard;
