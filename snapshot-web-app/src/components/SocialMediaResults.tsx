import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  ExternalLink, 
  Shield, 
  Users, 
  Eye, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Globe,
  Hash,
  MessageSquare,
  Heart,
  Star,
  TrendingUp,
  MapPin,
  Calendar,
  User
} from "lucide-react";
import { OSINTAnalysisResult } from "@/types/osint";

interface SocialMediaResultsProps {
  result: OSINTAnalysisResult;
}

// Helper function to generate platform URLs
const generatePlatformUrl = (platform: string, username: string): string | null => {
  const platformUrls: Record<string, string> = {
    'Twitter': `https://twitter.com/${username}`,
    'Instagram': `https://instagram.com/${username}`,
    'GitHub': `https://github.com/${username}`,
    'LinkedIn': `https://linkedin.com/in/${username}`,
    'Reddit': `https://reddit.com/user/${username}`,
    'YouTube': `https://youtube.com/@${username}`,
    'TikTok': `https://tiktok.com/@${username}`,
    'Facebook': `https://facebook.com/${username}`,
    'Discord': `https://discord.com/users/${username}`,
    'Twitch': `https://twitch.tv/${username}`,
    'Medium': `https://medium.com/@${username}`,
    'Pinterest': `https://pinterest.com/${username}`,
    'Snapchat': `https://snapchat.com/add/${username}`,
    'Telegram': `https://t.me/${username}`,
    'WhatsApp': `https://wa.me/${username}`
  };
  
  return platformUrls[platform] || null;
};

