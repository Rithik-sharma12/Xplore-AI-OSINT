import { Shield } from "lucide-react";

export const WebCheckLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Shield className="w-8 h-8 text-cyber-green animate-pulse-glow" />
        <div className="absolute inset-0 w-8 h-8 bg-cyber-green/20 blur-md rounded-full" />
      </div>
      <span className="text-2xl font-mono font-bold text-cyber-text-primary cyber-glow">
        Web<span className="text-cyber-green">Check</span>
      </span>
    </div>
  );
};