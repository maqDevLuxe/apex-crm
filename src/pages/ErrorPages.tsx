import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, ServerCrash, Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

/* ── 404 Not Found ── */
export const NotFoundPage = () => (
  <ErrorLayout
    icon={AlertTriangle}
    code="404"
    title="Page not found"
    description="The page you're looking for doesn't exist or has been moved."
    actions={
      <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
        <Home className="h-4 w-4" />
        Go to Dashboard
      </Link>
    }
  />
);

/* ── 500 Server Error ── */
export const ServerErrorPage = () => (
  <ErrorLayout
    icon={ServerCrash}
    code="500"
    title="Server error"
    description="Something went wrong on our end. Our team has been notified and is working on a fix."
    actions={
      <div className="flex items-center gap-3">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
        <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Link>
      </div>
    }
  />
);

/* ── Maintenance ── */
export const MaintenancePage = () => (
  <ErrorLayout
    icon={Construction}
    code=""
    title="Under maintenance"
    description="We're performing scheduled maintenance to improve your experience. We'll be back shortly."
    actions={
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center gap-6">
          {[
            { label: "Hours", value: "02" },
            { label: "Minutes", value: "45" },
            { label: "Seconds", value: "30" },
          ].map((t) => (
            <div key={t.label}>
              <div className="text-2xl font-bold text-foreground font-mono bg-secondary/80 rounded-lg px-3 py-2 min-w-[56px]">
                {t.value}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{t.label}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Check Status
        </button>
      </div>
    }
  />
);

/* ── Shared Error Layout ── */
function ErrorLayout({
  icon: Icon,
  code,
  title,
  description,
  actions,
}: {
  icon: React.ElementType;
  code: string;
  title: string;
  description: string;
  actions: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="mx-auto h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
        >
          <Icon className="h-10 w-10 text-primary" />
        </motion.div>

        {code && (
          <p className="text-6xl font-black text-foreground/10 mb-2">{code}</p>
        )}
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{description}</p>

        <div className="mt-8">{actions}</div>
      </motion.div>
    </div>
  );
}
