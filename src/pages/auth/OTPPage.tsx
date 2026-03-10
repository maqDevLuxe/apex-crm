import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { AuthLayout } from "./LoginPage";

const OTPPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <AuthLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center"
        >
          <ShieldCheck className="h-8 w-8 text-primary" />
        </motion.div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">Two-Factor Authentication</h1>
          <p className="text-sm text-muted-foreground mt-2">Enter the 6-digit code from your authenticator app</p>
        </div>

        <div className="flex justify-center gap-2">
          {otp.map((digit, i) => (
            <motion.input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="w-11 h-13 text-center text-lg font-bold rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          ))}
        </div>

        <button className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
          Verify Code
          <ArrowRight className="h-4 w-4" />
        </button>

        <p className="text-xs text-muted-foreground">
          Didn't receive a code? <button className="text-primary hover:underline font-medium">Resend</button>
        </p>

        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Use a recovery code instead
        </button>
      </motion.div>
    </AuthLayout>
  );
};

export default OTPPage;
