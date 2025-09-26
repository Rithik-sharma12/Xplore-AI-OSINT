import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2, Shield, Globe, User, Mail, Phone, Wifi, Hash, Network } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { OSINTInput, OSINTInputType } from "@/types/osint";

interface OSINTAnalyzerProps {
  onAnalyze: (input: OSINTInput) => void;
  isLoading: boolean;
}

const INPUT_TYPES = [
  { value: 'url', label: 'URL/Website', icon: Globe, description: 'Analyze websites and URLs', examples: ['https://example.com', 'google.com'] },
  { value: 'domain', label: 'Domain', icon: Globe, description: 'Domain name investigation', examples: ['example.com', 'github.com'] },
  { value: 'subdomain', label: 'Subdomain Enumeration', icon: Network, description: 'Discover subdomains for a domain', examples: ['example.com', 'google.com'] },
  { value: 'ip', label: 'IP Address', icon: Shield, description: 'IP address reconnaissance', examples: ['8.8.8.8', '192.168.1.1'] },
  { value: 'email', label: 'Email', icon: Mail, description: 'Email address investigation', examples: ['user@example.com', 'admin@domain.org'] },
  { value: 'username', label: 'Username', icon: User, description: 'Social media username lookup', examples: ['johndoe', 'tech_user'] },
  { value: 'phone', label: 'Phone Number', icon: Phone, description: 'Phone number investigation', examples: ['+1-555-123-4567', '(555) 123-4567'] },
  { value: 'mac', label: 'MAC Address', icon: Wifi, description: 'MAC address lookup', examples: ['00:1B:44:11:3A:B7', 'AA-BB-CC-DD-EE-FF'] },
  { value: 'hash', label: 'Hash', icon: Hash, description: 'File hash analysis', examples: ['5d41402abc4b2a76b9719d911017c592', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'] }
] as const;

export const OSINTAnalyzer = ({ onAnalyze, isLoading }: OSINTAnalyzerProps) => {
  const [inputType, setInputType] = useState<OSINTInputType>('url');
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const selectedType = INPUT_TYPES.find(type => type.value === inputType);
  const IconComponent = selectedType?.icon || Globe;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      toast({
        title: "Error",
        description: `Please enter a ${selectedType?.label.toLowerCase()} to analyze`,
        variant: "destructive",
      });
      return;
    }
    
    const input: OSINTInput = {
      type: inputType,
      value: inputValue.trim()
    };
    
    onAnalyze(input);
  };

  const handleExampleClick = (example: string) => {
    setInputValue(example);
  };

  const handleTypeChange = (value: OSINTInputType) => {
    setInputType(value);
    setInputValue(""); // Clear input when type changes
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">AI-Powered OSINT Analysis</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Advanced Open Source Intelligence gathering with AI-driven insights. 
          Analyze URLs, IPs, emails, usernames, and more for comprehensive digital footprint investigation.
        </p>
      </div>

      {/* Input Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconComponent className="h-5 w-5" />
            Select Analysis Type
          </CardTitle>
          <CardDescription>
            Choose the type of data you want to investigate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {INPUT_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <Card 
                  key={type.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    inputType === type.value ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleTypeChange(type.value)}
                >
                  <CardContent className="p-4 text-center">
                    <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold text-sm">{type.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Selected Type Details */}
          {selectedType && (
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <IconComponent className="h-4 w-4" />
                <span className="font-medium">{selectedType.label} Analysis</span>
                <Badge variant="secondary">Selected</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{selectedType.description}</p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Examples:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedType.examples.map((example, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => handleExampleClick(example)}
                    >
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={`Enter ${selectedType?.label.toLowerCase()}...`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" disabled={isLoading} size="default">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Features Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Threat Intelligence</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Real-time threat assessment with reputation scoring and malware detection
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold">Network Analysis</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Comprehensive network intelligence including geolocation and infrastructure mapping
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold">Social Intelligence</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Social media footprint analysis and digital identity investigation
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};