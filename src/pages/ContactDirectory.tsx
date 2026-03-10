import { motion } from "framer-motion";
import { Search, Filter, Mail, Phone, MoreHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  status: "active" | "inactive" | "lead";
  lastContact: string;
  dealValue: string;
  avatar: string;
}

const contacts: Contact[] = [
  { id: "1", name: "Sarah Mitchell", email: "s.mitchell@acmecorp.com", company: "Acme Corp", role: "VP Sales", phone: "+1 (555) 012-3456", status: "active", lastContact: "2h ago", dealValue: "$125,000", avatar: "SM" },
  { id: "2", name: "Marcus Johnson", email: "m.johnson@techventures.io", company: "TechVentures", role: "CTO", phone: "+1 (555) 234-5678", status: "active", lastContact: "1d ago", dealValue: "$89,000", avatar: "MJ" },
  { id: "3", name: "Elena Rodriguez", email: "e.rodriguez@globaltrade.com", company: "GlobalTrade", role: "Procurement Lead", phone: "+1 (555) 345-6789", status: "lead", lastContact: "3d ago", dealValue: "$210,000", avatar: "ER" },
  { id: "4", name: "William Chang", email: "w.chang@pinnacle.io", company: "Pinnacle Systems", role: "CEO", phone: "+1 (555) 456-7890", status: "active", lastContact: "5h ago", dealValue: "$67,500", avatar: "WC" },
  { id: "5", name: "Jessica Park", email: "j.park@novadyn.com", company: "Nova Dynamics", role: "Head of Ops", phone: "+1 (555) 567-8901", status: "inactive", lastContact: "2w ago", dealValue: "$156,000", avatar: "JP" },
  { id: "6", name: "Daniel Foster", email: "d.foster@bytescale.ai", company: "ByteScale", role: "Founder", phone: "+1 (555) 678-9012", status: "active", lastContact: "30m ago", dealValue: "$340,000", avatar: "DF" },
  { id: "7", name: "Amara Okafor", email: "a.okafor@kinetix.com", company: "KinetixAI", role: "VP Engineering", phone: "+1 (555) 789-0123", status: "lead", lastContact: "1d ago", dealValue: "$95,000", avatar: "AO" },
  { id: "8", name: "Ryan Cooper", email: "r.cooper@elevate.co", company: "Elevate Inc", role: "Director", phone: "+1 (555) 890-1234", status: "active", lastContact: "4h ago", dealValue: "$178,000", avatar: "RC" },
];

const statusStyles = {
  active: "bg-success/15 text-success",
  inactive: "bg-muted text-muted-foreground",
  lead: "bg-info/15 text-info",
};

const ContactDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Contacts</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your contact directory</p>
      </div>

      {/* Search & Filter bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <Filter className="h-3.5 w-3.5" />
          Filter
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="glass-card rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Contact</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Company</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Deal Value</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Last Contact</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact, i) => (
                <motion.tr
                  key={contact.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-secondary/40 transition-colors group"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-primary">{contact.avatar}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-foreground">{contact.company}</p>
                    <p className="text-xs text-muted-foreground">{contact.role}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${statusStyles[contact.status]}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-foreground">{contact.dealValue}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-muted-foreground">{contact.lastContact}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                        <Mail className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                        <Phone className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactDirectory;
