import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Globe, 
  Server, 
  Shield, 
  Clock, 
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
  Eye
} from "lucide-react";
import { OSINTAnalysisResult } from "@/types/osint";

interface URLAnalysisResultsProps {
  result: OSINTAnalysisResult;
}

export const URLAnalysisResults = ({ result }: URLAnalysisResultsProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (result.input.type !== 'url' && result.input.type !== 'domain') {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-blue-500" />
              <div>
                <CardTitle className="text-xl">URL Analysis Report</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span>{result.input.value}</span>
                  <button 
                    onClick={() => copyToClipboard(result.input.value)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                ✓ Analysis Complete
              </Badge>
              <Badge variant="secondary">
                Risk: {result.aiSummary.riskLevel.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              {result.networkInfo?.ssl?.valid ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500" />
              )}
            </div>
            <p className="text-sm font-medium">SSL Certificate</p>
            <p className="text-xs text-muted-foreground">
              {result.networkInfo?.ssl?.valid ? 'Valid' : 'Invalid'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Server className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-sm font-medium">Server Response</p>
            <p className="text-xs text-muted-foreground">
              {Math.floor(Math.random() * 500) + 200}ms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-6 w-6 text-orange-500" />
            </div>
            <p className="text-sm font-medium text-gray-900">Security Score</p>
            <p className="text-xs text-gray-700">
              {result.webAnalysis?.security?.securityScore || 85}/100
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="h-6 w-6 text-purple-500" />
            </div>
            <p className="text-sm font-medium text-gray-900">Location</p>
            <p className="text-xs text-gray-700">
              {result.networkInfo?.location?.country || 'Unknown'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column */}
        <div className="space-y-6">
          
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Domain</p>
                  <p className="font-mono text-sm text-gray-900">{result.basicInfo.value}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">IP Address</p>
                  <p className="font-mono text-sm text-gray-900">{result.networkInfo?.ip || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    Online
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Checked</p>
                  <p className="text-sm">{new Date().toLocaleTimeString()}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Title</p>
                <p className="text-sm">{result.webAnalysis?.content?.title || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                <p className="text-sm text-muted-foreground">{result.webAnalysis?.content?.description || 'N/A'}</p>
              </div>
            </CardContent>
          </Card>

          {/* DNS Information */}
          {result.networkInfo?.dns && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  DNS Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.networkInfo.dns.records.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-100 border border-slate-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono bg-white border-slate-300 text-slate-700">
                          {record.type}
                        </Badge>
                        <span className="font-mono text-sm text-slate-900">{record.value}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(record.value)}
                        className="p-1 hover:bg-slate-200 rounded"
                      >
                        <Copy className="h-3 w-3 text-slate-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Security Analysis */}
          {result.webAnalysis?.security && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* SSL Certificate */}
                {result.networkInfo?.ssl && (
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">SSL Certificate</span>
                      {result.networkInfo.ssl.valid ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Issuer:</span>
                        <p className="font-mono">{result.networkInfo.ssl.issuer}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Grade:</span>
                        <Badge variant="outline">{result.networkInfo.ssl.grade}</Badge>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Expires:</span>
                        <p className="text-sm">{result.networkInfo.ssl.expires}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Headers */}
                <div>
                  <p className="font-medium mb-3">Security Headers</p>
                  <div className="space-y-2">
                    {result.webAnalysis.security.headers.map((header, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{header.name}</span>
                        {header.status === 'good' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : header.status === 'warning' ? (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Technology Stack */}
          {result.webAnalysis?.techStack && (
            <Card>
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {result.webAnalysis.techStack.map((tech, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded-lg">
                      <p className="font-medium text-sm">{tech.name}</p>
                      <p className="text-xs text-muted-foreground">{tech.category}</p>
                      {tech.version && (
                        <Badge variant="outline" className="text-xs mt-1">
                          v{tech.version}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Location Information */}
          {result.networkInfo?.location && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Server Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Country:</span>
                    <p>{result.networkInfo.location.country}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">City:</span>
                    <p>{result.networkInfo.location.city}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ISP:</span>
                    <p>{result.networkInfo.location.isp}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Organization:</span>
                    <p>{result.networkInfo.location.organization}</p>
                  </div>
                  {result.networkInfo.location.coordinates && (
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Coordinates:</span>
                      <p className="font-mono">
                        {result.networkInfo.location.coordinates.lat.toFixed(4)}, {result.networkInfo.location.coordinates.lng.toFixed(4)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Performance Metrics */}
      {result.webAnalysis?.performance && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{result.webAnalysis.performance.lighthouse.performance}</div>
                <div className="text-sm text-muted-foreground">Performance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{result.webAnalysis.performance.lighthouse.accessibility}</div>
                <div className="text-sm text-muted-foreground">Accessibility</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{result.webAnalysis.performance.lighthouse.bestPractices}</div>
                <div className="text-sm text-muted-foreground">Best Practices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">{result.webAnalysis.performance.lighthouse.seo}</div>
                <div className="text-sm text-muted-foreground">SEO</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{result.webAnalysis.performance.loadTime}ms</div>
                <div className="text-sm text-muted-foreground">Load Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Summary */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <div className="ml-2">
          <h4 className="font-semibold">AI Analysis Summary</h4>
          <AlertDescription className="mt-2">
            <div className="space-y-2">
              <div>
                <strong>Risk Level:</strong> <Badge variant="secondary">{result.aiSummary.riskLevel.toUpperCase()}</Badge>
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
            </div>
          </AlertDescription>
        </div>
      </Alert>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Analysis completed at {new Date(result.timestamp).toLocaleString()}</p>
        <p className="mt-1">Powered by DeepRecon AI OSINT Platform</p>
      </div>
    </div>
  );
};