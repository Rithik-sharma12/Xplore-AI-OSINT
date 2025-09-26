import { OSINTInput, OSINTAnalysisResult, OSINTInputType } from '@/types/osint';

class OSINTAnalyzer {
  private apiKeys: Map<string, string> = new Map();
  
  constructor() {
    // Initialize with demo API keys (in production, these would be environment variables)
    this.apiKeys.set('virustotal', 'demo_vt_key');
    this.apiKeys.set('shodan', 'demo_shodan_key');
  }

  async analyzeInput(input: OSINTInput): Promise<OSINTAnalysisResult> {
    const startTime = Date.now();
    
    // Validate input
    const validation = this.validateInput(input);
    if (!validation.isValid) {
      throw new Error(`Invalid ${input.type}: ${validation.error}`);
    }

    // Initialize result structure
    const result: OSINTAnalysisResult = {
      input,
      timestamp: new Date().toISOString(),
      confidence: 0,
      basicInfo: {
        type: input.type,
        value: input.value,
        validation: {
          isValid: true,
          format: this.getFormatDescription(input.type),
          suggestions: validation.suggestions
        }
      },
      threatIntelligence: {
        malicious: false,
        threatScore: 0,
        categories: [],
        sources: [],
        reputation: {
          score: 50,
          history: []
        }
      },
      aiSummary: {
        riskLevel: 'low',
        keyFindings: [],
        recommendations: [],
        relatedEntities: [],
        investigationPaths: []
      }
    };

    // Perform analysis based on input type
    switch (input.type) {
      case 'url':
      case 'domain':
        await this.analyzeWebTarget(input, result);
        break;
      case 'subdomain':
        await this.analyzeSubdomain(input, result);
        break;
      case 'ip':
        await this.analyzeIP(input, result);
        break;
      case 'email':
        await this.analyzeEmail(input, result);
        break;
      case 'username':
        await this.analyzeUsername(input, result);
        break;
      case 'phone':
        await this.analyzePhone(input, result);
        break;
      case 'mac':
        await this.analyzeMac(input, result);
        break;
      case 'hash':
        await this.analyzeHash(input, result);
        break;
    }

    // Generate AI summary
    this.generateAISummary(result);
    
    // Calculate confidence score
    result.confidence = this.calculateConfidence(result);

    return result;
  }

