import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Globe, 
  User, 
  Mail, 
  Phone, 
  Wifi, 
  Hash, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  MapPin,
  Server,
  Eye,
  TrendingUp,
  Clock,
  Users,
  ExternalLink,
  Brain,
  Target,
  Zap
} from "lucide-react";
import { OSINTAnalysisResult, OSINTInputType } from "@/types/osint";
import { URLAnalysisResults } from "./URLAnalysisResults";
import { SubdomainAnalysisResults } from "./SubdomainAnalysisResults";
import { SocialMediaResults } from "./SocialMediaResults";

interface OSINTResultsProps {
  result: OSINTAnalysisResult;
}

const getIconForInputType = (type: OSINTInputType) => {
  const icons = {
    url: Globe,
    domain: Globe,
    subdomain: ExternalLink,
    ip: Server,
    email: Mail,
    username: User,
    'social-media': Users,
    phone: Phone,
    mac: Wifi,
    hash: Hash
  };
  return icons[type] || Globe;
};

const getRiskColor = (riskLevel: string) => {
  const colors = {
    low: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    high: 'text-orange-600 bg-orange-50 border-orange-200',
    critical: 'text-red-600 bg-red-50 border-red-200'
  };
  return colors[riskLevel as keyof typeof colors] || colors.low;
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'good':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'missing':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <CheckCircle className="h-4 w-4 text-green-500" />;
  }
};

