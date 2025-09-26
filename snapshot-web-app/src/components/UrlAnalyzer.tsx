import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UrlAnalyzerProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export const UrlAnalyzer = ({ onAnalyze, isLoading }: UrlAnalyzerProps) => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const exampleUrls = [
    "duck.com",
    "github.com", 
    "google.com",
    "x.com",
    "bbc.co.uk",
    "wikipedia.org",
    "openai.com"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to analyze",
        variant: "destructive",
      });
      return;
    }
    
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    
    onAnalyze(formattedUrl);
  };

  const handleExampleClick = (exampleUrl: string) => {
    setUrl(exampleUrl);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-mono font-bold text-cyber-text-primary cyber-glow">
          We give you <span className="text-cyber-green">X-Ray</span><br />
          Vision for your Website
        </h1>
        <p className="text-xl text-cyber-text-secondary">
          In just 20 seconds, you can see{" "}
          <span className="text-cyber-green-bright italic">what attackers already know</span>
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-cyber-text-secondary font-mono">
          Enter a URL to start 👇
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="E.g. duck.com"
              className="h-14 px-6 pr-16 text-lg bg-cyber-bg-secondary border-cyber-green/30 text-cyber-text-primary placeholder:text-cyber-text-muted font-mono focus:border-cyber-green/60 focus:ring-cyber-green/30"
              disabled={isLoading}
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-green/60" />
          </div>
          
          <Button
            type="submit"
            variant="cyber-primary"
            size="xl"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze URL"
            )}
          </Button>
        </form>

        <div className="flex flex-wrap gap-2 justify-center">
          <span className="text-cyber-text-muted font-mono text-sm">E.g.</span>
          {exampleUrls.map((exampleUrl) => (
            <button
              key={exampleUrl}
              onClick={() => handleExampleClick(exampleUrl)}
              className="text-cyber-green hover:text-cyber-green-bright font-mono text-sm underline-offset-2 hover:underline transition-colors"
              disabled={isLoading}
            >
              {exampleUrl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};