import { motion } from "framer-motion";
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react";
import { useState } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info";
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: "1", title: "Deal Closed", message: "Pinnacle Systems deal worth $67,500 has been closed successfully.", type: "success", time: "5m ago", read: false },
  { id: "2", title: "Lead Stagnant", message: "Robert Kim from FusionTech has been in 'Contacted' stage for 8 days.", type: "warning", time: "1h ago", read: false },
  { id: "3", title: "New Lead Assigned", message: "Alex Kumar from DataFlow has been assigned to your pipeline.", type: "info", time: "2h ago", read: false },
  { id: "4", title: "Proposal Viewed", message: "Thomas Wright from JetStream viewed your proposal 3 times.", type: "info", time: "4h ago", read: true },
  { id: "5", title: "Renewal Due", message: "Elevate Inc renewal is due in 30 days. Upsell opportunity identified.", type: "warning", time: "1d ago", read: true },
  { id: "6", title: "Target Exceeded", message: "Monthly revenue target exceeded by 12.5%. Great work!", type: "success", time: "1d ago", read: true },
];

const typeConfig = {
  success: { icon: CheckCircle, color: "text-success", bg: "bg-success/10" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  info: { icon: Info, color: "text-info", bg: "bg-info/10" },
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => setNotifications((n) => n.map((i) => ({ ...i, read: true })));
  const dismiss = (id: string) => setNotifications((n) => n.filter((i) => i.id !== id));

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs text-primary hover:underline">
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((n, i) => {
          const config = typeConfig[n.type];
          const Icon = config.icon;
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`glass-card rounded-lg p-4 flex gap-3 group transition-colors ${!n.read ? "border-l-2 border-l-primary" : ""}`}
            >
              <div className={`h-9 w-9 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`h-4 w-4 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <p className={`text-sm font-medium ${!n.read ? "text-foreground" : "text-muted-foreground"}`}>{n.title}</p>
                  <button onClick={() => dismiss(n.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded">
                    <X className="h-3 w-3 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">{n.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
