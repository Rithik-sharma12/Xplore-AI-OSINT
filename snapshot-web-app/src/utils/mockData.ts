export const generateMockAnalysis = (url: string) => {
  const domain = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  
  return {
    url: domain,
    ssl: {
      valid: Math.random() > 0.2,
      issuer: "Let's Encrypt Authority X3",
      expires: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toDateString(),
      grade: ["A+", "A", "B", "C"][Math.floor(Math.random() * 4)]
    },
    dns: {
      records: [
        { type: "A", value: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}` },
        { type: "AAAA", value: "2001:4860:4860::8888" },
        { type: "MX", value: `mail.${domain}` },
        { type: "CNAME", value: `www.${domain}` },
        { type: "TXT", value: "v=spf1 include:_spf.google.com ~all" },
        { type: "NS", value: `ns1.${domain}` }
      ]
    },
    techStack: [
      { name: "React", version: "18.2.0", category: "JavaScript Framework" },
      { name: "Next.js", version: "13.4.0", category: "Framework" },
      { name: "Cloudflare", category: "CDN" },
      { name: "Google Analytics", category: "Analytics" },
      { name: "Webpack", version: "5.88.0", category: "Module Bundler" },
      { name: "TypeScript", version: "5.1.0", category: "Language" }
    ],
    security: {
      headers: [
        { name: "Content-Security-Policy", value: "default-src 'self'", status: Math.random() > 0.3 ? 'good' : 'missing' },
        { name: "X-Frame-Options", value: "DENY", status: Math.random() > 0.2 ? 'good' : 'missing' },
        { name: "X-Content-Type-Options", value: "nosniff", status: Math.random() > 0.1 ? 'good' : 'missing' },
        { name: "Strict-Transport-Security", value: "max-age=31536000", status: Math.random() > 0.4 ? 'good' : 'warning' },
        { name: "Referrer-Policy", value: "strict-origin", status: Math.random() > 0.5 ? 'good' : 'missing' }
      ] as Array<{ name: string; value: string; status: 'good' | 'warning' | 'missing' }>
    },
    performance: {
      loadTime: Math.floor(Math.random() * 3000) + 500,
      size: `${(Math.random() * 5 + 0.5).toFixed(1)}MB`
    },
    location: {
      country: ["United States", "United Kingdom", "Germany", "France", "Japan", "Singapore"][Math.floor(Math.random() * 6)],
      city: ["San Francisco", "London", "Berlin", "Paris", "Tokyo", "Singapore"][Math.floor(Math.random() * 6)],
      ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
    }
  };
};