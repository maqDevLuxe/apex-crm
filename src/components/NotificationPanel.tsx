import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info";
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: "1", title: "Deal Closed", message: "Pinnacle Systems — $67,500 closed.", type: "success", time: "5m ago", read: false },
  { id: "2", title: "Lead Stagnant", message: "Robert Kim stuck in 'Contacted' for 8 days.", type: "warning", time: "1h ago", read: false },
  { id: "3", title: "New Lead Assigned", message: "Alex Kumar from DataFlow assigned to you.", type: "info", time: "2h ago", read: false },
  { id: "4", title: "Proposal Viewed", message: "Thomas Wright viewed your proposal 3×.", type: "info", time: "4h ago", read: true },
  { id: "5", title: "Renewal Due", message: "Elevate Inc renewal in 30 days.", type: "warning", time: "1d ago", read: true },
];

const typeConfig = {
  success: { icon: CheckCircle, color: "text-success", bg: "bg-success/10" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  info: { icon: Info, color: "text-info", bg: "bg-info/10" },
};

export function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const dismiss = (id: string) => setNotifications((n) => n.filter((i) => i.id !== id));
  const markAllRead = () => setNotifications((n) => n.map((i) => ({ ...i, read: true })));

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-4.5 w-4.5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 h-4 min-w-4 px-1 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold leading-none">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-xl border border-border bg-card shadow-2xl shadow-black/20 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-[10px] text-primary hover:underline font-medium">
                  Mark all read
                </button>
              )}
            </div>

            {/* Notification list */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="py-10 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">No notifications</p>
                </div>
              ) : (
                notifications.map((n, i) => {
                  const config = typeConfig[n.type];
                  const Icon = config.icon;
                  return (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className={`flex gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors group cursor-pointer ${
                        !n.read ? "bg-primary/[0.03]" : ""
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-xs font-medium leading-tight ${!n.read ? "text-foreground" : "text-muted-foreground"}`}>
                            {n.title}
                          </p>
                          <button
                            onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-secondary rounded flex-shrink-0"
                          >
                            <X className="h-3 w-3 text-muted-foreground" />
                          </button>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{n.message}</p>
                        <p className="text-[10px] text-muted-foreground/50 mt-1">{n.time}</p>
                      </div>
                      {!n.read && <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />}
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-4 py-2.5">
              <button
                onClick={() => { setOpen(false); navigate("/notifications"); }}
                className="w-full text-center text-xs font-medium text-primary hover:underline"
              >
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
