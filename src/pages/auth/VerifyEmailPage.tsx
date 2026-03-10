import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthLayout } from "./LoginPage";

const VerifyEmailPage = () => {
  return (
    <AuthLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center"
        >
          <Mail className="h-8 w-8 text-primary" />
        </motion.div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">Check your email</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            We've sent a verification link to <span className="text-foreground font-medium">john@company.com</span>. Click the link to verify your account.
          </p>
        </div>

        <div className="glass-card rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
            <p className="text-xs text-muted-foreground text-left">Check your inbox and spam folder</p>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
            <p className="text-xs text-muted-foreground text-left">The link expires in 24 hours</p>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
            <p className="text-xs text-muted-foreground text-left">You can close this tab after verifying</p>
          </div>
        </div>

        <button className="w-full h-10 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors">
          Resend Verification Email
        </button>

        <Link to="/login" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3 w-3" />
          Back to sign in
        </Link>
      </motion.div>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
