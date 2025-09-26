import { useState } from "react";
import { WebCheckLogo } from "@/components/WebCheckLogo";
import { UrlAnalyzer } from "@/components/UrlAnalyzer";
import { AnalysisResults } from "@/components/AnalysisResults";
import { generateMockAnalysis } from "@/utils/mockData";

const Index = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setAnalysisData(null);
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockData = generateMockAnalysis(url);
    setAnalysisData(mockData);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-12">
        {/* Header */}
        <header className="flex justify-center pt-8">
          <WebCheckLogo />
        </header>

        {/* Main Content */}
        <main className="space-y-16">
          {!analysisData && !isLoading && (
            <div className="flex justify-center">
              <UrlAnalyzer onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center space-y-6">
              <div className="w-full max-w-2xl">
                <UrlAnalyzer onAnalyze={handleAnalyze} isLoading={isLoading} />
              </div>
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyber-bg-secondary border border-cyber-green/30 rounded-lg">
                  <div className="w-4 h-4 border-2 border-cyber-green border-t-transparent rounded-full animate-spin" />
                  <span className="text-cyber-green font-mono">Analyzing website security...</span>
                </div>
                <p className="text-cyber-text-muted font-mono text-sm">
                  Scanning for vulnerabilities, checking SSL, analyzing headers...
                </p>
              </div>
            </div>
          )}

          {analysisData && (
            <div className="space-y-8">
              <div className="flex justify-center">
                <UrlAnalyzer onAnalyze={handleAnalyze} isLoading={isLoading} />
              </div>
              <AnalysisResults data={analysisData} />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-8">
          <p className="text-cyber-text-muted font-mono text-sm">
            Made with ❤️ for cybersecurity enthusiasts
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
