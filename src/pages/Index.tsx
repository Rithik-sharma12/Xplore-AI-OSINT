import { useState } from "react";
import { WebCheckLogo } from "@/components/WebCheckLogo";
import { OSINTAnalyzer } from "@/components/OSINTAnalyzer";
import { OSINTResults } from "@/components/OSINTResults";
import { osintAnalyzer } from "@/utils/osintAnalyzer";
import { OSINTInput, OSINTAnalysisResult } from "@/types/osint";

const Index = () => {
  const [analysisData, setAnalysisData] = useState<OSINTAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (input: OSINTInput) => {
    setIsLoading(true);
    setAnalysisData(null);
    
    try {
      // Simulate API call with delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = await osintAnalyzer.analyzeInput(input);
      setAnalysisData(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      // You could add error handling here with toast notifications
    } finally {
      setIsLoading(false);
    }
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
              <OSINTAnalyzer onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center space-y-6">
              <div className="w-full max-w-4xl">
                <OSINTAnalyzer onAnalyze={handleAnalyze} isLoading={isLoading} />
              </div>
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-primary font-mono">AI Analysis in progress...</span>
                </div>
                <p className="text-muted-foreground font-mono text-sm">
                  Gathering intelligence from multiple sources and analyzing patterns...
                </p>
              </div>
            </div>
          )}

          {analysisData && (
            <div className="space-y-8">
              <div className="flex justify-center">
                <OSINTAnalyzer onAnalyze={handleAnalyze} isLoading={isLoading} />
              </div>
              <OSINTResults result={analysisData} />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-8">
          <p className="text-muted-foreground font-mono text-sm">
            Made with ❤️ for OSINT researchers and cybersecurity professionals
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
