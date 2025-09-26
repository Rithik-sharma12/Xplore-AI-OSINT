export type OSINTInputType = 'url' | 'username' | 'ip' | 'mac' | 'email' | 'phone' | 'domain' | 'subdomain' | 'hash' | 'social_media';

export interface OSINTInput {
  type: OSINTInputType;
  value: string;
}

export interface OSINTAnalysisResult {
  input: OSINTInput;
  timestamp: string;
  confidence: number;
  
  // Basic Information
  basicInfo: {
    type: string;
    value: string;
    validation: {
      isValid: boolean;
      format: string;
      suggestions?: string[];
    };
  };

  // Network & Infrastructure
  networkInfo?: {
    ip?: string;
    location?: {
      country: string;
      region: string;
      city: string;
      coordinates: { lat: number; lng: number };
      isp: string;
      organization: string;
    };
    dns?: {
      records: Array<{ type: string; value: string; ttl?: number }>;
      nameservers: string[];
      mx: string[];
    };
    ports?: Array<{ port: number; service: string; status: 'open' | 'closed' | 'filtered' }>;
    ssl?: {
      valid: boolean;
      issuer: string;
      expires: string;
      grade: string;
      vulnerabilities: string[];
    };
  };

  // Web Analysis (for URLs/domains)
  webAnalysis?: {
    techStack: Array<{ name: string; version?: string; category: string; confidence: number }>;
    security: {
      headers: Array<{ name: string; value: string; status: 'good' | 'warning' | 'missing' }>;
      vulnerabilities: Array<{ type: string; severity: 'low' | 'medium' | 'high' | 'critical'; description: string }>;
      securityScore: number;
    };
    performance: {
      loadTime: number;
      size: string;
      lighthouse: {
        performance: number;
        accessibility: number;
        bestPractices: number;
        seo: number;
      };
    };
    content: {
      title: string;
      description: string;
      keywords: string[];
      languages: string[];
      socialMedia: Array<{ platform: string; url: string; verified: boolean }>;
    };
  };

  // Web Intelligence (enhanced domain analysis with WHOIS)
  webIntelligence?: {
    whoisData?: {
      registrar: string;
      creationDate: string;
      expirationDate: string;
      updatedDate: string;
      nameServers: string[];
      registrantOrg: string;
      adminEmail: string;
      status: string[];
    };
  };

  // Social Media & People (for usernames)
  socialIntelligence?: {
    platforms: Array<{
      platform: string;
      username: string;
      url: string;
      verified: boolean;
      found?: boolean;
      responseTime?: number;
      followers?: number;
      posts?: number;
      lastActivity?: string;
      profileData?: {
        name?: string;
        bio?: string;
        location?: string;
        website?: string;
        joinDate?: string;
        status?: string;
      };
    }>;
    connections: Array<{
      platform: string;
      mutualConnections: number;
      commonInterests: string[];
    }>;
    reputation: {
      score: number;
      sources: string[];
      positiveReviews: number;
      negativeReviews: number;
    };
    sherlockAnalysis?: {
      totalSites: number;
      foundProfiles: number;
      timestamp: string;
    };
  };

  // Email Intelligence
  emailIntelligence?: {
    deliverability: {
      valid: boolean;
      disposable: boolean;
      role: boolean;
      freeProvider: boolean;
    };
    breaches: Array<{
      name: string;
      date: string;
      dataTypes: string[];
      verified: boolean;
    }>;
    provider: {
      name: string;
      type: 'personal' | 'business' | 'educational';
      securityFeatures: string[];
    };
    linkedAccounts: Array<{
      service: string;
      username?: string;
      lastSeen?: string;
    }>;
  };

  // Phone Intelligence
  phoneIntelligence?: {
    carrier: string;
    type: 'mobile' | 'landline' | 'voip';
    location: {
      country: string;
      region: string;
      timezone: string;
    };
    spam: {
      score: number;
      reports: number;
      categories: string[];
    };
    linkedAccounts: Array<{
      service: string;
      verified: boolean;
    }>;
    inspectorAnalysis?: {
      timestamp: string;
      socialMediaFound: number;
      reputationData: any;
    };
  };

  // Threat Intelligence
  threatIntelligence: {
    malicious: boolean;
    threatScore: number;
    categories: string[];
    sources: Array<{
      name: string;
      verdict: 'clean' | 'suspicious' | 'malicious';
      lastSeen?: string;
      details?: string;
    }>;
    reputation: {
      score: number;
      history: Array<{
        date: string;
        event: string;
        severity: 'info' | 'warning' | 'danger';
      }>;
    };
  };

  // AI Analysis Summary
  aiSummary: {
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    keyFindings: string[];
    recommendations: string[];
    relatedEntities: Array<{
      type: OSINTInputType;
      value: string;
      relationship: string;
      confidence: number;
    }>;
    investigationPaths: Array<{
      title: string;
      description: string;
      steps: string[];
      difficulty: 'easy' | 'medium' | 'hard';
    }>;
  };

  // Subdomain Analysis (for subdomain enumeration)
  subdomainAnalysis?: {
    domain: string;
    totalFound: number;
    activeSubdomains: number;
    subdomains: Array<{
      subdomain: string;
      ip: string;
      status: 'active' | 'inactive';
      ports?: number[];
      technology?: string;
      ssl?: boolean;
      lastSeen?: string;
    }>;
    techniques: string[];
    sources: string[];
  };
}

export interface OSINTTool {
  name: string;
  category: string;
  supportedTypes: OSINTInputType[];
  apiEndpoint?: string;
  rateLimit?: number;
  requiresAuth?: boolean;
}

export const OSINT_TOOLS: OSINTTool[] = [
  {
    name: "VirusTotal",
    category: "Threat Intelligence",
    supportedTypes: ['url', 'ip', 'domain', 'hash'],
    requiresAuth: true
  },
  {
    name: "Shodan",
    category: "Network Intelligence",
    supportedTypes: ['ip', 'domain'],
    requiresAuth: true
  },
  {
    name: "WhoisXML API",
    category: "Domain Intelligence",
    supportedTypes: ['domain', 'ip'],
    requiresAuth: true
  },
  {
    name: "HaveIBeenPwned",
    category: "Breach Intelligence",
    supportedTypes: ['email'],
    requiresAuth: false
  },
  {
    name: "Sherlock",
    category: "Social Media Intelligence",
    supportedTypes: ['username'],
    requiresAuth: false
  },
  {
    name: "SecurityTrails",
    category: "DNS Intelligence",
    supportedTypes: ['domain', 'ip'],
    requiresAuth: true
  }
];