  private validateInput(input: OSINTInput): { isValid: boolean; error?: string; suggestions?: string[] } {
    const { type, value } = input;
    
    switch (type) {
      case 'url':
        try {
          new URL(value.startsWith('http') ? value : `https://${value}`);
          return { isValid: true };
        } catch {
          return { 
            isValid: false, 
            error: 'Invalid URL format',
            suggestions: ['Ensure URL includes protocol (http/https)', 'Check for typos in domain name']
          };
        }
      
      case 'domain':
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
        return domainRegex.test(value) 
          ? { isValid: true }
          : { isValid: false, error: 'Invalid domain format' };
      
      case 'subdomain':
        // For subdomain enumeration, we accept domain format
        const subdomainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
        return subdomainRegex.test(value) 
          ? { isValid: true }
          : { isValid: false, error: 'Invalid domain format for subdomain enumeration' };
      
      case 'ip':
        const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
        const ipv6Regex = /^[0-9a-fA-F:]+$/;
        return ipv4Regex.test(value) || ipv6Regex.test(value)
          ? { isValid: true }
          : { isValid: false, error: 'Invalid IP address format' };
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value)
          ? { isValid: true }
          : { isValid: false, error: 'Invalid email format' };
      
      case 'phone':
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))
          ? { isValid: true }
          : { isValid: false, error: 'Invalid phone number format' };
      
      case 'mac':
        const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
        return macRegex.test(value)
          ? { isValid: true }
          : { isValid: false, error: 'Invalid MAC address format' };
      
      case 'hash':
        const hashRegex = /^[a-fA-F0-9]+$/;
        const validLengths = [32, 40, 56, 64, 96, 128]; // MD5, SHA1, SHA224, SHA256, SHA384, SHA512
        return hashRegex.test(value) && validLengths.includes(value.length)
          ? { isValid: true }
          : { isValid: false, error: 'Invalid hash format' };
      
      default:
        return { isValid: true };
    }
  }

  private getFormatDescription(type: OSINTInputType): string {
    const descriptions = {
      url: 'Web URL with protocol (http/https)',
      domain: 'Domain name (e.g., example.com)',
      subdomain: 'Domain name for subdomain enumeration (e.g., example.com)',
      ip: 'IPv4 or IPv6 address',
      email: 'Email address format',
      phone: 'Phone number with country code',
      mac: 'MAC address (XX:XX:XX:XX:XX:XX)',
      hash: 'Cryptographic hash (MD5, SHA1, SHA256, etc.)',
      username: 'Username or handle'
    };
    return descriptions[type] || 'Standard format';
  }

  private async analyzeWebTarget(input: OSINTInput, result: OSINTAnalysisResult): Promise<void> {
    const domain = input.value.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    
    // Simulate network analysis
    result.networkInfo = {
      ip: this.generateRandomIP(),
      location: {
        country: this.getRandomFromArray(['United States', 'United Kingdom', 'Germany', 'France', 'Japan']),
        region: this.getRandomFromArray(['California', 'London', 'Berlin', 'Paris', 'Tokyo']),
        city: this.getRandomFromArray(['San Francisco', 'London', 'Berlin', 'Paris', 'Tokyo']),
        coordinates: { lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180 },
        isp: this.getRandomFromArray(['Cloudflare', 'Amazon', 'Google', 'Microsoft', 'Akamai']),
        organization: this.getRandomFromArray(['Cloudflare Inc.', 'Amazon.com Inc.', 'Google LLC'])
      },
      dns: {
        records: [
          { type: 'A', value: this.generateRandomIP(), ttl: 300 },
          { type: 'AAAA', value: '2001:4860:4860::8888', ttl: 300 },
          { type: 'MX', value: `mail.${domain}`, ttl: 3600 },
          { type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all', ttl: 3600 }
        ],
        nameservers: [`ns1.${domain}`, `ns2.${domain}`],
        mx: [`mail.${domain}`, `backup.${domain}`]
      },
      ssl: {
        valid: Math.random() > 0.1,
        issuer: this.getRandomFromArray(["Let's Encrypt", "DigiCert", "GlobalSign"]),
        expires: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toDateString(),
        grade: this.getRandomFromArray(['A+', 'A', 'B', 'C']),
        vulnerabilities: Math.random() > 0.8 ? ['Weak cipher suite'] : []
      }
    };

    // Web analysis
    result.webAnalysis = {
      techStack: [
        { name: 'React', version: '18.2.0', category: 'JavaScript Framework', confidence: 0.95 },
        { name: 'Next.js', version: '13.4.0', category: 'Framework', confidence: 0.85 },
        { name: 'Cloudflare', category: 'CDN', confidence: 0.90 },
        { name: 'Google Analytics', category: 'Analytics', confidence: 0.75 }
      ],
      security: {
        headers: [
          { name: 'Content-Security-Policy', value: "default-src 'self'", status: Math.random() > 0.3 ? 'good' : 'missing' },
          { name: 'X-Frame-Options', value: 'DENY', status: Math.random() > 0.2 ? 'good' : 'missing' },
          { name: 'Strict-Transport-Security', value: 'max-age=31536000', status: Math.random() > 0.4 ? 'good' : 'warning' }
        ],
        vulnerabilities: Math.random() > 0.7 ? [
          { type: 'Outdated JavaScript Library', severity: 'medium', description: 'jQuery version has known vulnerabilities' }
        ] : [],
        securityScore: Math.floor(Math.random() * 40) + 60
      },
      performance: {
        loadTime: Math.floor(Math.random() * 3000) + 500,
        size: `${(Math.random() * 5 + 0.5).toFixed(1)}MB`,
        lighthouse: {
          performance: Math.floor(Math.random() * 40) + 60,
          accessibility: Math.floor(Math.random() * 30) + 70,
          bestPractices: Math.floor(Math.random() * 35) + 65,
          seo: Math.floor(Math.random() * 25) + 75
        }
      },
      content: {
        title: `${domain} - Professional Services`,
        description: `Leading provider of digital solutions and services`,
        keywords: ['technology', 'digital', 'services', 'solutions'],
        languages: ['en', 'es', 'fr'],
        socialMedia: [
          { platform: 'Twitter', url: `https://twitter.com/${domain.split('.')[0]}`, verified: Math.random() > 0.5 },
          { platform: 'LinkedIn', url: `https://linkedin.com/company/${domain.split('.')[0]}`, verified: Math.random() > 0.3 }
        ]
      }
    };

    // Threat intelligence
    result.threatIntelligence.sources = [
      { name: 'VirusTotal', verdict: Math.random() > 0.1 ? 'clean' : 'suspicious', lastSeen: '2024-01-15' },
      { name: 'URLVoid', verdict: 'clean', lastSeen: '2024-01-14' }
    ];
  }

  private async analyzeSubdomain(input: OSINTInput, result: OSINTAnalysisResult): Promise<void> {
    const domain = input.value;
    
    // Generate realistic subdomains based on common patterns
    const commonSubdomains = [
      'www', 'mail', 'ftp', 'admin', 'api', 'blog', 'shop', 'cdn', 'assets', 'static',
      'dev', 'staging', 'test', 'beta', 'demo', 'support', 'help', 'docs', 'portal',
      'secure', 'vpn', 'remote', 'server', 'db', 'database', 'mysql', 'redis',
      'monitoring', 'stats', 'analytics', 'grafana', 'kibana', 'prometheus',
      'jenkins', 'ci', 'cd', 'deploy', 'build', 'git', 'gitlab', 'github',
      'chat', 'slack', 'teams', 'zoom', 'meet', 'conference', 'webinar'
    ];

    // Generate discovered subdomains (simulate real enumeration)
    const discoveredSubdomains = [];
    const numSubdomains = Math.floor(Math.random() * 25) + 10; // 10-35 subdomains
    
    for (let i = 0; i < numSubdomains; i++) {
      const subdomain = this.getRandomFromArray(commonSubdomains);
      const fullSubdomain = `${subdomain}.${domain}`;
      const ip = this.generateRandomIP();
      
      discoveredSubdomains.push({
        subdomain: fullSubdomain,
        ip: ip,
        status: this.getRandomFromArray(['active', 'active', 'active', 'inactive']), // 75% active
        ports: this.generateOpenPorts(),
        technology: this.getRandomFromArray(['Apache', 'Nginx', 'IIS', 'Cloudflare', 'AWS CloudFront']),
        ssl: Math.random() > 0.3, // 70% have SSL
        lastSeen: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toDateString()
      });
    }

    // Sort by subdomain name for better organization
    discoveredSubdomains.sort((a, b) => a.subdomain.localeCompare(b.subdomain));

    // Set subdomain-specific analysis results
    result.subdomainAnalysis = {
      domain: domain,
      totalFound: discoveredSubdomains.length,
      activeSubdomains: discoveredSubdomains.filter(s => s.status === 'active').length,
      subdomains: discoveredSubdomains,
      techniques: [
        'DNS Enumeration',
        'Certificate Transparency',
        'Search Engine Dorking',
        'Brute Force',
        'Web Archives',
        'Reverse DNS'
      ],
      sources: [
        'crt.sh',
        'DNSDumpster',
        'Subfinder',
        'Amass',
        'Sublist3r',
        'Certificate Transparency Logs'
      ]
    };

    // Network info for the main domain
    result.networkInfo = {
      ip: this.generateRandomIP(),
      location: {
        country: this.getRandomFromArray(['United States', 'United Kingdom', 'Germany', 'France']),
        region: this.getRandomFromArray(['California', 'London', 'Berlin', 'Paris']),
        city: this.getRandomFromArray(['San Francisco', 'London', 'Berlin', 'Paris']),
        coordinates: { lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180 },
        isp: this.getRandomFromArray(['Cloudflare', 'Amazon', 'Google', 'Microsoft']),
        organization: this.getRandomFromArray(['Cloudflare Inc.', 'Amazon.com Inc.', 'Google LLC'])
      }
    };

    // Threat intelligence for subdomains
    result.threatIntelligence.sources = [
      { name: 'Subdomain Scanner', verdict: 'clean', lastSeen: new Date().toDateString() },
      { name: 'Certificate Monitor', verdict: 'clean', lastSeen: new Date().toDateString() }
    ];
  }

  private generateOpenPorts(): number[] {
    const commonPorts = [80, 443, 22, 21, 25, 53, 110, 143, 993, 995, 8080, 8443, 3000, 3001];
    const numPorts = Math.floor(Math.random() * 4) + 1; // 1-4 open ports
    const selectedPorts = [];
    
    for (let i = 0; i < numPorts; i++) {
      const port = this.getRandomFromArray(commonPorts);
      if (!selectedPorts.includes(port)) {
        selectedPorts.push(port);
      }
    }
    
    return selectedPorts.sort((a, b) => a - b);
  }

  private async analyzeIP(input: OSINTInput, result: OSINTAnalysisResult): Promise<void> {
    result.networkInfo = {
      ip: input.value,
      location: {
        country: this.getRandomFromArray(['United States', 'United Kingdom', 'Germany', 'Canada']),
        region: this.getRandomFromArray(['California', 'London', 'Berlin', 'Ontario']),
        city: this.getRandomFromArray(['San Francisco', 'London', 'Berlin', 'Toronto']),
        coordinates: { lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180 },
        isp: this.getRandomFromArray(['Comcast', 'AT&T', 'Verizon', 'Deutsche Telekom']),
        organization: 'Internet Service Provider'
      },
      ports: [
        { port: 80, service: 'HTTP', status: 'open' },
        { port: 443, service: 'HTTPS', status: 'open' },
        { port: 22, service: 'SSH', status: Math.random() > 0.5 ? 'open' : 'closed' },
        { port: 21, service: 'FTP', status: 'closed' }
      ]
    };

    result.threatIntelligence.sources = [
      { name: 'Shodan', verdict: Math.random() > 0.2 ? 'clean' : 'suspicious' },
      { name: 'AbuseIPDB', verdict: 'clean' }
    ];
  }

  private async analyzeEmail(input: OSINTInput, result: OSINTAnalysisResult): Promise<void> {
    const domain = input.value.split('@')[1];
    
    result.emailIntelligence = {
      deliverability: {
        valid: Math.random() > 0.1,
        disposable: Math.random() < 0.1,
        role: input.value.includes('admin') || input.value.includes('info'),
        freeProvider: ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(domain)
      },
      breaches: Math.random() > 0.7 ? [
        { name: 'LinkedIn', date: '2012-06-05', dataTypes: ['Email', 'Password'], verified: true },
        { name: 'Adobe', date: '2013-10-04', dataTypes: ['Email', 'Password', 'Name'], verified: true }
      ] : [],
      provider: {
        name: domain,
        type: domain.includes('.edu') ? 'educational' : domain.includes('.gov') ? 'business' : 'personal',
        securityFeatures: ['2FA', 'Encryption', 'Spam Filter']
      },
      linkedAccounts: [
        { service: 'GitHub', username: input.value.split('@')[0], lastSeen: '2024-01-10' },
        { service: 'Twitter', lastSeen: '2024-01-08' }
      ]
    };
  }

  private async analyzeUsername(input: OSINTInput, result: OSINTAnalysisResult): Promise<void> {
    result.socialIntelligence = {
      platforms: [
        {
          platform: 'Twitter',
          username: input.value,
          url: `https://twitter.com/${input.value}`,
          verified: Math.random() > 0.8,
          followers: Math.floor(Math.random() * 10000),
          posts: Math.floor(Math.random() * 5000),
          lastActivity: '2024-01-15',
          profileData: {
            name: `${input.value} User`,
            bio: 'Tech enthusiast and developer',
            location: 'San Francisco, CA',
            joinDate: '2020-03-15'
          }
        },
        {
          platform: 'GitHub',
          username: input.value,
          url: `https://github.com/${input.value}`,
          verified: false,
          profileData: {
            name: `${input.value}`,
            bio: 'Software Developer',
            location: 'United States'
          }
        }
      ],
      connections: [
        { platform: 'Twitter', mutualConnections: Math.floor(Math.random() * 50), commonInterests: ['Technology', 'Programming'] }
      ],
      reputation: {
        score: Math.floor(Math.random() * 40) + 60,
        sources: ['GitHub', 'Stack Overflow'],
        positiveReviews: Math.floor(Math.random() * 20),
        negativeReviews: Math.floor(Math.random() * 5)
      }
    };
  }

  private async analyzePhone(input: OSINTInput, result: OSINTAnalysisResult): Promise<void> {
    result.phoneIntelligence = {
      carrier: this.getRandomFromArray(['Verizon', 'AT&T', 'T-Mobile', 'Sprint']),
      type: this.getRandomFromArray(['mobile', 'landline', 'voip']),
      location: {
        country: 'United States',
        region: this.getRandomFromArray(['California', 'New York', 'Texas', 'Florida']),
        timezone: 'America/Los_Angeles'
      },
      spam: {
        score: Math.floor(Math.random() * 100),
        reports: Math.floor(Math.random() * 10),
        categories: Math.random() > 0.7 ? ['Telemarketing', 'Robocall'] : []
      },
      linkedAccounts: [
        { service: 'WhatsApp', verified: Math.random() > 0.5 },
        { service: 'Telegram', verified: Math.random() > 0.7 }
      ]
    };
  }

  private async analyzeMac(input: OSINTInput, result: OSINTAnalysisResult): Promise<void> {
    const oui = input.value.substring(0, 8).toUpperCase();
    const vendors = ['Apple Inc.', 'Dell Inc.', 'Cisco Systems', 'Intel Corp.', 'Samsung'];
    
    result.networkInfo = {
      location: {
        country: 'Unknown',
        region: 'Unknown',
        city: 'Unknown',
        coordinates: { lat: 0, lng: 0 },
        isp: 'Local Network',
        organization: this.getRandomFromArray(vendors)
      }
    };

    result.aiSummary.keyFindings.push(`MAC address belongs to ${result.networkInfo.location.organization}`);
    result.aiSummary.keyFindings.push(`OUI: ${oui}`);
  }

  private async analyzeHash(input: OSINTInput, result: OSINTAnalysisResult): Promise<void> {
    const hashType = this.getHashType(input.value);
    
    result.threatIntelligence.sources = [
      { name: 'VirusTotal', verdict: Math.random() > 0.3 ? 'clean' : 'malicious', lastSeen: '2024-01-15' },
      { name: 'Hybrid Analysis', verdict: 'clean' }
    ];

    if (result.threatIntelligence.sources.some(s => s.verdict === 'malicious')) {
      result.threatIntelligence.malicious = true;
      result.threatIntelligence.threatScore = Math.floor(Math.random() * 40) + 60;
      result.threatIntelligence.categories = ['Malware', 'Trojan'];
    }

    result.aiSummary.keyFindings.push(`Hash type: ${hashType}`);
  }

  private generateAISummary(result: OSINTAnalysisResult): void {
    const { input, threatIntelligence, networkInfo, webAnalysis, socialIntelligence, emailIntelligence } = result;
    
    // Risk assessment
    let riskFactors = 0;
    if (threatIntelligence.malicious) riskFactors += 3;
    if (threatIntelligence.threatScore > 70) riskFactors += 2;
    if (webAnalysis?.security.vulnerabilities.length) riskFactors += 1;
    if (emailIntelligence?.breaches.length) riskFactors += 1;

    result.aiSummary.riskLevel = riskFactors >= 4 ? 'critical' : riskFactors >= 2 ? 'high' : riskFactors >= 1 ? 'medium' : 'low';

    // Key findings
    if (networkInfo?.location) {
      result.aiSummary.keyFindings.push(`Located in ${networkInfo.location.city}, ${networkInfo.location.country}`);
    }
    
    if (webAnalysis?.techStack.length) {
      const topTechs = webAnalysis.techStack.slice(0, 2).map(t => t.name).join(', ');
      result.aiSummary.keyFindings.push(`Uses technology stack: ${topTechs}`);
    }

    if (socialIntelligence?.platforms.length) {
      result.aiSummary.keyFindings.push(`Active on ${socialIntelligence.platforms.length} social platforms`);
    }

    // Recommendations
    if (result.aiSummary.riskLevel === 'high' || result.aiSummary.riskLevel === 'critical') {
      result.aiSummary.recommendations.push('Exercise extreme caution when interacting with this entity');
      result.aiSummary.recommendations.push('Consider additional verification through multiple sources');
    }

    if (webAnalysis?.security.vulnerabilities.length) {
      result.aiSummary.recommendations.push('Address identified security vulnerabilities');
    }

    result.aiSummary.recommendations.push('Monitor for changes in threat intelligence status');
    result.aiSummary.recommendations.push('Cross-reference findings with additional OSINT sources');

    // Investigation paths
    result.aiSummary.investigationPaths = [
      {
        title: 'Deep Network Analysis',
        description: 'Investigate network infrastructure and related domains',
        steps: ['Analyze DNS records', 'Check WHOIS information', 'Identify related IP ranges'],
        difficulty: 'medium'
      },
      {
        title: 'Social Media Investigation',
        description: 'Expand social media footprint analysis',
        steps: ['Search additional platforms', 'Analyze posting patterns', 'Identify connections'],
        difficulty: 'easy'
      }
    ];
  }

  private calculateConfidence(result: OSINTAnalysisResult): number {
    let confidence = 50; // Base confidence
    
    // Increase confidence based on data sources
    confidence += result.threatIntelligence.sources.length * 10;
    
    if (result.networkInfo) confidence += 15;
    if (result.webAnalysis) confidence += 15;
    if (result.socialIntelligence) confidence += 10;
    if (result.emailIntelligence) confidence += 10;

    return Math.min(confidence, 95); // Cap at 95%
  }

  private generateRandomIP(): string {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  }

  private getRandomFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private getHashType(hash: string): string {
    const hashTypes = {
      32: 'MD5',
      40: 'SHA-1',
      56: 'SHA-224',
      64: 'SHA-256',
      96: 'SHA-384',
      128: 'SHA-512'
    };
    return hashTypes[hash.length as keyof typeof hashTypes] || 'Unknown';
  }
}

export const osintAnalyzer = new OSINTAnalyzer();