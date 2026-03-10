import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How do I add a new lead to the pipeline?", a: "Navigate to the Kanban Board and click the 'Add Lead' button at the top or within any column. Fill in the required details including name, company, and deal value." },
  { q: "How are conversion rates calculated?", a: "Conversion rates are calculated as the percentage of leads that progress from one pipeline stage to the next within a given time period. The overall rate measures leads that reach 'Closed Won'." },
  { q: "Can I customize pipeline stages?", a: "Yes, pipeline stages can be customized in Settings > Pipeline Configuration. You can add, remove, or rename stages to match your sales process." },
  { q: "How do I assign leads to team members?", a: "Leads can be assigned from the Kanban Board by clicking on a lead card and selecting an agent, or from the Contact Directory using the bulk action menu." },
  { q: "What integrations are supported?", a: "Apex CRM integrates with major email providers, Slack, Salesforce, HubSpot, and Zapier for custom workflows. Visit Settings > Integrations for the full list." },
  { q: "How is billing calculated?", a: "Billing is based on the number of active users and the plan tier. Enterprise features like custom reporting and API access are available on Business and Enterprise plans." },
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h1>
        <p className="text-sm text-muted-foreground mt-1">Frequently asked questions</p>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="glass-card rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="text-sm font-medium text-foreground">{faq.q}</span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
            </button>
            <motion.div
              initial={false}
              animate={{ height: openIdx === i ? "auto" : 0, opacity: openIdx === i ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
