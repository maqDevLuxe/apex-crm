import { motion } from "framer-motion";
import { useState } from "react";
import { Shield, Smartphone, Monitor, Globe, Key, AlertTriangle, CheckCircle, Lock } from "lucide-react";

const sessions = [
  { device: "MacBook Pro", browser: "Chrome 120", location: "New York, US", ip: "192.168.1.***", lastActive: "Now", current: true, icon: Monitor },
  { device: "iPhone 15", browser: "Safari 17", location: "New York, US", ip: "192.168.1.***", lastActive: "2h ago", current: false, icon: Smartphone },
  { device: "Windows Desktop", browser: "Firefox 121", location: "London, UK", ip: "10.0.0.***", lastActive: "3d ago", current: false, icon: Monitor },
];

const activityLog = [
  { action: "Password changed", time: "2 days ago", ip: "192.168.1.***" },
  { action: "2FA enabled", time: "1 week ago", ip: "192.168.1.***" },
  { action: "New login from iPhone", time: "1 week ago", ip: "192.168.1.***" },
  { action: "API key generated", time: "2 weeks ago", ip: "10.0.0.***" },
  { action: "Login from new location (London)", time: "3 weeks ago", ip: "10.0.0.***" },
];

const SecurityPage = () => {
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Security</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage security settings and sessions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Password */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Change Password</h3>
          </div>
          <div className="space-y-3">
            {["Current Password", "New Password", "Confirm New Password"].map((label) => (
              <div key={label}>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            <Lock className="h-3.5 w-3.5" />
            Update Password
          </button>
        </motion.div>

        {/* 2FA */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Two-Factor Authentication</h3>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/60">
            <div className="flex items-center gap-3">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center ${twoFAEnabled ? "bg-success/15" : "bg-destructive/15"}`}>
                {twoFAEnabled ? <CheckCircle className="h-4 w-4 text-success" /> : <AlertTriangle className="h-4 w-4 text-destructive" />}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{twoFAEnabled ? "Enabled" : "Disabled"}</p>
                <p className="text-xs text-muted-foreground">Authenticator app</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFAEnabled(!twoFAEnabled)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                twoFAEnabled
                  ? "bg-destructive/15 text-destructive hover:bg-destructive/25"
                  : "bg-success/15 text-success hover:bg-success/25"
              }`}
            >
              {twoFAEnabled ? "Disable" : "Enable"}
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Recovery Codes</p>
            <div className="grid grid-cols-2 gap-1.5">
              {["APEX-7K2M-9X4L", "APEX-3F8N-2W6P", "APEX-5T1R-8J3Q", "APEX-9H4V-6B2D"].map((code) => (
                <div key={code} className="px-3 py-1.5 rounded bg-secondary/80 text-xs font-mono text-muted-foreground text-center">
                  {code}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Active Sessions */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Active Sessions</h3>
          </div>
          <button className="text-xs text-destructive hover:underline font-medium">Revoke All</button>
        </div>
        <div className="space-y-2">
          {sessions.map((session, i) => {
            const Icon = session.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.04 }}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 hover:bg-secondary/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {session.device}
                      {session.current && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-success/15 text-success">Current</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">{session.browser} · {session.location} · {session.ip}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{session.lastActive}</span>
                  {!session.current && (
                    <button className="text-xs text-destructive hover:underline">Revoke</button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Security Log */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Security Activity Log</h3>
        <div className="space-y-1.5">
          {activityLog.map((log, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
              <p className="text-sm text-foreground">{log.action}</p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-mono">{log.ip}</span>
                <span className="text-xs text-muted-foreground">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SecurityPage;
