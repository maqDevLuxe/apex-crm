import { motion } from "framer-motion";
import { useState } from "react";
import { UserPlus, MoreHorizontal, Mail, Shield, Search } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Agent";
  avatar: string;
  status: "active" | "invited" | "inactive";
  deals: number;
  revenue: string;
  joined: string;
}

const members: TeamMember[] = [
  { id: "1", name: "John Doe", email: "john.doe@apexcrm.com", role: "Admin", avatar: "JD", status: "active", deals: 47, revenue: "$1.2M", joined: "Jan 2023" },
  { id: "2", name: "Sarah Kim", email: "sarah.k@apexcrm.com", role: "Manager", avatar: "SK", status: "active", deals: 62, revenue: "$1.8M", joined: "Mar 2023" },
  { id: "3", name: "Mike Roberts", email: "mike.r@apexcrm.com", role: "Agent", avatar: "MR", status: "active", deals: 38, revenue: "$890K", joined: "May 2023" },
  { id: "4", name: "Emma Li", email: "emma.l@apexcrm.com", role: "Agent", avatar: "EL", status: "active", deals: 55, revenue: "$1.4M", joined: "Apr 2023" },
  { id: "5", name: "James Taylor", email: "james.t@apexcrm.com", role: "Agent", avatar: "JT", status: "active", deals: 31, revenue: "$720K", joined: "Jul 2023" },
  { id: "6", name: "Lisa Martinez", email: "lisa.m@apexcrm.com", role: "Agent", avatar: "LM", status: "active", deals: 44, revenue: "$1.1M", joined: "Jun 2023" },
  { id: "7", name: "Daniel Foster", email: "daniel.f@apexcrm.com", role: "Agent", avatar: "DF", status: "invited", deals: 0, revenue: "$0", joined: "Pending" },
  { id: "8", name: "Amara Okafor", email: "amara.o@apexcrm.com", role: "Manager", avatar: "AO", status: "active", deals: 29, revenue: "$950K", joined: "Aug 2023" },
];

const roleColors: Record<string, string> = {
  Admin: "bg-primary/15 text-primary",
  Manager: "bg-info/15 text-info",
  Agent: "bg-muted text-muted-foreground",
};

const statusColors: Record<string, string> = {
  active: "bg-success/15 text-success",
  invited: "bg-warning/15 text-warning",
  inactive: "bg-muted text-muted-foreground",
};

const TeamPage = () => {
  const [search, setSearch] = useState("");
  const filtered = members.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Team</h1>
          <p className="text-sm text-muted-foreground mt-1">{members.length} members · {members.filter((m) => m.status === "active").length} active</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <UserPlus className="h-4 w-4" />
          Invite Member
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search members..."
          className="w-full h-9 pl-9 pr-4 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="glass-card rounded-xl p-5 hover:border-primary/20 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{member.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <button className="p-1 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${roleColors[member.role]}`}>
                {member.role}
              </span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[member.status]}`}>
                {member.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-sm font-semibold text-foreground">{member.deals}</p>
                <p className="text-[10px] text-muted-foreground">Deals</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{member.revenue}</p>
                <p className="text-[10px] text-muted-foreground">Revenue</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{member.joined}</p>
                <p className="text-[10px] text-muted-foreground">Joined</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
