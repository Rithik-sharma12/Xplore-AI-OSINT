import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, CheckCircle, XCircle, Clock, Users } from "lucide-react";

interface SocialMediaProfile {
  platform: string;
  username: string;
  url: string;
  verified: boolean;
  found?: boolean;
  responseTime?: number;
  profileData?: {
    name?: string;
    status?: string;
  };
}

interface SocialMediaEnumerationResultsProps {
  results: {
    platforms: SocialMediaProfile[];
    sherlockAnalysis?: {
      totalSites: number;
      foundProfiles: number;
      timestamp: string;
    };
    reputation: {
      score: number;
      sources: string[];
      positiveReviews: number;
      negativeReviews: number;
    };
  };
  username: string;
}

export const SocialMediaEnumerationResults = ({ results, username }: SocialMediaEnumerationResultsProps) => {
  const foundProfiles = results.platforms.filter(p => p.found || p.verified);
  const notFound = results.platforms.filter(p => !p.found && !p.verified);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Total Sites</p>
                <p className="text-2xl font-bold">{results.sherlockAnalysis?.totalSites || results.platforms.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Found Profiles</p>
                <p className="text-2xl font-bold text-green-600">{foundProfiles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">Not Found</p>
                <p className="text-2xl font-bold text-red-600">{notFound.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round((foundProfiles.length / results.platforms.length) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Found Profiles */}
      {foundProfiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Found Profiles ({foundProfiles.length})
            </CardTitle>
            <CardDescription>
              Social media profiles found for username "{username}"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {foundProfiles.map((profile, index) => (
                <Card key={index} className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-green-800">{profile.platform}</div>
                      <Badge variant="default" className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Found
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">@{profile.username}</p>
                    {profile.responseTime && (
                      <p className="text-xs text-gray-500 mb-2">
                        Response time: {profile.responseTime}ms
                      </p>
                    )}
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      View Profile
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Not Found Profiles */}
      {notFound.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              Not Found ({notFound.length})
            </CardTitle>
            <CardDescription>
              Platforms where no profile was found for "{username}"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {notFound.map((profile, index) => (
                <Badge key={index} variant="secondary" className="justify-center p-2">
                  {profile.platform}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Summary */}
      {results.sherlockAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle>Sherlock Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Analysis completed:</strong> {new Date(results.sherlockAnalysis.timestamp).toLocaleString()}</p>
              <p><strong>Digital footprint score:</strong> {results.reputation.score}%</p>
              <p><strong>Coverage:</strong> Searched across {results.sherlockAnalysis.totalSites} different platforms</p>
              <p><strong>Success rate:</strong> {Math.round((results.sherlockAnalysis.foundProfiles / results.sherlockAnalysis.totalSites) * 100)}%</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};