import { motion } from "framer-motion";
import { useState } from "react";
import { MoreHorizontal, Plus, User } from "lucide-react";

/* ── Types ── */
interface Lead {
  id: string;
  name: string;
  company: string;
  value: string;
  avatar: string;
  priority: "high" | "medium" | "low";
  daysInStage: number;
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  leads: Lead[];
}

/* ── Mock Data ── */
const initialColumns: KanbanColumn[] = [
  {
    id: "new",
    title: "New Leads",
    color: "hsl(210, 100%, 52%)",
    leads: [
      { id: "1", name: "David Chen", company: "ByteScale", value: "$45,000", avatar: "DC", priority: "high", daysInStage: 2 },
      { id: "2", name: "Maria Santos", company: "CloudNine", value: "$28,000", avatar: "MS", priority: "medium", daysInStage: 5 },
      { id: "3", name: "Alex Kumar", company: "DataFlow", value: "$62,000", avatar: "AK", priority: "high", daysInStage: 1 },
    ],
  },
  {
    id: "contacted",
    title: "Contacted",
    color: "hsl(42, 65%, 55%)",
    leads: [
      { id: "4", name: "Sophie Turner", company: "Elevate", value: "$95,000", avatar: "ST", priority: "high", daysInStage: 3 },
      { id: "5", name: "Robert Kim", company: "FusionTech", value: "$37,000", avatar: "RK", priority: "low", daysInStage: 8 },
    ],
  },
  {
    id: "qualified",
    title: "Qualified",
    color: "hsl(152, 60%, 40%)",
    leads: [
      { id: "6", name: "Emily Watson", company: "Greenfield", value: "$120,000", avatar: "EW", priority: "high", daysInStage: 4 },
      { id: "7", name: "James Park", company: "HyperLoop", value: "$78,000", avatar: "JP", priority: "medium", daysInStage: 6 },
      { id: "8", name: "Nina Patel", company: "InnoSys", value: "$55,000", avatar: "NP", priority: "medium", daysInStage: 2 },
    ],
  },
  {
    id: "proposal",
    title: "Proposal Sent",
    color: "hsl(280, 60%, 55%)",
    leads: [
      { id: "9", name: "Thomas Wright", company: "JetStream", value: "$185,000", avatar: "TW", priority: "high", daysInStage: 7 },
    ],
  },
  {
    id: "won",
    title: "Closed Won",
    color: "hsl(152, 70%, 45%)",
    leads: [
      { id: "10", name: "Rachel Green", company: "KinetixAI", value: "$250,000", avatar: "RG", priority: "high", daysInStage: 0 },
    ],
  },
];

const priorityStyles = {
  high: "bg-destructive/15 text-destructive",
  medium: "bg-warning/15 text-warning",
  low: "bg-muted text-muted-foreground",
};

const KanbanBoard = () => {
  const [columns] = useState(initialColumns);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Kanban Board</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track your leads through the pipeline</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          Add Lead
        </button>
      </div>

      {/* Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
        {columns.map((column, colIdx) => (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: colIdx * 0.06, duration: 0.3 }}
            className="flex-shrink-0 w-72"
          >
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-2 h-2 rounded-full" style={{ background: column.color }} />
              <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
              <span className="text-xs text-muted-foreground ml-auto bg-secondary px-2 py-0.5 rounded-full">
                {column.leads.length}
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-2.5">
              {column.leads.map((lead, leadIdx) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: colIdx * 0.06 + leadIdx * 0.04 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="glass-card rounded-lg p-3.5 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">{lead.avatar}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground leading-tight">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.company}</p>
                      </div>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-0.5">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-semibold text-foreground">{lead.value}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${priorityStyles[lead.priority]}`}>
                      {lead.priority}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">{lead.daysInStage}d in stage</p>
                </motion.div>
              ))}

              {/* Add card button */}
              <button className="w-full border border-dashed border-border/60 rounded-lg p-3 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors flex items-center justify-center gap-1.5">
                <Plus className="h-3 w-3" />
                Add Lead
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
