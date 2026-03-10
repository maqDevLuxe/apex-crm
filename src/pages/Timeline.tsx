import { motion } from "framer-motion";
import { Clock, Phone, Mail, FileText, MessageSquare, CheckCircle } from "lucide-react";

const events = [
  { id: 1, type: "call", title: "Discovery call with Acme Corp", agent: "Sarah K.", time: "10:30 AM", date: "Today", details: "Discussed enterprise pricing. Follow-up scheduled for Thursday.", icon: Phone },
  { id: 2, type: "email", title: "Proposal sent to TechVentures", agent: "Mike R.", time: "9:15 AM", date: "Today", details: "Sent revised proposal with updated SLA terms.", icon: Mail },
  { id: 3, type: "deal", title: "Deal closed: Pinnacle Systems", agent: "James T.", time: "5:45 PM", date: "Yesterday", details: "Contract signed for $67,500. 2-year agreement.", icon: CheckCircle },
  { id: 4, type: "note", title: "Meeting notes: GlobalTrade review", agent: "Emma L.", time: "3:00 PM", date: "Yesterday", details: "Budget approval pending. Decision expected by end of month.", icon: FileText },
  { id: 5, type: "message", title: "Chat with Nova Dynamics", agent: "Lisa M.", time: "11:20 AM", date: "Yesterday", details: "Requested demo of analytics module. Scheduled for next Tuesday.", icon: MessageSquare },
  { id: 6, type: "call", title: "Follow-up call: ByteScale", agent: "Daniel F.", time: "2:30 PM", date: "2 days ago", details: "Technical requirements clarified. Moving to proposal stage.", icon: Phone },
  { id: 7, type: "email", title: "Renewal reminder: Elevate Inc", agent: "Ryan C.", time: "10:00 AM", date: "2 days ago", details: "Annual renewal due in 30 days. Upsell opportunity identified.", icon: Mail },
  { id: 8, type: "deal", title: "Deal won: KinetixAI", agent: "Amara O.", time: "4:15 PM", date: "3 days ago", details: "Enterprise plan signed. $250,000 annual contract.", icon: CheckCircle },
];

const typeColors: Record<string, string> = {
  call: "bg-info/15 text-info",
  email: "bg-primary/15 text-primary",
  deal: "bg-success/15 text-success",
  note: "bg-warning/15 text-warning",
  message: "bg-accent/15 text-accent-foreground",
};

const Timeline = () => {
  let lastDate = "";

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Timeline</h1>
        <p className="text-sm text-muted-foreground mt-1">Activity history across all deals</p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-1">
          {events.map((event, i) => {
            const showDate = event.date !== lastDate;
            lastDate = event.date;
            const Icon = event.icon;

            return (
              <div key={event.id}>
                {showDate && (
                  <div className="flex items-center gap-3 py-3 pl-12">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{event.date}</span>
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 group"
                >
                  {/* Icon */}
                  <div className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${typeColors[event.type]}`}>
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 glass-card rounded-lg p-4 mb-3 hover:border-primary/20 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{event.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{event.agent} · {event.time}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{event.details}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
