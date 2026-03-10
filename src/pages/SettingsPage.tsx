import { motion } from "framer-motion";
import { useState } from "react";
import { Save, User, Bell, Globe, Palette, Monitor, Smartphone } from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "integrations", label: "Integrations", icon: Globe },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors rounded-t-lg ${
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="settings-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card rounded-xl p-6 space-y-5">
            <h3 className="text-sm font-semibold text-foreground">Personal Information</h3>
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 rounded-xl bg-primary/15 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">JD</span>
              </div>
              <div>
                <button className="text-xs text-primary hover:underline font-medium">Change Avatar</button>
                <p className="text-[10px] text-muted-foreground mt-0.5">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "First Name", value: "John", placeholder: "Enter first name" },
                { label: "Last Name", value: "Doe", placeholder: "Enter last name" },
                { label: "Email", value: "john.doe@apexcrm.com", placeholder: "Enter email" },
                { label: "Phone", value: "+1 (555) 123-4567", placeholder: "Enter phone" },
                { label: "Job Title", value: "Senior Sales Executive", placeholder: "Enter title" },
                { label: "Location", value: "New York, NY", placeholder: "Enter location" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">{field.label}</label>
                  <input
                    type="text"
                    defaultValue={field.value}
                    placeholder={field.placeholder}
                    className="w-full h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Bio</label>
              <textarea
                rows={3}
                defaultValue="Experienced sales professional with 8+ years in enterprise B2B. Specializing in SaaS and technology solutions."
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none"
              />
            </div>
            <div className="flex justify-end">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="glass-card rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Notification Preferences</h3>
            {[
              { label: "Email Notifications", desc: "Receive deal updates and team mentions via email", enabled: true },
              { label: "Push Notifications", desc: "Browser notifications for urgent updates", enabled: true },
              { label: "Deal Alerts", desc: "Get notified when deals move stages", enabled: true },
              { label: "Weekly Digest", desc: "Receive a weekly summary of pipeline activity", enabled: false },
              { label: "Team Activity", desc: "Notifications when team members close deals", enabled: false },
              { label: "Lead Assignments", desc: "Alerts when new leads are assigned to you", enabled: true },
            ].map((pref) => (
              <ToggleRow key={pref.label} {...pref} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Appearance Tab */}
      {activeTab === "appearance" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="glass-card rounded-xl p-6 space-y-5">
            <h3 className="text-sm font-semibold text-foreground">Display</h3>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">Density</label>
              <div className="flex gap-2">
                {["Compact", "Default", "Comfortable"].map((d) => (
                  <button
                    key={d}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      d === "Default"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">Sidebar</label>
              <div className="flex gap-2">
                {["Icons Only", "Icons + Labels", "Expanded"].map((s, i) => (
                  <button
                    key={s}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      i === 1
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Integrations Tab */}
      {activeTab === "integrations" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          {[
            { name: "Slack", desc: "Send deal notifications to Slack channels", connected: true },
            { name: "Google Calendar", desc: "Sync meetings and follow-ups", connected: true },
            { name: "Zapier", desc: "Automate workflows with 5000+ apps", connected: false },
            { name: "HubSpot", desc: "Sync contacts and deal data", connected: false },
            { name: "Mailchimp", desc: "Sync leads to email campaigns", connected: false },
          ].map((integration, i) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{integration.name}</p>
                <p className="text-xs text-muted-foreground">{integration.desc}</p>
              </div>
              <button
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  integration.connected
                    ? "bg-success/15 text-success hover:bg-success/25"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {integration.connected ? "Connected" : "Connect"}
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

/* Reusable toggle row */
function ToggleRow({ label, desc, enabled: initialEnabled }: { label: string; desc: string; enabled: boolean }) {
  const [enabled, setEnabled] = useState(initialEnabled);
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-10 h-5 rounded-full transition-colors ${enabled ? "bg-primary" : "bg-muted"}`}
      >
        <motion.div
          animate={{ x: enabled ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 h-4 w-4 rounded-full bg-card shadow-sm"
        />
      </button>
    </div>
  );
}

export default SettingsPage;