export const OSINTResults = ({ result }: OSINTResultsProps) => {
  const IconComponent = getIconForInputType(result.input.type);

  // Use specialized components for better formatting
  if (result.input.type === 'url' || result.input.type === 'domain') {
    return <URLAnalysisResults result={result} />;
  }
  
  if (result.input.type === 'subdomain') {
    return <SubdomainAnalysisResults result={result} />;
  }

  if (result.input.type === 'social-media') {
    return <SocialMediaResults result={result} />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconComponent className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-xl">Analysis Results</CardTitle>
                <CardDescription>
                  {result.input.type.toUpperCase()}: {result.input.value}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                Confidence: {result.confidence}%
              </Badge>
              <Badge className={getRiskColor(result.aiSummary.riskLevel)}>
                Risk: {result.aiSummary.riskLevel.toUpperCase()}
              </Badge>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Analysis completed on {new Date(result.timestamp).toLocaleString()}
          </div>
        </CardHeader>
      </Card>

      {/* AI Summary Alert */}
      <Alert className={`border-l-4 ${getRiskColor(result.aiSummary.riskLevel)}`}>
        <Brain className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-2">
          AI Analysis Summary
          <Badge variant="secondary">Risk: {result.aiSummary.riskLevel}</Badge>
        </AlertTitle>
        <AlertDescription className="mt-2">
          <div className="space-y-2">
            <div>
              <strong>Key Findings:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                {result.aiSummary.keyFindings.map((finding, index) => (
                  <li key={index} className="text-sm">{finding}</li>
                ))}
              </ul>
            </div>
            {result.aiSummary.recommendations.length > 0 && (
              <div>
                <strong>Recommendations:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {result.aiSummary.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm">{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </AlertDescription>
      </Alert>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
          <TabsTrigger value="investigation">Investigation</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Type:</span>
                  <Badge variant="outline">{result.basicInfo.type.toUpperCase()}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Value:</span>
                  <span className="font-mono text-sm break-all">{result.basicInfo.value}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Format:</span>
                  <span className="text-sm">{result.basicInfo.validation.format}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Valid:</span>
                  {result.basicInfo.validation.isValid ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Threat Intelligence Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Threat Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Malicious:</span>
                  {result.threatIntelligence.malicious ? (
                    <Badge variant="destructive">Yes</Badge>
                  ) : (
                    <Badge variant="secondary">No</Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Threat Score:</span>
                    <span>{result.threatIntelligence.threatScore}/100</span>
                  </div>
                  <Progress value={result.threatIntelligence.threatScore} className="h-2" />
                </div>
                <div className="space-y-2">
                  <span className="font-medium">Sources Checked:</span>
                  <div className="space-y-1">
                    {result.threatIntelligence.sources.map((source, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{source.name}</span>
                        <Badge 
                          variant={source.verdict === 'clean' ? 'secondary' : 
                                 source.verdict === 'suspicious' ? 'outline' : 'destructive'}
                        >
                          {source.verdict}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Network Tab */}
        <TabsContent value="network" className="space-y-4">
          {result.networkInfo && (
            <div className="grid md:grid-cols-2 gap-4">
              {/* Location Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Geographic Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-sm">Country:</span>
                      <p className="text-sm">{result.networkInfo.location?.country}</p>
                    </div>
                    <div>
                      <span className="font-medium text-sm">Region:</span>
                      <p className="text-sm">{result.networkInfo.location?.region}</p>
                    </div>
                    <div>
                      <span className="font-medium text-sm">City:</span>
                      <p className="text-sm">{result.networkInfo.location?.city}</p>
                    </div>
                    <div>
                      <span className="font-medium text-sm">ISP:</span>
                      <p className="text-sm">{result.networkInfo.location?.isp}</p>
                    </div>
                  </div>
                  {result.networkInfo.location?.coordinates && (
                    <div>
                      <span className="font-medium text-sm">Coordinates:</span>
                      <p className="text-sm font-mono">
                        {result.networkInfo.location.coordinates.lat.toFixed(4)}, {result.networkInfo.location.coordinates.lng.toFixed(4)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* DNS Information */}
              {result.networkInfo.dns && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5" />
                      DNS Records
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.networkInfo.dns.records.map((record, index) => (
                        <div key={index} className="flex justify-between items-center text-sm border-b pb-1">
                          <Badge variant="outline">{record.type}</Badge>
                          <span className="font-mono text-xs break-all">{record.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Ports Information */}
              {result.networkInfo.ports && (
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Open Ports
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {result.networkInfo.ports.map((port, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{port.port}</Badge>
                            <span className="text-sm">{port.service}</span>
                          </div>
                          <Badge 
                            variant={port.status === 'open' ? 'default' : 
                                   port.status === 'closed' ? 'secondary' : 'outline'}
                          >
                            {port.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          {result.webAnalysis?.security && (
            <div className="space-y-4">
              {/* Security Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Overall Security Score</span>
                      <span className="font-bold">{result.webAnalysis.security.securityScore}/100</span>
                    </div>
                    <Progress value={result.webAnalysis.security.securityScore} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Security Headers */}
              <Card>
                <CardHeader>
                  <CardTitle>Security Headers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.webAnalysis.security.headers.map((header, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(header.status)}
                          <span className="font-medium text-sm">{header.name}</span>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={header.status === 'good' ? 'default' : 
                                   header.status === 'warning' ? 'outline' : 'secondary'}
                          >
                            {header.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Vulnerabilities */}
              {result.webAnalysis.security.vulnerabilities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Security Vulnerabilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.webAnalysis.security.vulnerabilities.map((vuln, index) => (
                        <Alert key={index}>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle className="flex items-center gap-2">
                            {vuln.type}
                            <Badge 
                              variant={vuln.severity === 'critical' ? 'destructive' : 
                                     vuln.severity === 'high' ? 'outline' : 'secondary'}
                            >
                              {vuln.severity}
                            </Badge>
                          </AlertTitle>
                          <AlertDescription>{vuln.description}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* SSL Information */}
          {result.networkInfo?.ssl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  SSL Certificate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-sm">Valid:</span>
                    <div className="flex items-center gap-2">
                      {result.networkInfo.ssl.valid ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-sm">{result.networkInfo.ssl.valid ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Grade:</span>
                    <Badge variant="outline">{result.networkInfo.ssl.grade}</Badge>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Issuer:</span>
                    <p className="text-sm">{result.networkInfo.ssl.issuer}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Expires:</span>
                    <p className="text-sm">{result.networkInfo.ssl.expires}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Social Tab */}
        <TabsContent value="social" className="space-y-4">
          {result.socialIntelligence && (
            <div className="space-y-4">
              {/* Social Platforms */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Social Media Presence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.socialIntelligence.platforms.map((platform, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{platform.platform}</Badge>
                            {platform.verified && (
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <a 
                            href={platform.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View Profile
                          </a>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          {platform.followers !== undefined && (
                            <div>
                              <span className="font-medium">Followers:</span>
                              <p>{platform.followers.toLocaleString()}</p>
                            </div>
                          )}
                          {platform.posts !== undefined && (
                            <div>
                              <span className="font-medium">Posts:</span>
                              <p>{platform.posts.toLocaleString()}</p>
                            </div>
                          )}
                          {platform.lastActivity && (
                            <div>
                              <span className="font-medium">Last Active:</span>
                              <p>{platform.lastActivity}</p>
                            </div>
                          )}
                          {platform.profileData?.joinDate && (
                            <div>
                              <span className="font-medium">Joined:</span>
                              <p>{platform.profileData.joinDate}</p>
                            </div>
                          )}
                        </div>

                        {platform.profileData?.bio && (
                          <div className="mt-3 pt-3 border-t">
                            <span className="font-medium text-sm">Bio:</span>
                            <p className="text-sm text-muted-foreground mt-1">{platform.profileData.bio}</p>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reputation Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Reputation Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Reputation Score</span>
                        <span className="font-bold">{result.socialIntelligence.reputation.score}/100</span>
                      </div>
                      <Progress value={result.socialIntelligence.reputation.score} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium text-sm">Positive Reviews:</span>
                        <p className="text-2xl font-bold text-green-600">{result.socialIntelligence.reputation.positiveReviews}</p>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Negative Reviews:</span>
                        <p className="text-2xl font-bold text-red-600">{result.socialIntelligence.reputation.negativeReviews}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Email Intelligence */}
          {result.emailIntelligence && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Valid:</span>
                      {result.emailIntelligence.deliverability.valid ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Disposable:</span>
                      {result.emailIntelligence.deliverability.disposable ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Role Account:</span>
                      {result.emailIntelligence.deliverability.role ? (
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Free Provider:</span>
                      {result.emailIntelligence.deliverability.freeProvider ? (
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </div>

                  {result.emailIntelligence.breaches.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        Data Breaches Found
                      </h4>
                      <div className="space-y-2">
                        {result.emailIntelligence.breaches.map((breach, index) => (
                          <Alert key={index}>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>{breach.name}</AlertTitle>
                            <AlertDescription>
                              Date: {breach.date} | Data: {breach.dataTypes.join(', ')}
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Intelligence Tab */}
        <TabsContent value="intelligence" className="space-y-4">
          <div className="grid gap-4">
            {/* Threat Intelligence Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Detailed Threat Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded">
                      <div className="text-2xl font-bold text-red-500">{result.threatIntelligence.threatScore}</div>
                      <div className="text-sm text-muted-foreground">Threat Score</div>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <div className="text-2xl font-bold text-blue-500">{result.threatIntelligence.sources.length}</div>
                      <div className="text-sm text-muted-foreground">Sources Checked</div>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <div className="text-2xl font-bold text-green-500">{result.confidence}%</div>
                      <div className="text-sm text-muted-foreground">Confidence</div>
                    </div>
                  </div>

                  {result.threatIntelligence.categories.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Threat Categories:</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.threatIntelligence.categories.map((category, index) => (
                          <Badge key={index} variant="destructive">{category}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-2">Source Analysis:</h4>
                    <div className="space-y-2">
                      {result.threatIntelligence.sources.map((source, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <span className="font-medium">{source.name}</span>
                            {source.lastSeen && (
                              <span className="text-sm text-muted-foreground ml-2">
                                Last seen: {source.lastSeen}
                              </span>
                            )}
                          </div>
                          <Badge 
                            variant={source.verdict === 'clean' ? 'secondary' : 
                                   source.verdict === 'suspicious' ? 'outline' : 'destructive'}
                          >
                            {source.verdict}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Entities */}
            {result.aiSummary.relatedEntities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Related Entities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.aiSummary.relatedEntities.map((entity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{entity.type.toUpperCase()}</Badge>
                          <span className="font-mono text-sm">{entity.value}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{entity.relationship}</span>
                          <Badge variant="secondary">{entity.confidence}% confidence</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Investigation Tab */}
        <TabsContent value="investigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Investigation Paths
              </CardTitle>
              <CardDescription>
                AI-suggested investigation techniques and methodologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.aiSummary.investigationPaths.map((path, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{path.title}</CardTitle>
                        <Badge 
                          variant={path.difficulty === 'easy' ? 'secondary' : 
                                 path.difficulty === 'medium' ? 'outline' : 'destructive'}
                        >
                          {path.difficulty}
                        </Badge>
                      </div>
                      <CardDescription>{path.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div>
                        <h4 className="font-medium mb-2">Investigation Steps:</h4>
                        <ol className="list-decimal list-inside space-y-1">
                          {path.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-sm">{step}</li>
                          ))}
                        </ol>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tools and Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended OSINT Tools</CardTitle>
              <CardDescription>
                Tools and resources for further investigation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Network Analysis:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Shodan - Search engine for Internet-connected devices</li>
                    <li>• Censys - Internet-wide scanning and analysis</li>
                    <li>• SecurityTrails - DNS and network intelligence</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Social Intelligence:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Sherlock - Username search across platforms</li>
                    <li>• Social Searcher - Social media monitoring</li>
                    <li>• Pipl - People search engine</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Threat Intelligence:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• VirusTotal - File and URL analysis</li>
                    <li>• URLVoid - Website reputation checker</li>
                    <li>• AbuseIPDB - IP address abuse database</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Email & Phone:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• HaveIBeenPwned - Check for data breaches</li>
                    <li>• TrueCaller - Phone number lookup</li>
                    <li>• Email-Validator - Email verification</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};