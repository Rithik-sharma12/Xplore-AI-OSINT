import { Shield, Eye, Brain } from "lucide-react";

export const WebCheckLogo = () => {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      {/* Logo Image */}
      <div className="relative group">
        <img 
          src="/logo.jpg" 
          alt="DeepRecon Logo" 
          className="w-10 h-10 md:w-12 md:h-12 rounded-lg shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 rounded-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 rounded-lg ring-2 ring-transparent group-hover:ring-blue-500/20 transition-all duration-300" />
      </div>
      
      {/* Animated Icons */}
      <div className="relative flex items-center gap-1 md:gap-1.5">
        <Brain className="w-4 h-4 md:w-5 md:h-5 text-blue-500 animate-pulse" />
        <Eye className="w-4 h-4 md:w-5 md:h-5 text-purple-500 animate-pulse" />
        <Shield className="w-4 h-4 md:w-5 md:h-5 text-green-500 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 blur-md rounded-full animate-pulse" />
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className="text-xl md:text-2xl font-mono font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent">
          DeepRecon
        </span>
        <span className="text-xs text-muted-foreground font-mono tracking-wider hidden sm:block">
          AI-POWERED OSINT PLATFORM
        </span>
        <span className="text-xs text-muted-foreground font-mono tracking-wider sm:hidden">
          OSINT PLATFORM
        </span>
      </div>
    </div>
  );
};