import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Award, TrendingUp, Target } from "lucide-react";

const Profile = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Agent Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Your personal information and stats</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <div className="flex items-start gap-5">
          <div className="h-20 w-20 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-primary">JD</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">John Doe</h2>
            <p className="text-sm text-primary font-medium">Senior Sales Executive</p>
            <div className="flex flex-wrap gap-4 mt-3">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Mail className="h-3 w-3" /> john.doe@apexcrm.com</span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Phone className="h-3 w-3" /> +1 (555) 123-4567</span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> New York, NY</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Deals Closed", value: "47", sub: "This quarter", icon: Award },
          { label: "Revenue Generated", value: "$1.2M", sub: "YTD", icon: TrendingUp },
          { label: "Win Rate", value: "68%", sub: "+5% vs last Q", icon: Target },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="glass-card rounded-xl p-4 text-center"
          >
            <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">{stat.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