export const SocialMediaResults = ({ result }: SocialMediaResultsProps) => {
  const { socialIntelligence } = result;
  const { toast } = useToast();

  if (!socialIntelligence) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">No social media intelligence available.</p>
        </CardContent>
      </Card>
    );
  }

  const { platforms, summary, reputation, riskAssessment } = socialIntelligence;

  const getRiskColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'social media': return Users;
      case 'professional': return User;
      case 'development': return Hash;
      case 'gaming': return MessageSquare;
      case 'creative': return Heart;
      case 'messaging': return MessageSquare;
      default: return Globe;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'social media': return 'bg-blue-100 text-blue-800';
      case 'professional': return 'bg-green-100 text-green-800';
      case 'development': return 'bg-purple-100 text-purple-800';
      case 'gaming': return 'bg-orange-100 text-orange-800';
      case 'creative': return 'bg-pink-100 text-pink-800';
      case 'messaging': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      {summary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Social Media Intelligence Summary
            </CardTitle>
            <CardDescription>
              Comprehensive analysis powered by Sherlock methodology
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{summary.totalPlatforms}</div>
                <div className="text-sm text-muted-foreground">Platforms Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{summary.verifiedAccounts}</div>
                <div className="text-sm text-muted-foreground">Verified Accounts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{summary.categoriesFound.length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{summary.averageConfidence}%</div>
                <div className="text-sm text-muted-foreground">Avg Confidence</div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Search Time: {(summary.searchTime / 1000).toFixed(1)}s
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {summary.totalChecked} Sites Checked
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risk Assessment */}
      {riskAssessment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Eye className="h-4 w-4" />
                  <span className="font-semibold">Exposure Level</span>
                </div>
                <Badge className={getRiskColor(riskAssessment.exposureLevel)}>
                  {riskAssessment.exposureLevel}
                </Badge>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="h-4 w-4" />
                  <span className="font-semibold">Privacy Score</span>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{riskAssessment.privacyScore}/100</div>
                  <Progress value={riskAssessment.privacyScore} className="h-2" />
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {riskAssessment.sensitiveDataExposed ? (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  <span className="font-semibold">Sensitive Data</span>
                </div>
                <Badge variant={riskAssessment.sensitiveDataExposed ? "destructive" : "secondary"}>
                  {riskAssessment.sensitiveDataExposed ? "Exposed" : "Protected"}
                </Badge>
              </div>
            </div>

            {riskAssessment.recommendations && riskAssessment.recommendations.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Privacy Recommendations
                </h4>
                <ul className="space-y-1">
                  {riskAssessment.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Badge variant="outline" className="mt-0.5 text-xs">{index + 1}</Badge>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Platform Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Platform Analysis Results
            <Badge variant="secondary">{platforms.length} Found</Badge>
          </CardTitle>
          <CardDescription>
            Detailed analysis of discovered social media profiles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platforms.map((platform, index) => {
              const CategoryIcon = getCategoryIcon(platform.category || '');
              
              return (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <CategoryIcon className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            {platform.platform}
                            {platform.verified && (
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">@{platform.username}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {platform.category && (
                          <Badge className={getCategoryColor(platform.category)}>
                            {platform.category}
                          </Badge>
                        )}
                        {platform.confidence && (
                          <Badge variant="outline">
                            {platform.confidence}% confidence
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {platform.profileData && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Profile Information</h4>
                          {platform.profileData.name && (
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-3 w-3" />
                              {platform.profileData.name}
                            </div>
                          )}
                          {platform.profileData.location && (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-3 w-3" />
                              {platform.profileData.location}
                            </div>
                          )}
                          {platform.profileData.joinDate && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-3 w-3" />
                              Joined: {platform.profileData.joinDate}
                            </div>
                          )}
                          {platform.profileData.bio && (
                            <div className="text-sm text-muted-foreground italic">
                              "{platform.profileData.bio}"
                            </div>
                          )}
                        </div>
                      )}

                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Activity Metrics</h4>
                        {platform.followers !== undefined && (
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-3 w-3" />
                            {platform.followers.toLocaleString()} followers
                          </div>
                        )}
                        {platform.posts !== undefined && (
                          <div className="flex items-center gap-2 text-sm">
                            <MessageSquare className="h-3 w-3" />
                            {platform.posts.toLocaleString()} posts
                          </div>
                        )}
                        {platform.lastActivity && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-3 w-3" />
                            Last active: {platform.lastActivity}
                          </div>
                        )}
                        {platform.metadata?.responseTime && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <TrendingUp className="h-3 w-3" />
                            Response: {platform.metadata.responseTime}ms
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          try {
                            let urlToOpen = platform.url;
                            console.log('Platform data:', { 
                              platform: platform.platform, 
                              username: platform.username, 
                              originalUrl: platform.url 
                            });
                            
                            if (!urlToOpen || !urlToOpen.startsWith('http')) {
                              console.warn('Invalid URL, generating fallback:', platform.url);
                              urlToOpen = generatePlatformUrl(platform.platform, platform.username);
                              console.log('Generated fallback URL:', urlToOpen);
                            }
                            
                            if (urlToOpen) {
                              console.log('Opening URL:', urlToOpen);
                              window.open(urlToOpen, '_blank', 'noopener,noreferrer');
                              toast({
                                title: "Profile Opened",
                                description: `Opening ${platform.platform} profile for @${platform.username}`,
                              });
                            } else {
                              console.error('No valid URL could be generated');
                              toast({
                                title: "Error",
                                description: `Unable to open ${platform.platform} profile. URL not available.`,
                                variant: "destructive",
                              });
                            }
                          } catch (error) {
                            console.error('Error opening profile:', error);
                            toast({
                              title: "Error",
                              description: "Failed to open profile. Please try the direct link.",
                              variant: "destructive",
                            });
                          }
                        }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View Profile
                      </button>
                      
                      <button
                        onClick={() => {
                          const url = platform.url || generatePlatformUrl(platform.platform, platform.username);
                          if (url) {
                            navigator.clipboard.writeText(url).then(() => {
                              toast({
                                title: "Link Copied",
                                description: `${platform.platform} profile link copied to clipboard`,
                              });
                            }).catch(() => {
                              // Fallback: try to open the link
                              window.open(url, '_blank', 'noopener,noreferrer');
                              toast({
                                title: "Link Opened",
                                description: `Unable to copy, opened ${platform.platform} profile instead`,
                              });
                            });
                          }
                        }}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs hover:bg-secondary/80 transition-colors cursor-pointer"
                        title={`Copy link: ${platform.url || generatePlatformUrl(platform.platform, platform.username)}`}
                      >
                        <Globe className="h-3 w-3" />
                        Copy Link
                      </button>
                      
                      {platform.verified && (
                        <Badge className="bg-blue-100 text-blue-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {platforms.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No social media platforms found for this username.</p>
                <p className="text-sm">Try a different username or check the spelling.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Digital Footprint */}
      {reputation?.digitalFootprint && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Digital Footprint Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">
                  {reputation.digitalFootprint.totalAccounts}
                </div>
                <div className="text-xs text-muted-foreground">Total Accounts</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">
                  {reputation.digitalFootprint.publicProfiles}
                </div>
                <div className="text-xs text-muted-foreground">Public Profiles</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">
                  {reputation.digitalFootprint.professionalAccounts}
                </div>
                <div className="text-xs text-muted-foreground">Professional</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-600">
                  {reputation.digitalFootprint.socialAccounts}
                </div>
                <div className="text-xs text-muted-foreground">Social Media</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-pink-600">
                  {reputation.digitalFootprint.creativePlatforms}
                </div>
                <div className="text-xs text-muted-foreground">Creative</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reputation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Reputation Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{reputation.score}/100</div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
              <Progress value={reputation.score} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{reputation.positiveReviews}</div>
              <div className="text-sm text-muted-foreground">Positive Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{reputation.negativeReviews}</div>
              <div className="text-sm text-muted-foreground">Negative Reviews</div>
            </div>
          </div>

          {reputation.sources && reputation.sources.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Data Sources</h4>
              <div className="flex flex-wrap gap-2">
                {reputation.sources.map((source, index) => (
                  <Badge key={index} variant="outline">
                    {source}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};