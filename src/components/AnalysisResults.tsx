import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Globe, 
  Server, 
  Lock, 
  Eye, 
  Database,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Code
} from "lucide-react";

interface AnalysisData {
  url: string;
  ssl: {
    valid: boolean;
    issuer: string;
    expires: string;
    grade: string;
  };
  dns: {
    records: Array<{ type: string; value: string }>;
  };
  techStack: Array<{ name: string; version?: string; category: string }>;
  security: {
    headers: Array<{ name: string; value: string; status: 'good' | 'warning' | 'missing' }>;
  };
  performance: {
    loadTime: number;
    size: string;
  };
  location: {
    country: string;
    city: string;
    ip: string;
  };
}

interface AnalysisResultsProps {
  data: AnalysisData;
}

export const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  const ResultCard = ({ 
    title, 
    icon: Icon, 
    children 
  }: { 
    title: string; 
    icon: any; 
    children: React.ReactNode 
  }) => (
    <Card className="cyber-card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-cyber-green" />
        <h3 className="text-lg font-mono font-semibold text-cyber-text-primary cyber-glow">
          {title}
        </h3>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </Card>
  );

  const StatusBadge = ({ status }: { status: 'good' | 'warning' | 'missing' }) => {
    const config = {
      good: { icon: CheckCircle, color: "text-cyber-green", bg: "bg-cyber-green/10" },
      warning: { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-400/10" },
      missing: { icon: XCircle, color: "text-red-400", bg: "bg-red-400/10" }
    };
    
    const { icon: StatusIcon, color, bg } = config[status];
    
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono ${bg}`}>
        <StatusIcon className={`w-3 h-3 ${color}`} />
        <span className={color}>{status.toUpperCase()}</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-mono font-bold text-cyber-text-primary cyber-glow">
          Analysis Results for
        </h2>
        <p className="text-xl text-cyber-green font-mono">{data.url}</p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* SSL Certificate */}
        <ResultCard title="SSL Certificate" icon={Lock}>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-cyber-text-secondary font-mono text-sm">Status</span>
              <StatusBadge status={data.ssl.valid ? 'good' : 'warning'} />
            </div>
            <div className="terminal-text text-sm space-y-1">
              <div>Issuer: {data.ssl.issuer}</div>
              <div>Expires: {data.ssl.expires}</div>
              <div>Grade: <span className="text-cyber-green-bright">{data.ssl.grade}</span></div>
            </div>
          </div>
        </ResultCard>

        {/* DNS Records */}
        <ResultCard title="DNS Records" icon={Globe}>
          <div className="space-y-2">
            {data.dns.records.slice(0, 4).map((record, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-cyber-green font-mono">{record.type}</span>
                <span className="text-cyber-text-secondary font-mono text-right truncate ml-2">
                  {record.value}
                </span>
              </div>
            ))}
            {data.dns.records.length > 4 && (
              <div className="text-center text-cyber-text-muted text-xs font-mono">
                +{data.dns.records.length - 4} more records
              </div>
            )}
          </div>
        </ResultCard>

        {/* Tech Stack */}
        <ResultCard title="Tech Stack" icon={Code}>
          <div className="space-y-2">
            {data.techStack.slice(0, 5).map((tech, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-cyber-green font-mono text-sm">{tech.name}</span>
                <div className="flex items-center gap-2">
                  {tech.version && (
                    <span className="text-cyber-text-muted text-xs font-mono">{tech.version}</span>
                  )}
                  <Badge variant="outline" className="text-xs border-cyber-green/30 text-cyber-text-secondary">
                    {tech.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ResultCard>

        {/* Security Headers */}
        <ResultCard title="Security Headers" icon={Shield}>
          <div className="space-y-2">
            {data.security.headers.map((header, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-cyber-text-secondary font-mono text-sm">{header.name}</span>
                <StatusBadge status={header.status} />
              </div>
            ))}
          </div>
        </ResultCard>

        {/* Performance */}
        <ResultCard title="Performance" icon={Clock}>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-cyber-text-secondary font-mono text-sm">Load Time</span>
              <span className="text-cyber-green font-mono text-sm">{data.performance.loadTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyber-text-secondary font-mono text-sm">Page Size</span>
              <span className="text-cyber-green font-mono text-sm">{data.performance.size}</span>
            </div>
          </div>
        </ResultCard>

        {/* Location */}
        <ResultCard title="Server Location" icon={MapPin}>
          <div className="space-y-2">
            <div className="terminal-text text-sm space-y-1">
              <div>IP: {data.location.ip}</div>
              <div>Location: {data.location.city}, {data.location.country}</div>
            </div>
          </div>
        </ResultCard>

      </div>
    </div>
  );
};