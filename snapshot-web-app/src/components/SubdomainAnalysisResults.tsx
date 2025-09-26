import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Network, 
  Server, 
  Shield, 
  Globe,
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
  Eye,
  Zap,
  Lock,
  Unlock,
  Activity
} from "lucide-react";
import { OSINTAnalysisResult } from "@/types/osint";

interface SubdomainAnalysisResultsProps {
  result: OSINTAnalysisResult;
}

export const SubdomainAnalysisResults = ({ result }: SubdomainAnalysisResultsProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (result.input.type !== 'subdomain' || !result.subdomainAnalysis) {
    return null;
  }

  const { subdomainAnalysis } = result;
  const activePercentage = (subdomainAnalysis.activeSubdomains / subdomainAnalysis.totalFound) * 100;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Network className="h-6 w-6 text-purple-500" />
              <div>
                <CardTitle className="text-xl">Subdomain Enumeration Report</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span>Target Domain: {subdomainAnalysis.domain}</span>
                  <button 
                    onClick={() => copyToClipboard(subdomainAnalysis.domain)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                ✓ Enumeration Complete
              </Badge>
              <Badge variant="secondary">
                Risk: {result.aiSummary.riskLevel.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {subdomainAnalysis.totalFound}
            </div>
            <p className="text-sm font-medium text-muted-foreground">Total Subdomains</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {subdomainAnalysis.activeSubdomains}
            </div>
            <p className="text-sm font-medium text-muted-foreground">Active Subdomains</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {Math.round(activePercentage)}%
            </div>
            <p className="text-sm font-medium text-muted-foreground">Activity Rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {subdomainAnalysis.techniques.length}
            </div>
            <p className="text-sm font-medium text-muted-foreground">Techniques Used</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Subdomain Activity Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active Subdomains</span>
              <span className="text-sm text-muted-foreground">
                {subdomainAnalysis.activeSubdomains}/{subdomainAnalysis.totalFound}
              </span>
            </div>
            <Progress value={activePercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Subdomain List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Discovered Subdomains */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Discovered Subdomains ({subdomainAnalysis.totalFound})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {subdomainAnalysis.subdomains.map((subdomain, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      {subdomain.status === 'active' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium text-slate-900">{subdomain.subdomain}</span>
                          {subdomain.ssl && (
                            <Lock className="h-3 w-3 text-green-600" />
                          )}
                          {!subdomain.ssl && subdomain.status === 'active' && (
                            <Unlock className="h-3 w-3 text-orange-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-600 mt-1">
                          <span>IP: {subdomain.ip}</span>
                          {subdomain.technology && (
                            <span>Tech: {subdomain.technology}</span>
                          )}
                          {subdomain.ports && subdomain.ports.length > 0 && (
                            <span>Ports: {subdomain.ports.join(', ')}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={subdomain.status === 'active' ? 'default' : 'secondary'}>
                        {subdomain.status}
                      </Badge>
                      <button
                        onClick={() => copyToClipboard(subdomain.subdomain)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => window.open(`https://${subdomain.subdomain}`, '_blank')}
                        className="p-1 hover:bg-gray-200 rounded"
                        disabled={subdomain.status !== 'active'}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Enumeration Techniques */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Enumeration Techniques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {subdomainAnalysis.techniques.map((technique, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-blue-100 border border-blue-200 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-blue-700" />
                    <span className="text-sm font-medium text-blue-900">{technique}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {subdomainAnalysis.sources.map((source, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-green-100 border border-green-200 rounded-lg">
                    <Eye className="h-4 w-4 text-green-700" />
                    <span className="text-sm font-medium text-green-900">{source}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Server Location */}
          {result.networkInfo?.location && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Primary Server Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-2 bg-slate-50 rounded">
                    <span className="text-slate-600 font-medium">Country:</span>
                    <span className="text-slate-900 font-semibold">{result.networkInfo.location.country}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded">
                    <span className="text-slate-600 font-medium">City:</span>
                    <span className="text-slate-900 font-semibold">{result.networkInfo.location.city}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded">
                    <span className="text-slate-600 font-medium">ISP:</span>
                    <span className="text-slate-900 font-semibold">{result.networkInfo.location.isp}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded">
                    <span className="text-slate-600 font-medium">Organization:</span>
                    <span className="text-slate-900 font-semibold">{result.networkInfo.location.organization}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded">
                  <span className="text-sm font-medium text-orange-800">SSL Enabled</span>
                  <span className="text-sm font-bold text-orange-900">
                    {subdomainAnalysis.subdomains.filter(s => s.ssl).length}/{subdomainAnalysis.activeSubdomains}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded">
                  <span className="text-sm font-medium text-red-800">Exposed Services</span>
                  <span className="text-sm font-bold text-red-900">
                    {subdomainAnalysis.subdomains.filter(s => s.ports && s.ports.length > 2).length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded">
                  <span className="text-sm font-medium text-purple-800">Risk Level</span>
                  <Badge variant={result.aiSummary.riskLevel === 'low' ? 'secondary' : 'destructive'}>
                    {result.aiSummary.riskLevel.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Summary */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <div className="ml-2">
          <h4 className="font-semibold">AI Analysis Summary</h4>
          <AlertDescription className="mt-2">
            <div className="space-y-2">
              <div>
                <strong>Attack Surface:</strong> {subdomainAnalysis.activeSubdomains} active subdomains discovered, 
                expanding the potential attack surface for {subdomainAnalysis.domain}.
              </div>
              {result.aiSummary.keyFindings.length > 0 && (
                <div>
                  <strong>Key Findings:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {result.aiSummary.keyFindings.map((finding, index) => (
                      <li key={index} className="text-sm">{finding}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <strong>Recommendation:</strong> Review all active subdomains for security misconfigurations, 
                outdated software, and unnecessary exposed services.
              </div>
            </div>
          </AlertDescription>
        </div>
      </Alert>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Subdomain enumeration completed at {new Date(result.timestamp).toLocaleString()}</p>
        <p className="mt-1">Powered by DeepRecon AI OSINT Platform</p>
      </div>
    </div>
  );
};